import { test, expect } from "@playwright/test";
import { NavBarPage } from "../../pages/NavBarPage";
import { SubNavBarPage } from "../../pages/SubNavBarPage";
import { epic, feature, story } from "allure-js-commons";

test.describe("Listing Preview", () => {
  let navBarPage: NavBarPage;
  let subNavBarPage: SubNavBarPage;

  // Error message constant for PDF loading failure
  const SUBREPORT_ERROR = "Error: Subreport could not be shown";

  test.beforeEach(async ({ page }) => {
    await epic("Specific Listing Preview");

    navBarPage = new NavBarPage(page);
    subNavBarPage = new SubNavBarPage(page);

    // Start at the FlexiQuote dashboard
    await page.goto("v2/");
    await expect(page).toHaveURL(/\/v2\/$/);
  });

  test("Specific Repairer Quote Listing Preview", async ({ page }) => {
    await feature("Quote Listing Preview");

    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await subNavBarPage.openFirstRecordFromTable("/v2/quotes");
    await subNavBarPage.openPreview();
    await subNavBarPage.clickOkButton();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      ["rptQuoteDollarHour", "rptQuoteDollarHourAdditionals"],
      SUBREPORT_ERROR,
    );
  });

  test("Specific Misc Quote Listing Preview", async ({ page }) => {
    await feature("Quote Listing Preview");

    await navBarPage.openQuoteDropdown();
    await navBarPage.selectMiscQuote();
    await subNavBarPage.openFirstRecordFromTable("/v2/miscquotes");
    await subNavBarPage.openPreview();
    await subNavBarPage.clickOkButton();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "rptMisquote",
      SUBREPORT_ERROR,
    );
  });

  test("Specific Quick Invoice Listing Preview", async ({ page }) => {
    await feature("Debtor Listing Preview");

    await navBarPage.openDebtorDropdown();
    await navBarPage.selectQuickInvoice();
    await subNavBarPage.openFirstRecordFromTable("/v2/quickinvoices");
    await subNavBarPage.openPreview();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "AT_QuickInvoice",
      SUBREPORT_ERROR,
    );
  });

  test("Specific Debtor Adjustment Listing Preview", async ({ page }) => {
    await feature("Debtor Listing Preview");

    await navBarPage.openDebtorDropdown();
    await navBarPage.selectDebtorAdjustment();
    await subNavBarPage.openFirstRecordFromTable("/v2/debtoradjustments");
    await subNavBarPage.openPreview();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "AT_AdjustmentNote",
      SUBREPORT_ERROR,
    );
  });

  test("Specific Receipt Entry Listing Preview", async ({ page }) => {
    await feature("Debtor Listing Preview");

    await navBarPage.openDebtorDropdown();
    await navBarPage.selectReceiptEntry();
    await subNavBarPage.openFirstRecordFromTable("/v2/receiptentry");
    const newTab = await subNavBarPage.checkFirstRowCheckbox();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "AT_OfficialReceiptList",
      SUBREPORT_ERROR,
      newTab,
    );
    await subNavBarPage.verifyPrintPreviewTitle(newTab);
    await newTab.close();
    await subNavBarPage.uncheckFirstRowCheckbox();
  });

  test("Specific Sundry Creditor Listing Preview", async ({ page }) => {
    await feature("Creditor Listing Preview");

    await navBarPage.openCreditorDropdown();
    await navBarPage.selectSundryCreditor();
    await subNavBarPage.openFirstRecordFromTable("/v2/sundrycreditors");
    await subNavBarPage.openPreview();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "AT_SundryCreditorDetails",
      SUBREPORT_ERROR,
    );
  });

  test("Specific Payment Entry Listing Preview", async ({ page }) => {
    await feature("Creditor Listing Preview");

    await navBarPage.openCreditorDropdown();
    await navBarPage.selectPaymentEntry();
    await subNavBarPage.openFirstRecordFromTable("/v2/paymententry");
    const newTab =
      await subNavBarPage.checkFirstRowCheckbox("Print Remit Advice");
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "AT_RemittanceAdvice",
      SUBREPORT_ERROR,
      newTab,
    );
    await subNavBarPage.verifyPrintPreviewTitle(newTab);
    await newTab.close();
    await subNavBarPage.uncheckFirstRowCheckbox();
  });

  test("Specific Purchase Orders Listing Preview", async ({ page }) => {
    await feature("Creditor Listing Preview");

    await navBarPage.openCreditorDropdown();
    await navBarPage.selectPurchaseOrder();
    await subNavBarPage.openFirstRecordFromTable("/v2/purchaseorders");
    await subNavBarPage.clickSaveButton();
    await subNavBarPage.openPreview();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "AT_PurchaseOrder",
      SUBREPORT_ERROR,
    );
  });

  test("Specific Return Parts Listing Preview", async ({ page }) => {
    await feature("Creditor Listing Preview");

    await navBarPage.openCreditorDropdown();
    await navBarPage.selectReturnParts();
    await subNavBarPage.openFirstRecordFromTable("/v2/returnparts");
    await subNavBarPage.openPreview();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "AT_CREDITRETURN",
      SUBREPORT_ERROR,
    );
  });

  test("Specific JCNI Listing Preview", async ({ page }) => {
    await feature("Reports Listing Preview");

    await navBarPage.openReportDropdown();
    await navBarPage.selectJCNI();
    await subNavBarPage.openFirstRecordFromTable("/v2/jcni");
    await subNavBarPage.openPreview();
    await subNavBarPage.clickOkButton();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "rptQuoteDollarHour",
      SUBREPORT_ERROR,
    );
  });

  test("Specific Due In and Due Out Listing Preview", async ({ page }) => {
    await feature("Reports Listing Preview");

    await navBarPage.openReportDropdown();
    await navBarPage.selectDueInDueOut();
    await subNavBarPage.selectDateFilter("thismonth");
    await subNavBarPage.openFirstRecordFromTable("/v2/productioninout");
    await subNavBarPage.openPreview();
    await subNavBarPage.clickOkButton();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "rptQuoteDollarHour",
      SUBREPORT_ERROR,
    );
  });

  test("Specific Job Invoiced Listing Preview", async ({ page }) => {
    await feature("Reports Listing Preview");

    await navBarPage.openReportDropdown();
    await navBarPage.selectJobInvoiced();
    await subNavBarPage.openFirstRecordFromTable("/v2/jobinvoiced");
    await subNavBarPage.openPreview();
    await subNavBarPage.clickOkButton();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "rptQuoteDollarHour",
      SUBREPORT_ERROR,
    );
  });

  test("Specific Outstanding Credit Listing Preview", async ({ page }) => {
    await feature("Reports Listing Preview");

    await navBarPage.openReportDropdown();
    await navBarPage.selectOutstandingCredits();
    await subNavBarPage.openFirstRecordFromTable("/v2/outstandingcredit");
    await subNavBarPage.openPreview();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "AT_CREDITRETURN",
      SUBREPORT_ERROR,
    );
  });

  test("Specific Outstanding Parts Listing Preview", async ({ page }) => {
    await feature("Reports Listing Preview");

    await navBarPage.openReportDropdown();
    await navBarPage.selectOutstandingParts();
    await subNavBarPage.openFirstRecordFromTable("/v2/outstandingparts");
    await subNavBarPage.openPreview();
    await subNavBarPage.clickOkButton();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "rptQuoteDollarHour",
      SUBREPORT_ERROR,
    );
  });

  test("Specific Debtor List Listing Preview", async ({ page }) => {
    await feature("Reports Listing Preview");

    await navBarPage.openReportDropdown();
    await navBarPage.selectDebtorList();
    await subNavBarPage.openFirstRecordFromTable("/v2/debtorlists");
    await subNavBarPage.openPreview();
    const newTab = await subNavBarPage.clickOkButton(true);
    await subNavBarPage.verifyPrintPreviewTitle(newTab);
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "rptQuoteDollarHour",
      SUBREPORT_ERROR,
      newTab,
    );
    await newTab?.close();
  });

  test("Specific Receipts Listing Preview", async ({ page }) => {
    await feature("Reports Listing Preview");

    await navBarPage.openReportDropdown();
    await navBarPage.selectReceipts();
    await subNavBarPage.openFirstRecordFromTable("/v2/debtorsreceipts");
    await subNavBarPage.openPreview();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "AT_AdjustmentNote",
      SUBREPORT_ERROR,
    );
  });

  test("Specific Creditor List Listing Preview", async ({ page }) => {
    await feature("Reports Listing Preview");

    await navBarPage.openReportDropdown();
    await navBarPage.selectCreditorList();
    await subNavBarPage.openFirstRecordFromTable("/v2/creditorlist");
    await subNavBarPage.openPreview();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "AT_PurchaseOrder",
      SUBREPORT_ERROR,
    );
  });

  test("Specific Payment List Listing Preview", async ({ page }) => {
    await feature("Reports Listing Preview");

    await navBarPage.openReportDropdown();
    await navBarPage.selectPaymentList();
    await subNavBarPage.openFirstRecordFromTable("/v2/paymentlist");
    const newTab =
      await subNavBarPage.checkFirstRowCheckbox("Print Remit Advice");
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "AT_RemittanceAdvice",
      SUBREPORT_ERROR,
      newTab,
    );
    await subNavBarPage.verifyPrintPreviewTitle(newTab);
    await newTab.close();
  });

  test("Specific Insurer Listing Preview", async ({ page }) => {
    await feature("Tables Listing Preview");

    await navBarPage.openTablesDropdown();
    await navBarPage.selectInsurer();
    await subNavBarPage.openFirstRecordFromTable("/v2/insurers");
    await subNavBarPage.openPreview();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "rptTableInsurerDetails",
      SUBREPORT_ERROR,
    );
  });

  test("Specific Customer Listing Preview", async ({ page }) => {
    await feature("Tables Listing Preview");

    await navBarPage.openTablesDropdown();
    await navBarPage.selectCustomer();
    await subNavBarPage.openFirstRecordFromTable("/v2/customers");
    await subNavBarPage.openPreview();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "rptTableCustomerDetails",
      SUBREPORT_ERROR,
    );
  });

  test("Specific Vendor Listing Preview", async ({ page }) => {
    await feature("Tables Listing Preview");

    await navBarPage.openTablesDropdown();
    await navBarPage.selectVendor();
    await subNavBarPage.openFirstRecordFromTable("/v2/vendors");
    await subNavBarPage.openPreview();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "rptVendorDetails",
      SUBREPORT_ERROR,
    );
  });

  test("Specific Contact Listing Preview", async ({ page }) => {
    await feature("Tables Listing Preview");

    await navBarPage.openTablesDropdown();
    await navBarPage.selectContactProfile();
    await subNavBarPage.openFirstRecordFromTable("/v2/contacts");
    await subNavBarPage.openPreview();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "rptTableContactProfileDetails",
      SUBREPORT_ERROR,
    );
  });

  test("Specific Recurring Remarks Listing Preview", async ({ page }) => {
    await feature("Tables Listing Preview");

    await navBarPage.openTablesDropdown();
    await navBarPage.selectRecurringRemarks();
    await subNavBarPage.openFirstRecordFromTable("/v2/recurringremarks");
    await subNavBarPage.openPreview();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "rptRecurringRemarksDetail",
      SUBREPORT_ERROR,
    );
  });

  test("Specific Quick Items Listing Preview", async ({ page }) => {
    await feature("Tables Listing Preview");

    await navBarPage.openTablesDropdown();
    await navBarPage.selectQuickItem();
    await subNavBarPage.openFirstRecordFromTable("/v2/quickitems");
    await subNavBarPage.openPreview();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "rptTableItemsQuick",
      SUBREPORT_ERROR,
    );
  });

  test("Specific Items Listing Preview", async ({ page }) => {
    await feature("Tables Listing Preview");

    await navBarPage.openTablesDropdown();
    await navBarPage.selectItem();
    await subNavBarPage.openFirstRecordFromTable("/v2/items");
    await subNavBarPage.openPreview();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "rptTableItemsDetails",
      SUBREPORT_ERROR,
    );
  });

  test("Specific Other Labour Listing Preview", async ({ page }) => {
    await feature("Tables Listing Preview");

    await navBarPage.openTablesDropdown();
    await navBarPage.selectOtherLabour();
    await subNavBarPage.openFirstRecordFromTable("/v2/otherlabours");
    await subNavBarPage.openPreview();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "rptTableOtherLabourDetails",
      SUBREPORT_ERROR,
    );
  });

  test("Specific Vehicle Listing Preview", async ({ page }) => {
    await feature("Tables Listing Preview");

    await navBarPage.openTablesDropdown();
    await navBarPage.selectVehicle();
    await subNavBarPage.openFirstRecordFromTable("/v2/vehicles");
    await subNavBarPage.openPreview();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "rptTableVehicleDetails",
      SUBREPORT_ERROR,
    );
  });

  test("Specific UnScheduledmodels Listing Preview", async ({ page }) => {
    await feature("Tables Listing Preview");

    await navBarPage.openTablesDropdown();
    await navBarPage.selectUnscheduledModel();
    await subNavBarPage.openFirstRecordFromTable("/v2/unscheduledmodels");
    await subNavBarPage.openPreview();
    await subNavBarPage.verifyPrintPreviewTitle();
    await subNavBarPage.verifyPdfLoadedAndNoError(
      "rptUnscheduledModelDetail",
      SUBREPORT_ERROR,
    );
  });
});
