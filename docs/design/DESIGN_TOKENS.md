# FC 2015 Design System: Tokens v2.0

**Status:** Replaces v1.0, the Antigravity draft · **Date:** 3 Oct 2026 · **Code:** [`styles/tokens.css`](../../styles/tokens.css)

This file explains the token values and the reasons for them. The values live in `tokens.css`, and if this file and `tokens.css` ever disagree, `tokens.css` wins. Every value below either comes from the signed PRD, was measured from the club crest, or was copied from source files of the three reference sites saved in `inspiration/`. Each section names its source.

---

## 1. What we learned from each reference site

Each site's real design values were read from the site files captured on 3 Oct 2026, not from screenshots. Those captures are third-party code, so they're kept outside the repo (in each developer's local `_local/inspiration/` folder); downsized screenshots are in [`references/`](references/).

| Site | Source file | What we took |
| :--- | :--- | :--- |
| **Atlanta City FC** | `inspiration/atlcty/cdn.prod.website-files.com/.../nwsl.webflow.shared.*.min.css` (Webflow variables `--_typography---*`, `--_brand-palette---*`) | **Type and voice.** Headings are uppercase and heavy (Druk Text Heavy). The heading scale is H1 60/64, H2 48, H3 32/30. Subtitles are semibold italic **Fraunces** at 28/40 and 18/28. Body text is 18/28 and 16/24. Controls use a 5px radius. The site's own open-source fallbacks are **Oswald** for headings and **Montserrat** for body text. A single brand-colour rule runs under the nav. |
| **Manchester United** | `inspiration/manutd/.../@stadionhq-v3/mufc-web-tokens/dist/variables/{primitive,semantic,colour-sets}` (the club's real token package) | **Structure.** Tokens come in three tiers: primitive (`--p-`), semantic (`--s-`) and component (`--c-`). The spacing scale is 0, 1, 2, 4, 8 … 200px. Breakpoints are 360, 768, 1024, 1440 and 1920. Page margins are 16, 32, 40 and 84px, and gutters are 8, 16 and 24px. The 12-column container is 1272px wide. Display type runs up to 92–172px. **Colour sets** recolour a whole band of the page. |
| **Arsenal FC** | `inspiration/arsenal/www.arsenal.com/_next/static/css/*.css` | **Type roles.** Each role (display1, heading1–3, caption, tag) defines its own font, size, weight and letter case, with separate s, m, l and xl sizes. Captions are uppercase and bold (700). Focus is a 3px solid outline with a 3px offset. Dark backgrounds are blue-black (`#04041C`, `#151925`), not grey. 8px is the most common radius, then 4px. |

Arsenal's screenshot capture failed and only shows a "No articles available" page, but its CSS was saved in full. The Arsenal values above come from that CSS.

**All three sites have the same pattern:** a full-width photo, large type laid over it, and almost no decoration. None of them use a glassy card or a gradient glow in the hero. The rules in §6 follow from that.

---

## 2. Colour

### 2.1 Primitives

The gold ramp was sampled from the client's crest (`assets-src/brand/crest-client-original.png`). Blue and ink are the PRD's signed values, with in-between steps added.

| Token | Hex | Source |
| :--- | :--- | :--- |
| `--p-color-gold-200` | `#F5D48A` | Lighter tint, used for hover |
| `--p-color-gold-300` | `#F0C060` | Brightest highlight on the crest |
| `--p-color-gold-500` | `#E5A93C` | **PRD primary**, matches the crest mid-tone `#E4A848` |
| `--p-color-gold-600` | `#CC9030` | Crest mid-shadow |
| `--p-color-gold-700` | `#B47824` | Crest shadow |
| `--p-color-gold-800` | `#7A4E10` | Deep shadow |
| `--p-color-gold-metallic` | `#D4AF37` | PRD alternate. **Print and merchandise only** |
| `--p-color-blue-300` | `#5B9BFF` | The only blue dark enough backgrounds can carry as text |
| `--p-color-blue-500` | `#0047AB` | **PRD accent** |
| `--p-color-blue-600` | `#0024A0` | The crest's blue bar as it actually renders |
| `--p-color-blue-700` | `#0A3A82` | PRD accent alternate |
| `--p-color-blue-900` | `#061A3D` | Deep blue |
| `--p-color-ink-1000` | `#000000` | Black field inside the crest shield |
| `--p-color-ink-950` | `#05070C` | Partner strip, footer, form inputs |
| `--p-color-ink-900` | `#0A0E17` | **PRD page background** |
| `--p-color-ink-850` | `#0F172A` | PRD alternate background |
| `--p-color-ink-800` | `#161F30` | **PRD card surface** |
| `--p-color-ink-700` | `#1F2A40` | Card hover |
| `--p-color-ink-600` | `#2C3A55` | Strongest neutral |
| `--p-color-slate-100 / 300 / 400 / 500` | `#F1F5F9` / `#CBD5E1` / `#94A3B8` / `#64748B` | Text greys. 400 is the PRD's muted text colour |
| `--p-color-green-400` / `red-400` | `#3DDC84` / `#F05252` | WIN and LOSS badges, form feedback |

### 2.2 Contrast (WCAG 2.1, checked by calculation)

| Pair | Ratio | Rule |
| :--- | :--- | :--- |
| White on page `#0A0E17` | 19.3 | ✅ |
| Slate-300 on page | 13.0 | ✅ |
| Slate-400 (muted) on page / card | 7.5 / 6.4 | ✅ |
| Slate-500 on page | 4.1 | ⚠️ Disabled state only |
| Gold-500 on page / card | 9.3 / 7.9 | ✅ OK for text |
| Ink-900 on gold-500 (gold button) | 9.3 | ✅ |
| **White on gold-500** | **2.1** | ❌ **Never.** Text on gold is always ink |
| **Blue-500 on page** | **2.3** | ❌ **Never use blue as text on a dark background.** Use it for fills, bars and borders |
| Blue-300 on page | 7.0 | ✅ Focus ring |
| White on blue-500 | 8.4 | ✅ |
| Gold-500 on blue-500 | 4.0 | ⚠️ Large text only (24px+, or bold 19px+) |
| Ink-700 on gold surface | 6.9 | ✅ |
| White at 72% on blue surface | 5.1 | ✅ |

### 2.3 Semantic colour

Components use only these names. Never put a `--p-` token or a hex code in a component.

| Token | Value on the dark (default) surface |
| :--- | :--- |
| `--s-color-bg-page` | ink-900 |
| `--s-color-bg-sunken` | ink-950 |
| `--s-color-bg-surface` / `-hover` | ink-800 / ink-700 |
| `--s-color-text-primary / secondary / muted / disabled` | white / slate-300 / slate-400 / slate-500 |
| `--s-color-text-brand` | gold-500 |
| `--s-color-text-link` / `-hover` | gold-300 / gold-200 |
| `--s-color-text-on-gold` / `-on-blue` | ink-900 / white |
| `--s-color-border-subtle / default / brand` | white at 8% / white at 16% / gold-500 |
| `--s-color-focus` | blue-300 |
| `--s-color-result-win / draw / loss` | green-400 / slate-400 / red-400 |
| `--s-scrim-up / -left / -full` | PRD vignette `rgba(10,14,23,.85)`, faded to transparent. **Only over photos.** |

### 2.4 Surfaces

This copies Man United's colour sets. Put the attribute on a full-width section and everything inside it switches colours automatically, with no separate component variants.

| Attribute | Background | Text | Use for |
| :--- | :--- | :--- | :--- |
| *(none)* | ink-900 | white | Default for most sections |
| `data-surface="black"` | `#000000` | white | Wherever the crest appears (see §7) |
| `data-surface="gold"` | gold-500 | ink-900 | **One** loud call-to-action band per page, such as Open Trials. The primary button turns dark with gold text. |
| `data-surface="blue"` | blue-500 | white | Kit or partner band. Gold text only at large sizes. |
| `data-surface="dark"` | ink-900 | white | Switches back to the default inside a gold or blue band, e.g. the Trials form card |

---

## 3. Typography

### 3.1 Font families

The families follow the signed PRD §6: Oswald for display and Inter for body text.

| Token | Font | Why |
| :--- | :--- | :--- |
| `--s-font-display` | **Oswald** 700 | Named in the PRD. Atlanta City's own CSS also uses it as the open-source fallback for Druk. |
| `--s-font-body` | **Inter** 400/500/600/700 | Named in the PRD. It's also Man United's secondary font. |
| `--s-font-editorial` | **Fraunces** 600 italic | Atlanta City's real subtitle font (its "Scroll to see more" text). *This is an addition the PRD doesn't list.* It's an accent only, and can be dropped by pointing the token at Inter italic. |

v1 also loaded Montserrat and JetBrains Mono. Both are removed. For countdown digits, use `font-variant-numeric: tabular-nums` with Oswald or Inter instead of a fourth font. That saves weight toward the PRD's 2 MB page budget.

**Loading:** `tokens.css` doesn't import any fonts. In Next.js, `next/font/google` loads the three families and exposes them as `--font-oswald`, `--font-inter` and `--font-fraunces`, and the tokens read those variables. Subset to Latin and load only the weights listed above.

### 3.2 Type roles

Sizes scale smoothly from a 360px screen to a 1440px screen using `clamp()`.

| Role | Size (360 → 1440) | Line height | Weight | Case and spacing | Font | Source |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `display-xl` | 56 → 120px | 0.9 | 700 | UPPER, −0.01em | Oswald | Man United hero fixture (92–120) |
| `display-l` | 44 → 92px | 0.9 | 700 | UPPER, −0.01em | Oswald | Man United fontsize-14 |
| `h1` | 40 → 60px | 1.0 | 700 | UPPER | Oswald | Atlanta City H1 60 |
| `h2` | 32 → 48px | 1.0 | 700 | UPPER | Oswald | Atlanta City H2 48 |
| `h3` | 24 → 32px | 1.1 | 700 | UPPER | Oswald | Atlanta City H3 32/30 |
| `editorial-l` | 20 → 28px | 1.4 | 600 italic | Sentence case | Fraunces | Atlanta City subtitle-1 28/40 |
| `editorial-s` | 18px | 1.55 | 600 italic | Sentence case | Fraunces | Atlanta City subtitle-2 18/28 |
| `body-l` | 18px | 1.55 | 400 | Sentence case | Inter | Atlanta City body-1 18/28 |
| `body-m` | 16px | 1.5 | 400 | Sentence case | Inter | Atlanta City body-2 16/24 |
| `body-s` | 14px | 1.4 | 400 | Sentence case | Inter | — |
| `label` | 14px | 1.1 | 700 | UPPER, 0.04em | Inter | Arsenal caption (uppercase, 700) |
| `tag` | 12px | 1.0 | 700 | UPPER, 0.08em | Inter | Arsenal tag |

Each role is split into tokens: `--s-type-{role}-size`, `-leading`, `-weight` and `-tracking`.

---

## 4. Space, layout and shape

| Group | Tokens | Source |
| :--- | :--- | :--- |
| Space primitives | `--p-space-{0,2,4,8,12,16,20,24,32,40,48,64,80,96,120,160}`. Each name is the size in pixels. | Man United p-size scale |
| Semantic space | `--s-space-inline-{xs,s,m,l}`, `--s-space-stack-{xs,s,m,l,xl}`, `--s-space-section` (64 → 120px, fluid) | — |
| Breakpoints | 360 / 768 / 1024 / 1440 / 1920 | Man United. Reference only, because CSS variables can't be used inside `@media`. Repeat them in the framework config. |
| Container | `--s-layout-max-width` = 1272px | Man United xl, 12 columns |
| Margin / gutter | 16/8 → 32/16 (768) → 40/16 (1024) → 84/24 (1440). Switches automatically through `@media` blocks in `tokens.css`. | Man United |
| Nav height | 64px, then 80px from 1024 | — |
| Radius | control 4px · card 8px · media 0 · pill 999px | Atlanta City 5px, Arsenal 8/4 |
| Motion | hover 120ms, reveal 320ms, `cubic-bezier(0.2,0,0,1)`. Set to 0 when the user has reduced motion turned on. | — |
| Focus | `3px solid blue-300`, offset 3px | Arsenal |
| Z-index | base 0 · raised 10 · nav 100 · overlay 200 · modal 300 · toast 400 | — |

---

## 5. Component tokens

The `--c-*` tokens in `tokens.css` cover the components the PRD needs: **button** (primary and secondary, 48px high), **nav** (3px gold bar under the active link, after Atlanta City's red rule), **card**, **player card** (3:4, with the kit number as a faded gold watermark), **input** (48px, error border), **result badge** and **partner strip** (logos at 60% opacity, 100% on hover). Every one is built from `--s-*` tokens, so surfaces restyle them too.

Added during the build: **match card** (`--c-match-bg`, `--c-match-pattern`, `--c-countdown-bg`, `--c-score-bg`), **player scrim** (`--c-player-scrim`), **kit stage** (`--c-kit-spotlight`, `--c-kit-shadow`), **partner pitch pattern** (`--c-pitch-pattern`), **hero next-match strip** (`--c-strip-bg`) and **consent banner** (`--c-banner-shadow`).

---

## 6. Usage rules

These come straight from what the three reference sites do, and what v1's hero did instead.

1. **Photos come first.** Large sections open with a full-width photo and `--s-scrim-*` over it so text stays readable. While the club has no photos (PRD §2), use a dark sports placeholder photo, never an empty gradient.
2. **No decorative gradients or glows.** Gradients are only for scrims over photos. There are no glow shadows and no blurred-glass cards, and none of the three sites use them.
3. **Big type does the work.** The hero headline uses `display-xl`. Following Man United, the next fixture can *be* the hero headline ("FC 2015 v [OPPONENT]") instead of sitting in a card beside it.
4. **Gold is rare.** Use it for one primary button per view, the active nav bar, kit numbers and the brand text in the header. Body text is never gold. Use at most one `data-surface="gold"` band per page.
5. **Blue never carries text on a dark background.** It's for fills, bars, the crest stripe and the blue surface.
6. **Uppercase belongs to Oswald and labels.** Body text and Fraunces stay in sentence case. Use at most one Fraunces line per section.
7. **Component colours only use `--s-` and `--c-` tokens.** A hex code, `rgb()` or `--p-color-*` in a component is a bug, and Stylelint blocks it. Spacing, radius and type primitives (`--p-space-*`, `--p-size-text-*`, `--p-leading-*`, `--p-weight-*`) may be used directly, because they carry no meaning that a surface could change.

---

## 7. Asset issues found while writing the tokens

These aren't token problems, but they affect how the tokens look in use:

- **`fc_2015_crest.png` is not transparent.** It sits on a solid black square (corner pixels `#010101`, plus a grey `#373131` corner at the top right). On `#0A0E17` it shows as a visible box. Until there's a transparent cutout, either place the crest on `data-surface="black"` or render it with `mix-blend-mode: lighten`, which makes the black square disappear on any darker background (TDD §4). **To do: get a transparent PNG or an SVG of the crest.**
- **The crest blue (`#0024A0`) is darker than the PRD blue (`#0047AB`).** The tokens keep the signed PRD value as the brand blue and record the crest value as `blue-600`. Check with the client which one the kit and print work should use.

---

## 8. Changes from v1 (Antigravity draft)

| Issue in v1 | Fix in v2 |
| :--- | :--- |
| The .md and .css files contradicted each other (for example `dark-800` was `#121826` in one and `#161E30` in the other) | One set of values, with `tokens.css` as the source |
| The `@theme` block switched the body font to Inter while the rest used Montserrat | Removed. Framework theme mapping belongs in the Next.js build |
| Called Oswald, Montserrat and Fraunces the "Atlanta City FC exact stack". Atlanta City does load them from Google Fonts, but only as fallbacks. Its real fonts are Druk Text Heavy and Avenir from Typekit. | Fonts follow the signed PRD, and each source is cited |
| Font families didn't match the PRD (Montserrat body) | Inter body, as in the PRD |
| Four web fonts loaded with `@import`, which blocks rendering | Three fonts loaded through `next/font`. Mono font dropped |
| Arsenal was in effect never analysed (screenshot failed) | Arsenal CSS analysed: type roles, focus, backgrounds |
| Flat list of tokens | Three tiers (primitive, semantic, component) plus surfaces |
| Glow shadows and glassmorphism listed as core treatments | Removed (see §6) |
| No contrast checks. Blue used as an accent on dark text | Every pair calculated. Blue banned as text on dark |
| Fixed px type sizes, no mobile scale | Fluid `clamp()` scale from 360 to 1440px |
| No tokens for WIN/DRAW/LOSS results or form errors | Status tokens added |
