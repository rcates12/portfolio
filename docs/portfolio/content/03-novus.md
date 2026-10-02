# Novus

<!-- Source: the "Site cut" tab of this case study's Claude Doc, exported 2026-10-02. Copy is final unless Ryan changes it. Lines starting with *Visual:* or *Hero visual:* are image slots; see ../asset-manifest.md. -->

**One site, built two ways**

I've built novus.ai twice, in two different roles. For the March 2026 launch, an agency designed the site and I built it pixel-perfect through a structured AI workflow, in days. For the current site, Novus's head of product brought me a concept made in Claude Design, and I polished it with them, brought my own design direction, and built the page that's live now.

*Hero visual: a clip of the cursor moving through the dither squares in the live novus.ai hero, from the screen recordings in novus agent docs/.*

|  |  |
| --- | --- |
| Role | Chapter 1: precision implementer of an agency design. Chapter 2: design partner to Novus's head of product, and builder (Lead Marketing Engineer, Pendo) |
| Others | Chapter 1: the site design and the Novus brand (an agency). Chapter 2: the starting concept and most of the copy (Novus's head of product, using Claude Design) |
| Timeline | Launch site March 18 to 24, 2026. Open beta update May 8 to 19. Redesign from August 12, live in mid-August |
| Tools | Cursor coding agents, Next.js, Tailwind, GSAP ScrollTrigger, WebGL, Vercel |
| Live | [novus.ai](https://novus.ai/) |

## Chapter 1: the launch

In this chapter the design wasn't mine to change. The decisions are about getting it into code faithfully, quickly, and at every screen size.

### Build the frame before any block

*Visual: the placeholder frame next to the finished page at the same scroll position, if a March preview still runs. Otherwise, stills of the launch site from the recording.*

Thirteen sections at once would have come back roughly right and taken time I didn't have to untangle. So the first pass was only a frame of thirteen labeled placeholder boxes. After that the agent built one block at a time, and every session ended with a check at 1440px and 375px and a hard stop until I approved it.

### Turn a fixed-width comp into a fluid grid

*Visual: the Figma frame and the build overlaid at 1440px, then the build at a wider and a narrower width. Credit the Figma frame to the agency.*

The agency drew everything on a 144px grid at 1440px wide. I set 144px equal to 10% of the viewport, so the whole page scales like a drawing. The dissolving rows of squares between sections are built from blocks sized in viewport units, so they stay square at every width instead of stretching like the SVG export would have.

### Chase the last pixel

*Visual: a close crop of a grid junction and the signup form, Figma next to build.*

Pixel-perfect mostly comes down to catching small things the agent called finished. A 65px gap came back at 44px, the squares at each grid intersection came back as quarter circles, and bordered cells doubled into 2px lines. I measured each one and sent it back. Then the open beta update in May was the same work again, on a live site this time.

## Chapter 2: the redesign

In August the head of product sent me a page they'd made in Claude Design. The story ran in a clear order and the product moments were specific, but up close the grid and a dozen other elements were misaligned. The story needed polish and a page built to the brand's standard.

### Keep the concept's story, rebuild it in the brand

*Visual: the concept's hero next to the shipped hero.*

I reviewed the concept before building anything, and my notes became the brief: brand buttons, brand fonts with mono only where it fits, no full-page background animation, and Signal boxes that needed a redesign. I didn't reuse any of the concept's code. Every interaction was rebuilt with GSAP and our own components.

### Cut the clever device

*Visual: the receipt card, full width.*

The concept shipped deliberately broken UI, each piece with a white box you could click to watch it get fixed. My review note was a question: "These white boxes you click to see a before and after: what are they?" If I had to ask, visitors would too. I kept the idea underneath it and made it a receipt with the issue, the evidence, and the drafted fix as a code diff, which reads as an exhibit you look at.

### Make the install the hero, and give the background a meaning

*Visual: a clip of the rotating headline and the cursor clearing the dither squares.*

After a review with the head of product, I cut the concept's terminal and steps and moved the one-line install command above a centered headline. The background was my idea: React Bits Dither masked into a few squares of the brand grid. Moving the mouse clears the dither, "the signal pushing out the noise."

## The concept vs. what shipped

*Visual: section-by-section crops of the concept and the live page, paired. The concept is cleared to show, credited to Novus's head of product.*

Most of the concept's words made it to the live page. What changed is everything around them.

| Section | The concept | What shipped |
| --- | --- | --- |
| Hero | A left-aligned headline, a terminal replaying the install, and a mouse-tracking dot field | The install command above a centered Klarheit headline, with dither squares the cursor clears |
| Agents | One conversation box beside four identical dark boxes | The conversation in its own window, findings as floating chips tied to the messages they describe, and the fix popping in last |
| Signals | A wavy funnel with day tabs bound to scroll | Day cards that stack as you scroll, with dithered funnel columns and day 90 called out as the goal passed |
| Proof | Planted bugs with click-to-fix boxes | One Signal as a receipt |

Signals took the most rounds. It went from the funnel with tabs to four cards side by side, then to a scroll-driven stepper, because the point of the section is how Novus improves the funnel over time. My last note on it: "It needs to feel like I can scroll through this section, stop on each panel, and read it."

*Visual: short clips of the Slack conversation playing in, the agent callouts appearing, and the day cards stacking.*

## Outcome

The launch site was live for the Pendomonium reveal in March 2026, matching the agency's design, and the open beta update followed in May. The redesign replaced the homepage in mid-August and is live at novus.ai today. It was my first Novus work as a partner instead of an implementer, and it led to a bigger role. I'm now leading Novus web.

## Process

Both chapters ran on the same loop, which I brought over from earlier work on pendo.io: a spec as the single source of truth, a decisions log with a dated reason for every notable choice, and a state file tracking what's built. I wrote about 930 prompts across 46 chats. In chapter 1 they were mostly measurements against the agency's files, and in chapter 2 they were design direction.

## Reflection

I'd stick to my own rules more under pressure. In the launch rush, raw color values went into five blocks and broke the token rule I'd set for the agent. I'd also start measuring from day one, since I can't yet show what either page did for signups. Most of all, I'd want to be in the room before the concept exists, and that's what my new role is set up to do.

*Visual: mobile captures of the live page. Keep Vercel preview URLs out of every capture.*
