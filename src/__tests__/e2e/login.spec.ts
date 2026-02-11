import { test, expect } from "@playwright/test";

test.describe("Login page", () => {
  test("navigating to /login shows the login form", async ({ page }) => {
    await page.goto("/login");

    await expect(page.locator("h1")).toContainText("Log in to Pistos");
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(
      page.getByRole("button", { name: /continue with email/i })
    ).toBeVisible();
  });

  test("submitting empty form shows validation error", async ({ page }) => {
    await page.goto("/login");

    await page.getByRole("button", { name: /continue with email/i }).click();

    await expect(page.locator('[role="alert"]')).toContainText(
      "Email is required"
    );
  });

  test("submitting invalid email shows validation error", async ({ page }) => {
    await page.goto("/login");

    await page.locator('input[type="email"]').fill("notanemail");
    await page.getByRole("button", { name: /continue with email/i }).click();

    await expect(page.locator('[role="alert"]')).toContainText(
      "Please enter a valid email address"
    );
  });

  test("submitting valid email shows success message", async ({ page }) => {
    await page.goto("/login");

    await page.locator('input[type="email"]').fill("test@example.com");
    await page.getByRole("button", { name: /continue with email/i }).click();

    await expect(page.locator("h1")).toContainText("Check your email");
    await expect(page.locator("text=test@example.com")).toBeVisible();
  });

  test("page has correct title", async ({ page }) => {
    await page.goto("/login");
    await expect(page).toHaveTitle(/Pistos/);
  });
});
