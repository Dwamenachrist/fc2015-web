# Design decisions

This is the running log of what we decided and why. Newest first. Each entry links to its source (a vote, the client or a review).

---

## 11 Oct 2026: Structure and patterns (decision board vote)

**Source:** the [decision board](https://claude.ai/artifact/1eA4U8VRBJVKLWKYKMcxpX). We voted on 18 patterns from Atlanta City, Man United and Arsenal; every pattern got a **Yes**.

### Structure

- **The site is a multi-page website, not one long page.** The client asked for a website with pages; "landing page" in the PRD meant the homepage. **No change request to the client is needed.**
- **The homepage is a hub** (Atlanta City model). Each block is a short preview that links to a full page.
- **Pages:** `/` · `/club` · `/squad` · `/matches` · `/trials` · `/kits` · `/partners` · `/contact` · `/privacy`, plus a themed 404 page.
- **Menu:** Club ▾ (Our story · The crest · Partners, each with a one-line description) · Squad · Matches · Kits · Contact · gold **Join Open Trials** button.

### Homepage, in order

1. Full-screen hero with one line. Video when we have it, a photo until then.
2. Last match · Next match · Upcoming (Man United's three cards). The countdown sits on Next match.
3. Short club story with "Our story →".
4. Squad preview as a swipeable row with "Meet the squad →".
5. One Open Trials block (photo, two bullets, one button). **The form is not on the homepage.**
6. Partners strip.
7. Footer: crest watermark, link columns, follow buttons.

### Inner pages

- **Same recipe on every page:** a title banner, the content, one closing call to action, then the footer.
- **Club:** story, **interactive "Behind the crest"** (the client wants this *more* professional and interactive than Atlanta City's tabs), colour cards, and a sliding timeline.
- **Squad:** **Arsenal-style compact cards**, three per row, grouped by position. Groups fold open and shut.
- **Matches:** next match with the countdown, then fixtures and results.
- **Trials:** "How it works" in steps, the briefing, then the form.
- **Kits, Partners, Contact:** as now, each on its own page.
- **404:** a football joke ("Offside!") with a button home.

### Leave out

- No arrival pop-ups.
- No cookie banner while the site sets no cookies (it's built and switches on automatically if trackers are added).

### Answers to questions raised in the vote notes

| Question | Answer |
| :--- | :--- |
| **Can the hero video be AI-generated?** | Yes, for atmosphere: a floodlit pitch, a ball, the net, crowd silhouettes, dusk over Legon. Atlanta City's is real drone footage with their crest added onto the pitch afterwards. Generate a 6–10 s loop (Sora, Veo or Runway), with no faces and no text, then we add our crest and grade it in our colours. **Do not generate footage that pretends to be FC 2015's real players or real matches.** |
| **AI-generated placeholder photos (squad, story)?** | Fine as placeholders. Generate in our kit colours, chest-up, dark background, all at the same framing (spec in SITE_BLUEPRINT §4.3). AI can't draw our crest correctly, so we add the real crest afterwards. Replace them with real photos before launch, or at least never caption an AI person with a real player's name. |
| **Only real social accounts clickable?** | Yes. The site now shows a social icon **only** when the client has given us that account's link. Missing ones don't appear at all. |
| **Does search (Google) need cookies?** | No. Being found on Google depends on page titles, descriptions, structured data, a sitemap, speed and other sites linking to us. We have all of these except the links. Cookies play no part. |
| **Google Analytics / Meta Pixel cost?** | Both are free to install. Money is only spent on the **ads** themselves. Either one sets cookies, so adding one switches the consent banner on. |
| **Google Business Profile?** | Important for "FC 2015 Legon" searches and Maps. It's set up by the club on google.com/business, not in our code. We'll give them a one-page guide and make sure the name, address and website match the site exactly. |
| **Does the club have partners?** | Unknown, so we ask the client. Until then the Partners page and strip show "Principal partner: available" slots, which work as a sales pitch. |
| **Colours: must the site be this dark?** | **Open. Needs a brainstorm.** The brand colours (gold and blue) don't force a dark website: Atlanta City, Man United and Arsenal all use white or light pages with brand colours as accents. Next step: three colour directions to compare (see below). |

### Next decision: colour and style direction

Atlanta City is mostly white with red accents and one peach band. Arsenal is white with red. Man United is white with alternating dark bands. We'll compare three directions on the real homepage before restyling:

1. **Light**: white and stone pages, gold and blue accents, dark only for the hero and footer.
2. **Mixed**: alternating light and deep-blue bands, like Man United.
3. **Dark** (today): ink pages with gold.

Switching only changes the semantic tokens in `styles/tokens.css`, so the structure work can go ahead now.
