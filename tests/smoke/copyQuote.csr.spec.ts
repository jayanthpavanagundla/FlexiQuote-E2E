import { test, expect } from "@playwright/test";
import { NavBarPage } from "../../pages/NavBarPage";
import { SubNavBarPage } from "../../pages/SubNavBarPage";
import { QuotePage } from "../../pages/Quote/QuotePage";
import { QuoteItemsPage } from "../../pages/Quote/QuoteItems";
import { QuoteNavBar } from "../../pages/Quote/QuoteNavBar";
import { ORM } from "../../pages/ORM";
import { epic, step } from "allure-js-commons";

let newquoteNumber: string;
let existingQuoteNumber: string;
let quoteNumber: string = "10250";

test.describe("Copy Quote", () => {
  test.describe.configure({ mode: "serial" });

  let navBarPage: NavBarPage;
  let subNavBarPage: SubNavBarPage;
  let quotePage: QuotePage;
  let quoteNavBar: QuoteNavBar;
  let ormMsgPage: ORM;
  let quoteItemsPage: QuoteItemsPage;

  test.beforeEach(async ({ page }) => {
    await epic("Copy Quote");

    navBarPage = new NavBarPage(page);
    quotePage = new QuotePage(page);
    subNavBarPage = new SubNavBarPage(page);
    quoteNavBar = new QuoteNavBar(page);
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
    await quotePage.enterEstimator("John Doe");
    // Section 04 — Key Dates
    await quotePage.enterEstimateStartDate();
    await quotePage.enterEstimateEndDate();
    // Save Quote
    await subNavBarPage.clickCreateButton();
  });

  test("Copy Quote to New Quote", async ({}) => {
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await quotePage.searchAndOpenQuoteByNumber(quoteNumber);
    const originalQuoteData = await quotePage.captureQuoteFieldValues();
    await subNavBarPage.clickEllipisBtn();
    await subNavBarPage.selectCopyQuote();
    await subNavBarPage.copyToNewQuote();
    await subNavBarPage.expectToast(
      "Copy quote successful. Please remember to save quote.",
    );
    await subNavBarPage.clickCreateButton();
    newquoteNumber = await navBarPage.extractAndStoreQuoteNumber();
    await subNavBarPage.expectToast(`New quote ${newquoteNumber} added`);
    const copiedQuoteData = await quotePage.captureQuoteFieldValues();
    await quotePage.verifyCopiedQuoteValuesMatch(
      originalQuoteData,
      copiedQuoteData,
      newquoteNumber,
    );
  });

  test("Copy Quote from AH-OFF to AH-ON", async ({}) => {
    const targetQuoteNo = String(Number(quoteNumber) - 7);
    // Verify target quote (AH-ON)
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await quotePage.searchAndOpenQuoteByNumber(targetQuoteNo);
    await subNavBarPage.clickEllipisBtn();
    await subNavBarPage.enableAssessmentHistory();
    await subNavBarPage.clickSaveButton();
    // Verify source quote (AH-OFF)
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await quotePage.searchAndOpenQuoteByNumber(quoteNumber);
    await subNavBarPage.clickEllipisBtn();
    await subNavBarPage.disableAssessmentHistory();
    await subNavBarPage.clickSaveButton();
    await quoteNavBar.goToQuotingTab();
    await quotePage.openVehicleSectionsTab();
    await quoteItemsPage.addQuotingItemsByIndex(5);
    await quoteNavBar.goToQuotingTab();
    await subNavBarPage.clickSaveButton();
    await subNavBarPage.expectToast(`Quote ${quoteNumber} saved`);
    const newQuoteItemsSequence =
      await quoteItemsPage.captureQuotingItemsSequence();
    await subNavBarPage.clickEllipisBtn();
    await subNavBarPage.selectCopyQuote();
    await subNavBarPage.copyToExistingQuote(targetQuoteNo);
    await subNavBarPage.expectToast(
      "Copy quote successful. Please remember to save quote.",
    );
    await subNavBarPage.clickSaveButton();
    await quoteNavBar.goToQuotingTab();
    await quoteItemsPage.verifyCopytoExistingItemsSequence(
      newQuoteItemsSequence,
    );
    await quoteItemsPage.deleteAllParts();
    await quoteNavBar.goToHeaderTab();
    existingQuoteNumber = await navBarPage.extractAndStoreQuoteNumber();
    await step(`"${existingQuoteNumber}" === "${targetQuoteNo}"`, async () => {
      expect(existingQuoteNumber).toBe(targetQuoteNo);
    });
  });

  test("Copy Quote from AH-OFF to AH-OFF", async ({}) => {
    const targetQuoteNo = String(Number(quoteNumber) - 7);
    // Verify target quote (AH-OFF)
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await quotePage.searchAndOpenQuoteByNumber(targetQuoteNo);
    await subNavBarPage.clickEllipisBtn();
    await subNavBarPage.disableAssessmentHistory();
    await subNavBarPage.clickSaveButton();
    // Verify source quote (AH-OFF)
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await quotePage.searchAndOpenQuoteByNumber(quoteNumber);
    await subNavBarPage.clickEllipisBtn();
    await subNavBarPage.disableAssessmentHistory();
    await subNavBarPage.clickSaveButton();
    // Add quote items
    await quoteNavBar.goToQuotingTab();
    await quoteItemsPage.deleteAllParts();
    await quotePage.openVehicleSectionsTab();
    await quoteItemsPage.addQuotingItemsByIndex(5);
    await quoteNavBar.goToQuotingTab();
    await subNavBarPage.clickSaveButton();
    await subNavBarPage.expectToast(`Quote ${quoteNumber} saved`);
    // Capture source quote item sequence
    const newQuoteItemsSequence =
      await quoteItemsPage.captureQuotingItemsSequence();
    // Copy to existing AH-OFF quote
    await subNavBarPage.clickEllipisBtn();
    await subNavBarPage.selectCopyQuote();
    await subNavBarPage.copyToExistingQuote(targetQuoteNo);
    await subNavBarPage.expectToast(
      "Copy quote successful. Please remember to save quote.",
    );
    await subNavBarPage.clickSaveButton();
    // Verify copied items
    await quoteNavBar.goToQuotingTab();
    await quoteItemsPage.verifyCopytoExistingItemsSequence(
      newQuoteItemsSequence,
    );
    // Cleanup
    await quoteItemsPage.deleteAllParts();
    await quoteNavBar.goToHeaderTab();
    existingQuoteNumber = await navBarPage.extractAndStoreQuoteNumber();
    await step(`"${existingQuoteNumber}" === "${targetQuoteNo}"`, async () => {
      expect(existingQuoteNumber).toBe(targetQuoteNo);
    });
  });

  test("Copy Quote from AH-ON to AH-OFF", async ({}) => {
    const targetQuoteNo = String(Number(quoteNumber) - 7);
    // Configure target quote (AH-OFF)
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await quotePage.searchAndOpenQuoteByNumber(targetQuoteNo);
    await subNavBarPage.clickEllipisBtn();
    await subNavBarPage.disableAssessmentHistory();
    await subNavBarPage.clickSaveButton();
    // Configure source quote (AH-ON)
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await quotePage.searchAndOpenQuoteByNumber(quoteNumber);
    await subNavBarPage.clickEllipisBtn();
    await subNavBarPage.enableAssessmentHistory();
    await subNavBarPage.clickSaveButton();
    // Add quote items
    await quoteNavBar.goToQuotingTab();
    await quoteItemsPage.deleteAllParts();
    await quotePage.openVehicleSectionsTab();
    await quoteItemsPage.addQuotingItemsByIndex(5);
    await quoteNavBar.goToQuotingTab();
    await subNavBarPage.clickSaveButton();
    await subNavBarPage.expectToast(`Quote ${quoteNumber} saved`);
    const newQuoteItemsSequence =
      await quoteItemsPage.captureQuotingItemsSequence();
    // Copy quote
    await subNavBarPage.clickEllipisBtn();
    await subNavBarPage.selectCopyQuote();
    await subNavBarPage.copyToExistingQuote(targetQuoteNo);
    await subNavBarPage.expectToast(
      "Copy quote successful. Please remember to save quote.",
    );
    await subNavBarPage.clickSaveButton();
    // Verify copied items
    await quoteNavBar.goToQuotingTab();
    await quoteItemsPage.verifyCopytoExistingItemsSequence(
      newQuoteItemsSequence,
    );
    // Cleanup
    await quoteItemsPage.deleteAllParts();
    await quoteNavBar.goToHeaderTab();
    existingQuoteNumber = await navBarPage.extractAndStoreQuoteNumber();
    await step(`"${existingQuoteNumber}" === "${targetQuoteNo}"`, async () => {
      expect(existingQuoteNumber).toBe(targetQuoteNo);
    });
  });

  test("Copy Quote from AH-ON to AH-ON", async ({}) => {
    const targetQuoteNo = String(Number(quoteNumber) - 7);
    // Configure target quote (AH-ON)
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await quotePage.searchAndOpenQuoteByNumber(targetQuoteNo);
    await subNavBarPage.clickEllipisBtn();
    await subNavBarPage.enableAssessmentHistory();
    await subNavBarPage.clickSaveButton();
    // Configure source quote (AH-ON)
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await quotePage.searchAndOpenQuoteByNumber(quoteNumber);
    await subNavBarPage.clickEllipisBtn();
    await subNavBarPage.enableAssessmentHistory();
    await subNavBarPage.clickSaveButton();
    // Add quote items
    await quoteNavBar.goToQuotingTab();
    await quoteItemsPage.deleteAllParts();
    await quotePage.openVehicleSectionsTab();
    await quoteItemsPage.addQuotingItemsByIndex(5);
    await quoteNavBar.goToQuotingTab();
    await subNavBarPage.clickSaveButton();
    await subNavBarPage.expectToast(`Quote ${quoteNumber} saved`);
    const newQuoteItemsSequence =
      await quoteItemsPage.captureQuotingItemsSequence();
    // Copy quote
    await subNavBarPage.clickEllipisBtn();
    await subNavBarPage.selectCopyQuote();
    await subNavBarPage.copyToExistingQuote(targetQuoteNo);
    await subNavBarPage.expectToast(
      "Copy quote successful. Please remember to save quote.",
    );
    await subNavBarPage.clickSaveButton();
    // Verify copied items
    await quoteNavBar.goToQuotingTab();
    await quoteItemsPage.verifyCopytoExistingItemsSequence(
      newQuoteItemsSequence,
    );
    // Cleanup
    await quoteItemsPage.deleteAllParts();
    await quoteNavBar.goToHeaderTab();
    existingQuoteNumber = await navBarPage.extractAndStoreQuoteNumber();
    await step(`"${existingQuoteNumber}" === "${targetQuoteNo}"`, async () => {
      expect(existingQuoteNumber).toBe(targetQuoteNo);
    });
  });
});
