#!/usr/bin/env node
// Brand files for favicon and the default Open Graph card.
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const publicDir = path.join(root, 'public');
const ogDir = path.join(publicDir, 'og');
const fontsDir = path.join(root, 'scripts', 'fonts');

const OG_TITLE = 'Ryan Cates';
const OG_ROLE = 'Creative Engineer';
const OG_DESCRIPTION =
  'Portfolio of shipped marketing sites, designed and built in the browser.';
const OG_URL = 'ryancates.com';

/** Pull woff2 URLs from a Google Fonts CSS response. */
async function googleFontWoff2(family, weights) {
  const params = new URLSearchParams({
    family: `${family}:wght@${weights.join(';')}`,
  });
  const cssUrl = `https://fonts.googleapis.com/css2?${params}`;
  const css = await fetch(cssUrl, {
    headers: {
      // Google only returns woff2 when the client looks like a modern browser.
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    },
  }).then((r) => r.text());

  const urls = [...css.matchAll(/url\((https:[^)]+\.woff2)\)/g)].map((m) => m[1]);
  if (!urls.length) throw new Error(`No woff2 URLs found for ${family}`);
  return urls[0];
}

async function loadFontBase64(filename, googleFamily, weights) {
  const fontPath = path.join(fontsDir, filename);
  try {
    return (await readFile(fontPath)).toString('base64');
  } catch {
    const url = await googleFontWoff2(googleFamily, weights);
    const buf = Buffer.from(await fetch(url).then((r) => r.arrayBuffer()));
    await mkdir(fontsDir, { recursive: true });
    await writeFile(fontPath, buf);
    return buf.toString('base64');
  }
}

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="Ryan Cates">
  <rect width="32" height="32" rx="4" fill="#faf9f7"/>
  <text x="16" y="22.5" text-anchor="middle" font-family="ui-sans-serif, system-ui, sans-serif" font-size="15" font-weight="600" fill="#17191b" letter-spacing="-0.04em">RC</text>
</svg>`;

function ogSvg(frauncesB64, hankenB64) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="2400" height="1260" viewBox="0 0 1200 630">
  <defs>
    <style>
      @font-face {
        font-family: 'Fraunces';
        font-weight: 500;
        font-style: normal;
        src: url(data:font/woff2;base64,${frauncesB64}) format('woff2');
      }
      @font-face {
        font-family: 'Hanken Grotesk';
        font-weight: 400;
        font-style: normal;
        src: url(data:font/woff2;base64,${hankenB64}) format('woff2');
      }
    </style>
  </defs>
  <rect width="1200" height="630" fill="#faf9f7"/>
  <line x1="80" y1="96" x2="1120" y2="96" stroke="#e2dfd9" stroke-width="1"/>
  <text x="80" y="248" font-family="Fraunces, Georgia, serif" font-size="72" font-weight="500" fill="#17191b" letter-spacing="-0.02em">${OG_TITLE}</text>
  <text x="80" y="318" font-family="'Hanken Grotesk', ui-sans-serif, sans-serif" font-size="38" font-weight="400" fill="#46494c" letter-spacing="-0.01em">${OG_ROLE}</text>
  <text x="80" y="404" font-family="'Hanken Grotesk', ui-sans-serif, sans-serif" font-size="30" font-weight="400" fill="#46494c" letter-spacing="0">
    <tspan x="80" dy="0">Portfolio of shipped marketing sites,</tspan>
    <tspan x="80" dy="44">designed and built in the browser.</tspan>
  </text>
  <text x="80" y="548" font-family="'Hanken Grotesk', ui-sans-serif, sans-serif" font-size="22" font-weight="400" fill="#74777a" letter-spacing="0.06em">${OG_URL}</text>
</svg>`;
}

const [frauncesB64, hankenB64] = await Promise.all([
  loadFontBase64('fraunces-500.woff2', 'Fraunces', [500]),
  loadFontBase64('hanken-400.woff2', 'Hanken Grotesk', [400]),
]);

await mkdir(ogDir, { recursive: true });
await writeFile(path.join(publicDir, 'favicon.svg'), faviconSvg);

await sharp(Buffer.from(faviconSvg)).resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));

// Render at 2× then downscale for crisp type; PNG keeps text sharp on social platforms.
const ogBuffer = await sharp(Buffer.from(ogSvg(frauncesB64, hankenB64)))
  .resize(1200, 630, { kernel: sharp.kernel.lanczos3 })
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toBuffer();

await writeFile(path.join(ogDir, 'default.png'), ogBuffer);

console.log('Wrote public/favicon.svg, public/apple-touch-icon.png, public/og/default.png');
