# FC 2015: official landing page

The official site of FC 2015, a Division Two club in Legon, Accra. It's built with Next.js 16 (App Router, TypeScript), and the whole page is pre-rendered as static HTML. Only the two forms run code on the server.

- **What and why:** [`docs/product/PRD.md`](docs/product/PRD.md) is the signed product requirements.
- **How it's built:** [`docs/technical/TDD.md`](docs/technical/TDD.md) is the technical design.
- **Layout and placeholders:** [`docs/design/SITE_BLUEPRINT.md`](docs/design/SITE_BLUEPRINT.md) has the section wireframes.
- **Design tokens:** [`styles/tokens.css`](styles/tokens.css) holds the values, and [`docs/design/DESIGN_TOKENS.md`](docs/design/DESIGN_TOKENS.md) explains them.
- **Working together:** [`CONTRIBUTING.md`](CONTRIBUTING.md) covers branches, pull requests and who reviews what.
- **All documents:** [`docs/README.md`](docs/README.md).
- **Rules for coding agents:** [`AGENTS.md`](AGENTS.md).

## Run it

```bash
npm install
npm run dev            # http://localhost:3000
```

No environment variables are needed for local work. Turnstile uses Cloudflare's test keys, and form submissions are printed in the terminal instead of being sent. See [`.env.example`](.env.example) for production settings.

| Command | What it does |
| :--- | :--- |
| `npm run build` / `npm start` | Production build and server |
| `npm run typecheck` | TypeScript |
| `npm run lint` | ESLint plus Stylelint (fails on raw colours in components) |
| `npm test` | Unit tests (Vitest) |
| `npm run test:e2e` | Builds the site and runs browser tests (Playwright, desktop and mobile, including the accessibility check) |
| `npm run check:launch` | Lists every placeholder still waiting for real client content. **Must pass before launch.** |
| `npm run images` | Applies the brand duotone to the photos in `assets-src/photos` and writes them to `public/images` |

## Updating content

All site content is in [`content/`](content/). Edit the file, commit, and Vercel redeploys.

| To change… | Edit |
| :--- | :--- |
| Fixtures and results | `content/fixtures.ts`. Next match, countdown and WIN/DRAW/LOSS are worked out automatically. |
| Squad and staff | `content/squad.ts`. Photos go in `public/images/players/` (3:4, chest-up, dark background). |
| Email, WhatsApp, socials, partnership deck | `content/club.ts` |
| Trial dates, venue, age groups | `content/trials.ts` |
| Kit prices and sizes | `content/kits.ts` |
| Partners | `content/partners.ts` (logos in `public/partners/`) |
| Club story and timeline | `content/about.ts` |

Every value is checked when the site builds, so a typo in a date or URL fails the build instead of breaking the live site.

## Forms

Trial and contact submissions go through these steps on the server:

1. Honeypot field and minimum fill time (bot checks)
2. Field validation
3. Cloudflare Turnstile (human check)
4. Email to `CLUB_ADMIN_EMAIL` through Resend, plus a new row in the Google Sheet

The submit button waits until Turnstile has issued a token. If Cloudflare can't be reached, the button unlocks after 12 seconds and the server explains the problem.

## Cookies

The site sets no tracking cookies: Vercel Analytics is cookieless, so no consent banner is shown. If the club adds a tracker that does set cookies, list it in `content/site.ts`. A consent banner then appears automatically and the tracker only loads after the visitor accepts.
