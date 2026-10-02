# Portfolio site spec

Single source of truth for structure. Context: `docs/portfolio/BRIEF.md`. Copy: `docs/portfolio/content/`. Non-negotiables: `.cursor/rules/portfolio.mdc`. Images: `docs/portfolio/asset-manifest.md`.

Status: draft, 2026-10-02. Tokens are settled; stack and scope are not. See Open questions.

## 1. Site map

| Route | Content | Notes |
| --- | --- | --- |
| `/` | `content/00-homepage-cards.md` | "I design in the medium," then four cards in fixed order |
| `/work/pendo-for-agents` | `content/01` | Lead piece, built first |
| `/work/pendo-homepage` | `content/02` | |
| `/work/novus` | `content/03` | Two chapters |
| `/work/same-craft-new-floor` | `content/04` | Must state plainly that it never launched |
| `/about` | Not written | Open question |
| `/work/lintel` | Not written | Slot reserved, do not invent content |

Case study order is fixed and encoded as an `order` field, not by filename sort alone.

## 2. Content model

One MDX file per case study. Copy moves in verbatim; the frontmatter carries only what the template needs to lay the page out.

```yaml
title: Pendo for Agents
subtitle: A product family designed in the browser   # the bold line under the title
mode: Sole designer and builder                      # homepage card label
order: 1
card:
  line: A product family I designed and built in the browser, with no other designer on it.
hero:
  slot: pfa-hero                                     # key into the asset manifest
  alt: ""                                            # required before ship
snapshot:                                            # ordered key/value pairs, NOT fixed fields
  - label: Role
    value: Sole designer and builder (Lead Marketing Engineer, Pendo)
  - label: Others
    value: ...
links:                                               # zero or more; 01 has three
  - label: Agent Toolkit
    href: https://www.pendo.io/product/agent-toolkit/
```

Three findings from reading all four files that the model has to absorb:

**The snapshot table is not a fixed schema.** Studies 01–03 use Role / Others / Timeline / Tools / Live. Study 04 uses Role / What Claude did / Timeline / Tools / **Status**, because it never launched. Snapshot must render an ordered list of label/value pairs, not named fields.

**The comparison table varies in shape and heading.** Studies 01 and 02 use three columns ending in "Why it changed." Studies 03 and 04 use three columns whose first column is a row key (Section, Part) with no why column. The section heading differs on every page: "First output vs. what shipped: the observability gap," "…: Headless Pendo," "The concept vs. what shipped," "…: Claude's prototype." The component takes its heading and column labels from the content; only the visual treatment is shared, which is what makes it the signature device.

**Novus needs a chapter level.** Studies 01, 02 and 04 are a flat list of five key decisions. Study 03 is two chapters, each with a chapter heading, an intro paragraph, and three key decisions. Study 01 also carries one narrative section ("The page I was replacing was mine") before Key decisions. So the template is a sequence of blocks, not a fixed slot list.

## 3. Page anatomy

1. Title, subtitle, lead paragraph, hero figure, snapshot table
2. Optional narrative section (01 only today)
3. Key decisions — flat, or grouped under chapters (03)
4. Comparison block — the signature device, identical treatment across all four
5. Outcome, Process, Reflection

Figure slots can appear anywhere, including after Process (01) and after Reflection (02, 03, 04). They are not confined to key decisions.

## 4. Components

| Component | Responsibility |
| --- | --- |
| `CaseStudyLayout` | Grid, rail, section rhythm |
| `SnapshotTable` | Ordered label/value pairs |
| `Figure` | Labeled placeholder until a real capture exists; alt text required; caption goes in the rail |
| `Comparison` | Two-up figures with which-side-is-which captions |
| `ComparisonTable` | Variable columns and heading, shared treatment |
| `Clip` | Muted looping video, poster, `prefers-reduced-motion` fallback to the poster |
| `Credit` | Rail-anchored attribution for agency and Claude Design visuals |
| `HomepageCard` | Mode label, title, one line, image |

`Figure` and `Clip` both read a slot key and surface a visible placeholder with the slot description when no asset is present. This is what makes the site reviewable before captures are done.

## 5. Design tokens

Settled and implemented in `design/tokens.css`; specimen at `design/specimen.html`. Light editorial, Fraunces display, Hanken Grotesk body, achromatic with `#46494c` as second ink. Asymmetric grid with a caption rail, collapsing to a centered 62ch measure below 60rem. Full reasoning in `docs/DECISIONS.md`.

Dark product captures sit on a sunk plate with a hairline, never raw on paper.

## 6. Stack and budget — proposed, not decided

Proposed default from the brief: Next.js App Router, MDX, GSAP, Vercel. Tokens are plain CSS custom properties, so the styling layer stays an open choice.

Budget, set against the Reflection in study 01, which calls out 950–984 kB first-load JS as the thing Ryan would fix first. Shipping a portfolio that repeats that mistake would undercut the case study:

- First-load JS: 150 kB per route
- LCP under 2.0s on a mid-tier mobile device
- GSAP and any WebGL loaded per route, never in the shared bundle
- Images as AVIF/WebP with explicit dimensions; no source PNG ever committed

## 7. Build order

Frame first, matching the Novus chapter-1 method described in the content.

1. Case study template with every block as a labeled placeholder
2. Pendo for Agents end to end, one section per session, reviewed at 1440px and 375px
3. Homepage and cards
4. Studies 02, 03, 04, one per chat
5. About, nav, metadata, accessibility and Lighthouse pass

## 8. Open questions

- **Stack** — confirm or replace the proposed default
- **Domain, About page, resume link, contact method**
- **Whether Lintel ships in v1**
- **Novus agency naming** — the rule file says do not name them unless Ryan says to
