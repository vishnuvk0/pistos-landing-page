import { test, expect } from "@playwright/test";

test.describe("Landing page", () => {
  test("page loads with correct title and meta", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Pistos/);

    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute(
      "content",
      /credit rating/i
    );
  });

  test("all sections are visible", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("#problem")).toBeAttached();
    await expect(page.locator("#solution")).toBeAttached();
    await expect(page.locator("#about")).toBeAttached();
    await expect(page.locator("#contact")).toBeAttached();
  });

  test("navigation links scroll to sections", async ({ page }) => {
    await page.goto("/");

    // On mobile, open the hamburger menu first
    const hamburger = page.locator('nav button[aria-label="Open menu"]');
    if (await hamburger.isVisible()) {
      await hamburger.click();
      // Wait for mobile menu to appear, then click within it
      const mobileMenu = page.locator("nav > div.border-t");
      await mobileMenu.waitFor({ state: "visible" });
      await mobileMenu.locator('a[href="#problem"]').click();
    } else {
      await page.click('nav a[href="#problem"]');
    }

    await page.waitForTimeout(500);
    const problemSection = page.locator("#problem");
    await expect(problemSection).toBeInViewport();
  });

  test("no console errors on load", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    expect(errors).toHaveLength(0);
  });

  test("marquee section is visible and contains logo images", async ({
    page,
  }) => {
    await page.goto("/");

    const marquee = page.locator(
      'section[aria-label="Companies our team members previously worked at"]'
    );
    await expect(marquee).toBeAttached();
    await expect(page.getByText("Made by alumni from")).toBeVisible();

    const logos = marquee.locator("img");
    const count = await logos.count();
    expect(count).toBeGreaterThanOrEqual(7);
  });

  test("custom fonts are loaded", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const spaceGrotesk = await page.evaluate(() =>
      document.fonts.check('16px "Space Grotesk"')
    );
    expect(spaceGrotesk).toBe(true);

    const dmSans = await page.evaluate(() =>
      document.fonts.check('16px "DM Sans"')
    );
    expect(dmSans).toBe(true);
  });
});
