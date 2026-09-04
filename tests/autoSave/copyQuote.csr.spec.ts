import { test, expect } from "@playwright/test";
import { NavBarPage } from "../../pages/NavBarPage";
import { SubNavBarPage } from "../../pages/SubNavBarPage";
import { QuotePage } from "../../pages/Quote/QuotePage";
import { QuoteItemsPage } from "../../pages/Quote/QuoteItems";
import { QuoteNavBar } from "../../pages/Quote/QuoteNavBar";
import { epic, feature, step } from "allure-js-commons";

let quoteNumber: string;
let newquoteNumber: string;
let existingQuoteNumber: string;

test.describe("Auto Save", () => {
  let navBarPage: NavBarPage;
  let subNavBarPage: SubNavBarPage;
  let quotePage: QuotePage;
  let quoteNavBar: QuoteNavBar;
  let quoteItemsPage: QuoteItemsPage;

  // / ============================================================
  // CREATE SOURCE QUOTE ONLY ONCE
  // ============================================================

  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    const navBarPage = new NavBarPage(page);
    const quotePage = new QuotePage(page);
    const subNavBarPage = new SubNavBarPage(page);

    await page.goto("v2/");
    await expect(page).toHaveURL(/\/v2\/$/);

    // Create source quote ONLY ONCE
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

    // Section 02 — Customer Details
    await quotePage.fillFirstName();
    await quotePage.fillLastName();

    // Section 03 — Insurance Details
    await quotePage.selectRandomInsurer();
    await quotePage.fillClaimNumber();
    await quotePage.enterEstimator("John Doe");

    // Section 04 — Key Dates
    await quotePage.enterEstimateStartDate();
    await quotePage.enterEstimateEndDate();
    await subNavBarPage.clickCreateButton();
    await subNavBarPage.expectToast(`New quote ${quoteNumber} added`);
    await page.close();
  });

  test.beforeEach(async ({ page }) => {
    await epic("Auto Save");
    await feature("Copy Quote");

    navBarPage = new NavBarPage(page);
    quotePage = new QuotePage(page);
    quoteNavBar = new QuoteNavBar(page);
    subNavBarPage = new SubNavBarPage(page);
    quoteItemsPage = new QuoteItemsPage(page);

    await page.goto("v2/");
    await expect(page).toHaveURL(/\/v2\/$/);
  });

  // TEST 01
  // COPY QUOTE TO NEW QUOTE
  test("Copy Quote to New Quote", async ({}) => {
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await quotePage.searchAndOpenQuoteByNumber(quoteNumber);
    const originalQuoteData = await quotePage.captureQuoteFieldValues();
    await subNavBarPage.clickEllipisBtn();
    await subNavBarPage.selectCopyQuote();
    await subNavBarPage.copyToNewQuote();
    await subNavBarPage.expectToast("Copy quote successful. Please remember to save quote.",);
    await subNavBarPage.clickCreateButton();
    newquoteNumber = await navBarPage.extractAndStoreQuoteNumber();
    await subNavBarPage.expectToast(`New quote ${newquoteNumber} added`);
    const copiedQuoteData = await quotePage.captureQuoteFieldValues();
    await quotePage.verifyCopiedQuoteValuesMatch(originalQuoteData,copiedQuoteData,newquoteNumber);
  });

  // TEST 02
  // SOURCE AH-OFF → TARGET AH-ON
   test("Copy Quote from AH-OFF to AH-ON", async ({ page }) => {
      test.setTimeout(200_000);
      let targetQuoteNo = String(Number(quoteNumber) - 7);
      // Verify target quote (AH-ON)
      await navBarPage.openQuoteDropdown();
      await navBarPage.selectRepairerQuote();
      targetQuoteNo = await quotePage.openExistingQuoteForCopy(targetQuoteNo,quoteNumber);
      await subNavBarPage.clickEllipisBtn();
      await subNavBarPage.enableAssessmentHistory();
      await quotePage.waitForAutoSaveCloudDone();
      await page.keyboard.press("Escape"); 
      // Verify source quote (AH-OFF)
      await navBarPage.openQuoteDropdown();
      await navBarPage.selectRepairerQuote();
      await quotePage.searchAndOpenQuoteByNumber(quoteNumber);
      await subNavBarPage.clickEllipisBtn();
      await subNavBarPage.disableAssessmentHistory();
      await quotePage.waitForAutoSaveCloudDone();
      await page.keyboard.press("Escape"); 
      await quoteNavBar.goToQuotingTab();
      await quotePage.openVehicleSectionsTab();
      await quoteItemsPage.addQuotingItemsByIndex(5);
      await quoteNavBar.goToQuotingTab();
      await quotePage.waitForAutoSaveCloudDone();
      const newQuoteItemsSequence = await quoteItemsPage.captureQuotingItemsSequence();
      await subNavBarPage.clickEllipisBtn();
      await subNavBarPage.selectCopyQuote();
      await subNavBarPage.copyToExistingQuote(targetQuoteNo);
      await subNavBarPage.expectToast("Copy quote successful.");
      await page.waitForTimeout(10_000);
      // Verify Quote Number
      existingQuoteNumber = await navBarPage.extractAndStoreQuoteNumber();
      await step(`"${existingQuoteNumber}" === "${targetQuoteNo}"`, async () => {
        expect(existingQuoteNumber).toBe(targetQuoteNo);
      });
      // Verify Quoting Items and Sequence
      await quoteNavBar.goToQuotingTab();
      await quoteItemsPage.verifyCopytoExistingItemsSequence(newQuoteItemsSequence);
      await quoteItemsPage.deleteAllParts();
      await quotePage.waitForAutoSaveCloudDone();
      // Clean up the source quote so the next test starts with empty quoting
      await navBarPage.openQuoteDropdown();
      await navBarPage.selectRepairerQuote();
      await quotePage.searchAndOpenQuoteByNumber(quoteNumber);
      await quoteNavBar.goToQuotingTab();
      await quoteItemsPage.deleteAllParts();
      await quotePage.waitForAutoSaveCloudDone();
    });

  // TEST 03
  // SOURCE AH-OFF → TARGET AH-OFF
  test("Copy Quote from AH-OFF to AH-OFF", async ({ page }) => {
    test.setTimeout(200_000);
    let targetQuoteNo = String(Number(quoteNumber) - 8);
    // Configure target quote (AH-OFF)
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    targetQuoteNo = await quotePage.openExistingQuoteForCopy(targetQuoteNo,quoteNumber);
    await subNavBarPage.clickEllipisBtn();
    await subNavBarPage.disableAssessmentHistory();
    await quotePage.waitForAutoSaveCloudDone();
    await page.keyboard.press("Escape");
    // Configure source quote (AH-OFF)
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await quotePage.searchAndOpenQuoteByNumber(quoteNumber);
    await subNavBarPage.clickEllipisBtn();
    await subNavBarPage.disableAssessmentHistory();
    await quotePage.waitForAutoSaveCloudDone();
    await page.keyboard.press("Escape");
    await quoteNavBar.goToQuotingTab();
    await quotePage.openVehicleSectionsTab();
    await quoteItemsPage.addQuotingItemsByIndex(5);
    await quoteNavBar.goToQuotingTab();
    await quotePage.waitForAutoSaveCloudDone();
    const newQuoteItemsSequence = await quoteItemsPage.captureQuotingItemsSequence();
    await subNavBarPage.clickEllipisBtn();
    await subNavBarPage.selectCopyQuote();
    await subNavBarPage.copyToExistingQuote(targetQuoteNo);
    await subNavBarPage.expectToast("Copy quote successful.");
    await page.waitForTimeout(10_000);
    // Verify Quote Number
    existingQuoteNumber = await navBarPage.extractAndStoreQuoteNumber();
    await step(`"${existingQuoteNumber}" === "${targetQuoteNo}"`, async () => {
      expect(existingQuoteNumber).toBe(targetQuoteNo);
    });
    // Verify Quoting Items and Sequence
    await quoteNavBar.goToQuotingTab();
    await quoteItemsPage.verifyCopytoExistingItemsSequence(newQuoteItemsSequence);
    await quoteItemsPage.deleteAllParts();
    await quotePage.waitForAutoSaveCloudDone();
    // Clean up the source quote so the next test starts with empty quoting
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await quotePage.searchAndOpenQuoteByNumber(quoteNumber);
    await quoteNavBar.goToQuotingTab();
    await quoteItemsPage.deleteAllParts();
    await quotePage.waitForAutoSaveCloudDone();
  });

  // TEST 04
  // SOURCE AH-ON → TARGET AH-OFF
  test("Copy Quote from AH-ON to AH-OFF", async ({ page }) => {
    test.setTimeout(200_000);
    let targetQuoteNo = String(Number(quoteNumber) - 9);
    // Configure target quote (AH-OFF)
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    targetQuoteNo = await quotePage.openExistingQuoteForCopy(targetQuoteNo,quoteNumber);
    await subNavBarPage.clickEllipisBtn();
    await subNavBarPage.disableAssessmentHistory();
    await quotePage.waitForAutoSaveCloudDone();
    await page.keyboard.press("Escape");
    // Configure source quote (AH-ON)
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await quotePage.searchAndOpenQuoteByNumber(quoteNumber);
    await subNavBarPage.clickEllipisBtn();
    await subNavBarPage.enableAssessmentHistory();
    await quotePage.waitForAutoSaveCloudDone();
    await page.keyboard.press("Escape");
    await quoteNavBar.goToQuotingTab();
    await quotePage.openVehicleSectionsTab();
    await quoteItemsPage.addQuotingItemsByIndex(5);
    await quoteNavBar.goToQuotingTab();
    await quotePage.waitForAutoSaveCloudDone();
    const newQuoteItemsSequence =
      await quoteItemsPage.captureQuotingItemsSequence();
    await subNavBarPage.clickEllipisBtn();
    await subNavBarPage.selectCopyQuote();
    await subNavBarPage.copyToExistingQuote(targetQuoteNo);
    await subNavBarPage.expectToast("Copy quote successful.");
    await page.waitForTimeout(10_000);
    // Verify Quote Number
    existingQuoteNumber = await navBarPage.extractAndStoreQuoteNumber();
    await step(`"${existingQuoteNumber}" === "${targetQuoteNo}"`, async () => {
      expect(existingQuoteNumber).toBe(targetQuoteNo);
    });
    // Verify Quoting Items and Sequence
    await quoteNavBar.goToQuotingTab();
    await quoteItemsPage.verifyCopytoExistingItemsSequence(newQuoteItemsSequence);
    await quoteItemsPage.deleteAllParts();
    await quotePage.waitForAutoSaveCloudDone();
    // Clean up the source quote so the next test starts with empty quoting
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await quotePage.searchAndOpenQuoteByNumber(quoteNumber);
    await quoteNavBar.goToQuotingTab();
    await quoteItemsPage.deleteAllParts();
    await quotePage.waitForAutoSaveCloudDone();
  });


  // TEST 05
  // SOURCE AH-ON → TARGET AH-ON
  test("Copy Quote from AH-ON to AH-ON", async ({ page }) => {
    test.setTimeout(200_000);
    let targetQuoteNo = String(Number(quoteNumber) - 10);
    // Configure target quote (AH-ON)
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    targetQuoteNo = await quotePage.openExistingQuoteForCopy(targetQuoteNo,quoteNumber);
    await subNavBarPage.clickEllipisBtn();
    await subNavBarPage.enableAssessmentHistory();
    await quotePage.waitForAutoSaveCloudDone();
    await page.keyboard.press("Escape");
    // Configure source quote (AH-ON)
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await quotePage.searchAndOpenQuoteByNumber(quoteNumber);
    await subNavBarPage.clickEllipisBtn();
    await subNavBarPage.enableAssessmentHistory();
    await quotePage.waitForAutoSaveCloudDone();
    await page.keyboard.press("Escape");
    await quoteNavBar.goToQuotingTab();
    await quotePage.openVehicleSectionsTab();
    await quoteItemsPage.addQuotingItemsByIndex(5);
    await quoteNavBar.goToQuotingTab();
    await quotePage.waitForAutoSaveCloudDone();
    const newQuoteItemsSequence = await quoteItemsPage.captureQuotingItemsSequence();
    await subNavBarPage.clickEllipisBtn();
    await subNavBarPage.selectCopyQuote();
    await subNavBarPage.copyToExistingQuote(targetQuoteNo);
    await subNavBarPage.expectToast("Copy quote successful.");
    await page.waitForTimeout(10_000);
    // Verify Quote Number
    existingQuoteNumber = await navBarPage.extractAndStoreQuoteNumber();
    await step(`"${existingQuoteNumber}" === "${targetQuoteNo}"`, async () => {
      expect(existingQuoteNumber).toBe(targetQuoteNo);
    });
    // Verify Quoting Items and Sequence
    await quoteNavBar.goToQuotingTab();
    await quoteItemsPage.verifyCopytoExistingItemsSequence(newQuoteItemsSequence);
    await quoteItemsPage.deleteAllParts();
    await quotePage.waitForAutoSaveCloudDone();
    // Clean up the source quote so the next test starts with empty quoting
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await quotePage.searchAndOpenQuoteByNumber(quoteNumber);
    await quoteNavBar.goToQuotingTab();
    await quoteItemsPage.deleteAllParts();
    await quotePage.waitForAutoSaveCloudDone();
  });
});