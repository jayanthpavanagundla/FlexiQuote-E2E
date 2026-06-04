import { test, expect } from "@playwright/test";

test("Super: Open a random company from the Admin > Company list", async ({
  page,
}) => {
  // Start at the FlexiQuote dashboard
  await page.goto("v2/");
  await expect(page).toHaveURL(/\/v2\/$/);

  // Navigate: top-level "Admin" menu → "Company" sub-item
  const nav = page.locator("#main-nav-menu");
  await nav.getByText("Admin", { exact: true }).hover();
  await nav.getByText("Company", { exact: true }).click();

  // Verify we reached the company list page
  await expect(page).toHaveURL(/\/v2\/superadmin\/company\/list$/);

  // Pick a random company row from the first page and open it
  const rows = page.locator("table tbody tr");
  await expect(rows.first()).toBeVisible();

  const count = await rows.count();
  expect(count).toBeGreaterThan(0);

  const randomIndex = Math.floor(Math.random() * count);
  const randomRow = rows.nth(randomIndex);
  const link = randomRow.locator("a").first();
  const companyName = (await link.innerText()).trim();
  console.log(`Opening random company: ${companyName}`);

  // Click the company name link to open the detail page
  await link.click();

  // Verify we landed on a company detail page (URL: .../company/{guid}/detail)
  await expect(page).toHaveURL(/\/v2\/superadmin\/company\/[^/]+\/detail$/);
});
