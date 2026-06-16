import { test, expect } from "@playwright/test";
import { NavBarPage } from "../../pages/NavBarPage";
import { SubNavBarPage } from "../../pages/SubNavBarPage";
import { QuotePage } from "../../pages/Quote/QuotePage";
import { QuoteItemsPage } from "../../pages/Quote/QuoteItems";
import { ORM } from "../../pages/ORM";
import { epic, step } from "allure-js-commons";

let quoteNumber: string;
let newquoteNumber: string;
// let quoteNumber: string = "10250";

test.describe("Auto Save", () => {
  let navBarPage: NavBarPage;
  let subNavBarPage: SubNavBarPage;
  let quotePage: QuotePage;
  let ormMsgPage: ORM;
  let quoteItemsPage: QuoteItemsPage;

  test.beforeEach(async ({ page }) => {
    await epic("Copy Quote");

    navBarPage = new NavBarPage(page);
    quotePage = new QuotePage(page);
    subNavBarPage = new SubNavBarPage(page);
    ormMsgPage = new ORM(page);
    quoteItemsPage = new QuoteItemsPage(page);

    await page.goto("v2/");
    await expect(page).toHaveURL(/\/v2\/$/);
  });

  test("Quote Creation", async ({}) => {
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await subNavBarPage.clickPlusNewButton();
    quoteNumber = await navBarPage.extractAndStoreQuoteNumber();
    // Section 01 — Vehicle Details
    await quotePage.fillRegNo();
    await quotePage.selectState();
    await quotePage.makeAndModel();
    await quotePage.selectDifferentPaintGroup();
    await quotePage.selectDifferentTransmission();
    await quotePage.selectDifferentColor();
    await quotePage.fillVinNo();
    await quotePage.fillEngineNo();
    await quotePage.fillOdometer();
    await quotePage.fillCylinders();
    await quotePage.fillEngineSize();
    await quotePage.fillTrimCode();
    await quotePage.fillPaintCode();
    // Section 02 - Customer Details
    await quotePage.fillFirstName();
    await quotePage.fillLastName();
    // Section 03 — Insurance Details
    await quotePage.selectRandomInsurer();
    await quotePage.fillClaimNumber();
    await ormMsgPage.enterEstimator("John Doe");
    // Section 04 — Key Dates
    await ormMsgPage.enterEstimateStartDate();
    await ormMsgPage.enterEstimateEndDate();
    // Save Quote
    await subNavBarPage.clickCreateButton();
  });

  test("Copy Quote to New Quote", async ({}) => {
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();

    const [originalVehicleData] = await Promise.all([
      subNavBarPage.waitForVehicleApiResponse(),
      ormMsgPage.searchAndOpenQuoteByNumber(quoteNumber),
    ]);

    await subNavBarPage.clickEllipisBtn();
    await subNavBarPage.selectCopyQuote();

    const [newVehicleData] = await Promise.all([
      subNavBarPage.waitForVehicleApiResponse(),
      subNavBarPage.copyToNewQuote(),
    ]);

    await subNavBarPage.expectToast("Copy quote successful. Please remember to save quote.");
    await subNavBarPage.clickCreateButton();
    newquoteNumber = await navBarPage.extractAndStoreQuoteNumber();
    await subNavBarPage.verifyVehicleDataMatches(
      originalVehicleData,
      newVehicleData,
    );
  });
});
