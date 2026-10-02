#!/usr/bin/env node
// Combine two or more crops into one composite, for the before/after and
// concept/shipped figures. Writes a PNG to assets/incoming/composites/,
// which you then run through scripts/assets.mjs.
//
//   node scripts/compose.mjs --out=pfa-old-vs-new \
//     "old.png|0,0,3456,1150" "new.png|0,0,3456,1150"
//
//   node scripts/compose.mjs --out=same-craft-beats --cols=7 --tile=700 \
//     a.png b.png c.png
//
// Each part is "path" or "path|x,y,w,h". No labels are burned in: the
// which-side-is-which caption belongs in the figcaption, not the image.

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT_DIR = path.join(ROOT, 'assets', 'incoming', 'composites');

const flags = {};
const parts = [];
for (const arg of process.argv.slice(2)) {
  if (arg.startsWith('--')) {
    const eq = arg.indexOf('=');
    if (eq === -1) flags[arg.slice(2)] = true;
    else flags[arg.slice(2, eq)] = arg.slice(eq + 1);
  } else {
    parts.push(arg);
  }
}

if (!flags.out || parts.length < 2) {
  console.error('Usage: node scripts/compose.mjs --out=<slot> "file|x,y,w,h" "file|x,y,w,h"');
  process.exit(1);
}

const cols = Number(flags.cols ?? parts.length);
const tileWidth = Number(flags.tile ?? 1600);
const gap = Number(flags.gap ?? 40);
const pad = Number(flags.pad ?? 40);
const bg = String(flags.bg ?? '#eceae5');

const tiles = [];
const sources = [];
for (const part of parts) {
  const [file, crop] = part.split('|');
  sources.push(path.resolve(ROOT, file).replace(/\\/g, '/'));
  let image = sharp(path.resolve(ROOT, file));
  if (crop) {
    const [left, top, width, height] = crop.split(',').map(Number);
    image = image.extract({ left, top, width, height });
  }
  const buffer = await image.resize({ width: tileWidth }).toBuffer();
  const meta = await sharp(buffer).metadata();
  tiles.push({ buffer, height: meta.height });
}

const rows = Math.ceil(tiles.length / cols);
const rowHeights = [];
for (let row = 0; row < rows; row += 1) {
  const slice = tiles.slice(row * cols, (row + 1) * cols);
  rowHeights.push(Math.max(...slice.map((tile) => tile.height)));
}

const width = pad * 2 + cols * tileWidth + (cols - 1) * gap;
const height =
  pad * 2 + rowHeights.reduce((sum, h) => sum + h, 0) + (rows - 1) * gap;

const composite = tiles.map((tile, index) => {
  const col = index % cols;
  const row = Math.floor(index / cols);
  const top =
    pad + rowHeights.slice(0, row).reduce((sum, h) => sum + h, 0) + row * gap;
  return {
    input: tile.buffer,
    left: pad + col * (tileWidth + gap),
    // Top-align within the row so matching scroll positions stay comparable.
    top,
  };
});

await mkdir(OUT_DIR, { recursive: true });
const out = path.join(OUT_DIR, `${flags.out}.png`);

await sharp({ create: { width, height, channels: 3, background: bg } })
  .composite(composite)
  .png()
  .toFile(out);

// Leave a trail so the manifest can say which captures a composite came from.
await writeFile(`${out}.sources.json`, `${JSON.stringify(sources, null, 2)}\n`);

console.log(`${flags.out}: ${width}x${height} from ${tiles.length} parts`);
console.log(`  node scripts/assets.mjs ${flags.out} ${path.relative(ROOT, out).replace(/\\/g, '/')}`);
