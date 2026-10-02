# Same craft, new floor

<!-- Source: the "Site cut" tab of this case study's Claude Doc, exported 2026-10-02. Copy is final unless Ryan changes it. Lines starting with *Visual:* or *Hero visual:* are image slots; see ../asset-manifest.md. -->

**A campaign nobody asked for**

Nobody briefed this one. I had an idea for how Pendo could talk about its AI products to people who are tired of hearing about AI, and I took it all the way to a scroll-driven landing page, built in one evening. The idea and the concept were mine, Claude wrote the copy, and I built the page with Cursor. It never ran publicly, for reasons outside my control.

*Hero visual: the hero from the September 30 screenshots in same craft new floor/, with the serif headline and its one italic word.*

|  |  |
| --- | --- |
| Role | Self-initiator: concept, campaign, design, and build (Lead Marketing Engineer, Pendo) |
| What Claude did | Wrote the campaign copy and drafted the seven-beat flow from my concept, made a first HTML prototype, and drafted a build plan. Cursor agents wrote the code from my direction |
| Timeline | One evening in June 2026, a Friday from 5pm to midnight |
| Tools | Claude, Cursor coding agents, Next.js, GSAP with ScrollTrigger and SplitText, WebGL |
| Status | Never launched publicly. Shared across Slack and presented at a corporate marketing team meeting, June 2026 |

## Key decisions

### Put the product last

*Visual: the seven beats as a strip of key frames, labeled setup, proof, and payoff.*

The audience had had a full year of AI marketing and tuned out anything that sounded like it. The first three beats earn some trust before any product shows up. Then come four 1:1s, each a scene from a workday told twice, the old way and the new way. The product name only appears in the new-way half, as the answer to the scene, and never in a headline.

### Let the type tell old from new

*Visual: one 1:1 panel at full size, then a crop of the old and new type side by side.*

The page never makes fun of the old way. The old way is set in a dimmed typewriter mono on a darker pane, and the new way is a serif at full strength with a coral dot. I went with a serif because it's a page about craft, so it should look crafted. Claude's prototype put the contrast in a page-wide toggle, and I cut it because a toggle would have interrupted the flow of the scroll.

### Pace the scroll like a story

*Visual: a clip of the tried-to-prove flip, the counter to 35, and the photo opening to full bleed.*

The menu groups the beats into three acts, and each one moves at its own speed. The setup is a short pin where "Last year, you tried AI" turns over into "This year, you have to prove it." The data beat pins while 35 trillion counts up. Then the page calms down, and a photo opens from an inset card to full bleed.

### Turn the proof vertical

*Visual: the vertical proof as a clip, and the horizontal version next to it if a preview still runs.*

The build plan called for the classic set piece of pinning the proof and sliding the four panels sideways. Once that was built I asked to see it vertical, and vertical won. Each 1:1 gets a full screen, and you keep scrolling the same way you have been the whole time. I also stopped the panel backgrounds from animating, so only the words move.

### Make the close the conversion point

*Visual: the close at full size, and a product panel opening from "Explore." Blur the customer name and company in the Predict panel quote.*

The first close was centered and tidy, and I wrote that it was "predictable and boring." I typed out the layout I wanted, with "Same craft." on one line and "New floor." stepped off to the right, then embedded a demo form in the frame and removed the button beside it. Now the page ends on a single action.

## First output vs. what shipped: Claude's prototype

*Visual: the prototype and the built page at the same three moments: hero, one 1:1, and the close. The prototype renders from the-new-way.html in claude-files.zip, so these can be captured at matching sizes.*

Alongside the campaign, Claude built a one-file HTML prototype. As a sketch it was solid, and it also looked like a lot of other AI-made pages. Most of Claude's copy made it into my page, and very little of its look did.

| Part | Claude's prototype | The page I built |
| --- | --- | --- |
| Look | Near-black page, magenta-to-violet glow, a bold grotesque for every headline | Charcoal and one coral accent, grain and dither fields, a serif with one italic word per headline |
| Old vs new | A toggle that re-themes the whole page | Mono for the old way and serif for the new, inside every 1:1 |
| Story | Five sections, with no why-now beat and no data beat | All seven beats in three acts, each with its own scroll mechanic |
| Close | A centered headline and two pill buttons | An offset headline over a coral grain gradient, with an embedded demo form |

The prototype treated the page like a list of sections. I built it as a sequence, where each beat's motion fits what that beat is supposed to do.

## Outcome

My manager loved it and asked me to share it, and peers in several Slack channels picked it up with a lot of enthusiasm. That same month I presented it at a corporate marketing team meeting, where leadership pointed to it as an example of one person taking an idea to completion. It never launched, so there are no launch numbers. My latest review now lists "campaign concepts" among the areas I work in, and I'm reusing the build as a pattern for scroll-driven campaign pages.

## Process

Claude was my thinking partner on the campaign, and Cursor built the page. I wrote the premise, audience, products, and form in one message. Claude wrote the copy, the seven beats, and the voice rules, and I kept the structure. Then I built one beat at a time in Cursor with short, specific prompts like "Make the heading bigger."

## Reflection

I'd bring people in sooner. Building alone is a big part of why it moved so fast, but a concept that needs leadership to say yes is easier to say yes to when PMM and brand have already had a hand in it. I'd also break the page down sooner into the pieces a campaign actually runs on, like one 1:1 as an ad and another as an email.

*Visual: the menu open showing the three acts, and mobile captures. Confirm the payoff stock photo's license before publishing, or swap it in captures.*
