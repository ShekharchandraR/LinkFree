import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { login } from "../setup/auth";

test("Logged in user can access dashboard", async ({ browser }) => {
  // fixture: make sure user is logged in
  const context = await login(browser);
  const page = await context.newPage();
  await page.goto("/account/manage/events");
  await expect(page).toHaveURL(/account\/manage\/events/);
});

test.describe("accessibility tests (light)", () => {
  test.use({ colorScheme: "light" });

  test("should pass axe wcag accessibility tests", async ({ browser }) => {
    const context = await login(browser);
    const page = await context.newPage();
    await page.goto("/account/manage/events");
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

test.describe("accessibility tests (dark)", () => {
  test.use({ colorScheme: "dark" });

  test("should pass axe wcag accessibility tests (dark)", async ({ browser }) => {
    const context = await login(browser);
    const page = await context.newPage();
    await page.goto("/account/manage/events");
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});