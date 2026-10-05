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
- 28 asset slots filled: 8 single stills, 12 composites, 8 clips

Build: 5 routes, 0 kB JS, 15 kB HTML on the heaviest page.

Grid is settled: centered 65ch measure with symmetric breakouts, captions under
figures. The rail variant and the `/compare` route have been removed.

## Not built

All four case studies are built, copy verbatim.
- Nothing on the asset side. All 36 slots are filled
- About page, contact, domain, metadata, sitemap
- Any motion. GSAP is not installed yet
- Self-hosted fonts

## Next

1. All 36 slots are filled. The drawer clip the manifest asked for became its
   own slot, `pfa-drawer-open`, next to the drawer paragraph rather than in
   Process, since that paragraph is about the drawer and Process is about the
   working method. `pfa-process` keeps the three mobile stills.
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

More offsets, found with `scripts/sheet.mjs --slice=<file>`:

| Capture | Section | y, height |
| --- | --- | --- |
| homepage `kxvbvc12d` | use cases, card grid | 1680, 4300 |
| homepage `6qfu78147` | use cases, full-width rows | 4100, 4300 |
| homepage `h5dpw8a34` **22_41_00** | use cases, bento | 4620, 4300 |
| homepage `pendo-io` (live) | use cases, lifecycle rows | 6640, 4300 |
| `novus-ai` (live) | the receipt card | 16850, 1450 |
| | "Novus listens" | 3920, 1580 |
| | "Signals show you" | 6620, 1850 |
| | closing marquee | 18260, 1350 |
| `claude-ai-design` (concept) | "Novus listens" | 5420, 1580 |
| | "Signals show you" | 7020, 1850 |
| | closing marquee | 9080, 1350 |
| PFA preview `5sfyvns4j` | observability gap, dark chat window | 1440, 1000 |
| `pendo-io-product-agent-analytics` (live) | the same section in line art | 1620, 1000 |
| Novus launch `3mnjnqtut` 21_48_39 | hero | 0 |
| | keyboard photo and opening claim | 3700 |
| | "Your analytics tool was never designed for this." | 5700 |
| | "How Novus works with you" | 9850 |
| | "Stop babysitting your analytics, trust them." | 12480 |
| | FAQ panel | 16800 |

Two traps found the hard way. There are two `h5dpw8a34` captures; the
**22_41_34** one caught the bento mid-animation, faded and still loading, so
use **22_41_00**. And on the Novus live page the receipt card and the closing
marquee are closer together than they look, so a careless crop of one clips
the other.

Off limits: the Slack sections on both Novus pages name people and customer
workspaces, so no crop may include them. On the Novus launch capture, stay
above y18400: the footer credits the agency by name and carries a Product Hunt
badge.

Only the `5sfyvns4j` preview build has the observability gap section. The other
two PFA previews (`2aq8itt5v`, `dw3uc9pft`) go straight from the hero to the
pink "See the full agent experience" section, so there is no second "before".

`homepage-modal` is filled. The modal is open at the top of the **22_41_34**
`h5dpw8a34` capture, which is why that capture's bento looked faded and
half-loaded: the page behind the modal is dimmed. It runs as a still rather
than a clip, so the caption no longer claims the loading behaviour.

`pfa-drawer` replaced `pfa-drawer-borderless`. No "before the borderless pass"
capture exists, so instead of a before/after the figure is a 2×2 of the four
shipped drawer views. The company and the person named in the Proof view are
blurred in six places.

The two homepage recordings have now been watched frame by frame, and neither
holds the quote-tab or modal interactions:

- **10.45.05** (64s) is a single scroll-through of a sandbox homepage concept
  while someone flips switches in the "Homepage variants" review panel, which
  sits over the right third of the frame the whole time. The quote-tab section
  is on screen from about 53s to 55s but only scrolls past: no tab switches and
  no logo tooltip. No modal is opened at any point.
- **10.47.43** (26s) is entirely the Headless Pendo section, already used for
  `homepage-headless`.

Both were settled with fresh captures of the live page, which is what
`asset-manifest.md` said in the first place. `homepage-modal` came from the
full-page 22_41_34 capture and `homepage-quote-tabs` from the 11s recording
Ryan made on 2026-10-05, which has no tooltip in it, so that figure's caption
is now about the type-in pacing and the fixed section height instead.

The 2026-10-05 desktop drawer recording (13s) has two stretches that cannot
ship: Proof runs roughly 6.2–9.2s and names a customer and a person on screen,
and the browser chrome slides back in at about 11.4s. `pfa-drawer-open` is two
segments concatenated, 1.2–6.0s and 9.3–11.2s, which skips both. The mobile
recording beside it (16s) is unused; it reaches Proof within three seconds, so
any cut from it needs the same care.

### Known gaps in the sources

- **Pendo for Agents** has the fewest filled slots. Its "before" states live in
  preview builds (2aq8itt5v, dw3uc9pft, 5sfyvns4j) and an old-version capture;
  those are composites, not crops. The drawer clip needs a new recording.
- **Mobile captures** for every study need capturing; none exist. This is all
  that is left of the Same craft menu slot, which now runs as a clip.
- The 10.54.16 recording at the root of `screenshots/` is **Pendomonium 2026**,
  a project with no case study. Nothing in the four studies uses it.
- **Novus chapter 1 Figma** has two folders and only one of them is usable.
  `novus figma screens/` is seven screenshots of the Figma canvas at 12–28%
  zoom, so no single frame in them crops above about 900px. Use
  `novus sf handoff/` instead: those are real Figma exports, up to
  10116×7062. Ignore `novus figma screens/Grid.png` either way, since the
  grids are toggled off in it and the frame is empty.
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
