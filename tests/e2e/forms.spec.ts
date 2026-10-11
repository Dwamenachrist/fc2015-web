import { expect, test, type Page } from "@playwright/test";

// The server rejects anything filled in under 3 seconds (anti-bot), so tests
// wait that long before submitting, like a person would.
const humanPause = (page: Page) => page.waitForTimeout(3200);

test.describe("open trials form (PRD §5.4)", () => {
  test("shows errors for empty required fields and focuses the summary", async ({ page }) => {
    await page.goto("/trials");
    const form = page.locator("#trials form");
    await humanPause(page);
    await form.getByRole("button", { name: "Submit application" }).click();

    const summary = form.getByRole("alert");
    await expect(summary).toBeVisible();
    await expect(summary).toBeFocused();
    await expect(summary).toContainText("Full name");
    await expect(form.locator("#f-fullName")).toHaveAttribute("aria-invalid", "true");
  });

  test("asks for a guardian when the player is under 18", async ({ page }) => {
    await page.goto("/trials");
    const form = page.locator("#trials form");
    await expect(form.getByLabel(/Parent \/ guardian name/)).toHaveCount(0);
    await form.getByLabel("Date of birth").fill("2009-06-01");
    await expect(form.getByLabel(/Parent \/ guardian name/)).toBeVisible();
    await form.getByLabel("Date of birth").fill("2004-06-01");
    await expect(form.getByLabel(/Parent \/ guardian name/)).toHaveCount(0);
  });

  test("submits a valid application and shows the WhatsApp group", async ({ page }) => {
    await page.goto("/trials");
    const form = page.locator("#trials form");
    await form.getByLabel("Full name").fill("Kofi Mensah");
    await form.getByLabel("Date of birth").fill("2004-05-10");
    await form.getByLabel("Playing position").selectOption("MF");
    await form.getByRole("radio", { name: "Right" }).check();
    await form.getByLabel("WhatsApp / phone").fill("024 123 4567");
    await form.getByLabel("Current location").fill("Madina");
    await form.getByRole("checkbox").check();
    await humanPause(page);
    await form.getByRole("button", { name: "Submit application" }).click();

    const trials = page.locator("#trials");
    await expect(trials.getByRole("heading", { name: "Application received" })).toBeVisible({ timeout: 20_000 });
    await expect(trials.getByText("+233241234567")).toBeVisible();
    await expect(trials.getByRole("link", { name: "Join the trials WhatsApp group" })).toBeVisible();
  });

  test("keeps the user's input after a validation error", async ({ page }) => {
    await page.goto("/trials");
    const form = page.locator("#trials form");
    await form.getByLabel("Full name").fill("Kofi Mensah");
    await form.getByLabel("WhatsApp / phone").fill("12345");
    await humanPause(page);
    await form.getByRole("button", { name: "Submit application" }).click();
    await expect(page.locator("#trials form").getByRole("alert")).toBeVisible();
    await expect(page.locator("#trials form").getByLabel("Full name")).toHaveValue("Kofi Mensah");
    await expect(page.locator("#f-phone-error")).toContainText("Ghana number");
  });
});

test.describe("contact form (PRD §5.8)", () => {
  test("sends a message", async ({ page }) => {
    await page.goto("/contact");
    const form = page.locator("#contact form");
    await form.getByLabel("Name").fill("Esi Owusu");
    await form.getByLabel("Email").fill("esi@example.com");
    await form.getByRole("radio", { name: "General" }).check();
    await form.getByLabel("Message").fill("When is the next home game at Legon?");
    await humanPause(page);
    await form.getByRole("button", { name: "Send message" }).click();
    await expect(page.locator("#contact").getByRole("heading", { name: "Message sent" })).toBeVisible({ timeout: 20_000 });
  });

  test("requires an email or a phone number", async ({ page }) => {
    await page.goto("/contact");
    const form = page.locator("#contact form");
    await form.getByLabel("Name").fill("Esi Owusu");
    await form.getByRole("radio", { name: "General" }).check();
    await form.getByLabel("Message").fill("When is the next home game at Legon?");
    await humanPause(page);
    await form.getByRole("button", { name: "Send message" }).click();
    await expect(page.locator("#f-email-error")).toContainText("email address or a phone number");
  });
});
