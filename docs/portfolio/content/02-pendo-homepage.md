# pendo.io homepage

<!-- Source: the "Site cut" tab of this case study's Claude Doc, exported 2026-10-02. Copy is final unless Ryan changes it. Lines starting with *Visual:* or *Hero visual:* are image slots; see ../asset-manifest.md. -->

**Designing a homepage from someone else's story**

Pendo's new homepage launched in August 2026. Content and PMM wrote the story and set the sections, and I designed and built everything on the page, including the Headless Pendo demo and a review toolbar that let stakeholders pick between versions on the live page. Within a day of launch, sales was asking for clips of the Headless Pendo demo to use with customers.

*Hero visual: the shipped hero and logo bar, cropped from the September 30 full-page capture in homepage/.*

|  |  |
| --- | --- |
| Role | Designer and builder, as design partner to Content and PMM (Lead Marketing Engineer, Pendo) |
| Others | Page structure, story, and copy: Content and PMM. Headless Pendo scripts: PMM. Feedback: brand designers and several exec stakeholders |
| Timeline | Rebuild from July 8, 2026. Launched August 4, 2026, in six languages |
| Tools | Cursor coding agents, Next.js, GSAP, WebGL, Marketo |
| Live | [pendo.io](https://www.pendo.io/) |

## Key decisions

### Move the decision into the page

*Visual: a short clip of the review toolbar switching versions, sections, and heroes. The toolbar was hidden on July 30, so this needs an earlier preview build.*

One day into the build, leadership asked for a way to flip through the copy variants themselves. I built a review toolbar into the working page, modeled on the Vercel toolbar, with switches for each version, each section, and the hero. Every choice was written to the URL, so a link opened that exact page for anyone. My manager's review said it "helped the team align earlier, and reduced the rework that often results when content decisions are made outside their design context."

### Let the copy set the layout

*Visual: the use-case section in all four shapes, from preview builds kxvbvc12d (grid), 6qfu78147 (rows), h5dpw8a34 (bento), and the live page (lifecycle rows).*

The use-case section changed shape four times because the copy did. Short taglines got a card grid, and long copy got full-width rows. Our director of brand design asked for a bento grid. The day before launch the story settled on a four-stage lifecycle, so it went back to four rows. Every product shot frame got a fixed aspect ratio, so each crop lands on the same part of the UI at every width.

### Give the motion a job

*Visual: the scroll-linked waves from a July preview build next to the shipped static hero.*

A designer gave me a wide waves graphic with no direction, so I built a lateral loop, a parallax, and a scroll-linked version and compared them on the page. Scroll won, and then came out on launch day because leadership felt the hero had too much motion. The word-by-word headline entrance stayed, since it pulls the eye to the headline when you land.

### Borrow the interaction, then make it ours

*Visual: the quote tabs mid-switch, and one logo tooltip open.*

For customer quotes I borrowed Stripe's logo tabs, then tuned them until they felt like ours. I sized the logos by hand so they looked equal, evened out the type-in speeds so a two-line quote and a five-line quote felt the same, and fixed the section's height so it didn't jump between quotes.

### End every use case in a demo form

*Visual: a use-case modal opening from its card, with the form placeholder and then the loaded form.*

Each use case opens a large product modal with an embedded demo form next to the opening pitch. Forms are where pages usually look broken, so the form holds its exact final height while Marketo loads, tells sales which use case the visitor came from, and confirms in place.

## First output vs. what shipped: Headless Pendo

*Visual: the live section cycling through tools and use cases, including the Fin flow, next to the first gradient version from preview h5dpw8a34. The branded-bubble round and the original video still need captures.*

Headless Pendo means using Pendo's data from inside AI tools like Claude, ChatGPT, or Cursor. We started with a screen recording of one tool, and I proposed recreating each tool's interface in code with short animated conversations.

| What we had | What shipped | Why it changed |
| --- | --- | --- |
| The agent's first build: one chat window re-skinned per tool, with branded bubbles | AI replies as free-flowing text, the way each tool shows them | The bubbles didn't resemble how these tools actually look |
| Claude's "allow Pendo" panel copied into every tool | Each tool's real MCP connection step, matched from screenshots | It was wrong for ChatGPT and Cursor |
| Fin as a support chat | Fin stepping in on a travel booking site as a visitor clicks around | Fin's value is acting proactively |
| Each conversation ending on an answer | A follow-up action, like Cursor turning off a broken guide through the Pendo API | An action shows Pendo actually doing something |

## Outcome

The homepage launched on August 4, 2026, in six languages. Within a day, sales was asking for demo videos in the Headless Pendo style. Since launch, about 59% of the interactions tracked in the page's sections happened in Headless Pendo, more than the other sections combined. Traffic dipped after launch, but demo form submissions held steady on about 5% fewer visitors. A month later the same system carried the Pendo for Agents pages.

## Process

The page started as a sandbox route separate from the live homepage. I wrote more than 900 prompts across about 60 Cursor chats, and bigger changes started as a written plan I reviewed first. Trying an idea only took minutes, so I tried a lot of them and threw most away, including a shimmering text mask, decrypting stats, and a rotating wheel for the use-case tabs. The last two weeks went to production work: gradients moved into code, a code review, six languages, and memory fixes after launch.

## Reflection

I'd agree on the limits earlier. Next time I'd put the motion in front of decision makers early, at full strength, and set a memory and load budget on day one. The idea I most want to push further is one that didn't ship: a concept-car homepage that changes for returning visitors, customers, and Free users.

*Visual: the four concept-car states side by side, with the Meet Leo panel called out.*
