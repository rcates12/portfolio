Paste this as the first message in a new Cursor chat, in Plan mode.

---

I'm building my portfolio site. Before writing any code, read these and make a plan:

- @docs/portfolio/BRIEF.md (goal, audience, positioning, page anatomy, open questions)
- @docs/portfolio/content/ (final copy: homepage cards and four case studies)
- @docs/portfolio/asset-manifest.md (image slots and their status)
- @.cursor/rules/portfolio.mdc (rules that always apply)

Then write a plan that covers:

1. Site map: routes for the homepage, four case studies, and anything else the brief implies (About, contact). Leave a slot for a fifth case study.
2. Content model: one MDX file per case study, with frontmatter for title, subtitle, mode, order, snapshot fields, and hero. Copy moves in verbatim.
3. Components: case study template (top, key decisions, first output vs. shipped, outcome/process/reflection), snapshot table, figure with placeholder state for slots that don't have an image yet, comparison block, video clip with poster and reduced-motion fallback, homepage card.
4. A design token file (type scale, color, spacing, grid, motion durations and easings) with placeholder values. Don't pick a visual direction yet; list the decisions I need to make and recommend a default for each.
5. Stack and performance budget (suggest defaults: Next.js App Router, MDX, GSAP, Vercel; image pipeline for very large source PNGs).
6. Build order, frame first: template with placeholders, then Pendo for Agents end to end, then the rest.

Save the plan as docs/SPEC.md, and create docs/DECISIONS.md (dated log, newest on top) and docs/STATE.md (what's built, what's next). Ask me about anything the brief lists as open instead of deciding it.
