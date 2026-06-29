import { test, expect } from "@playwright/test";
import { NavBarPage } from "../../pages/NavBarPage";
import { SubNavBarPage } from "../../pages/SubNavBarPage";
import { QuotePage } from "../../pages/Quote/QuotePage";
import { QuoteItemsPage } from "../../pages/Quote/QuoteItems";
import { ORM } from "../../pages/ORM";
import { epic, step } from "allure-js-commons";

let quoteNumber: string;
let addedParts: string[] = [];
// let quoteNumber: string = "10402";

test.describe("NTAR Quote", () => {
  let navBarPage: NavBarPage;
  let subNavBarPage: SubNavBarPage;
  let quotePage: QuotePage;
  let quoteItemsPage: QuoteItemsPage;
  let ormMsgPage: ORM;

  test.beforeEach(async ({ page }) => {
    navBarPage = new NavBarPage(page);
    quotePage = new QuotePage(page);
    subNavBarPage = new SubNavBarPage(page);
    ormMsgPage = new ORM(page);
    quoteItemsPage = new QuoteItemsPage(page);

    await epic("NTAR Module");

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
    await quotePage.selectInsurer("Insurance Australia Limited");
    await quotePage.fillClaimNumber();
    await ormMsgPage.enterEstimator("John Doe");
    // Section 04 — Key Dates
    await ormMsgPage.enterEstimateStartDate();
    await ormMsgPage.enterEstimateEndDate();
    // Save Quote
    await subNavBarPage.clickCreateButton();
    await subNavBarPage.expectToast(`New quote ${quoteNumber} added`);
  });

  test("Verify Paint and Misc Sections Are Visible when changned NEW Parts to USED Parts", async ({
    page,
  }) => {
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await ormMsgPage.searchAndOpenQuoteByNumber(quoteNumber);
    await ormMsgPage.openQuotingTab();
    await ormMsgPage.openVehicleSectionsTab();
    // Adding NTAR Parts
    await quoteItemsPage.selectVehiclePart("Bonnet");
    await subNavBarPage.expectToast("1 Item added");
    await quoteItemsPage.selectVehiclePart("Grille");
    await subNavBarPage.expectToast("1 Item added");
    await quoteItemsPage.selectVehiclePart("Turret");
    await subNavBarPage.expectToast("1 Item added");
    // Parts to USED Parts
    const changedParts =
      await quoteItemsPage.changePartsToUsedOrExchange("USED");
    await quoteItemsPage.expectConsumablesAdded(changedParts);
    await subNavBarPage.clickSaveButton();
    await subNavBarPage.expectToast(`Quote ${quoteNumber} saved`);
    await subNavBarPage.clickBackButton();
    await subNavBarPage.clickSaveAndContinueIfVisible(
      `Quote ${quoteNumber} saved`,
    );
    // Re-Open Quote to Verify the Paint and Consumbles are Visible
    await ormMsgPage.searchAndOpenQuoteByNumber(quoteNumber);
    await ormMsgPage.openQuotingTab();
    await ormMsgPage.openVehicleSectionsTab();
    await quoteItemsPage.expectConsumablesAdded(
      changedParts,
      "Verify Paint and Misc sections are visible after reopening the quote",
    );
  });

  test("Verify Paint and Misc Sections Are Removed When Changing USED Parts to NEW Parts", async ({
    page,
  }) => {
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await ormMsgPage.searchAndOpenQuoteByNumber(quoteNumber);
    await ormMsgPage.openQuotingTab();
    await ormMsgPage.openVehicleSectionsTab();
    const newConditionParts =
      await quoteItemsPage.changePartsToUsedOrExchange("NEW");
    await quoteItemsPage.expectConsumablesRemoved(
      newConditionParts,
      "Paint and Misc consumables should be removed after changing parts from USED to NEW",
    );
    await subNavBarPage.clickSaveButton();
    await subNavBarPage.expectToast(`Quote ${quoteNumber} saved`);
    await subNavBarPage.clickBackButton();
    await subNavBarPage.clickSaveAndContinueIfVisible(
      `Quote ${quoteNumber} saved`,
    );
    await ormMsgPage.searchAndOpenQuoteByNumber(quoteNumber);
    await ormMsgPage.openQuotingTab();
    await ormMsgPage.openVehicleSectionsTab();
    await quoteItemsPage.expectConsumablesRemoved(
      newConditionParts,
      "Paint and Misc sections should remain removed after reopening the quote with NEW parts",
    );
  });

  test("Verify Paint and Misc Sections Are Removed After Deleting USED Parts", async ({
    page,
  }) => {
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await ormMsgPage.searchAndOpenQuoteByNumber(quoteNumber);
    await ormMsgPage.openQuotingTab();
    await ormMsgPage.openVehicleSectionsTab();
    const changedParts =
      await quoteItemsPage.changePartsToUsedOrExchange("USED");
    await quoteItemsPage.expectConsumablesAdded(changedParts);
    await quoteItemsPage.deleteAllParts();
    await quoteItemsPage.expectConsumablesRemoved(
      changedParts,
      "Parts, Paint, and Misc consumables should be removed after deleting all parts",
    );
    await subNavBarPage.clickSaveButton();
    await subNavBarPage.expectToast(`Quote ${quoteNumber} saved`);
    await subNavBarPage.clickBackButton();
    await subNavBarPage.clickSaveAndContinueIfVisible(
      `Quote ${quoteNumber} saved`,
    );
    await ormMsgPage.searchAndOpenQuoteByNumber(quoteNumber);
    await ormMsgPage.openQuotingTab();
    await ormMsgPage.openVehicleSectionsTab();
    await quoteItemsPage.expectConsumablesRemoved(
      changedParts,
      "Parts, Paint, and Misc sections should remain deleted after reopening the quote",
    );
  });

  test("Verify Paint and Misc Sections Are Visible when changned NEW Parts to EXCHANGED Parts", async ({
    page,
  }) => {
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await ormMsgPage.searchAndOpenQuoteByNumber(quoteNumber);
    await ormMsgPage.openQuotingTab();
    await ormMsgPage.openVehicleSectionsTab();
    // Adding NTAR Parts
    await quoteItemsPage.selectVehiclePart("Bonnet");
    await subNavBarPage.expectToast("1 Item added");
    await quoteItemsPage.selectVehiclePart("Grille");
    await subNavBarPage.expectToast("1 Item added");
    await quoteItemsPage.selectVehiclePart("Turret");
    await subNavBarPage.expectToast("1 Item added");
    // Parts to EXCHANGE Parts
    const changedParts =
      await quoteItemsPage.changePartsToUsedOrExchange("EXCHANGE");
    await quoteItemsPage.expectConsumablesAdded(changedParts);
    await subNavBarPage.clickSaveButton();
    await subNavBarPage.expectToast(`Quote ${quoteNumber} saved`);
    await subNavBarPage.clickBackButton();
    await subNavBarPage.clickSaveAndContinueIfVisible(
      `Quote ${quoteNumber} saved`,
    );
    // Re-Open Quote to Verify the Paint and Consumbles are Visible
    await ormMsgPage.searchAndOpenQuoteByNumber(quoteNumber);
    await ormMsgPage.openQuotingTab();
    await ormMsgPage.openVehicleSectionsTab();
    await quoteItemsPage.expectConsumablesAdded(
      changedParts,
      "Verify Paint and Misc sections are visible after reopening the quote",
    );
  });

  test("Verify Paint and Misc Sections Are Removed When Changing EXCHANGED Parts to NEW Parts", async ({
    page,
  }) => {
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await ormMsgPage.searchAndOpenQuoteByNumber(quoteNumber);
    await ormMsgPage.openQuotingTab();
    await ormMsgPage.openVehicleSectionsTab();
    const newConditionParts =
      await quoteItemsPage.changePartsToUsedOrExchange("NEW");
    await quoteItemsPage.expectConsumablesRemoved(
      newConditionParts,
      "Paint and Misc consumables should be removed after changing parts from EXCHANGED to NEW",
    );
    await subNavBarPage.clickSaveButton();
    await subNavBarPage.expectToast(`Quote ${quoteNumber} saved`);
    await subNavBarPage.clickBackButton();
    await subNavBarPage.clickSaveAndContinueIfVisible(
      `Quote ${quoteNumber} saved`,
    );
    await ormMsgPage.searchAndOpenQuoteByNumber(quoteNumber);
    await ormMsgPage.openQuotingTab();
    await ormMsgPage.openVehicleSectionsTab();
    await quoteItemsPage.expectConsumablesRemoved(
      newConditionParts,
      "Paint and Misc sections should remain removed after reopening the quote with NEW parts",
    );
  });

  test("Verify Paint and Misc Sections Are Removed After Deleting EXCHANGED Parts", async ({
    page,
  }) => {
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await ormMsgPage.searchAndOpenQuoteByNumber(quoteNumber);
    await ormMsgPage.openQuotingTab();
    await ormMsgPage.openVehicleSectionsTab();
    const changedParts =
      await quoteItemsPage.changePartsToUsedOrExchange("EXCHANGE");
    await quoteItemsPage.expectConsumablesAdded(changedParts);
    await quoteItemsPage.deleteAllParts();
    await quoteItemsPage.expectConsumablesRemoved(
      changedParts,
      "Parts, Paint, and Misc consumables should be removed after deleting all parts",
    );
    await subNavBarPage.clickSaveButton();
    await subNavBarPage.expectToast(`Quote ${quoteNumber} saved`);
    await subNavBarPage.clickBackButton();
    await subNavBarPage.clickSaveAndContinueIfVisible(
      `Quote ${quoteNumber} saved`,
    );
    await ormMsgPage.searchAndOpenQuoteByNumber(quoteNumber);
    await ormMsgPage.openQuotingTab();
    await ormMsgPage.openVehicleSectionsTab();
    await quoteItemsPage.expectConsumablesRemoved(
      changedParts,
      "Parts, Paint, and Misc sections should remain deleted after reopening the quote",
    );
  });
});
