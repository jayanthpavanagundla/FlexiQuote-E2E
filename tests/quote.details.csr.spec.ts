import { test, expect } from "@playwright/test";
import {
  navigateToRepairerQuotes,
  openRandomQuote,
} from "../helpers/quote-flow";

test("CSR: Navigate to Repairer Quote and open a random quote", async ({
  page,
}) => {
  // Start at the FlexiQuote dashboard
  await page.goto("v2/");
  await expect(page).toHaveURL(/\/v2\/$/);

  // Shared flow: navigate to the Repairer Quote list and open a random quote
  await navigateToRepairerQuotes(page);
  const quoteNumber = await openRandomQuote(page);

  // Verify the same quote number is shown on the detail page
  // (Add CSR-specific assertions here if the page differs for CSRs.)
  await expect(page.getByText(quoteNumber, { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Header" })).toBeVisible();
});
