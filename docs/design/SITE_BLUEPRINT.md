# FC 2015 Site Blueprint: page skeleton and placeholder plan

> **Status:** v1.0, 3 Oct 2026 · **Goes with:** [PRD](../product/PRD.md) (signed) · [TDD](../technical/TDD.md) · [DESIGN_TOKENS.md](DESIGN_TOKENS.md)
> **Purpose:** what we learned from the three reference sites, the layout of every section, and how we make professional placeholders for every image the client hasn't supplied yet.

The TDD says *how it's built*. This document says *what each section looks like and why*. Build tickets T3–T10 implement the wireframes in §3.


> **Update 11 Oct 2026:** the site is now **multi-page**, with the homepage as a hub. Page order (§2) and the one-page skeletons (§3) are replaced by [DECISIONS.md](DECISIONS.md). The placeholder plan (§4) still applies.
---

## 1. What we learned from the three sites

### 1.1 How they were studied

| Site | Material | Notes |
| :--- | :--- | :--- |
| Atlanta City FC | Local full-page capture (desktop and mobile), Webflow CSS | Capture is complete |
| Manchester United | Local capture, **plus a live capture on 3 Oct**, plus its token package and the men's squad page | The local capture missed all API-loaded content (empty carousels, grey loading skeletons). The live capture shows the real page. |
| Arsenal | Local CSS, **plus a live capture on 3 Oct** | The local capture showed "No articles available". The live capture shows the real page. |

Antigravity only had the broken captures, so it never saw what Arsenal and Man United actually look like.

### 1.2 What we take from each site

| From | Pattern | Where we use it |
| :--- | :--- | :--- |
| **Atlanta City** | Full-width moody photo with a short uppercase headline in the **bottom-left** and an italic serif "Scroll to see more" cue | Hero |
| Atlanta City | Thin brand-coloured line under the nav and along the bottom of the hero | Header, hero |
| Atlanta City | **Split promo card**: media on the left, text on the right with a small coloured kicker, then heading, body and button | About, Trials |
| Atlanta City | **Brand pattern band**: a geometric pattern drawn from the crest, used as a section background | Partners pitch box, Next-match card |
| Atlanta City | Footer with a **giant faded crest watermark**, link columns and socials | Footer |
| **Man United** | Every section heading follows one pattern: **title, then a quiet subtitle, then a "View all" action on the right** | Every section |
| Man United | **Alternating full-width bands** (light, dark, grey) give the page rhythm | Our surfaces: ink, sunken, gold, blue, black |
| Man United | **Matches block**: date → crest, score or kickoff time, crest → competition → venue → buttons. Score shown as a dark pill "1 – 1 FT". | Match Center |
| Man United | **Squad card**: dark tall card, head-and-shoulders portrait, **big kit number bottom-left, first name above surname**, grouped under position headings | Squad |
| Man United | Pill-shaped team tabs ("Men's Team / Women's Team / U21s…") | Squad filter |
| Man United | **Tall image cards with text over the top** (membership tiers) | Kits |
| Man United | **Partners in tiers**: centred small label, principal logos large, the rest in a smaller grid | Partners |
| **Arsenal** | **Match preview graphic: two crests side by side on the brand colour, with the headline in wide caps.** Needs no photo. | Next-match card |
| Arsenal | Product cards: image, name, price, full-width buy button | Kit cards |
| Arsenal | Uppercase wide section titles on the left, red "View all" pill on the right | Same heading pattern, in Oswald |
| Arsenal | Navy footer bar with legal links and socials | Footer bottom row |
| Arsenal | Video cards with a duration badge | Not in v1, but the pattern is kept for a later video section |

### 1.3 What we leave out on purpose

- **News carousels.** All three sites are built around news, but the PRD has no news section, and an empty carousel looks worse than none.
- **Pop-ups** (cookie banners, "enable alerts", ad overlays). We set no tracking cookies (Vercel Analytics is cookieless), so no banner is needed.
- **A sponsor bar above the nav.** Man United and Arsenal have one, but FC 2015 has no sponsors yet. An empty or invented sponsor bar is worse than none.
- **Carousels on desktop.** Our lists are short (3 results, 2 kits), so they sit in a static grid. On mobile they become rows you swipe sideways (CSS scroll-snap, no JavaScript).

---

## 2. Page order and rhythm

The PRD numbers 8 sections but doesn't fix their order. This order follows the visitor journeys in PRD §4 and keeps the hero's primary button ("Explore Club Story") pointing at the next-but-one section:

| # | Section | Anchor | Surface | Reference | PRD |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 0 | Header | — | ink-900 + 3px gold line | Atlanta City | — |
| 1 | **Hero** | `#top` | black + photo | Atlanta City | 5.1 |
| 2 | **Match Center** | `#matches` | ink-900 | Man United + Arsenal | 5.2 |
| 3 | **About / History** | `#about` | sunken ink-950 | Atlanta City | 5.5 |
| 4 | **Squad** | `#squad` | ink-900 | Man United | 5.3 |
| 5 | **Open Trials** | `#trials` | **gold**, with a dark form card | Atlanta City split card | 5.4 |
| 6 | **Kits** | `#kits` | **blue** | Man United tall cards + Arsenal product card | 5.6 |
| 7 | **Partners** | `#partners` | sunken ink-950 | Man United tiers + Atlanta City pattern | 5.7 |
| 8 | **Contact** | `#contact` | ink-900 | — | 5.8 |
| 9 | Footer | — | black | Atlanta City watermark + Arsenal bottom bar | — |

**Why this rhythm:** two darks, then one strong colour, keeps the page from feeling like one long dark scroll. Gold appears once, on the conversion that matters most (Trials). Blue carries the kits, which are blue.

---

## 3. Section skeletons

The ASCII wireframes are for desktop (1440px). Mobile notes follow each one. Every section opens with the shared **SectionHeading** component:

```
KICKER (label, gold)                                     [ View all → ]  ← optional
SECTION TITLE (h2, Oswald, uppercase)
Optional one-line subtitle (editorial-s, Fraunces italic, muted)
```

### 3.0 Header

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ [crest] FC 2015        MATCHES  CLUB  SQUAD  TRIALS  KITS  PARTNERS  CONTACT  [JOIN OPEN TRIALS] │
└━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┘  ← 3px gold line
```

- Sticky, 80px tall (64px on mobile). The active link gets a gold underline bar.
- **Mobile:** crest, wordmark and a menu button. The menu opens a full-screen sheet with the links in `h2` size, the trials button, and social icons at the bottom.

### 3.1 Hero (PRD 5.1)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ ░░░░░░░░░░░░░░░ full-width photo, duotone (§4.2) ░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ▓▓▓▓▓ scrim-left ▓▓▓▓▓                                                       │
│                                                                              │
│   [CREST 160px]                                                              │
│   DIVISION TWO FOOTBALL CLUB | EST. 2015 | LEGON, GREATER ACCRA  ← label    │
│   FC 2015 —                                                                  │
│   THE PRIDE OF LEGON                       ← display-xl, bottom-left         │
│   [ EXPLORE CLUB STORY ]  [ VIEW FIXTURES ]                                  │
│   Scroll to see more ↓                     ← Fraunces italic (Atlanta City)  │
│──────────────────────────────────────────────────────────────────────────────│
│ NEXT  ·  FC 2015 v [OPPONENT]  ·  SAT 25 OCT  ·  15:00  ·  LEGON      →     │ ← next-match strip
└━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┘  ← 3px gold line
```

- 100svh on mobile, 88svh on desktop. The text block sits in the bottom-left, as on Atlanta City, not in the vertical centre.
- The crest sits at the top of the text block, not in a card. Until the transparent crest exists, render it with `mix-blend-mode: lighten`.
- The next-match strip is plain type on a translucent ink bar, with no card. **If there's no upcoming fixture in `content/`, the strip doesn't render.**
- **Mobile:** use a portrait crop of the photo, a 96px crest, buttons stacked full width, and the strip wrapping onto 2 lines.

### 3.2 Match Center (PRD 5.2)

```
MATCHDAY
MATCH CENTRE
Every home game at Legon.                                    [ Full fixtures → ]  (v2)
┌──────────────────────────────────────────────┐ ┌───────────────────────────────┐
│ ▒▒▒▒ crest pattern on blue (Arsenal) ▒▒▒▒▒▒▒ │ │ RECENT RESULTS                 │
│ GARFA DIVISION TWO · SAT 25 OCT 2026         │ │ ─────────────────────────────  │
│                                              │ │ 18 OCT  FC 2015  2–1  [OPP]  WIN │
│   [FC 2015 CREST]   v   [OPP MONOGRAM]       │ │ 11 OCT  [OPP]  0–0  FC 2015  DRAW│
│       FC 2015            OPPONENT            │ │ 04 OCT  FC 2015  1–3  [OPP]  LOSS│
│                                              │ │                                │
│   05 : 14 : 32 : 48                          │ │  (score as dark pill, Man Utd) │
│   DAYS  HRS   MINS  SECS                     │ │                                │
│ ──────────────────────────────────────────── │ └───────────────────────────────┘
│ 📍 Legon Sports Stadium, Accra   [DIRECTIONS] │
└──────────────────────────────────────────────┘
          8 of 12 columns                               4 of 12 columns
```

- **Next-match card:** Arsenal's crest-versus-crest graphic, laid out like Man United's match block. The background is the brand pattern (§4.6) on blue-900. **It needs no photography**, so it looks finished on launch day.
- **Opponent crest:** a monogram shield (§4.4) until real crests are supplied.
- **Results:** three rows, each with the date, both teams, a score pill and a WIN, DRAW or LOSS tag.
- **No-data states:**
  - No upcoming match: "Fixtures for the new season will be announced soon."
  - No results: the results card is hidden.
- **Mobile:** the cards stack, and the countdown digits drop to `h2` size.

### 3.3 About / History (PRD 5.5), target of the hero's primary button

```
OUR STORY
ABOUT FC 2015
┌──────────────────────────────────────┬───────────────────────────────────────┐
│ Founded in Legon in 2015…            │                                       │
│ (editorial-l intro, then body-m)     │     [ duotone photo §4.2 ]            │
│                                      │     or video facade (v2)              │
│ [ JOIN OPEN TRIALS ]                 │                                       │
└──────────────────────────────────────┴───────────────────────────────────────┘
  ← Atlanta City split card

WHAT THE CREST MEANS
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ [eagle icon] │ │ [star icon]  │ │ [bars icon]  │   line icons drawn from the crest (§4.5)
│ THE GOLDEN   │ │ THE STAR     │ │ GOLD & BLUE  │
│ EAGLE        │ │ Excellence   │ │ Victory and  │
│ Vision…      │ │              │ │ loyalty      │
└──────────────┘ └──────────────┘ └──────────────┘

2015 ────────●──────────── 20XX ────────●──────────── NOW ────────●
FOUNDED IN LEGON           DIVISION TWO ENTRY         PROMOTION CAMPAIGN
```

- **Timeline:** horizontal on desktop, vertical on mobile, as an ordered list (`<ol>`).
- **Placeholder copy:** the PRD wording only. Dates the client hasn't given show as "20XX" in the placeholder and are tracked as `TBD()`.

### 3.4 Squad (PRD 5.3)

```
FIRST TEAM
THE SQUAD
( ALL ) ( GOALKEEPERS ) ( DEFENDERS ) ( MIDFIELDERS ) ( FORWARDS ) ( TECHNICAL STAFF )   ← pills (Man United tabs)

GOALKEEPERS                                ← group heading, shown only when the filter is "All" (Man United)
┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐
│           │ │           │ │           │ │           │
│ [portrait │ │ [portrait │ │ [portrait │ │ [portrait │   3:4 dark card
│  or §4.3] │ │  or §4.3] │ │  or §4.3] │ │  or §4.3] │
│           │ │           │ │           │ │           │
│ 1         │ │ 13        │ │ 22        │ │ 30        │   ← number, display-l, gold
│ Kwame     │ │ …         │ │ …         │ │ …         │   ← first name, body-l
│ MENSAH  © │ │           │ │           │ │           │   ← surname, h3 uppercase, captain badge
│ GK        │ │ GK        │ │ GK        │ │ GK        │   ← position tag
└───────────┘ └───────────┘ └───────────┘ └───────────┘
DEFENDERS …
```

- **Staff cards** show the role title (for example HEAD COACH) where a player card shows the number.
- **Hover:** the portrait zooms to 103% and the card background lifts to `surface-hover` over 120ms (Man United).
- **Placeholder names:** **we do not invent player names.** Until the roster arrives, cards show the generic placeholder portrait with "Player name" / "Position" text, shown only in staging. A CI check blocks launch while they're left in.

### 3.5 Open Trials (PRD 5.4), on the gold band

```
╔══════════════════════════════════════ data-surface="gold" ══════════════════════════════════════╗
║ OPEN TRIALS 2026                                                                                 ║
║ YOUR SHOT AT DIVISION TWO                                                                        ║
║ ┌───────────────────────────────────────┐   ┌──────────── data-surface="dark" ──────────────┐  ║
║ │ [duotone training photo §4.2]         │   │ REGISTER FOR TRIALS                           │  ║
║ │                                       │   │ Full name            [                    ]  │  ║
║ ├───────────────────────────────────────┤   │ Date of birth        [          ]            │  ║
║ │ AGE GROUPS                            │   │ Position [GK▾]   Dominant foot (L)(R)(Both) │  ║
║ │ ┌──────┐ ┌──────┐ ┌──────┐            │   │ Previous club        [                    ]  │  ║
║ │ │ U-17 │ │ U-19 │ │SENIOR│            │   │ WhatsApp / phone     [+233             ]  │  ║
║ │ └──────┘ └──────┘ └──────┘            │   │ Current location     [                    ]  │  ║
║ │ WHAT TO BRING                         │   │ (guardian fields appear if under 18)       │  ║
║ │ • Boots, shin guards, water           │   │ [✓] I agree FC 2015 may contact me…        │  ║
║ │ DATE · VENUE                          │   │ [ SUBMIT APPLICATION ]  (Turnstile, quiet) │  ║
║ │ [ INQUIRE VIA WHATSAPP ]              │   │                                            │  ║
║ └───────────────────────────────────────┘   └────────────────────────────────────────────┘  ║
╚══════════════════════════════════════════════════════════════════════════════════════════════════╝
```

- **Layout:** the briefing on the left follows Atlanta City's split card. The form on the right sits on a dark card for legibility and contrast.
- **Mobile:** briefing first, then the form, both full width.
- **Success state:** a large tick, "Application received", the trials WhatsApp group button, and a summary of what was submitted.

### 3.6 Kits (PRD 5.6), on the blue band

```
╔═══════════════════════════════════ data-surface="blue" ═══════════════════════════════════╗
║ OFFICIAL 2015 MATCHWEAR                                                                    ║
║ THE KITS                                                                                   ║
║ Pre-order for available sizes.                                                            ║
║ ┌─────────────────────────────────────┐   ┌─────────────────────────────────────┐        ║
║ │ HOME                                │   │ AWAY                                │        ║
║ │ ROYAL BLUE                          │   │ IMPERIAL GOLD                       │        ║
║ │                                     │   │                                     │        ║
║ │        [ vector jersey §4.1 ]       │   │        [ vector jersey §4.1 ]       │        ║
║ │                                     │   │                                     │        ║
║ │ Sizes: S M L XL                     │   │ Sizes: S M L XL                     │        ║
║ │ GH₵ — / Price on enquiry            │   │ GH₵ — / Price on enquiry            │        ║
║ │ [ PRE-ORDER VIA WHATSAPP ]          │   │ [ PRE-ORDER VIA WHATSAPP ]          │        ║
║ └─────────────────────────────────────┘   └─────────────────────────────────────┘        ║
╚════════════════════════════════════════════════════════════════════════════════════════════╝
```

- **Cards:** tall cards with the label at the top (Man United), and price plus a full-width button at the bottom (Arsenal).
- **Backdrops:** each jersey sits on a radial spotlight backdrop on a darker blue, the only gradient here. It reads as studio lighting behind a product, not as decoration.
- **Mobile:** the two cards become a sideways swipe row with the next card peeking in.

### 3.7 Partners (PRD 5.7)

```
OFFICIAL PARTNERS                                               ← centred small label (Man United)
┌───────────────────┐ ┌───────────────────┐ ┌───────────────────┐
│                   │ │                   │ │                   │
│  PRINCIPAL        │ │  PRINCIPAL        │ │  PRINCIPAL        │   ← empty slots: dashed border,
│  PARTNER          │ │  PARTNER          │ │  PARTNER          │     "Available", link to the pitch
│  — available —    │ │  — available —    │ │  — available —    │
└───────────────────┘ └───────────────────┘ └───────────────────┘
╔═════════ ink-800 card + gold crest pattern (Atlanta City) ═══════════════════╗
║ PARTNER WITH FC 2015                                                         ║
║ Align your business with Greater Accra's fastest rising Division Two club.   ║
║ [ DOWNLOAD PARTNERSHIP DECK (PDF, 2.1 MB) ]   [ INQUIRE ]                    ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

- **Empty slots are a sales tool, not filler.** Each says "Principal Partner — available" and links to the pitch box. They're honest, and they show prospects exactly what they'd be buying.
- **When real logos exist:** they replace the slots tier by tier (principal large, official smaller, supporter smallest). Logos are grayscale at 60% opacity, and full colour on hover.
- **Pitch box:** an ink-800 card with a 1px gold border and the gold-line pattern (§4.6) behind the text. The only gold surface on the page stays the Trials band (DESIGN_TOKENS §6, rule 4).

### 3.8 Contact (PRD 5.8)

```
GET IN TOUCH
CONTACT THE CLUB
┌───────────────────────────────┐   ┌───────────────────────────────────────────┐
│ EMAIL   club@…                │   │ Name            [                       ] │
│ WHATSAPP  +233 …              │   │ Email or phone  [                       ] │
│ LOCATION  Legon, Accra  ↗     │   │ Subject  ( Sponsorship | Trials | General )│
│                               │   │ Message         [                       ] │
│ FOLLOW US                     │   │                 [                       ] │
│ [IG] [FB] [X]                 │   │ [ SEND MESSAGE ]                          │
└───────────────────────────────┘   └───────────────────────────────────────────┘
```

### 3.9 Footer

```
┌──────────────────────────────────────── black ───────────────────────────────────────┐
│ [CREST]                     CLUB          MATCHDAY       GET INVOLVED                  │
│ FC 2015                     Our story     Fixtures       Open trials           ░░░░░░ │
│ BUILT IN LEGON.             Squad         Results        Partner with us       ░CREST░ │ ← giant crest
│ PLAYING FOR MORE.           Kits          Venue          Contact               ░░░░░░ │   watermark at 4%
│ [IG] [FB] [X]                                                                         │
├───────────────────────────────────────────────────────────────────────────────────────┤
│ © 2026 FC 2015 · Legon, Accra          Privacy notice                                │ ← Arsenal bar
└───────────────────────────────────────────────────────────────────────────────────────┘
```

The tagline ("Built in Legon. Playing for more.") is **placeholder copy** and needs client approval. It's tracked as `TBD()`.

---

## 4. Placeholder plan

**Principle:** every placeholder must look finished, be honest, and be easy to replace. Visitors should never see a grey box, a broken image, a fake person presented as a player, or another club's kit.

### 4.1 Asset list

| # | Asset | Approach | Count | Format, size | File |
| :--- | :--- | :--- | :--- | :--- | :--- |
| A1 | **Transparent crest** | We cut it out of the existing PNG ourselves: flood-fill the outer black from the corners and keep the shield interior (§4.7). Used until the client sends a vector. | 1 | PNG with transparency + WebP, 1024px | `public/brand/crest.png` |
| A2 | **Hero photo** | Curated stock (§4.2) with the brand duotone, landscape and portrait crops | 1 (+1 spare) | AVIF/WebP, 2560w landscape, 1080w portrait, ≤180 KB | `public/images/hero-{l,p}.avif` |
| A3 | **About photo** | Curated stock, duotone | 1 | AVIF/WebP, 1600w | `public/images/about.avif` |
| A4 | **Trials photo** | Curated stock (training: cones, drills, boots), duotone | 1 | AVIF/WebP, 1600w | `public/images/trials.avif` |
| A5 | **Player placeholder portrait** | **Designed SVG silhouette** (§4.3), the same for everyone | 1 SVG | SVG ≤ 4 KB | `public/images/player-placeholder.svg` |
| A6 | **Home and away kits** | **Vector jersey renders** in the PRD colours (§4.1a) | 2 | SVG ≤ 20 KB each | `public/images/kits/{home,away}.svg` |
| A7 | **Opponent crest** | **Generated monogram shield** (§4.4) | Component | Inline SVG | `components/ui/MonogramCrest` |
| A8 | **Crest symbol icons** | Line icons drawn from the crest: eagle, star, tri-bar (§4.5) | 3 | Inline SVG | `components/ui/icons/` |
| A9 | **Brand pattern** | Repeating geometric pattern drawn from the crest's wing feathers and chevron border (§4.6) | 1 tile | SVG tile ≤ 3 KB | `public/brand/pattern.svg` |
| A10 | **Social share image** | Crest on black, wordmark, "The Pride of Legon", gold line | 1 | PNG 1200×630 | `app/opengraph-image.png` |
| A11 | **Favicon / app icons** | From A1 | — | 32px, 180px, 512px | `app/icon.png`, `app/apple-icon.png` |
| A12 | **Partnership deck** | **Not a placeholder.** A one-page "deck coming soon" PDF would mislead, so the download button is hidden until the real PDF exists and "Inquire" stays. | 0 | — | — |

#### 4.1a Kit renders (A6)

- **Build:** one shared jersey outline in SVG (front view, crew neck, short sleeves), recoloured per kit.
  - **Home:** body `#0047AB`, collar and sleeve cuffs `#E5A93C`, crest on the left chest (A1), "FC 2015" in Oswald on the back, small.
  - **Away:** body `#E5A93C`, collar and cuffs `#0047AB`, crest on the left chest.
  - Subtle fabric shading: two low-opacity gradient overlays *inside* the shirt shape (shoulder highlight, side shadow), so it reads as cloth, not a flat icon.
- **Why vector rather than AI or stock:** the colours are exact, the files are tiny, it's honest (clubs show kit renders before launch), and editing it when the real kit design is confirmed takes minutes.

### 4.2 Stock photography

**Sources:** Unsplash and Pexels. Both licences allow commercial use without attribution. We still keep `public/images/CREDITS.md` with the photographer, URL and licence for every file.

**Selection rules.** A photo is only usable if it passes **all** of these:

1. **No identifiable club.** No visible crests, sponsor logos or recognisable kits from other clubs.
2. **No faces that could be mistaken for FC 2015 players.** Prefer backs, silhouettes, motion blur, feet and the ball, or crowds.
3. **Atmosphere over action:** floodlights, night pitches, boots on grass, the ball in the net, dusty or red-earth pitches, a team huddle seen from behind.
4. **Grounded in the place where possible:** Ghanaian or West African grassroots football, which is authentic to Legon. Avoid obviously European stadiums.
5. **The composition leaves room for text.** For the hero, the subject should be on the right or in the centre with dark space on the left (Atlanta City's ball in the light).

**Search queries to start with:**
- `football floodlights night pitch`
- `soccer ball grass night`
- `african football grassroots`
- `ghana football`
- `football boots dirt pitch`
- `football training cones`
- `football team huddle back`
- `stadium lights fog`

**Brand duotone, applied at build time with `sharp` in `scripts/duotone.mjs`:**
1. Convert to grayscale.
2. Raise contrast by about 15%.
3. Map the shadows to `#05070C` (ink-950) and the highlights to `#F5D48A` (gold-200).
4. Export as AVIF and WebP at the target widths.

This makes photos from different photographers look like one shoot in the club's colours. It also neutralises any stray kit colours. Spotify and Nike use the same trick. The originals stay in `assets-src/` (not deployed), so we can re-run it.

**Who does it:** I shortlist 3 candidates per slot as an image grid for you to pick from. The script then processes the chosen ones. This is ticket **T1b** (§5).

### 4.3 Player placeholder portrait (A5)

- **Shape:** a head-and-shoulders silhouette, front-facing, matching Man United's portrait framing (head in the top 40%, shoulders cropped at the card bottom).
- **Fill:** a vertical gradient from ink-700 to ink-800, with a thin gold-700 outline. The FC 2015 crest is a tiny outline on the left chest.
- **Fades away:** the bottom 30% fades into the card background, so the number and name text sit cleanly on top, exactly like Man United's real photos.
- **Same for everyone.** A silhouette of a generic person is honest. A stock photo of a real stranger labelled as a player is not.
- **Replacement spec for the client's shoot**, which also goes in the client handoff:
  - **Framing:** 3:4 portrait, chest up, in the home kit.
  - **Background:** plain dark backdrop (black or navy).
  - **Lighting:** one key light from the front-left.
  - **Resolution:** at least 1200×1600.
  - **Crop:** the same distance for everyone, eyes on the top-third line.
  - **Result:** the real photos drop into the same card with no layout change.

### 4.4 Monogram crest for opponents (A7)

- A shield outline (the same silhouette as FC 2015's, simplified) in slate-500 with an ink-800 fill. The 2–3 letter `opponentShort` sits centred in Oswald 700, slate-300.
- **It never uses gold or blue**, so it can't be confused with FC 2015.
- When a real opponent crest SVG is added to `content/fixtures.ts`, it replaces the monogram automatically.

### 4.5 Crest symbol icons (A8)

- Three 48px line icons with 1.5px strokes in gold-500, traced from the crest's own shapes: the eagle (spread-wing silhouette), the star (5-point, as on the crest) and the tri-bar (three vertical bars, the middle one blue-500).
- They tie the About section to the actual crest instead of generic icon-library images.

### 4.6 Brand pattern (A9)

- **Built from the crest:** the feather layers on the wings (offset chevrons) and the shield's chevron border, repeated as a 64px tile.
- **Two versions:**
  - **Pattern on blue:** blue-700 lines on a blue-900 background at 20% opacity. Used behind the next-match card.
  - **Pattern on ink:** gold-700 lines on an ink-800 background at 12% opacity. Used in the partner pitch box.
- **Why:** this is Atlanta City's main trick. It makes a section look branded with no photo at all.

### 4.7 Crest cutout (A1): how

1. Load `assets-src/brand/crest-client-original.png`.
2. Flood-fill from all four corners, treating colours with RGB at or below 40 as background. The gold border stops the fill, so the black shield interior stays.
3. Clean up the grey `#373131` corner at the top right.
4. Soften the edge with 1px of feathering.
5. Export a PNG with transparency, then check it on ink-900, gold and blue.

Ask the client for a vector original anyway. The PNG looks like an AI-generated render and gets blurry above about 500px.

### 4.8 Video

The PRD requires no video. Atlanta City's About block has a YouTube video. **v1 ships no video placeholder**, because a play button that plays nothing reads as broken.

The About media slot is built to accept a **YouTube facade** (lightweight thumbnail, player loads on click, so it costs no speed budget) as soon as the club has a video. That's one line in `content/club.ts`.

---

## 5. Ticket changes (applied to the TDD §12 plan)

| Ticket | Change |
| :--- | :--- |
| **T1b** (new) Brand assets | A1 crest cutout, A5 player silhouette, A6 kit renders, A7 monogram, A8 icons, A9 pattern, A10 share image, A11 icons. Stock shortlist for A2–A4 → you pick → duotone script. **Due 5 Oct**, since the hero (T3) needs A1 and A2. |
| T3 Hero | Build to wireframe §3.1 |
| T4–T10 | Build each section to its wireframe in §3. Placeholder assets come only from T1b. |
| T12 | Asset replacement pass: real photos, roster, logos and deck replace placeholders as the client supplies them. |
