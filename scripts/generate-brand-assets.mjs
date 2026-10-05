#!/usr/bin/env node
// One-off brand files for favicon and the default Open Graph card.
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const publicDir = path.join(root, 'public');
const ogDir = path.join(publicDir, 'og');

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="Ryan Cates">
  <rect width="32" height="32" rx="4" fill="#faf9f7"/>
  <text x="16" y="22.5" text-anchor="middle" font-family="ui-sans-serif, system-ui, sans-serif" font-size="15" font-weight="600" fill="#17191b" letter-spacing="-0.04em">RC</text>
</svg>`;

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#faf9f7"/>
  <text x="80" y="290" font-family="ui-sans-serif, system-ui, sans-serif" font-size="72" font-weight="500" fill="#17191b" letter-spacing="-0.04em">Ryan Cates</text>
  <text x="80" y="380" font-family="ui-sans-serif, system-ui, sans-serif" font-size="44" font-weight="500" fill="#46494c" letter-spacing="-0.03em">Creative Engineer</text>
</svg>`;

await mkdir(ogDir, { recursive: true });
await writeFile(path.join(publicDir, 'favicon.svg'), faviconSvg);

await sharp(Buffer.from(faviconSvg)).resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));
await sharp(Buffer.from(ogSvg)).jpeg({ quality: 88 }).toFile(path.join(ogDir, 'default.jpg'));

console.log('Wrote public/favicon.svg, public/apple-touch-icon.png, public/og/default.jpg');
