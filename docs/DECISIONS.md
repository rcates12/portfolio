# Decisions

Dated log, newest on top. One entry per notable choice, with the reason.

## 2026-10-02

**Grid: variant B wins. Centered measure, symmetric breakouts, captions under figures.** Reverses the earlier call for the asymmetric rail, after comparing both layouts side by side on the Pendo for Agents page. The rail was chosen to give credits and comparison captions a home, but seeing it built, it spent most of its width empty and pulled the reading column off centre for no return. Captions under their figure read fine and keep the credit next to the thing it credits. Measure is now 65ch with a breakout that collapses to zero on narrow screens. The rail primitive, the `layout` prop, `/alt/` and `/compare` are all deleted.

**Stack: Astro with MDX, over Next.js.** The pages are long-form reading with a handful of motion moments, so a framework that ships zero JS by default and uses islands for the motion fits better than one that hydrates everything. It also directly serves the budget below. GSAP will load per-island, not globally. The first build ships 0 bytes of JS across all five routes.

**Superseded: grid was first built as an asymmetric rail.** The rail was meant to house the credit lines required by `.cursor/rules/portfolio.mdc` and the which-side-is-which comparison captions. Replaced by variant B above on the same day, after seeing both built.

**Color: light editorial, achromatic.** Paper `#faf9f7` rather than pure white, because Fraunces is a warm face. `#46494c` is the second ink, used for lead paragraphs, metadata, and interactive states; there is no chromatic accent. Reason: the four case study heroes are loud and all different temperatures (Pendo's pink gradient, Novus's dither, the charcoal-and-coral serif). A site accent would compete with all of them. Consequence to watch: nothing on the page signals interactivity through color alone, so type, rules, and motion have to carry it.

**Figures sit on a sunk plate.** Most captures are dark product UI. On paper-white they read as holes, so every figure gets a `--paper-sunk` plate and a hairline rather than sitting raw on the background.

**Type: Fraunces display, Hanken Grotesk body.** Fraunces's `WONK` and low `opsz` are bound to display sizes only; at heading sizes wonk is off, so the serif stays editorial rather than decorative. Italic is reserved as a one-word device, echoing the "Same craft, new floor" hero. Fluid `clamp()` sizing between 375px and 1440px, so there is no per-breakpoint type tuning later.

**Tokens as plain CSS custom properties.** Written before the stack was chosen so they would port anywhere. Now the single source at `src/styles/tokens.css`; `design/specimen.html` links to it so the specimen and the site can never drift.

**Fonts load from Google Fonts for now.** Fastest path to seeing real type. Self-hosting is a tracked follow-up, since the render-blocking stylesheet and third-party connection work against the LCP budget.
