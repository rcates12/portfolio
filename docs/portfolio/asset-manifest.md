# Asset manifest

Every image slot in `content/`, where its source lives, and what still has to happen before it ships. Paths are relative to the Claude project library (the files Ryan uploaded); copy only what you need into the repo, then crop and compress. Source PNGs are full-page captures at 3456 px wide and up to 36 MB, so never commit them as-is.

Status key: **Have** = source exists, just crop. **Make** = source exists, needs an annotated or side-by-side composite. **Capture** = needs a new capture or recording. **Blur** = must be blurred before shipping.

## 01 Pendo for Agents

| Slot | Source | Status |
| --- | --- | --- |
| Hero: live Agent Analytics hero with folder-tab subnav | `PFA docs/screencapture-pendo-io-product-agent-analytics-2026-09-30-21_42_09.png` | Have |
| The page I was replacing: old dark page vs shipped page at hero, capabilities, bottom | Old: `screencapture-localhost-3000-product-agent-analytics-2026-10-02-11_03_44_old-version.png` (library root). New: the Agent Analytics capture above | Make |
| Extend the homepage system: homepage hero next to Agent Analytics hero, shared tokens called out | `homepage/screencapture-pendo-io-2026-09-30-21_37_18.png` + Agent Analytics capture | Make |
| Subnav: folder-tab crop, plus clip of the scroll handoff to the sticky pill | Crop from Agent Analytics capture; clip from the live page | Have (crop) + Capture (clip) |
| Product layered over color: old bento vs shipped capability panels | Old-version capture + Agent Analytics capture | Make |
| AI patterns: drawer before and after the borderless pass | Not in library | Capture (the "before" may need an old preview build) |
| One gradient across two cards, with a guide overlay | Crop from the live pages | Have + Make (overlay) |
| First output vs shipped: preview builds with the dark chat window vs live line-art version | `PFA docs/screencapture-pendo-website-next-{2aq8itt5v,dw3uc9pft,5sfyvns4j}-...png` (check which two show the dark chat window) + Agent Analytics capture | Make. Dashboard rounds: Capture only if a Sep 15 preview still runs. Crop out preview URLs |
| Process: mobile captures of all three pages, clip of the drawer opening | Hub: `PFA docs/screencapture-pendo-io-pendo-for-agents-2026-09-30-21_39_23.png`; Toolkit: `PFA docs/screencapture-pendo-io-product-agent-toolkit-2026-09-30-21_40_55.png` (desktop only) | Capture (mobile + clip). **Blur** the customer in any Proof drawer capture |

## 02 pendo.io homepage

| Slot | Source | Status |
| --- | --- | --- |
| Hero: shipped hero and logo bar | `homepage/screencapture-pendo-io-2026-09-30-21_37_18.png` | Have |
| Review toolbar clip switching versions, sections, heroes | Toolbar was hidden Jul 30; needs an earlier preview build. Check `homepage/Screen Recording 2026-09-30 at 10.45.05 PM.mov` and `10.47.43 PM.mov` first (not reviewed yet) | Capture |
| Copy sets the layout: use-case section in four shapes | Grid: `homepage/...-kxvbvc12d-...png`. Rows: `homepage/...-6qfu78147-...png`. Bento: `homepage/...-h5dpw8a34-...png`. Lifecycle rows: live capture | Make |
| Motion: scroll-linked waves (July preview) vs shipped static hero | `homepage/...-hhcamw18m-...png` has the waves hero (static frame); live capture | Capture (motion clip) + Have (static) |
| Quote tabs mid-switch, one logo tooltip open | Live page | Capture. Logos and headshots may stay unblurred |
| Use-case modal opening, placeholder then loaded form | Live page | Capture |
| First output vs shipped: live Headless Pendo cycling (incl. Fin flow) vs first gradient version | Live page + `homepage/...-h5dpw8a34-...png` | Capture (live clip) + Have. Branded-bubble round and original video: Capture (`...-hhcamw18m-...` has an early video version; check if it fits) |
| Reflection: four concept-car states side by side, Meet Leo panel called out | `homepage/...-7wn3gfa29-pendo-vercel-app-sandbox-platform-cards-...` (four files: new visitor, cookied, logged in, Pendo Free) | Make. Cleared to show |

## 03 Novus

| Slot | Source | Status |
| --- | --- | --- |
| Hero: cursor moving through the dither squares | `novus agent docs/Screen Recording 2026-09-30 at 10.03.34 PM.mov` and `10.06.59 PM.mov` (live site) | Have (trim clip) |
| Frame before any block: placeholder frame vs finished page | March preview if one still runs; else stills from `novus agent docs/Screen Recording 2026-09-30 at 10.00.08 PM.mov` (launch site) | Capture or Have. Crop the Vercel URL bar at the clip's end |
| Fixed-width comp to fluid grid: Figma frame overlaid on build at 1440, then wider and narrower | Figma frames are not in the library (Ryan's Figma access) | Capture. Caption credits the agency |
| Last pixel: grid junction and signup form, Figma next to build | Figma + launch site | Capture. Credit the agency |
| Keep the story: concept hero vs shipped hero | Concept: `novus agent docs/screencapture-claude-ai-design-p-61839d7f-...png`. Live: `novus agent docs/screencapture-novus-ai-2026-09-30-21_47_07.png` | Make. Concept cleared to show; caption credits Novus's head of product |
| Cut the clever device: the receipt card, full width | Live capture above | Have |
| Install as hero: rotating headline and cursor clearing dither | Recordings 10.03.34 / 10.06.59 | Have (trim) |
| Concept vs shipped, section by section | Concept capture + live capture | Make |
| Clips: Slack conversation, agent callouts, day cards stacking | Recordings 10.03.34 / 10.06.59 | Have (trim) |
| Mobile captures of the live page | Not in library | Capture. No Vercel URLs in any capture |

Open beta (v2) captures exist if needed: `novus agent docs/screencapture-novus-marketing-website-3mnjnqtut-...png` (crop URLs).

## 04 Same craft, new floor

All sources in `same craft new floor/`: 14 screenshots (`Screenshot 2026-09-30 at 10.32.16 PM.png` to `10.35.11 PM.png`), a recording (`Screen Recording 2026-09-30 at 10.30.01 PM.mov`, 388 MB), and `claude-files.zip` (Claude's prototype `the-new-way.html`, the build plan, the campaign doc).

| Slot | Source | Status |
| --- | --- | --- |
| Hero: serif headline with one italic word | Screenshots (check which is the hero) | Have |
| Product last: the seven beats as a strip of key frames | Screenshots | Make |
| Type tells old from new: one 1:1 panel, then old vs new type crop | Screenshots | Have |
| Pace the scroll: tried-to-prove flip, counter to 35, photo to full bleed | Recording | Have (trim) |
| Proof vertical: vertical proof clip, horizontal version beside it | Recording; horizontal only if a preview still runs | Have + Capture |
| Close: the close at full size, a product panel opening from "Explore" | Screenshots / recording | Have. **Blur** the customer name and company in the Predict panel quote |
| First output vs shipped: prototype vs built page at hero, one 1:1, the close | Render `the-new-way.html` from the zip at matching sizes (it renders fine headless with Playwright) + screenshots | Make |
| Reflection: menu open showing three acts, mobile captures | Not in library | Capture. Confirm the payoff stock photo's license before publishing, or swap it in captures |

## Homepage cards

| Card | Image |
| --- | --- |
| Pendo for Agents | Crop of the Agent Analytics hero with the folder-tab subnav |
| pendo.io homepage | Still of Headless Pendo on its pink gradient (live page) |
| Novus | Live hero with dither squares (still from the recordings) |
| Same craft, new floor | The serif hero headline in charcoal and coral |
