// Homepage art from the Figma working file.
//
// The Figma canvas renders at 1x, so the exports come from temporary 4x-scaled
// clones of each image frame (see the chat workflow). Sources land in
// assets/incoming/figma/ (gitignored); this writes the served sizes.
//
//   node scripts/process-home-assets.mjs

import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const IN = path.join(ROOT, 'assets', 'incoming', 'figma');
const OUT = path.join(ROOT, 'public', 'img');
mkdirSync(OUT, { recursive: true });

// Each source is a 4x render of its Figma frame, so scaling by 1/4, 2/4 and
// 3/4 lands on the frame's own size at 1x, 2x and 3x — no reframing, and the
// crop stays exactly what the file shows.
// `scale` is how many times larger the export is than the frame it came from.
// The hero photo renders at 720 wide, and its export capped out at 1440.
const jobs = [
  { name: 'pfa-card', file: 'pfa-card.png', scale: 4 },
  { name: 'homepage-card', file: 'homepage-card.png', scale: 4 },
  { name: 'novus-card', file: 'novus-card.png', scale: 4 },
  { name: 'same-craft-card', file: 'same-craft-card.png', scale: 4 },
  { name: 'home-joshua-tree', file: 'photo-joshua-tree.png', scale: 2 },
];

const manifest = {};

for (const job of jobs) {
  const src = path.join(IN, job.file);
  const meta = await sharp(src).metadata();
  const baseW = meta.width / job.scale;
  const baseH = meta.height / job.scale;

  const widths = [];
  for (const dpr of [1, 2, 3]) {
    const w = Math.round(baseW * dpr);
    const h = Math.round(baseH * dpr);
    if (w > meta.width) continue;
    const out = path.join(OUT, `${job.name}-${w}`);
    const pipeline = () => sharp(src).resize(w, h, { fit: 'fill' });
    await pipeline().webp({ quality: 86, effort: 5 }).toFile(`${out}.webp`);
    await pipeline().avif({ quality: 58, effort: 5 }).toFile(`${out}.avif`);
    widths.push(w);
  }

  manifest[job.name] = {
    type: 'image',
    width: widths.at(-1),
    height: Math.round((widths.at(-1) * baseH) / baseW),
    widths,
  };
  console.log(`${job.name.padEnd(18)} src ${meta.width}x${meta.height}  →  ${widths.join(', ')}`);
}

console.log('\nManifest entries:\n' + JSON.stringify(manifest, null, 2));
