<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# FC 2015 site: rules for every agent

Source documents are in `docs/`: `docs/product/PRD.md` (signed scope), `docs/technical/TDD.md` (how it is built), `docs/design/SITE_BLUEPRINT.md` (section wireframes and placeholders), `docs/design/DESIGN_TOKENS.md` (token rationale). Screenshots of the three reference sites are in `docs/design/references/`. If they disagree: PRD wins on scope, TDD on implementation, blueprint on layout.

1. **Do only the task you were given.** Do not restyle, rename or "improve" other sections.
2. **Never invent content.** Names, dates, prices, sponsors, phone numbers and copy come from `content/`. If something is missing, use `TBD("label", fallback)` or `sample("label", value)` from `content/markers.ts`; `npm run check:launch` lists every one left.
3. **Styles use tokens only.** `styles/tokens.css` is the source of truth. In `*.module.css`, colours must be `var(--s-*)` or `var(--c-*)`; no hex, `rgb()`, named colours or `--p-color-*` (Stylelint enforces this). Spacing, radius and type primitives (`--p-space-*`, `--p-size-text-*`) are allowed. Need a new colour? Add a `--c-*` token to `styles/tokens.css` with a comment, and list it in `docs/design/DESIGN_TOKENS.md` §5.
4. **No decoration the references don't use:** no glassmorphism, glow shadows, gradient blobs or invented stats (DESIGN_TOKENS.md §6). Gradients only as photo scrims and the kit spotlight.
5. **Surfaces, not colour variants.** Use `data-surface="gold|blue|dark|black"` on a band. Gold appears once per page (Trials).
6. **Fonts:** Oswald (display), Inter (body), Fraunces italic (one accent line per section) via `next/font` in `app/layout.tsx`. No other fonts.
7. **Images:** placeholder photos go through `npm run images` (brand duotone). Never hotlink. Credit every stock photo in `assets-src/CREDITS.md`.
8. **Next.js 16 specifics:** `next/image` uses `preload`/`fetchPriority` (not `priority`); `images.qualities` is an allowlist in `next.config.ts`; do not enable `cacheComponents`.
9. **Done means green:** `npm run typecheck && npm run lint && npm test && npm run test:e2e` all pass, and you attach screenshots at 360, 1024 and 1440 px.
