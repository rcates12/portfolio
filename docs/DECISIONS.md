# Decisions

Dated log, newest on top. One entry per notable choice, with the reason.

## 2026-10-02

**Grid: asymmetric, with a left caption rail.** Chosen over a centered 12-column measure. The rail gives the credit lines required by `.cursor/rules/portfolio.mdc` (agency Figma frames, the Novus Claude Design concept) and the which-side-is-which comparison captions a consistent home, instead of stacking them under figures and interrupting the read. Collapses to a centered 62ch measure below 60rem, which is the fallback direction.

**Color: light editorial, achromatic.** Paper `#faf9f7` rather than pure white, because Fraunces is a warm face. `#46494c` is the second ink, used for lead paragraphs, metadata, and interactive states; there is no chromatic accent. Reason: the four case study heroes are loud and all different temperatures (Pendo's pink gradient, Novus's dither, the charcoal-and-coral serif). A site accent would compete with all of them. Consequence to watch: nothing on the page signals interactivity through color alone, so type, rules, and motion have to carry it.

**Figures sit on a sunk plate.** Most captures are dark product UI. On paper-white they read as holes, so every figure gets a `--paper-sunk` plate and a hairline rather than sitting raw on the background.

**Type: Fraunces display, Hanken Grotesk body.** Fraunces's `WONK` and low `opsz` are bound to display sizes only; at heading sizes wonk is off, so the serif stays editorial rather than decorative. Italic is reserved as a one-word device, echoing the "Same craft, new floor" hero. Fluid `clamp()` sizing between 375px and 1440px, so there is no per-breakpoint type tuning later.

**Tokens as plain CSS custom properties.** The stack is still undecided, so tokens live in `design/tokens.css` and port to Tailwind, CSS modules, or anything else.
