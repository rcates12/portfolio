# Portfolio site brief

Read this first. It is the context a new agent needs before touching the site. The case study copy lives in `content/`, the non-negotiables in `.cursor/rules/portfolio.mdc`, and the image plan in `asset-manifest.md`.

## Who this is for

Ryan Cates, Durham, NC. Lead Marketing Engineer at Pendo since 2018. Before that, Senior Web Designer at Oracle + Bronto (2014 to 2018), plus earlier design and front-end work. A.A.S. in Graphic Design.

The site is a portfolio of case studies aimed at a **Web Designer or Design Engineer role at Profound**, or a similar role.

## The target

Profound's brand is **dark, editorial, and precise**. Their Web Designer posting asks for someone who:

- designs and ships marketing pages, landing pages, and campaign sites, brief to shipped page, with full autonomy
- has command of layout, type, grid, and hierarchy, and how they translate into code
- prototypes interactions and page-level motion, with handoff specs that hold up in code
- designs with real components and constraints, and helps evolve a web design system
- has a portfolio of real, shipped sites with a high craft bar, and sweats the finish
- is fast without sacrificing craft, and experiments with AI and new tools

Their CTO started as a design engineer and says taste, creativity, and thoughtful execution are what set products apart. The site itself is the first work sample a reviewer sees, so it has to meet that bar: considered type, a real grid, motion with a job, fast loads, and no generic AI-site patterns.

## Positioning

**Headline idea: "I design in the medium."**

The story: trained and worked as a designer, then spent eight years mastering the production side. AI collapsed the gap between the two, and now Ryan designs and ships. This is not an apology; it is timely. Most of his design judgment lives in code and prompts rather than Figma files, so the portfolio's job is to make that judgment visible.

## The four case studies, in this order

Each one shows a different way Ryan works. The order is fixed.

| # | Mode | Case study | File |
| --- | --- | --- | --- |
| 1 | Sole designer and builder | Pendo for Agents (lead piece) | `content/01-pendo-for-agents.md` |
| 2 | Design partner | pendo.io homepage | `content/02-pendo-homepage.md` |
| 3 | Precision implementer, then design partner | Novus | `content/03-novus.md` |
| 4 | Self-initiator | Same craft, new floor | `content/04-same-craft-new-floor.md` |

Homepage card copy (mode label, title, one line, image idea) is in `content/00-homepage-cards.md`.

A fifth piece, **Lintel** (Figma to motion spec to code), is planned but not written yet. Leave room for it; do not invent it.

## Case study page anatomy

Every case study file follows the same layout, and the page template should too:

1. **Top:** title, one-line subtitle (the bold line), short lead paragraph, hero visual, snapshot table (role, others, timeline, tools, live link or status)
2. **Key decisions:** five short headline sections (Novus has three per chapter, under two chapter headings), each with a visual slot and two to four sentences
3. **First output vs. what shipped:** a short intro, a three-to-four-row comparison table, and a closing line. This is the signature device of the whole portfolio: what the AI agent produced first next to what shipped, and why it changed. Give it a distinctive, consistent treatment across all four studies.
4. **Bottom:** Outcome, Process, Reflection (short)

Lines in italics starting with `Visual:` or `Hero visual:` are image slots, not body copy. They describe the image; `asset-manifest.md` says where each image comes from and what still needs capturing.

## Voice

First person, plain, confident, specific. Short paragraphs. No buzzwords, no inflated claims. The copy has already been through a voice pass based on Ryan's own writing; keep it as written. If new UI text is needed (nav labels, buttons, captions, alt text, an About page), match that voice and keep it short.

## What the site needs to prove

- Ryan can design, not only build: type, grid, and hierarchy decisions should be visible and deliberate.
- Motion is purposeful and restrained (a lesson from these very case studies: motion that has no job gets cut).
- The build is fast and accessible: good Core Web Vitals, real alt text, reduced-motion support, keyboard navigation.
- He is open and specific about AI use: direction, type, layout, and polish are his; agents build and explore.

## Open questions for Ryan (do not decide these silently)

- Visual direction for the portfolio itself: how close to Profound's dark editorial look versus Ryan's own identity
- Stack (suggested default: Next.js App Router, MDX for case studies, Tailwind or CSS modules, GSAP for motion, deployed on Vercel)
- Domain, About page, resume link, contact method
- Whether Lintel ships with v1 of the site
