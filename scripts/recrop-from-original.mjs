// Re-cut a tile image from its original capture instead of from Figma.
//
// Figma caps imported images at 4096px on the longest edge. A full-page
// capture is tall enough that the cap lands on the height and crushes the
// width — pendo.io came in at 644x4096 from a 3456x21988 original, leaving
// the tile with fewer source pixels than it needed. Cropping here keeps the
// full resolution, using the same region the Figma frame shows.
//
//   node scripts/recrop-from-original.mjs
//
// Writes into assets/incoming/figma/ at 4x the frame, so the regular
// process-home-assets.mjs run picks it up unchanged.

import sharp from 'sharp';
import { mkdirSync, existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT_DIR = path.join(ROOT, 'assets', 'incoming', 'figma');
mkdirSync(OUT_DIR, { recursive: true });

// `crop` is the region the Figma frame samples, as fractions of the source.
// Read straight off the frame's image fill, so it survives a re-crop.
const jobs = [
  {
    name: 'homepage-card',
    source: 'C:/Users/ryanc/Downloads/2/2/screencapture-pendo-io-2026-10-03-16_36_21.png',
    crop: { left: 0.372581, top: 0.189779, width: 0.531038, height: 0.115163 },
    out: { width: 1392, height: 1920 },
  },
];

for (const job of jobs) {
  if (!existsSync(job.source)) {
    console.warn(`skipped ${job.name}: no source at ${job.source}`);
    continue;
  }

  const image = sharp(job.source, { limitInputPixels: false });
  const meta = await image.metadata();

  const region = {
    left: Math.round(meta.width * job.crop.left),
    top: Math.round(meta.height * job.crop.top),
    width: Math.round(meta.width * job.crop.width),
    height: Math.round(meta.height * job.crop.height),
  };

  const dest = path.join(OUT_DIR, `${job.name}.png`);
  await image
    .extract(region)
    .resize(job.out.width, job.out.height, { fit: 'fill' })
    .png()
    .toFile(dest);

  console.log(
    `${job.name}  source ${meta.width}x${meta.height}` +
      `  crop ${region.width}x${region.height} @ ${region.left},${region.top}` +
      `  →  ${job.out.width}x${job.out.height}`,
  );
}
