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
    await expect(page.locator("#contact")).toBeAttached();
  });

  test("navigation links scroll to sections", async ({ page }) => {
    await page.goto("/");

    await page.click('nav a[href="#contact"]');

    await page.waitForTimeout(500);
    const contactSection = page.locator("#contact");
    await expect(contactSection).toBeInViewport();
  });

  test("clicking Login navigates to /login", async ({ page }) => {
    await page.goto("/");

    await page.click('nav a[href="/login"]');
    await page.waitForURL("**/login");

    await expect(page.locator("h1")).toContainText("Log in to Pistos");
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
    await expect(page.getByText("Built by alumni from")).toBeVisible();

    const logos = marquee.locator("img");
    const count = await logos.count();
    expect(count).toBeGreaterThanOrEqual(6);
  });

  test("font stack is configured correctly", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const bodyFontFamily = await page.evaluate(() =>
      getComputedStyle(document.body).fontFamily
    );
    expect(bodyFontFamily).toContain("Helvetica");
  });
});
