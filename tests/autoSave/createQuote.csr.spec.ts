import { test, expect } from "@playwright/test";
import { NavBarPage } from "../../pages/NavBarPage";
import { SubNavBarPage } from "../../pages/SubNavBarPage";
import { QuotePage } from "../../pages/Quote/QuotePage";
import { ORM } from "../../pages/ORM";
import { epic, step } from "allure-js-commons";

let quoteNumber: string;
// let quoteNumber: string = "10139";

test.describe("Auto Save", () => {
  let navBarPage: NavBarPage;
  let subNavBarPage: SubNavBarPage;
  let quotePage: QuotePage;
  let ormMsgPage: ORM;

  test.beforeEach(async ({ page }) => {
    await epic("Auto Save");

    navBarPage = new NavBarPage(page);
    quotePage = new QuotePage(page);
    subNavBarPage = new SubNavBarPage(page);
    ormMsgPage = new ORM(page);

    await page.goto("v2/");
    await expect(page).toHaveURL(/\/v2\/$/);
  });

  test("Quote Creation", async ({ page }) => {
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

  test("Edit Quote and Verify", async ({ page }) => {
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await ormMsgPage.searchAndOpenQuoteByNumber(quoteNumber);
    // 1. Change values — each method removes old, fills new, returns what was filled
    const transmissionResult = await quotePage.selectDifferentTransmission();
    const paintGroupResult = await quotePage.selectDifferentPaintGroup();
    const colorResult = await quotePage.selectDifferentColor();
    const vin = await quotePage.fillVinNo();
    const engineNo = await quotePage.fillEngineNo();
    const odometer = await quotePage.fillOdometer();
    const cylinders = await quotePage.fillCylinders();
    const engineSize = await quotePage.fillEngineSize();
    const trimCode = await quotePage.fillTrimCode();
    const paintCode = await quotePage.fillPaintCode();
    const insurerResult = await quotePage.selectDifferentInsurer();
    const firstNameResult = await quotePage.selectDifferentFirstName();
    const lastNameResult = await quotePage.selectDifferentLastName();
    // 2. Blur focus + trigger auto save
    await ormMsgPage.clickHeaderTab();
    await quotePage.handleUpdateCustomerModal();
    await ormMsgPage.clickHeaderTab();
    await quotePage.waitForAutoSaveCloudDone();
    // 3. Hard reload — wipes all in-memory state
    await page.reload();
    // 4. Verify all values survived the reload
    await quotePage.verifyEditedQuoteValuesAfterReload({
      transmission: transmissionResult.selectedTransmission,
      paintGroup: paintGroupResult.selectedPaintGroup,
      color: colorResult.selectedColor,
      vin,
      engineNo,
      odometer,
      cylinders,
      engineSize,
      trimCode,
      paintCode,
      insurer: insurerResult.selectedInsurer,
      firstName: firstNameResult.newFirstName,
      lastName: lastNameResult.newLastName,
    });
  });
});
