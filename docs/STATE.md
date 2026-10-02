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
- All four case studies, copy verbatim
- Composite pipeline: `node scripts/compose.mjs --out=<slot> --cols=N "<file>|x,y,w,h" …`
  combines crops into one image, top-aligned per row, no burned-in labels
- 22 asset slots filled: 6 single stills, 8 composites, 8 clips

Build: 5 routes, 0 kB JS, 15 kB HTML on the heaviest page.

Grid is settled: centered 65ch measure with symmetric breakouts, captions under
figures. The rail variant and the `/compare` route have been removed.

## Not built

All four case studies are built, copy verbatim.
- 13 of 35 asset slots. The rest render as labeled placeholders
- About page, contact, domain, metadata, sitemap
- Any motion. GSAP is not installed yet
- Self-hosted fonts

## Next

1. The 13 remaining slots. The easy composites are done; what's left needs
   section-level crop coordinates found by slicing the tall captures
   (`pfa-panels`, `pfa-first-output`, `pfa-subnav`, `pfa-gradient`,
   `novus-receipt`, `novus-concept-vs-shipped`, `homepage-four-shapes`), plus
   the mobile captures and the Pendo for Agents drawer clip, which have no
   source in the library
2. Self-host fonts, add metadata and Open Graph, run an accessibility and Lighthouse pass

### Section offsets found so far

Crop coordinates into the tall captures, so these do not have to be hunted again.

| Capture | Section | y |
| --- | --- | --- |
| `pendo-io-product-agent-analytics` (live, 28800 tall) | hero | 0 |
| | observability gap, line-art version | 1800–3800 |
| | capability panels | 7100–9000 |
| | the two Grainient cards | 21250–22850 |
| `..._old-version.png` (27974 tall) | hero | 0 |
| | the pink bento of UI cards | 6900–8800 |

The four `Screenshot 9.44–9.45` files in `PFA docs/` are the shipped drawer:
Pendo in action, Proof, Schedule a demo, and the logo wall. **The Proof one
names a customer and a person and must be blurred before it ships.**

### Known gaps in the sources

- **Pendo for Agents** has the fewest filled slots. Its "before" states live in
  preview builds (2aq8itt5v, dw3uc9pft, 5sfyvns4j) and an old-version capture;
  those are composites, not crops. The drawer clip needs a new recording.
- **Mobile captures** for every study need capturing; none exist. This is all
  that is left of the Same craft menu slot, which now runs as a clip.
- The 10.54.16 recording at the root of `screenshots/` is **Pendomonium 2026**,
  a project with no case study. Nothing in the four studies uses it.
- **Figma frames** for Novus chapter 1 are not in the library.
- The **Same craft prototype** is filled. Ryan supplied eight full-size
  captures of Claude's original output in `Downloads/scnf2/`, so rendering
  `the-new-way.html` from `claude-files.zip` is no longer needed. A 34s
  recording of the prototype scrolling is in the same folder and is unused.

## Where assets come from

Shipped assets are cut from `Downloads/work evidence for portfolio/`, plus
`Downloads/scnf2/`, which holds the Same craft prototype captures. Both roots
are listed in `scripts/assets.mjs`. `src/data/assets.json` records the exact
source file for each slot, and `npm run assets:status` prints anything sourced
from outside those folders.

One exception, deliberate: the left half of `pfa-old-vs-new` is the old dark
Agent Analytics page, which the evidence folder does not contain. Its preview
builds (2aq8itt5v, dw3uc9pft, 5sfyvns4j) are all the new template. The old page
comes from a separate local render in `Downloads/`. The filename says localhost
but the capture is a full-page export with no browser chrome, so it is clean.

Entries marked `sourceTraced` were matched after the fact with
`scripts/trace.mjs`, which fingerprints frames to find which capture an asset
came from. All matched decisively except `novus-hero`, where two takes of the
same opening scored close together; it is attributed to the 10.06.59 recording.

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
