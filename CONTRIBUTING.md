# Working together

We're a team of two. This page covers how we set up, split the work, and get changes into `main` without overwriting each other.

## 1. First-time setup

You need Git and Node 24 (`.nvmrc` pins it; with nvm run `nvm use`).

```bash
git clone <repo-url>
cd fc2015-web
npm ci                                # exact versions from package-lock.json
npx playwright install chromium       # browser for the end-to-end tests
npm run dev                           # http://localhost:3000
```

No `.env` file is needed for local work. Turnstile uses Cloudflare's test keys, and form submissions are printed in the terminal instead of being emailed. Real keys live only in Vercel. **Never commit `.env.local` or paste keys into code, issues or chat.** To get the real values locally, run `npx vercel env pull .env.local`.

**VS Code:** accept the recommended extensions when prompted (ESLint, Stylelint, Prettier, EditorConfig). Files then format on save, the same way on both machines.

## 2. How a change gets into `main`

We use one long-lived branch, `main`, and short branches for everything else. `main` is what Vercel deploys, so it must always build.

1. **Pick up an issue** on the GitHub project board and assign yourself, so we never work on the same thing by accident.
2. **Branch from the latest `main`:**
   ```bash
   git switch main && git pull
   git switch -c feat/t11-lighthouse     # type/ticket-short-description
   ```
   Branch types: `feat/`, `fix/`, `content/` (client content in `content/`), `docs/`, `chore/`.
3. **Commit small and often.** Write messages in the imperative, with the ticket id when there is one: `T11: lazy-load the footer crest watermark`.
4. **Before pushing,** run the same checks CI runs:
   ```bash
   npm run typecheck && npm run format:check && npm run lint && npm test
   npm run test:e2e          # for anything that changes what's on screen or the forms
   ```
5. **Open a pull request** and fill in the template. Vercel posts a preview link on it.
6. **The other person reviews.** Every pull request needs one approval and green CI before merging. Review within a day; if it's urgent, say so in chat.
7. **Squash and merge,** then delete the branch.

If `main` moved while you were working, update your branch with `git pull --rebase origin main`, fix any conflicts, and re-run the checks.

## 3. Who does what

The site is built (TDD §12, tickets T0–T10). What's left splits into two tracks that rarely touch the same files, which keeps merge conflicts rare. Put your names in, swap tracks if you prefer, then create the issues.

| Track | Owner | Scope | Main folders |
| :--- | :--- | :--- | :--- |
| **A. Frontend and design** | _name_ | `/dev/specimen` token page (T1). Lighthouse budget on the Vercel preview (T11). Design-review changes after the client walkthrough (T12), for example the squad grid on mobile. Swapping placeholders for real photos and logos. | `components/`, `app/`, `styles/`, `public/` |
| **B. Platform and content** | _name_ | Vercel project, domain and environment variables. Resend domain verification. Google Sheet and service account. Turnstile keys. Deploy Hook and cron (T13). Entering client content as it arrives until `npm run check:launch` passes. | `content/`, `lib/server/`, `app/actions/`, `.env` in Vercel, `docs/` |

Both of us review each other's pull requests, so both of us understand the whole site.

## 4. Rules that prevent painful conflicts

- **`styles/tokens.css` has one editor at a time.** Say so in chat before changing it. Every new token gets a comment and a line in `docs/design/DESIGN_TOKENS.md`.
- **Never edit `package-lock.json` by hand.** If two branches both added packages, take `main`'s lock file and run `npm install` again.
- **Content only changes in `content/`.** Never type a name, date, price or phone number into a component. Missing values use `TBD()` or `sample()` (see `content/markers.ts`).
- **Don't rename or move shared files** (sections, `lib/`, `content/schema.ts`) without telling the other person first.
- **The signed PRD (`docs/product/PRD.md`) is the client's record.** Don't edit it. Scope changes go in the TDD with a note of who agreed to them.

## 5. Definition of done

A pull request is ready to merge when:

- CI is green: typecheck, formatting, lint, unit tests and end-to-end tests.
- It includes screenshots at 360px, 1024px and 1440px, if anything visible changed.
- It doesn't invent content and uses no raw colours (the linter blocks hex colours in components).
- The docs are updated, if behaviour or structure changed (TDD, blueprint or token doc).

## 6. Where things are

| You want to… | Go to |
| :--- | :--- |
| Understand the scope | `docs/product/PRD.md` |
| Know how something is built | `docs/technical/TDD.md` |
| See what a section should look like | `docs/design/SITE_BLUEPRINT.md` and `docs/design/references/` |
| Change a colour, size or spacing | `styles/tokens.css` + `docs/design/DESIGN_TOKENS.md` |
| Update fixtures, squad, prices, contact details | `content/` |
| See what's still waiting for the client | `npm run check:launch` |
| Give instructions to a coding agent (Antigravity, Claude) | `AGENTS.md`, which agents read automatically |
