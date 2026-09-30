#!/usr/bin/env node
// Gera a narração da apresentação a partir de apresentacao/narracao.md.
//
// Com ELEVENLABS_API_KEY definida, pede ao ElevenLabs um MP3 por slide e os
// tempos de cada carácter, e grava:
//   apresentacao/audio/sN.mp3
//   apresentacao/narracao.js   (texto, tempos por palavra e marcas de ação)
// Sem chave (ou com --sem-audio), grava só narracao.js com tempos estimados,
// para as legendas funcionarem sem voz.
//
// Uso:
//   ELEVENLABS_API_KEY=... ELEVENLABS_VOICE_ID=... node apresentacao/ferramentas/gerar-narracao.mjs
//   node apresentacao/ferramentas/gerar-narracao.mjs --chave-no-proxy --voz <voice_id>
//     (em ambientes que injetam o cabeçalho xi-api-key nos pedidos a api.elevenlabs.io)
//     O fetch do Node só usa o proxy do ambiente com NODE_USE_ENV_PROXY=1 (Node >= 22.21).
//   node apresentacao/ferramentas/gerar-narracao.mjs --sem-audio
// Opções: --voz <voice_id>  --modelo <model_id>  --slides 2,5  --forcar
// Só volta a pedir áudio para os slides cujo texto, voz ou modelo mudaram.

import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const opt = (name, def) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : def; };
const has = (name) => args.includes(name);

const KEY = process.env.ELEVENLABS_API_KEY;
const VOICE = opt('--voz', process.env.ELEVENLABS_VOICE_ID || '');
const MODEL = opt('--modelo', process.env.ELEVENLABS_MODEL_ID || 'eleven_v4');
const ONLY = opt('--slides', '') ? opt('--slides', '').split(',').map(Number) : null;
const PROXY_KEY = has('--chave-no-proxy') || process.env.ELEVENLABS_KEY_VIA_PROXY === '1';
const WITH_AUDIO = (Boolean(KEY) || PROXY_KEY) && !has('--sem-audio');

if (WITH_AUDIO && !VOICE) {
  console.error('Falta a voz: defina ELEVENLABS_VOICE_ID ou use --voz <voice_id>.');
  console.error('Escolha uma voz em português europeu na Voice Library do ElevenLabs.');
  process.exit(1);
}

/* ---- ler narracao.md: "## N · Título" seguido de parágrafos ---- */
function parse(md) {
  const out = [];
  let cur = null;
  for (const line of md.split('\n')) {
    const h = /^##\s+(\d+)\b/.exec(line);
    if (h) { cur = { n: Number(h[1]), raw: [] }; out.push(cur); continue; }
    if (cur && line.trim()) cur.raw.push(line.trim());
  }
  return out.map(({ n, raw }) => {
    const src = raw.join(' ');
    // retirar as marcas [[nome]] e lembrar a posição de cada uma no texto falado
    let text = '', cues = [], last = 0;
    for (const m of src.matchAll(/\s*\[\[([a-z0-9]+)\]\]\s*/g)) {
      text += src.slice(last, m.index);
      if (text && !text.endsWith(' ')) text += ' ';
      cues.push({ name: m[1], at: text.length });
      last = m.index + m[0].length;
    }
    text += src.slice(last);
    return { n, text: text.replace(/\s+/g, ' ').trim(), cues };
  });
}

/* ---- palavras a partir dos tempos por carácter ---- */
function wordsFromAlignment(text, al) {
  const chars = al.characters, st = al.character_start_times_seconds, en = al.character_end_times_seconds;
  const words = []; let w = null;
  for (let i = 0; i < chars.length; i++) {
    if (/\s/.test(chars[i])) { if (w) { words.push(w); w = null; } continue; }
    if (!w) w = { t: '', s: st[i], e: en[i], at: i };
    w.t += chars[i]; w.e = en[i];
  }
  if (w) words.push(w);
  return words;
}

/* ---- tempos estimados, para legendas sem áudio ---- */
function estimateWords(text) {
  const words = []; let t = .35, at = 0;
  for (const tok of text.split(' ')) {
    const idx = text.indexOf(tok, at); at = idx + tok.length;
    const d = .11 + tok.length * .052;
    words.push({ t: tok, s: t, e: t + d, at: idx });
    t += d + (/[.!?]$/.test(tok) ? .42 : /[,:;]$/.test(tok) ? .2 : .04);
  }
  return words;
}

function cueTimes(cues, words) {
  return cues.map(c => {
    const w = words.find(x => x.at >= c.at) || words[words.length - 1];
    return [c.name, +(w ? w.s : 0).toFixed(3)];
  });
}

async function tts(text) {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(VOICE)}/with-timestamps?output_format=mp3_44100_128`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { ...(KEY ? { 'xi-api-key': KEY } : {}), 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ text, model_id: MODEL, voice_settings: { stability: .5, similarity_boost: .8, style: .15, use_speaker_boost: true } }),
  });
  if (!res.ok) {
    const body = (await res.text()).slice(0, 300);
    const hint = res.status === 401 && PROXY_KEY && process.env.NODE_USE_ENV_PROXY !== '1' ? '\nCom --chave-no-proxy, corra com NODE_USE_ENV_PROXY=1 para o pedido passar pelo proxy que injeta a chave.' : '';
    throw new Error(`ElevenLabs ${res.status}: ${body}${hint}`);
  }
  const j = await res.json();
  return { audio: Buffer.from(j.audio_base64, 'base64'), alignment: j.alignment || j.normalized_alignment };
}

async function exists(p) { try { await access(p); return true; } catch { return false; } }

async function previous() {
  try {
    const src = await readFile(join(ROOT, 'narracao.js'), 'utf8');
    return JSON.parse(src.slice(src.indexOf('{'), src.lastIndexOf('}') + 1));
  } catch { return null; }
}

const md = await readFile(join(ROOT, 'narracao.md'), 'utf8');
const slides = parse(md);
const prev = await previous();
const out = { gerado: new Date().toISOString(), voz: WITH_AUDIO ? VOICE : (prev?.voz ?? null), modelo: MODEL, slides: {} };
if (WITH_AUDIO) await mkdir(join(ROOT, 'audio'), { recursive: true });

for (const s of slides) {
  const hash = createHash('sha1').update([s.text, VOICE, MODEL].join('|')).digest('hex').slice(0, 12);
  const old = prev?.slides?.[s.n];
  const file = `audio/s${s.n}.mp3`;
  const selected = !ONLY || ONLY.includes(s.n);
  let entry;
  if (WITH_AUDIO && selected && (has('--forcar') || !old?.audio || old.hash !== hash || !(await exists(join(ROOT, file))))) {
    process.stdout.write(`slide ${s.n}: a pedir áudio ao ElevenLabs… `);
    const { audio, alignment } = await tts(s.text);
    await writeFile(join(ROOT, file), audio);
    const words = wordsFromAlignment(s.text, alignment);
    entry = { hash, audio: file, words, cues: cueTimes(s.cues, words) };
    console.log(`${(audio.length / 1024).toFixed(0)} KB, ${words.length} palavras`);
  } else if (old && old.hash === hash && old.audio && (await exists(join(ROOT, old.audio)))) {
    entry = old; console.log(`slide ${s.n}: sem alterações, mantém o áudio`);
  } else {
    const words = estimateWords(s.text);
    entry = { hash: null, audio: null, words, cues: cueTimes(s.cues, words) };
    console.log(`slide ${s.n}: tempos estimados (sem áudio)`);
  }
  entry.texto = s.text;
  entry.words = entry.words.map(w => Array.isArray(w) ? w : [w.t, +w.s.toFixed(3), +w.e.toFixed(3), w.at]);
  out.slides[s.n] = entry;
}

const js = `/* Gerado por ferramentas/gerar-narracao.mjs a partir de narracao.md. Não editar à mão. */\nwindow.NARRACAO=${JSON.stringify(out)};\n`;
await writeFile(join(ROOT, 'narracao.js'), js);
console.log(`\nnarracao.js gravado (${Object.keys(out.slides).length} slides${WITH_AUDIO ? ', com áudio' : ', só legendas'}).`);
