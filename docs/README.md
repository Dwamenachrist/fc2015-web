# Project documents

Read them in this order the first time.

| # | Document | What it is | Who changes it |
| :--- | :--- | :--- | :--- |
| 1 | [product/PRD.md](product/PRD.md) | The product requirements the client **signed**. Scope, sections, success metrics. [PDF version](product/PRD.pdf). | Nobody. It's the client's record. |
| 2 | [technical/TDD.md](technical/TDD.md) | How the site is built: stack, architecture, content model, forms, testing, tickets and build status. | Either of us, in the same pull request as the change it describes |
| 3 | [design/SITE_BLUEPRINT.md](design/SITE_BLUEPRINT.md) | What we learned from the three reference sites, a wireframe for every section, and the placeholder plan. | Either of us, after agreeing on the design change |
| 4 | [design/DESIGN_TOKENS.md](design/DESIGN_TOKENS.md) | Why every colour, font size and spacing value is what it is. The values themselves are in [`styles/tokens.css`](../styles/tokens.css). | Whoever edits `tokens.css` (one person at a time) |
| — | [design/references/](design/references/) | Screenshots of Atlanta City FC, Manchester United and Arsenal (3 Oct 2026). | — |
| — | [client/](client/) | The client intake: discovery guide, blank questionnaire and the completed questionnaire. | — |

If two documents disagree: the PRD wins on scope, the TDD on implementation, and the blueprint on layout.
