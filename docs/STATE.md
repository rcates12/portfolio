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

Build: 10 routes, 0 kB JS on every case study page, 15 kB HTML on the heaviest.

### Under review: two grid directions

- `/work/<slug>` — variant A, the asymmetric rail (chosen direction)
- `/alt/<slug>` — variant B, the centered 65ch measure (fallback)
- `/compare` — both side by side at a chosen viewport width, synced scrolling

`/alt/` and `/compare` are scratch routes. Delete both, and the `layout` prop on
`CaseStudyLayout`, once one direction wins.

## Not built

- Case studies 02, 03, 04 — frontmatter only, `draft: true`, body is a stub
- Every image and clip. All slots render as labeled placeholders
- About page, contact, domain, metadata, sitemap
- Any motion. GSAP is not installed yet

## Next

1. Review Pendo for Agents at 1440px and 375px, adjust the template
2. Capture and place the Pendo for Agents assets per `docs/portfolio/asset-manifest.md`
3. Case study 02 in its own chat, then 03 (needs the chapter grouping), then 04

## Assets

No captures are in the repo yet, by design. Bring them in per case study, cropped and compressed, per `docs/portfolio/asset-manifest.md`. Never commit a source PNG — they run up to 36 MB. Slot keys in the MDX (`pfa-hero`, `pfa-subnav`, …) are what the placeholders display.

Outstanding before anything ships publicly: blurs on the Proof drawer customer and the Predict panel quote, credit captions on agency and Claude Design visuals, stock photo license for "Same craft, new floor," no Vercel or localhost chrome in any image, real alt text on every image, and self-hosted fonts.
