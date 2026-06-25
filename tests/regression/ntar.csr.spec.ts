import { test, expect } from "@playwright/test";
import { NavBarPage } from "../../pages/NavBarPage";
import { SubNavBarPage } from "../../pages/SubNavBarPage";
import { QuotePage } from "../../pages/Quote/QuotePage";
import { QuoteItemsPage } from "../../pages/Quote/QuoteItems";
import { ORM } from "../../pages/ORM";
import { epic, step } from "allure-js-commons";

// let quoteNumber: string;
let addedParts: string[] = [];
let quoteNumber: string = "10403";

test.describe("NTAR Quote", () => {
  let navBarPage: NavBarPage;
  let subNavBarPage: SubNavBarPage;
  let quotePage: QuotePage;
  let quoteItemsPage: QuoteItemsPage;
  let ormMsgPage: ORM;

  test.beforeEach(async ({ page }) => {
    await epic("Auto Save");

    navBarPage = new NavBarPage(page);
    quotePage = new QuotePage(page);
    subNavBarPage = new SubNavBarPage(page);
    ormMsgPage = new ORM(page);
    quoteItemsPage = new QuoteItemsPage(page);

    await page.goto("v2/");
    await expect(page).toHaveURL(/\/v2\/$/);
  });

  //   test("Quote Creation", async ({ page }) => {
  //     await navBarPage.openQuoteDropdown();
  //     await navBarPage.selectRepairerQuote();
  //     await subNavBarPage.clickPlusNewButton();
  //     quoteNumber = await navBarPage.extractAndStoreQuoteNumber();
  //     // Section 01 — Vehicle Details
  //     await quotePage.fillRegNo();
  //     await quotePage.selectState();
  //     await quotePage.makeAndModel();
  //     await quotePage.selectDifferentPaintGroup();
  //     await quotePage.selectDifferentTransmission();
  //     await quotePage.selectDifferentColor();
  //     await quotePage.fillVinNo();
  //     await quotePage.fillEngineNo();
  //     await quotePage.fillOdometer();
  //     await quotePage.fillCylinders();
  //     await quotePage.fillEngineSize();
  //     await quotePage.fillTrimCode();
  //     await quotePage.fillPaintCode();
  //     // Section 02 - Customer Details
  //     await quotePage.fillFirstName();
  //     await quotePage.fillLastName();
  //     // Section 03 — Insurance Details
  //     await quotePage.selectInsurer("Insurance Australia Limited");
  //     await quotePage.fillClaimNumber();
  //     await ormMsgPage.enterEstimator("John Doe");
  //     // Section 04 — Key Dates
  //     await ormMsgPage.enterEstimateStartDate();
  //     await ormMsgPage.enterEstimateEndDate();
  //     // Save Quote
  //     await subNavBarPage.clickCreateButton();
  //   });

  test("Adding Bonnet and Verify Consumables", async ({ page }) => {
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await ormMsgPage.searchAndOpenQuoteByNumber(quoteNumber);
    await ormMsgPage.openQuotingTab();
    await ormMsgPage.openVehicleSectionsTab();
    await quoteItemsPage.selectVehiclePart("Bonnet");
    await subNavBarPage.expectToast("1 Item added");
    await quoteItemsPage.selectVehiclePart("Turret");
    await subNavBarPage.expectToast("1 Item added");
    await quoteItemsPage.selectVehiclePart("Grille");
    await subNavBarPage.expectToast("1 Item added");
    await quoteItemsPage.changePartsToUsedOrExchange("USED");
    await subNavBarPage.clickSaveButton();
    await subNavBarPage.expectToast(`Quote ${quoteNumber} saved`);
  });
});
