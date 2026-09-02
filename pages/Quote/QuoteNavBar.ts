import { type Page, type Locator } from "@playwright/test";
import { step } from "allure-js-commons";
import { BasePage } from "../Base/BasePage.js";

export class QuoteNavBar extends BasePage {
  navbar: Locator;
  quoteNumber: Locator;
  statusDropdown: Locator;
  customerName: Locator;
  vehicleInfo: Locator;
  totalExGST: Locator;
  totalIncGST: Locator;
  createButton: Locator;
  saveButton: Locator;
  backButton: Locator;
  moreMenu: Locator;
  previewOption: Locator;
  copyQuoteOption: Locator;
  headerTab: Locator;
  quotingTab: Locator;
  partsTab: Locator;
  imagesTab: Locator;
  assessmentsTab: Locator;
  summaryTab: Locator;
  invoiceTab: Locator;
  excessTab: Locator;
  docsTab: Locator;
  commsTab: Locator;
  remarksTab: Locator;
  ratesTab: Locator;
  annotationsTab: Locator;

  // AH-ON Invoice
  invoiceCheckBox: Locator;
  invoiceRaiseButton: Locator;
  invoicePrintPreview: Locator;
  viewAHONInvoice: Locator;

  constructor(page: Page) {
    super(page);

    // ROOT
    this.navbar = page.locator("#detail-nav-menu");

    // QUOTE HEADER INFO
    this.quoteNumber = this.navbar.locator(".is-size-4.has-text-weight-bold");
    this.statusDropdown = this.navbar.locator("select");
    this.customerName = this.navbar
      .locator("span.has-text-weight-semibold")
      .nth(0);
    this.vehicleInfo = this.navbar
      .locator("span.has-text-weight-semibold")
      .nth(1);

    // TOTALS
    this.totalExGST = this.navbar.locator("text=Total").locator("..").first();
    this.totalIncGST = this.navbar.locator("text=Total").locator("..").nth(1);

    // ACTION BUTTONS
    this.createButton = page.getByText("saveCreate");
    this.saveButton = page.getByText("saveSave");
    this.backButton = page.locator("#cancel").last();
    this.moreMenu = page.locator('[name="headerMoreButtons"]');

    // More menu options
    this.previewOption = page.getByText("Preview");
    this.copyQuoteOption = page.getByText("Copy Quote");

    // TABS (SECOND ROW)
    this.headerTab = page.getByText("Header").first();
    this.quotingTab = page.getByText("Quoting");
    this.partsTab = page.getByText("Parts");
    this.imagesTab = page.getByText("Images");
    this.assessmentsTab = page.getByRole("link", {
      name: "verified_user Assessments",
    });
    this.summaryTab = page.getByText("Summary");
    this.invoiceTab = page.getByRole("link", {
      name: "receipt_long Invoice",
    });
    this.excessTab = page.getByText("Excess");
    this.docsTab = page.getByText("Docs");
    this.commsTab = page.getByText("Comms");
    this.remarksTab = page.getByText("Remarks");
    this.ratesTab = page.getByText("Rates & Markups");
    this.annotationsTab = page.getByText("Annotations");

    // AH-ON Invoice
    this.invoiceCheckBox = page
      .locator("tbody tr td .pretty div.state")
      .first();
    this.invoiceRaiseButton = page.getByRole("button", {
      name: "󰗇 Raise Invoice",
    });
    this.invoicePrintPreview = page.getByRole("button", {
      name: "󰐪 Print Invoice",
    });
    this.viewAHONInvoice = page.locator('button[data-tooltip="View Details"]');
  }

  // HEADER METHODS

  async getQuoteNumber() {
    return (await this.quoteNumber.textContent())!.trim();
  }

  async getCustomerName() {
    return (await this.customerName.textContent())!.trim();
  }

  async getVehicleInfo() {
    return (await this.vehicleInfo.textContent())!.trim();
  }

  async changeStatus(statusText: string) {
    await this.statusDropdown.selectOption({ label: statusText });
  }

  // ACTION METHODS

  async clickCreate() {
    await step("Create Quote", async () => {
      await this.createButton.click();
    });
  }

  async clickSave() {
    await step("Save Quote", async () => {
      await this.saveButton.click();
    });
  }

  async clickBack() {
    await step("Go Back", async () => {
      await this.backButton.click();
    });
  }

  async openMoreMenu() {
    await this.moreMenu.click();
  }

  async clickPreview() {
    await step("Preview Quote", async () => {
      await this.previewOption.click();
    });
  }

  async clickCopyQuote() {
    await step("Copy Quote", async () => {
      await this.copyQuoteOption.click();
    });
  }

  // TAB NAVIGATION METHODS

  async goToHeaderTab() {
    await step("Click Header tab", async () => {
      await this.headerTab.click();
    });
  }
  async goToQuotingTab() {
    await step("Click Quoting tab", async () => {
      await this.quotingTab.click();
    });
  }
  async goToPartsTab() {
    await step("Click Parts tab", async () => {
      await this.partsTab.click();
    });
  }
  async goToImagesTab() {
    await step("Click Images tab", async () => {
      await this.imagesTab.click();
    });
  }
  async goToAssessmentsTab() {
    await step("Click Assessments tab", async () => {
      await this.assessmentsTab.click();
    });
  }
  async goToSummaryTab() {
    await step("Click Summary tab", async () => {
      await this.summaryTab.click();
    });
  }
  async goToInvoiceTab() {
    await step("Click Invoice tab", async () => {
      await this.invoiceTab.click();
    });
  }
  async goToExcessTab() {
    await step("Click Excess tab", async () => {
      await this.excessTab.click();
    });
  }
  async goToDocsTab() {
    await step("Click Docs tab", async () => {
      await this.docsTab.click();
    });
  }
  async goToCommsTab() {
    await step("Click Comms tab", async () => {
      await this.commsTab.click();
    });
  }
  async goToRemarksTab() {
    await step("Click Remarks tab", async () => {
      await this.remarksTab.click();
    });
  }
  async goToRatesTab() {
    await step("Click Rates tab", async () => {
      await this.ratesTab.click();
    });
  }
  async goToAnnotationsTab() {
    await step("Click Annotations tab", async () => {
      await this.annotationsTab.click();
    });
  }

  // AH-ON Invoice Creation
  async invoiceAHONCreation() {
    await step("Click Invoice Checkbox", async () => {
      await this.invoiceCheckBox.click({ force: true });
    });
    await step("Click Invoice Raise Button", async () => {
      await this.invoiceRaiseButton.click();
    });
  }
  async invoiceAHONView() {
    await step("Click View AH-ON Invoice Button", async () => {
      await this.viewAHONInvoice.click();
    });
  }
  async invoiceAHONPrintPreview() {
    await step("Click Invoice Print Preview Button", async () => {
      await this.invoicePrintPreview.click();
    });
  }
}
