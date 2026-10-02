# Pendo for Agents

<!-- Source: the "Site cut" tab of this case study's Claude Doc, exported 2026-10-02. Copy is final unless Ryan changes it. Lines starting with *Visual:* or *Hero visual:* are image slots; see ../asset-manifest.md. -->

**A product family designed in the browser**

I was the only designer on Pendo for Agents, a hub page plus product pages for Agent Toolkit and Agent Analytics, launched in September 2026. Content and PMM gave me the story and the section order. Everything you see on the pages was mine to figure out, and I designed it in code, directing AI coding agents one prompt at a time.

*Hero visual: the live Agent Analytics hero with the folder-tab subnav, cropped from the September 30 full-page capture in PFA docs/.*

|  |  |
| --- | --- |
| Role | Sole designer and builder (Lead Marketing Engineer, Pendo) |
| Others | Narrative, copy, and page structure: Content and PMM. No designer was involved |
| Timeline | Aug 18 to Sep 17, 2026 (all three pages launched together) |
| Tools | Cursor coding agents, Next.js, GSAP, WebGL |
| Live | [Pendo for Agents](https://www.pendo.io/pendo-for-agents/) · [Agent Toolkit](https://www.pendo.io/product/agent-toolkit/) · [Agent Analytics](https://www.pendo.io/product/agent-analytics/) |

## The page I was replacing was mine

*Visual: the old dark Agent Analytics page next to the shipped cream page, at the same scroll positions: hero, capabilities, and the bottom of the page. The old capture is screencapture-localhost-3000-product-agent-analytics-2026-10-02-11\_03\_44\_old-version.png in the library.*

I designed and built the old Agent Analytics page a few months earlier, before the homepage redesign. It was a dark page with pink highlighted words, a numbered list, and a bento of UI cards baked into pink grain. The new page started from that content and changed almost everything around it. A few things I cut, like numbered rows and two-tone headings, came from my own earlier design. The bar moved, including for my own work.

## Key decisions

### Extend the homepage system instead of approximating it

*Visual: the homepage hero and the Agent Analytics hero side by side, with the shared tokens called out.*

The agent's first passes picked up the homepage's mood but none of its actual styles, so I pointed it at the live pages. The product pages now use the homepage's real values, and they added new pieces to the family: the layered motif windows, the folder-tab subnav, and the drawer's reading layout.

### Make the subnav feel like part of the page

*Visual: a close crop of the folder tab, plus a short clip of the scroll handoff to the sticky pill.*

A floating pill bar technically worked, but it felt stuck on top of the hero. I asked for "something like a physical manila folder tab," and the inverted curve where the tab meets the frame took eleven rounds in under an hour. When you scroll, the tab hands off to a compact pill that stays within reach all the way down.

### Show the product working, layered over color

*Visual: the old bento next to the shipped capability panels. Both captures are in the library.*

I replaced a bento of UI cards baked into pink grain with alternating panels, each pairing a WebGL color field with a small piece of product UI. The agent built the motifs in code and I art-directed them. When the launch copy came in, seven of the nine panels no longer matched their art, so I had every picture reworked to back up its claim.

### Get rid of the patterns that make AI work look like AI work

*Visual: a drawer view before and after the borderless pass.*

With no designer reviewing the pages, catching the generic stuff was on me. Numbered section labels went first ("That's a telltale sign of AI slop"), then the pink dot bullets, the boxed drawer cards, and a sparkline that was only there to move. The pink, spaced-out, all-caps eyebrow kept coming back, and catching the repeats ended up being a big part of the job.

### One gradient across two cards

*Visual: the two cards with a guide overlay showing the shared field.*

Two portrait cards share one Grainient. Each card renders its own canvas, sized to the full pair and offset, so the color looks like it carries across the gap. A mockup can show the effect, but making it real meant thinking about canvas sizing, clipping, and the page's WebGL budget all at once.

## First output vs. what shipped: the observability gap

*Visual: the two preview builds with the dark chat window in its container, next to the live line-art version. The dashboard rounds still need a capture if a September 15 preview runs.*

This section had to carry one line: "Engineering can see if the agent is running. Product can't see if it's helping." The agent's first pass was a dashboard panel in a gradient container.

| The agent made | What shipped | Why it changed |
| --- | --- | --- |
| Analytics dashboards for a fictional agent | A double-charge billing dispute that escalates to a refund-and-cancel request, annotated with intent, trace health, and churn risk | The dashboards showed the tool. I asked it to "show an agent in practice" |
| A Lightfall WebGL background | Solid cream, then a quiet gradient in three colors I picked | The page already had about a dozen WebGL color fields |
| A dark chat window in a white bordered container | White line art with frosted chips, emphasized after a team feedback session | The chips had to stand out from the line art |

The trace chip reads "Trace healthy · 0.8s · 0 errors" while the user is about to churn. Engineering's view says everything is fine, and the product view shows a customer walking out.

## Outcome

All three pages launched together on September 17, 2026, all built on the template I made for Agent Analytics. After the launch, weekly demo requests went up about 40%. That number belongs to the whole campaign, but these pages are where the campaign sent people, and the drawer put a demo form and a scheduler one click away from every section.

## Process

I worked in short loops with AI coding agents in Cursor and wrote about 180 prompts across the two main threads, most of them one-line design notes. The agent worked from a spec, a decisions log, and a token file. I replaced a frozen copy of the live page one section at a time, and reviewers compared copy and layouts on the real page through a toolbar.

*Visual: mobile captures of all three pages, and a clip of the drawer opening. Blur the customer in any capture of the Proof drawer.*

## Reflection

Performance is the first thing I'd push on. At launch these were the heaviest routes on the site, at 950 to 984 kB of first-load JavaScript against a 215 kB site median. I'd also design the demo form I actually wanted instead of fixing Marketo's markup, and turn the patterns I kept correcting into written rules the agent reads first.
