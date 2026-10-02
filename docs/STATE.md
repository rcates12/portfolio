# State

What's built, what's next. Update at the end of each session.

Updated 2026-10-02.

## Built

- Repo set up: handoff pack at `docs/portfolio/`, always-on rule at `.cursor/rules/portfolio.mdc`
- Design tokens — `src/styles/tokens.css` (color, type scale, space, asymmetric grid primitive, motion)
- Token specimen — `design/specimen.html`, opens in a browser with no build step
- Astro + MDX app. `npm run dev`, `npm run build`
- Content collection `work` with the variable-snapshot schema from SPEC section 2
- Components: `Figure`, `Clip`, `Comparison`, `FirstOutput`, `SnapshotTable`, `HomepageCard`
- Layouts: `BaseLayout`, `CaseStudyLayout`
- Homepage with four cards, verbatim card copy
- **Pendo for Agents built end to end**, copy verbatim, every image slot a labeled placeholder
- **Novus built end to end**, including the `Chapter` divider for its two-chapter structure
- Asset pipeline: `npm run assets:status`, `node scripts/assets.mjs <slot> <file>`
- Clip pipeline: trims a recording to a short muted loop in MP4 and WebM with a poster, autoplays in view, pauses out of view, respects `prefers-reduced-motion`, and always offers a play/pause control
- Three Novus clips cut from the 10.03.34 recording: hero, install, Signals

Build: 5 routes, 0 kB JS, 15 kB HTML on the heaviest page.

Grid is settled: centered 65ch measure with symmetric breakouts, captions under
figures. The rail variant and the `/compare` route have been removed.

## Not built

- Case studies 02 (pendo.io homepage) and 04 (Same craft) — frontmatter only, `draft: true`
- Images. 3 of 21 slots filled (all clips); the rest render as labeled placeholders
- About page, contact, domain, metadata, sitemap
- Any motion. GSAP is not installed yet
- Self-hosted fonts

## Next

1. Case study 02, then 04
2. Fill asset slots, starting with the Pendo for Agents "Have" crops in the manifest
3. Self-host fonts, add metadata and Open Graph, run an accessibility and Lighthouse pass

## Recordings

The source recordings are at `Downloads/work evidence for portfolio/screenshots/`.
All eight are short (10–65s) and clean full-bleed captures with no browser chrome.
Contact sheets for picking in and out points are in `assets/incoming/contact/`
(gitignored).

Two findings that make `docs/portfolio/asset-manifest.md` out of date:

- The two homepage recordings it lists as "not reviewed yet" cover the use-case
  modal opening, the Headless Pendo section, the quote tabs and the logo bar —
  several slots it marks "Capture" are already in hand.
- The 388 MB Same craft recording covers the whole page: the setup flip, the
  1:1 panels, the 35 trillion counter, the photo opening to full bleed, and the
  close. The Predict panel appears here and still needs its customer quote
  blurred before any clip from it ships.

## Assets

No captures are in the repo yet, by design. Bring them in per case study, cropped and compressed, per `docs/portfolio/asset-manifest.md`. Never commit a source PNG — they run up to 36 MB. Slot keys in the MDX (`pfa-hero`, `pfa-subnav`, …) are what the placeholders display.

Outstanding before anything ships publicly: blurs on the Proof drawer customer and the Predict panel quote, credit captions on agency and Claude Design visuals, stock photo license for "Same craft, new floor," no Vercel or localhost chrome in any image, real alt text on every image, and self-hosted fonts.
