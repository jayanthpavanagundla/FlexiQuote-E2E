import { test, expect } from "@playwright/test";
import { NavBarPage } from "../../pages/NavBarPage";
import { SubNavBarPage } from "../../pages/SubNavBarPage";
import { QuotePage } from "../../pages/Quote/QuotePage";
import { QuoteItemsPage } from "../../pages/Quote/QuoteItems";
import { QuoteNavBar } from "../../pages/Quote/QuoteNavBar";
import { epic, step } from "allure-js-commons";

let quoteNumber: string;
let addedParts: string[] = [];
// let quoteNumber: string = "10139";

test.describe("Create Quote", () => {
  let navBarPage: NavBarPage;
  let subNavBarPage: SubNavBarPage;
  let quotePage: QuotePage;
  let quoteNavBar: QuoteNavBar;
  let quoteItemsPage: QuoteItemsPage;

  test.beforeEach(async ({ page }) => {
    await epic("Auto Save");

    navBarPage = new NavBarPage(page);
    quotePage = new QuotePage(page);
    subNavBarPage = new SubNavBarPage(page);
    quoteItemsPage = new QuoteItemsPage(page);
    quoteNavBar = new QuoteNavBar(page);

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
    await quotePage.enterEstimator("John Doe");
    // Section 04 — Key Dates
    await quotePage.enterEstimateStartDate();
    await quotePage.enterEstimateEndDate();
    // Save Quote
    await subNavBarPage.clickCreateButton();
  });

  test("Edit Quote and Verify", async ({ page }) => {
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await quotePage.searchAndOpenQuoteByNumber(quoteNumber);
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
    await quotePage.selectDifferentInsurer();
    await quotePage.selectDifferentFirstName();
    await quotePage.selectDifferentLastName();
    // 2. Save, handle the (random) Update Customer modal, verify toast
    await subNavBarPage.clickSaveButton();
    await quotePage.handleUpdateCustomerModal();
    await subNavBarPage.expectToast(`Quote ${quoteNumber} saved`);
    // 3. Capture the actual persisted customer + insurer from the UI — the random
    //    modal choice decides these — then verify they survive a hard reload.
    const persisted = await quotePage.captureCustomerAndInsurer();
    await page.reload();
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
      insurer: persisted.insurer,
      firstName: persisted.firstName,
      lastName: persisted.lastName,
    });
  });

  test("Add Quoting Items", async ({ page }) => {
    test.setTimeout(600_000);
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await quotePage.searchAndOpenQuoteByNumber(quoteNumber);
    await quoteNavBar.goToQuotingTab();
    await quotePage.openVehicleSectionsTab();
    addedParts = await quoteItemsPage.addQuotingItemsByIndex(20);
    await quoteNavBar.goToQuotingTab();
    await subNavBarPage.clickSaveButton();
  });

  test("Verify Quoting Item Sequence", async ({ page }) => {
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await quotePage.searchAndOpenQuoteByNumber(quoteNumber);
    await quoteNavBar.goToQuotingTab();
    await page.reload({ waitUntil: "networkidle" });
    await quoteNavBar.goToQuotingTab();
    await quoteItemsPage.verifyPartsOrderAfterReload(addedParts);
  });

  test("Verify Line Number Sequence", async ({ page }) => {
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await quotePage.searchAndOpenQuoteByNumber(quoteNumber);
    await quoteNavBar.goToQuotingTab();
    await page.reload({ waitUntil: "networkidle" });
    await quoteNavBar.goToQuotingTab();
    await quoteItemsPage.verifyLineNumberSequence();
  });

  test("Delete All Parts", async ({ page }) => {
    test.setTimeout(120_000);
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await quotePage.searchAndOpenQuoteByNumber(quoteNumber);
    await quoteNavBar.goToQuotingTab();
    await quoteItemsPage.deleteAllParts();
    await subNavBarPage.clickSaveButton();
  });
});
