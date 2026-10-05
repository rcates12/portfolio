import assets from '../data/assets.json';

type AssetEntry = {
  type: string;
  poster?: string;
  widths?: number[];
};

/** Best share image for a case study hero slot, or the site default. */
export function ogImageForAsset(assetKey: string | undefined): string {
  if (!assetKey) return '/og/default.png';

  const entry = (assets as Record<string, AssetEntry>)[assetKey];
  if (!entry) return '/og/default.png';

  if (entry.type === 'video' && entry.poster) return entry.poster;

  if (entry.type === 'image' && entry.widths?.length) {
    const width = entry.widths.find((w) => w >= 1200) ?? entry.widths.at(-1);
    return `/img/${assetKey}-${width}.webp`;
  }

  return '/og/default.png';
}
