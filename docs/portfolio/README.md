# Cursor handoff pack: portfolio site

Everything Cursor needs from the Claude project, as plain files. Built 2026-10-02.

## What's here

| File | What it's for |
| --- | --- |
| `BRIEF.md` | The goal, the Profound target, positioning, the four modes, page anatomy, voice, open questions. Read first |
| `cursor-rules/portfolio.mdc` | Non-negotiables (credit lines, anonymizing, customers, metrics, images). Becomes an always-on Cursor rule |
| `content/00-homepage-cards.md` | Homepage card copy, in order |
| `content/01` to `04` | The four case studies, final copy from each doc's Site cut tab |
| `asset-manifest.md` | Every image slot: source file, and whether it's ready, needs a composite, needs capturing, or needs blurring |
| `START-PROMPT.md` | The first message to paste into Cursor |

## Setup (5 minutes)

1. Create the repo (or open it) in Cursor.
2. Copy this folder into it as `docs/portfolio/`.
3. Move `cursor-rules/portfolio.mdc` to `.cursor/rules/portfolio.mdc`. Its `alwaysApply: true` means every chat and agent sees the rules without you attaching anything.
4. Don't copy the big screenshots and videos in yet. Bring them in per case study when you build that page, cropped and compressed, using `asset-manifest.md`.

## How to work with it

Run it the way you already run Pendo and Novus work. That loop is the thing that worked; the only difference is the first plan has more to absorb.

1. **Plan first.** Open a new chat in Plan mode, paste `START-PROMPT.md`, and let it read `BRIEF.md` and the content before proposing anything. Push back on the plan until it's right. It should end up as `docs/SPEC.md` (site structure, content model, components, tokens), plus empty `DECISIONS.md` and `STATE.md`, and your `WORKFLOW.md` loop.
2. **Design direction is yours, before pages.** Settle type, color, grid, and spacing tokens first, in a sandbox route or a single test page. The agent will default to generic dark-SaaS patterns; you already know the tells (spaced all-caps pink eyebrows, numbered labels, boxed cards). Write the ones you catch into the rule file as you go, so it stops repeating them.
3. **Frame first, then one section at a time.** Build the case study template with placeholder blocks for every section in `BRIEF.md` (the Novus approach), then fill one section per session and review at desktop and 375px before moving on.
4. **One case study per chat**, starting with Pendo for Agents. @-mention the files the chat needs (`@docs/portfolio/content/01-pendo-for-agents.md`, `@docs/portfolio/asset-manifest.md`) instead of pasting text. New chat when a thread gets long; `STATE.md` carries what's done.
5. **Copy goes in verbatim.** Ask for MDX (one file per case study) with the `Visual:` lines turned into a figure component that shows a labeled placeholder until the real image exists. That way the site is reviewable before every capture is done.
6. **Give "first output vs. what shipped" its own component.** It's the signature device, so it should look the same in all four studies.

## Before it goes public

- Every `Visual:` slot has a real, cropped, compressed image or clip with alt text
- Blurs done (Proof drawer customer, Predict panel quote), no Vercel or localhost URLs in any image
- Credit captions on agency Figma frames and the Novus Claude Design concept
- Stock photo license confirmed for Same craft, new floor
- Lighthouse and reduced-motion check on every page

## Keeping it in sync

The Claude Docs stay the source for copy. If you change copy in the docs, re-export the Site cut tab (Markdown) over the matching file in `content/`. If you change it in the repo, the repo becomes the source; just pick one.

The full "Version 2 (voice pass)" tabs have longer copy and more quotes. They're not in this pack because the site copy comes from the Site cuts, but you can export any tab as Markdown from the doc and drop it in `docs/portfolio/reference/` if you want Cursor to have the extra depth (useful for alt text, captions, or a longer About page).
