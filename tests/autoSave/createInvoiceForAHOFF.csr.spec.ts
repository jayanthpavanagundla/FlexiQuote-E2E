import {test,expect,type Response as PlaywrightResponse} from "@playwright/test";
import { NavBarPage } from "../../pages/NavBarPage";
import { SubNavBarPage } from "../../pages/SubNavBarPage";
import { QuotePage } from "../../pages/Quote/QuotePage";
import { QuoteItemsPage } from "../../pages/Quote/QuoteItems";
import { QuoteNavBar } from "../../pages/Quote/QuoteNavBar";
import { epic, step, feature } from "allure-js-commons";

let quoteNumber: string;
let addedParts: string[] = [];

test.describe("Invoice for AH-OFF Quotes", () => {
  let navBarPage: NavBarPage;
  let subNavBarPage: SubNavBarPage;
  let quotePage: QuotePage;
  let quoteItemsPage: QuoteItemsPage;
  let quoteNavBar: QuoteNavBar;

  test.beforeEach(async ({ page }) => {
    await epic("Auto Save");
    await feature("Invoice for AH-OFF Quotes");

    navBarPage = new NavBarPage(page);
    quotePage = new QuotePage(page);
    subNavBarPage = new SubNavBarPage(page);
    quoteNavBar = new QuoteNavBar(page);
    quoteItemsPage = new QuoteItemsPage(page);

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
    await quotePage.enterEstimator("John Doe");
    // Section 04 — Key Dates
    await quotePage.enterEstimateStartDate();
    await quotePage.enterEstimateEndDate();
    // Save Quote
    await subNavBarPage.clickCreateButton();
    await subNavBarPage.expectToast(`New quote ${quoteNumber} added`);
    // Making Quote AH-OFF
    await subNavBarPage.disableAssessmentHistory();
    await quoteNavBar.goToHeaderTab();
    await quotePage.waitForAutoSaveCloudDone();
  });

  test("Add Quoting Items", async ({ page }) => {
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await quotePage.searchAndOpenQuoteByNumber(quoteNumber);
    await quoteNavBar.goToQuotingTab();
    await quotePage.openVehicleSectionsTab();
    addedParts = await quoteItemsPage.addQuotingItemsByIndex(2);
    await quoteNavBar.goToQuotingTab();
    await quotePage.waitForAutoSaveCloudDone();
    await quotePage.openManualSectionsTab();
    await quoteItemsPage.randomPriceForItems();
    await quoteNavBar.goToQuotingTab();
    await quotePage.waitForAutoSaveCloudDone();
  });

  test("Invoice Creation", async ({ page }) => {
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await quotePage.searchAndOpenQuoteByNumber(quoteNumber);
    await quoteNavBar.goToInvoiceTab();
    await subNavBarPage.clickInvoicePlusButton();
    await subNavBarPage.clickInvoiceSaveButton();
    await subNavBarPage.expectToast(`Quote ${quoteNumber} saved`);

    // Capture Invoice summary totals from the UI before opening the preview
    const invoiceTotals = await subNavBarPage.fetchInvoiceSummaryTotals();

    // Ok opens the Print Preview in a new tab
    await subNavBarPage.openPreview();
    const previewTab = await subNavBarPage.clickOkButton(true);
    if (previewTab) {
      subNavBarPage = new SubNavBarPage(previewTab);
    }
    await subNavBarPage.verifyPrintPreviewTitle();

    // Compare each UI total against its corresponding label in the PDF
    const extractAmount = (text: string): string => {
      const match = text.match(/\$[\d,]+\.\d{2}/);
      if (!match) {
        throw new Error(`Unable to extract amount from UI text: "${text}"`);
      }
      return match[0];
    };

    const totalExGst = extractAmount(invoiceTotals.totalExGst);
    const totalPayable = extractAmount(invoiceTotals.totalPayableIncGst);

    let pdfResponse: PlaywrightResponse;
    await step(
      `Verify Total (Ex GST) ${totalExGst} === Sub Total excl. GST ${totalExGst}`,
      async () => {
        pdfResponse = await subNavBarPage.verifyTextInPdf(
          `Sub Total excl. GST ${totalExGst}`,
        );
      },
    );
    await step(
      `Verify Total (Inc GST) ${totalPayable} === Total Payable incl. GST ${totalPayable}`,
      async () => {
        await subNavBarPage.verifyTextInPdf(
          `Total Payable incl. GST ${totalPayable}`,
          undefined,
          pdfResponse,
        );
      },
    );
  });
});
