import { test } from "@playwright/test";
import { createQuoteFlow } from "../../helpers/quote-flow.js";
import { QuotePage } from "../../pages/Quote/QuotePage.js";
import { QuoteNavBar } from "../../pages/Quote/QuoteNavBar.js";
import { buildQuoteData } from "../../helpers/quoteData.js";
import { epic, feature, story } from "allure-js-commons";

test.describe.configure({ mode: "serial" });

test.describe("Create Quote", () => {
  let createdCustomerFirstName = "";
  let quoteData: ReturnType<typeof buildQuoteData>;
  let quotePage: QuotePage;
  let quoteNavBar: QuoteNavBar;

  test.beforeEach(async ({ page }) => {
    await epic("Quotes");
    await feature("Quote Creation");

    quoteData = buildQuoteData();
    quotePage = new QuotePage(page);
    quoteNavBar = new QuoteNavBar(page);
  });

  test("Create Quote with New Customer", async ({ page }) => {
    await story("New Customer");
    const { customerFirstName } = await createQuoteFlow(page);
    createdCustomerFirstName = customerFirstName;

    await quotePage.updateInsurer(quoteData.insurance.secondary);
    await quotePage.expectInsurerSelected(quoteData.insurance.secondary);
    await quoteNavBar.clickSave();
    await quoteNavBar.clickBack();
  });

  test("Create Quote with Existing Customer", async ({ page }) => {
    await story("Existing");
    await createQuoteFlow(page, {
      useExistingCustomer: createdCustomerFirstName,
    });

    await quotePage.updateInsurer(quoteData.insurance.secondary);
    await quotePage.expectInsurerSelected(quoteData.insurance.secondary);
    await quoteNavBar.clickSave();
    await quoteNavBar.clickBack();
  });
});
