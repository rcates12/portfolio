#!/usr/bin/env node
// Contact sheets for choosing crops, written to assets/incoming/contact/.
//
//   node scripts/sheet.mjs --dir "path/to/folder" --out same-craft.jpg
//   node scripts/sheet.mjs --slice "path/to/tall-capture.png" --out page.jpg
//   node scripts/sheet.mjs --slice "tall.png" --from 1800 --to 4500 --out zoom.jpg
//
// --dir montages every image in a folder. --slice cuts one very tall
// full-page capture into horizontal bands so the whole page is visible at
// once; the printed y offsets are the numbers to pass to assets.mjs --crop.
// --from and --to narrow --slice to one stretch of the page, for reading a
// section closely enough to pick its exact edges.

import { readdir, mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT_DIR = path.join(ROOT, 'assets', 'incoming', 'contact');

function parseArgs(argv) {
  const flags = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith('--')) continue;
    const eq = arg.indexOf('=');
    if (eq !== -1) {
      flags[arg.slice(2, eq)] = arg.slice(eq + 1);
      continue;
    }
    // Accept --key value too, so a path with spaces does not have to be
    // glued to the flag with an = to survive the shell.
    const key = arg.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith('--')) {
      flags[key] = true;
    } else {
      flags[key] = next;
      i += 1;
    }
  }
  return flags;
}

async function montage(files, out, cols, tileWidth) {
  const tiles = await Promise.all(
    files.map(async (file) => ({
      file,
      buffer: await sharp(file).resize({ width: tileWidth }).toBuffer(),
    })),
  );

  const metas = await Promise.all(tiles.map((tile) => sharp(tile.buffer).metadata()));
  const rowHeight = Math.max(...metas.map((meta) => meta.height));
  const rows = Math.ceil(tiles.length / cols);

  const composite = tiles.map((tile, index) => ({
    input: tile.buffer,
    left: (index % cols) * tileWidth,
    top: Math.floor(index / cols) * rowHeight,
  }));

  await sharp({
    create: {
      width: cols * tileWidth,
      height: rows * rowHeight,
      channels: 3,
      background: { r: 20, g: 20, b: 20 },
    },
  })
    .composite(composite)
    .jpeg({ quality: 72 })
    .toFile(out);

  tiles.forEach((tile, index) => {
    console.log(`${String(index + 1).padStart(2)}  ${path.basename(tile.file)}`);
  });
}

async function slice(file, out, bands, tileWidth, from, to) {
  const meta = await sharp(file).metadata();
  const start = Math.max(0, from ?? 0);
  const end = Math.min(meta.height, to ?? meta.height);
  const bandHeight = Math.floor((end - start) / bands);
  const cols = Math.min(bands, 4);

  const buffers = [];
  for (let i = 0; i < bands; i += 1) {
    const top = start + i * bandHeight;
    const height = Math.min(bandHeight, end - top);
    buffers.push(
      await sharp(file)
        .extract({ left: 0, top, width: meta.width, height })
        .resize({ width: tileWidth })
        .toBuffer(),
    );
    console.log(`band ${String(i + 1).padStart(2)}  y ${top} to ${top + height}`);
  }

  const metas = await Promise.all(buffers.map((buffer) => sharp(buffer).metadata()));
  const rowHeight = Math.max(...metas.map((m) => m.height));
  const rows = Math.ceil(bands / cols);

  await sharp({
    create: {
      width: cols * tileWidth,
      height: rows * rowHeight,
      channels: 3,
      background: { r: 20, g: 20, b: 20 },
    },
  })
    .composite(
      buffers.map((input, index) => ({
        input,
        left: (index % cols) * tileWidth,
        top: Math.floor(index / cols) * rowHeight,
      })),
    )
    .jpeg({ quality: 72 })
    .toFile(out);

  console.log(`\nSource is ${meta.width}x${meta.height}. Band height ${bandHeight}.`);
}

const flags = parseArgs(process.argv.slice(2));
await mkdir(OUT_DIR, { recursive: true });
const out = path.join(OUT_DIR, String(flags.out ?? 'sheet.jpg'));
const tileWidth = Number(flags.width ?? 430);

if (flags.dir) {
  const dir = String(flags.dir);
  const files = (await readdir(dir))
    .filter((file) => /\.(png|jpe?g)$/i.test(file))
    .map((file) => path.join(dir, file));
  await montage(files, out, Number(flags.cols ?? 4), tileWidth);
} else if (flags.slice) {
  await slice(
    String(flags.slice),
    out,
    Number(flags.bands ?? 8),
    tileWidth,
    flags.from === undefined ? undefined : Number(flags.from),
    flags.to === undefined ? undefined : Number(flags.to),
  );
} else {
  console.error('Pass --dir <folder> or --slice <file>, plus --out <name.jpg>');
  process.exitCode = 1;
}

console.log(`\nWrote ${out}`);
