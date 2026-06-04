import { test, expect } from "@playwright/test";
import {
  navigateToRepairerQuotes,
  openRandomQuote,
} from "../helpers/quote-flow";

test("Admin: Navigate to Repairer Quote and open a random quote", async ({
  page,
}) => {
  // Start at the FlexiQuote dashboard
  await page.goto("v2/");
  await expect(page).toHaveURL(/\/v2\/$/);

  // Shared flow: navigate to the Repairer Quote list and open a random quote
  // (Add admin-specific assertions here if the page differs for admins.)
  await navigateToRepairerQuotes(page);
  const quoteNumber = await openRandomQuote(page);

  // Verify the same quote number is shown on the detail page
  // (Add admin-specific assertions here if the page differs for admins.)
  await expect(page.getByText(quoteNumber, { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Header" })).toBeVisible();
});
