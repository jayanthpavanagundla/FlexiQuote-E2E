import { test, expect } from "@playwright/test";
import { NavBarPage } from "../../pages/NavBarPage";
import { SubNavBarPage } from "../../pages/SubNavBarPage";
import { epic, feature, story } from "allure-js-commons";
import { Response as PlaywrightResponse } from "@playwright/test";

test.describe("Listing Preview", () => {
  let navBarPage: NavBarPage;
  let subNavBarPage: SubNavBarPage;

  // Error message constant for PDF loading failure
  const SUBREPORT_ERROR = "Error: Subreport could not be shown";

  test.beforeEach(async ({ page }) => {
    await epic("Listing Preview");

    navBarPage = new NavBarPage(page);
    subNavBarPage = new SubNavBarPage(page);

    // Start at the FlexiQuote dashboard
    await page.goto("v2/");
    await expect(page).toHaveURL(/\/v2\/$/);
  });

  test("Repairer Quote Listing Preview", async ({ page }) => {
    await epic("Listing Preview");
    await feature("Quote Listing Preview");

    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await subNavBarPage.waitForTableToLoad();
    await subNavBarPage.openPreview();
    await subNavBarPage.openQuoteAnalysis();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "rptQuoteAnalysis",
      SUBREPORT_ERROR,
    );
  });

  test("Misc Quote Listing Preview", async ({ page }) => {
    await epic("Listing Preview");
    await feature("Quote Listing Preview");

    await navBarPage.openQuoteDropdown();
    await navBarPage.selectMiscQuote();
    await subNavBarPage.waitForTableToLoad();
    await subNavBarPage.openPreview();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "rptMiscQuoteListV2",
      SUBREPORT_ERROR,
    );
  });

  test("Quick Invoice Listing Preview", async ({ page }) => {
    await epic("Listing Preview");
    await feature("Debtor Listing Preview");

    await navBarPage.openDebtorDropdown();
    await navBarPage.selectQuickInvoice();
    await subNavBarPage.waitForTableToLoad();
    await subNavBarPage.openPreview();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "rptDebtorQuickInvoice",
      SUBREPORT_ERROR,
    );
  });

  test("Debtor Adjustment Listing Preview", async ({ page }) => {
    await epic("Listing Preview");
    await feature("Debtor Listing Preview");

    await navBarPage.openDebtorDropdown();
    await navBarPage.selectDebtorAdjustment();
    await subNavBarPage.waitForTableToLoad();
    await subNavBarPage.openPreview();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "rptDebtorAdjustment",
      SUBREPORT_ERROR,
    );
  });

  test("Receipt Entry Listing Preview", async ({ page }) => {
    await epic("Listing Preview");
    await feature("Debtor Listing Preview");

    await navBarPage.openDebtorDropdown();
    await navBarPage.selectReceiptEntry();
    await subNavBarPage.waitForTableToLoad();
    await subNavBarPage.openPreview();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "RPTDEBTORRECEIPTENTRY",
      SUBREPORT_ERROR,
    );
  });

  test("Sundry Creditor Listing Preview", async ({ page }) => {
    await epic("Listing Preview");
    await feature("Creditor Listing Preview");

    await navBarPage.openCreditorDropdown();
    await navBarPage.selectSundryCreditor();
    await subNavBarPage.waitForTableToLoad();
    await subNavBarPage.openPreview();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "rptCreditorSundryCreditor",
      SUBREPORT_ERROR,
    );
  });

  test("Payment Entry Listing Preview", async ({ page }) => {
    await epic("Listing Preview");
    await feature("Creditor Listing Preview");

    await navBarPage.openCreditorDropdown();
    await navBarPage.selectPaymentEntry();
    await subNavBarPage.waitForTableToLoad();
    await subNavBarPage.openPreview();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "rptCreditorPaymentEntryListV2",
      SUBREPORT_ERROR,
    );
  });

  test("Purchase Order Listing Preview", async ({ page }) => {
    await epic("Listing Preview");
    await feature("Creditor Listing Preview");

    await navBarPage.openCreditorDropdown();
    await navBarPage.selectPurchaseOrder();
    await subNavBarPage.waitForTableToLoad();
    await subNavBarPage.openPreview();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "AT_CreditorPurchaseOrderListV2",
      SUBREPORT_ERROR,
    );
  });

  test("Return Parts Listing Preview", async ({ page }) => {
    await epic("Listing Preview");
    await feature("Creditor Listing Preview");

    await navBarPage.openCreditorDropdown();
    await navBarPage.selectReturnParts();
    await subNavBarPage.waitForTableToLoad();
    await subNavBarPage.openPreview();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "RPTCREDITORRETURNPARTS",
      SUBREPORT_ERROR,
    );
  });

  test("JCNI Listing Preview", async ({ page }) => {
    await epic("Listing Preview");
    await feature("Report Listing Preview");

    await navBarPage.openReportDropdown();
    await navBarPage.selectJCNI();
    await subNavBarPage.waitForTableToLoad();
    await subNavBarPage.openPreview();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError("rptJCNI", SUBREPORT_ERROR);
  });

  test("Due In & Due Out Listing Preview", async ({ page }) => {
    await epic("Listing Preview");
    await feature("Report Listing Preview");

    await navBarPage.openReportDropdown();
    await navBarPage.selectDueInDueOut();
    await subNavBarPage.waitForTableToLoad();
    await subNavBarPage.openPreview();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "rptProductionInOut",
      SUBREPORT_ERROR,
    );
  });

  test("Job Invoiced Listing Preview", async ({ page }) => {
    await epic("Listing Preview");
    await feature("Report Listing Preview");

    await navBarPage.openReportDropdown();
    await navBarPage.selectJobInvoiced();
    await subNavBarPage.waitForTableToLoad();
    await subNavBarPage.openPreview();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "rptJobInvoiced",
      SUBREPORT_ERROR,
    );
  });

  test("Outstanding Parts Listing Preview", async ({ page }) => {
    await epic("Listing Preview");
    await feature("Report Listing Preview");

    await navBarPage.openReportDropdown();
    await navBarPage.selectOutstandingParts();
    await subNavBarPage.waitForTableToLoad();
    await subNavBarPage.openPreview();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "AT_OutStandingParts",
      SUBREPORT_ERROR,
    );
  });

  test("Outstanding Credits Listing Preview", async ({ page }) => {
    await epic("Listing Preview");
    await feature("Report Listing Preview");

    await navBarPage.openReportDropdown();
    await navBarPage.selectOutstandingCredits();
    await subNavBarPage.waitForTableToLoad();
    await subNavBarPage.openPreview();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "AT_OutstandingCredits",
      SUBREPORT_ERROR,
    );
  });

  test("Sales Analysis Listing Preview", async ({ page }) => {
    await epic("Listing Preview");
    await feature("Report Listing Preview");

    await navBarPage.openReportDropdown();
    await navBarPage.selectSalesAnalysis();
    await subNavBarPage.waitForTableToLoad();
    await subNavBarPage.openPreview();
    await subNavBarPage.openSalesAnalysis();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "rptSalesList",
      SUBREPORT_ERROR,
    );
  });

  test("Debtor List Listing Preview", async ({ page }) => {
    await epic("Listing Preview");
    await feature("Report Listing Preview");

    await navBarPage.openReportDropdown();
    await navBarPage.selectDebtorList();
    await subNavBarPage.waitForTableToLoad();
    await subNavBarPage.openPreview();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "AT_DebtorListV2",
      SUBREPORT_ERROR,
    );
  });

  test("Receipts Listing Preview", async ({ page }) => {
    await epic("Listing Preview");
    await feature("Report Listing Preview");

    await navBarPage.openReportDropdown();
    await navBarPage.selectReceipts();
    await subNavBarPage.waitForTableToLoad();
    await subNavBarPage.openPreview();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "rptReceiptListV2",
      SUBREPORT_ERROR,
    );
  });

  test("Creditor List Listing Preview", async ({ page }) => {
    await epic("Listing Preview");
    await feature("Report Listing Preview");

    await navBarPage.openReportDropdown();
    await navBarPage.selectCreditorList();
    await subNavBarPage.waitForTableToLoad();
    await subNavBarPage.openPreview();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "AT_CreditorListV2",
      SUBREPORT_ERROR,
    );
  });

  test("Payment List Listing Preview", async ({ page }) => {
    await epic("Listing Preview");
    await feature("Report Listing Preview");

    await navBarPage.openReportDropdown();
    await navBarPage.selectPaymentList();
    await subNavBarPage.waitForTableToLoad();
    await subNavBarPage.openPreview();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "AT_PaymentListV2",
      SUBREPORT_ERROR,
    );
  });

  test("Insurer Listing Preview", async ({ page }) => {
    await epic("Listing Preview");
    await feature("Tables Listing Preview");

    await navBarPage.openTablesDropdown();
    await navBarPage.selectInsurer();
    await subNavBarPage.waitForTableToLoad();
    await subNavBarPage.openPreview();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "rptInsurerList",
      SUBREPORT_ERROR,
    );
  });

  test("Customer Listing Preview", async ({ page }) => {
    await epic("Listing Preview");
    await feature("Tables Listing Preview");

    await navBarPage.openTablesDropdown();
    await navBarPage.selectCustomer();
    await subNavBarPage.waitForTableToLoad();
    await subNavBarPage.openPreview();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "rptCustomerList",
      SUBREPORT_ERROR,
    );
  });

  test("Vendor Listing Preview", async ({ page }) => {
    await epic("Listing Preview");
    await feature("Tables Listing Preview");

    await navBarPage.openTablesDropdown();
    await navBarPage.selectVendor();
    await subNavBarPage.waitForTableToLoad();
    await subNavBarPage.openPreview();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "rptVendorList",
      SUBREPORT_ERROR,
    );
  });

  test("Contact Profile Listing Preview", async ({ page }) => {
    await epic("Listing Preview");
    await feature("Tables Listing Preview");

    await navBarPage.openTablesDropdown();
    await navBarPage.selectContactProfile();
    await subNavBarPage.waitForTableToLoad();
    await subNavBarPage.openPreview();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "rptTablesContactProfile",
      SUBREPORT_ERROR,
    );
  });

  test("Recurring Remarks Listing Preview", async ({ page }) => {
    await epic("Listing Preview");
    await feature("Tables Listing Preview");

    await navBarPage.openTablesDropdown();
    await navBarPage.selectRecurringRemarks();
    await subNavBarPage.waitForTableToLoad();
    await subNavBarPage.openPreview();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "rptRemarkList",
      SUBREPORT_ERROR,
    );
  });

  test("Quick Item Listing Preview", async ({ page }) => {
    await epic("Listing Preview");
    await feature("Tables Listing Preview");

    await navBarPage.openTablesDropdown();
    await navBarPage.selectQuickItem();
    await subNavBarPage.waitForTableToLoad();
    await subNavBarPage.openPreview();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "rptQuickItemListV2",
      SUBREPORT_ERROR,
    );
  });

  test("Item Listing Preview", async ({ page }) => {
    await epic("Listing Preview");
    await feature("Tables Listing Preview");

    await navBarPage.openTablesDropdown();
    await navBarPage.selectItem();
    await subNavBarPage.waitForTableToLoad();
    await subNavBarPage.openPreview();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "rptItemList",
      SUBREPORT_ERROR,
    );
  });

  test("Other Labour Listing Preview", async ({ page }) => {
    await epic("Listing Preview");
    await feature("Tables Listing Preview");

    await navBarPage.openTablesDropdown();
    await navBarPage.selectOtherLabour();
    await subNavBarPage.waitForTableToLoad();
    await subNavBarPage.openPreview();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "rptOtherLabourTablemaintenance",
      SUBREPORT_ERROR,
    );
  });

  test("Vehicle Listing Preview", async ({ page }) => {
    await epic("Listing Preview");
    await feature("Tables Listing Preview");

    await navBarPage.openTablesDropdown();
    await navBarPage.selectVehicle();
    await subNavBarPage.waitForTableToLoad();
    await subNavBarPage.openPreview();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "rptTablesCar",
      SUBREPORT_ERROR,
    );
  });

  test("Unscheduled Model Listing Preview", async ({ page }) => {
    await epic("Listing Preview");
    await feature("Tables Listing Preview");

    await navBarPage.openTablesDropdown();
    await navBarPage.selectUnscheduledModel();
    await subNavBarPage.waitForTableToLoad();
    await subNavBarPage.openPreview();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "rptTableUnscheduleModelLists",
      SUBREPORT_ERROR,
    );
  });

  test("G/L Mapping Listing Preview", async ({ page }) => {
    await epic("Listing Preview");
    await feature("Admin Listing Preview");

    await navBarPage.openAdminDropdown();
    await navBarPage.selectGLMapping();
    await subNavBarPage.openPreview();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "rptAdminAccountGLMapping",
      SUBREPORT_ERROR,
    );
  });

  test("Email/SMS Log Listing Preview", async ({ page }) => {
    await epic("Listing Preview");
    await feature("Admin Listing Preview");

    await navBarPage.openAdminDropdown();
    await navBarPage.selectEmailSMSLog();
    await subNavBarPage.waitForTableToLoad();
    await subNavBarPage.openPreview();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "rptEmailSmsList",
      SUBREPORT_ERROR,
    );
  });
});
