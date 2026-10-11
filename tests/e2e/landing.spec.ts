import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const PAGES = ["/", "/club", "/squad", "/matches", "/trials", "/kits", "/partners", "/contact", "/privacy"];

test.describe("site structure (DECISIONS.md 11 Oct)", () => {
  test("PRD §7 title and description on the homepage", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle("FC 2015 | Official Division Two Football Club | Legon, Accra");
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /official digital home of FC 2015/);
  });

  test("every page loads, has one h1 and its own title", async ({ page }) => {
    test.slow(); // visits every page
    const titles = new Set<string>();
    for (const path of PAGES) {
      const res = await page.goto(path);
      expect(res?.status(), path).toBe(200);
      await expect(page.locator("h1"), path).toHaveCount(1);
      titles.add(await page.title());
    }
    expect(titles.size).toBe(PAGES.length);
  });

  test("unknown pages show the themed 404", async ({ page }) => {
    const res = await page.goto("/this-page-does-not-exist");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Offside!/i);
    await page.getByRole("link", { name: "Back to the home page" }).click();
    await expect(page).toHaveURL(/\/$/);
  });

  test("no horizontal scroll on any page", async ({ page }) => {
    test.slow(); // visits every page
    for (const path of PAGES) {
      await page.goto(path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, path).toBeLessThanOrEqual(0);
    }
  });

  test("no serious or critical accessibility violations", async ({ page }) => {
    test.slow(); // visits every page
    for (const path of PAGES) {
      await page.goto(path);
      const results = await new AxeBuilder({ page }).analyze();
      const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
      expect(
        serious.map((v) => `${path} ${v.id}: ${v.nodes.length} node(s) — ${v.help}`),
        path,
      ).toEqual([]);
    }
  });
});

test.describe("homepage hub", () => {
  test("PRD §5.1 hero content and buttons go to their pages", async ({ page }) => {
    await page.goto("/");
    const hero = page.locator("#top");
    await expect(hero.getByRole("heading", { level: 1 })).toHaveText(/FC 2015 —\s*The Pride of Legon/i);
    await expect(hero.getByText("Division Two Football Club | Est. 2015 | Legon, Greater Accra")).toBeVisible();
    await hero.getByRole("link", { name: "Explore Club Story" }).click();
    await expect(page).toHaveURL(/\/club$/);
  });

  test("PRD §5.2 next match countdown ticks, with last and upcoming beside it", async ({ page }) => {
    await page.goto("/");
    const next = page.getByRole("article", { name: "Next match" });
    await expect(next).toContainText("Legon, Accra");
    const secs = next.locator("li").filter({ hasText: "Secs" }).locator("span").first();
    await expect(secs).not.toHaveText("--");
    const first = await secs.textContent();
    await expect(secs).not.toHaveText(first!, { timeout: 3000 });
    await expect(page.getByRole("article", { name: "Last match" })).toContainText("FT");
    await expect(page.getByRole("article", { name: "Upcoming" })).toBeVisible();
  });

  test("the trials form is not on the homepage; its block links to /trials", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("form")).toHaveCount(0);
    await page.getByRole("region", { name: "Your shot at Division Two" }).getByRole("link", { name: "Join Open Trials" }).click();
    await expect(page).toHaveURL(/\/trials$/);
  });

  test("squad row links to the squad page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /Meet the squad/ }).click();
    await expect(page).toHaveURL(/\/squad$/);
  });
});

test.describe("navigation", () => {
  test("Club dropdown shows each page with a description", async ({ page, isMobile }) => {
    test.skip(isMobile, "desktop menu only");
    await page.goto("/");
    await page.getByRole("button", { name: "Club" }).click();
    const menu = page.locator("#club-menu");
    await expect(menu).toBeVisible();
    await expect(menu.getByRole("link", { name: /The crest/ })).toContainText("Golden Eagle");
    await menu.getByRole("link", { name: /Our story/ }).click();
    await expect(page).toHaveURL(/\/club$/);
    await expect(page.getByRole("button", { name: "Club" })).toHaveAttribute("data-active");
  });

  test("current page is marked in the menu", async ({ page, isMobile }) => {
    test.skip(isMobile, "desktop menu only");
    await page.goto("/squad");
    await expect(page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Squad" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  test("mobile menu opens, traps focus and closes with Escape", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile only");
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    const sheet = page.locator("#mobile-menu");
    await expect(sheet).toBeVisible();
    await expect(sheet.getByRole("link", { name: "Our story" })).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(sheet).toBeHidden();
    await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
  });

  test("social icons only appear for accounts the club gave us", async ({ page }) => {
    await page.goto("/contact");
    // content/club.ts has no accounts yet, so no social links anywhere.
    await expect(page.locator('a[aria-label^="FC 2015 on"]')).toHaveCount(0);
  });
});

test.describe("inner pages", () => {
  test("PRD §5.3 squad filter works without a reload and keeps the URL", async ({ page }) => {
    await page.goto("/squad");
    await page.evaluate(() => ((window as unknown as { __noReload: boolean }).__noReload = true));
    await page.getByRole("button", { name: "Defenders", exact: true }).click();
    await expect(page.getByRole("button", { name: "Defenders", exact: true })).toHaveAttribute("aria-pressed", "true");
    await expect(page).toHaveURL(/[?&]squad=DF/);
    await expect(page.getByRole("button", { name: /^Defenders \d/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /^Goalkeepers \d/ })).toHaveCount(0);
    expect(await page.evaluate(() => (window as unknown as { __noReload?: boolean }).__noReload)).toBe(true);
    await page.reload();
    await expect(page.getByRole("button", { name: "Defenders", exact: true })).toHaveAttribute("aria-pressed", "true");
  });

  test("squad position groups fold open and shut", async ({ page }) => {
    await page.goto("/squad");
    const toggle = page.getByRole("button", { name: /^Goalkeepers \d/ });
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(page.locator("#group-GK")).toBeHidden();
  });

  test("Behind the crest: choosing a part shows its story", async ({ page }) => {
    await page.goto("/club");
    await page.getByRole("tab", { name: /The Star/ }).click();
    await expect(page.getByRole("tabpanel")).toContainText("Excellence");
    await page.keyboard.press("ArrowDown");
    await expect(page.getByRole("tab", { name: /The Golden Eagle/ })).toHaveAttribute("aria-selected", "true");
    await expect(page.getByRole("tabpanel")).toContainText("Vision, strength and high ambition");
  });

  test("PRD §5.2 matches page lists fixtures and results", async ({ page }) => {
    await page.goto("/matches");
    await expect(page.getByRole("article", { name: "Next match" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Fixtures", exact: true })).toBeVisible();
    await expect(page.getByText(/^(WIN|DRAW|LOSS)$/).first()).toBeVisible();
  });

  test("PRD §5.6 kit pre-order opens WhatsApp with the kit named", async ({ page }) => {
    await page.goto("/kits");
    const links = page.getByRole("link", { name: "Pre-order via WhatsApp" });
    await expect(links).toHaveCount(2);
    await expect(links.first()).toHaveAttribute("href", /^https:\/\/wa\.me\/\d+\?text=.*Home%20kit/);
  });

  test("PRD §5.7 partner inquiry opens Contact with Sponsorship selected", async ({ page }) => {
    await page.goto("/partners");
    await page.getByRole("link", { name: "Inquire" }).click();
    await expect(page).toHaveURL(/\/contact#contact-sponsorship$/);
    await expect(page.getByRole("radio", { name: "Sponsorship" })).toBeChecked();
  });

  test("privacy page states there are no tracking cookies", async ({ page }) => {
    await page.goto("/privacy");
    await expect(page.locator("#cookies + p")).toContainText("does not set any tracking or advertising cookies");
  });
});
