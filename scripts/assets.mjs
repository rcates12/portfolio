#!/usr/bin/env node
// Crop, resize and compress a source capture into the sizes the site serves,
// then record it so the matching Figure stops rendering a placeholder.
//
//   node scripts/assets.mjs --status
//   node scripts/assets.mjs novus-receipt assets/incoming/capture.png
//   node scripts/assets.mjs novus-receipt capture.png --crop 0,120,3456,1944
//   node scripts/assets.mjs novus-install clip.mp4 --poster poster.png
//
// Source captures run to 36 MB and must never be committed. Drop them in
// assets/incoming/ (gitignored) and run this.

import { readFile, writeFile, mkdir, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT_DIR = path.join(ROOT, 'public', 'img');
const MANIFEST = path.join(ROOT, 'src', 'data', 'assets.json');
const CONTENT_DIR = path.join(ROOT, 'src', 'content', 'work');
const WIDTHS = [640, 1024, 1536, 2048];

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
}

async function processVideo(slot, source, flags, manifest) {
  const name = `${slot}${path.extname(source)}`;
  await mkdir(OUT_DIR, { recursive: true });
  await writeFile(path.join(OUT_DIR, name), await readFile(source));

  let poster;
  if (typeof flags.poster === 'string') {
    const image = sharp(flags.poster);
    const meta = await image.metadata();
    poster = `${slot}-poster.webp`;
    await image.resize({ width: Math.min(1536, meta.width) }).webp({ quality: 78 })
      .toFile(path.join(OUT_DIR, poster));
  }

  manifest[slot] = {
    type: 'video',
    src: `/img/${name}`,
    ...(poster ? { poster: `/img/${poster}` } : {}),
  };

  console.log(`${slot}: video copied.`);
  if (!poster) console.log('  No poster. Reduced-motion users will see a blank frame; pass --poster.');
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
