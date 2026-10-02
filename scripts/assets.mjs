#!/usr/bin/env node
// Crop, resize and compress a source capture into the sizes the site serves,
// then record it so the matching Figure stops rendering a placeholder.
//
//   node scripts/assets.mjs --status
//   node scripts/assets.mjs novus-receipt assets/incoming/capture.png
//   node scripts/assets.mjs novus-receipt capture.png --crop=0,120,3456,1944
//   node scripts/assets.mjs novus-install rec.mov --start=00:01:12 --duration=6
//
// Video flags: --start, --duration, --crop, --max (default 1280),
// --fps (30), --crf (26), --poster-at (seconds into the trimmed clip).
//
// Source captures run to 36 MB and must never be committed. Drop them in
// assets/incoming/ (gitignored) and run this.

import { readFile, writeFile, mkdir, readdir, stat, rm } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';
import sharp from 'sharp';

const run = promisify(execFile);

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT_DIR = path.join(ROOT, 'public', 'img');
const MANIFEST = path.join(ROOT, 'src', 'data', 'assets.json');
const CONTENT_DIR = path.join(ROOT, 'src', 'content', 'work');
const WIDTHS = [640, 1024, 1536, 2048];
// Captures should come from one of Ryan's source folders. See docs/STATE.md.
const EVIDENCE = ['Downloads/work evidence for portfolio', 'Downloads/scnf2'];

function parseArgs(argv) {
  const positional = [];
  const flags = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg.startsWith('--')) {
      // --key=value as well as --key value: PowerShell splits a bare
      // comma-separated value into separate arguments.
      const eq = arg.indexOf('=');
      if (eq !== -1) {
        flags[arg.slice(2, eq)] = arg.slice(eq + 1);
        continue;
      }
      const key = arg.slice(2);
      const next = argv[i + 1];
      if (!next || next.startsWith('--')) {
        flags[key] = true;
      } else {
        flags[key] = next;
        i += 1;
      }
    } else {
      positional.push(arg);
    }
  }
  return { positional, flags };
}

async function loadManifest() {
  if (!existsSync(MANIFEST)) return {};
  return JSON.parse(await readFile(MANIFEST, 'utf8'));
}

/** Where a slot's pixels came from. A composite leaves a .sources.json
 *  sidecar naming its parts; everything else is the file itself. */
function provenance(source) {
  const sidecar = `${source}.sources.json`;
  if (existsSync(sidecar)) return JSON.parse(readFileSync(sidecar, 'utf8'));
  return [path.resolve(source).replace(/\\/g, '/')];
}

async function saveManifest(manifest) {
  await mkdir(path.dirname(MANIFEST), { recursive: true });
  const sorted = Object.fromEntries(
    Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)),
  );
  await writeFile(MANIFEST, `${JSON.stringify(sorted, null, 2)}\n`);
}

/** Every asset key referenced by the MDX, so --status can diff the two. */
async function slotsInContent() {
  const slots = new Map();
  for (const file of await readdir(CONTENT_DIR)) {
    if (!file.endsWith('.mdx')) continue;
    const text = await readFile(path.join(CONTENT_DIR, file), 'utf8');
    for (const match of text.matchAll(/asset:\s*(\S+)|asset="([^"]+)"/g)) {
      slots.set(match[1] ?? match[2], file);
    }
  }
  return slots;
}

async function status() {
  const [manifest, slots] = await Promise.all([loadManifest(), slotsInContent()]);
  const rows = [...slots.entries()].map(([slot, file]) => ({
    slot,
    study: file.replace('.mdx', ''),
    state: manifest[slot] ? 'ready' : 'placeholder',
  }));

  const ready = rows.filter((row) => row.state === 'ready').length;
  const pad = Math.max(...rows.map((row) => row.slot.length));

  for (const row of rows.sort((a, b) => a.study.localeCompare(b.study))) {
    const mark = row.state === 'ready' ? '+' : ' ';
    console.log(`${mark} ${row.slot.padEnd(pad)}  ${row.study}`);
  }
  console.log(`\n${ready} of ${rows.length} slots filled.`);

  const orphans = Object.keys(manifest).filter((slot) => !slots.has(slot));
  if (orphans.length) console.log(`Unused manifest entries: ${orphans.join(', ')}`);

  // Everything should trace back to a known source folder. Anything that does
  // not is worth a second look before it ships.
  const strays = Object.entries(manifest).flatMap(([slot, entry]) =>
    (entry.source ?? [])
      .filter((file) => !EVIDENCE.some((root) => file.includes(root)))
      .map((file) => `${slot}: ${file}`),
  );
  console.log(
    strays.length
      ? `\nSources outside the known capture folders:\n  ${strays.join('\n  ')}`
      : '\nEvery source is inside a known capture folder.',
  );
}

async function probe(file) {
  const { stdout } = await run('ffprobe', [
    '-v', 'error',
    '-select_streams', 'v:0',
    '-show_entries', 'stream=width,height:format=duration',
    '-of', 'json',
    file,
  ]);
  const data = JSON.parse(stdout);
  return {
    width: data.streams[0].width,
    height: data.streams[0].height,
    duration: Number(data.format.duration),
  };
}

/** Trim a long screen recording into a short muted loop, in two formats,
 *  with a poster frame for reduced-motion and first paint. */
async function processVideo(slot, source, flags, manifest) {
  await mkdir(OUT_DIR, { recursive: true });

  const maxWidth = Number(flags.max ?? 1280);
  const fps = Number(flags.fps ?? 30);
  const filters = [];
  if (typeof flags.crop === 'string') {
    const [left, top, width, height] = flags.crop.split(',').map(Number);
    if ([left, top, width, height].some(Number.isNaN)) {
      throw new Error('--crop expects x,y,w,h in source pixels');
    }
    filters.push(`crop=${width}:${height}:${left}:${top}`);
  }
  filters.push(`scale=${maxWidth}:-2:flags=lanczos`, `fps=${fps}`);
  const filter = filters.join(',');

  // -ss before -i seeks by keyframe, which is fast on a multi-hundred-MB source.
  const trim = [];
  if (flags.start) trim.push('-ss', String(flags.start));
  trim.push('-i', source);
  if (flags.duration) trim.push('-t', String(flags.duration));

  const mp4 = path.join(OUT_DIR, `${slot}.mp4`);
  const webm = path.join(OUT_DIR, `${slot}.webm`);
  const poster = path.join(OUT_DIR, `${slot}-poster.webp`);

  console.log(`${slot}: encoding mp4…`);
  await run('ffmpeg', [
    '-y', ...trim,
    '-vf', filter,
    '-an',
    '-c:v', 'libx264', '-crf', String(flags.crf ?? 26), '-preset', 'slow',
    '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
    mp4,
  ]);

  console.log(`${slot}: encoding webm…`);
  await run('ffmpeg', [
    '-y', '-i', mp4,
    '-an',
    '-c:v', 'libvpx-vp9', '-crf', String(flags.crf ? Number(flags.crf) + 8 : 34), '-b:v', '0',
    '-row-mt', '1',
    webm,
  ]);

  const posterAt = String(flags['poster-at'] ?? 0);
  const framePng = path.join(OUT_DIR, `${slot}-frame.png`);
  await run('ffmpeg', ['-y', '-ss', posterAt, '-i', mp4, '-frames:v', '1', framePng]);
  await sharp(framePng).webp({ quality: 78 }).toFile(poster);
  await rm(framePng, { force: true });

  const meta = await probe(mp4);
  manifest[slot] = {
    type: 'video',
    width: meta.width,
    height: meta.height,
    duration: Number(meta.duration.toFixed(2)),
    mp4: `/img/${slot}.mp4`,
    webm: `/img/${slot}.webm`,
    poster: `/img/${slot}-poster.webp`,
    source: provenance(source),
  };

  const kb = async (file) => Math.round((await stat(file)).size / 1024);
  const sourceMb = ((await stat(source)).size / 1024 / 1024).toFixed(1);
  console.log(
    `${slot}: ${meta.width}x${meta.height}, ${meta.duration.toFixed(1)}s, ` +
    `mp4 ${await kb(mp4)} kB, webm ${await kb(webm)} kB, poster ${await kb(poster)} kB.`,
  );
  console.log(`  Source was ${sourceMb} MB. Do not commit it.`);
  if (meta.duration > 12) {
    console.log('  Over 12s. Loops read better short; consider --duration.');
  }
}

async function processImage(slot, source, flags, manifest) {
  let image = sharp(source);
  const meta = await image.metadata();

  if (typeof flags.crop === 'string') {
    const [left, top, width, height] = flags.crop.split(',').map(Number);
    if ([left, top, width, height].some(Number.isNaN)) {
      throw new Error('--crop expects x,y,w,h in source pixels');
    }
    image = image.extract({ left, top, width, height });
  }

  const cropped = await image.toBuffer();
  const base = await sharp(cropped).metadata();
  const cap = typeof flags.max === 'string' ? Number(flags.max) : base.width;
  const widths = WIDTHS.filter((w) => w <= Math.min(cap, base.width));
  if (widths.length === 0) widths.push(Math.min(cap, base.width));

  await mkdir(OUT_DIR, { recursive: true });

  for (const width of widths) {
    const resized = sharp(cropped).resize({ width });
    await resized.clone().avif({ quality: 55 }).toFile(path.join(OUT_DIR, `${slot}-${width}.avif`));
    await resized.clone().webp({ quality: 78 }).toFile(path.join(OUT_DIR, `${slot}-${width}.webp`));
  }

  manifest[slot] = {
    type: 'image',
    width: base.width,
    height: base.height,
    widths,
    source: provenance(source),
  };

  const sizes = await Promise.all(
    widths.map(async (w) => (await stat(path.join(OUT_DIR, `${slot}-${w}.avif`))).size),
  );
  const largest = Math.round(Math.max(...sizes) / 1024);

  const sourceMb = (await stat(source)).size / 1024 / 1024;
  console.log(`${slot}: ${base.width}x${base.height}, ${widths.length} widths, largest AVIF ${largest} kB.`);
  console.log(`  Source was ${sourceMb.toFixed(1)} MB. Do not commit it.`);
}

async function main() {
  const { positional, flags } = parseArgs(process.argv.slice(2));

  if (flags.status) return status();

  const [slot, sourceArg] = positional;
  if (!slot || !sourceArg) {
    console.error('Usage: node scripts/assets.mjs <slot-key> <source> [--crop x,y,w,h] [--max px] [--poster file]');
    console.error('       node scripts/assets.mjs --status');
    process.exitCode = 1;
    return;
  }

  const source = path.resolve(ROOT, sourceArg);
  if (!existsSync(source)) throw new Error(`No such file: ${source}`);

  const manifest = await loadManifest();
  const isVideo = /\.(mp4|webm|mov)$/i.test(source);

  if (isVideo) {
    await processVideo(slot, source, flags, manifest);
  } else {
    await processImage(slot, source, flags, manifest);
  }

  await saveManifest(manifest);
  console.log('  Alt text is still required before this ships.');
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
