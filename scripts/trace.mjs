#!/usr/bin/env node
// Which capture did a shipped asset come from? Reduces frames to a 16x16
// grayscale fingerprint and reports the closest candidate. Recordings are
// sampled at 2 fps; stills are cropped from the top to the target's aspect
// ratio first, since every slot is a top-anchored crop. Used to backfill
// provenance for assets made before the manifest recorded their source.
//
//   node scripts/trace.mjs <poster.webp> <a.mov> <b.mov> ...
//   node scripts/trace.mjs <slot-2048.webp> <a.png> <b.png> ...

import { mkdtemp, rm, readdir } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { tmpdir } from 'node:os';
import path from 'node:path';
import sharp from 'sharp';

const run = promisify(execFile);

/** 16x16 grayscale, normalized so encoder brightness shifts do not dominate. */
async function fingerprint(file) {
  const raw = await sharp(file)
    .greyscale()
    .resize(16, 16, { fit: 'fill' })
    .normalise()
    .raw()
    .toBuffer();
  return Uint8Array.from(raw);
}

function distance(a, b) {
  let sum = 0;
  for (let i = 0; i < a.length; i += 1) sum += Math.abs(a[i] - b[i]);
  return sum / a.length;
}

const [poster, ...candidates] = process.argv.slice(2);
if (!poster || candidates.length === 0) {
  console.error('Usage: node scripts/trace.mjs <poster> <recording> [recording...]');
  process.exit(1);
}

const target = await fingerprint(poster);
const targetMeta = await sharp(poster).metadata();
const aspect = targetMeta.width / targetMeta.height;
const results = [];

for (const movie of candidates) {
  if (!/\.(mov|mp4|webm)$/i.test(movie)) {
    const meta = await sharp(movie).metadata();
    const height = Math.min(meta.height, Math.round(meta.width / aspect));
    const crop = await sharp(movie)
      .extract({ left: 0, top: 0, width: meta.width, height })
      .toBuffer();
    results.push({ movie, score: distance(target, await fingerprint(crop)), at: 0 });
    continue;
  }

  const dir = await mkdtemp(path.join(tmpdir(), 'trace-'));
  await run('ffmpeg', ['-v', 'error', '-i', movie, '-vf', 'fps=2,scale=160:-1', path.join(dir, '%05d.jpg')]);
  const frames = (await readdir(dir)).sort();

  let best = { score: Infinity, at: 0 };
  for (const frame of frames) {
    const score = distance(target, await fingerprint(path.join(dir, frame)));
    // Frame n is sampled at (n - 1) / 2 seconds, from the 2 fps filter above.
    if (score < best.score) best = { score, at: (Number(frame.slice(0, 5)) - 1) / 2 };
  }

  await rm(dir, { recursive: true, force: true });
  results.push({ movie, ...best });
}

results.sort((a, b) => a.score - b.score);
for (const result of results) {
  const when = result.at ? `at ${String(result.at).padStart(5)}s  ` : '';
  console.log(`${result.score.toFixed(1).padStart(6)}  ${when}${path.basename(result.movie)}`);
}
