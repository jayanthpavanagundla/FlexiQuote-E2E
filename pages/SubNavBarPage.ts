import pdfParse from "pdf-parse";
import { Page, Response as PlaywrightResponse } from "@playwright/test";
import { expect, type Locator } from "@playwright/test";
import { step } from "allure-js-commons";
import { BasePage } from "./Base/BasePage.js";
import { LoadFnOutput } from "node:module";

export class SubNavBarPage extends BasePage {
  addNewButton: Locator;
  backButton: Locator;
  ellipsis: Locator;
  previewButton: Locator;
  newButton: Locator;
  saveButton: Locator;
  createButton: Locator;
  quoteAnalysis: Locator;
  salesAnalysis: Locator;
  printButton: Locator;
  printPreviewTitle: Locator;
  okButton: Locator;
  copyQuoteOption: Locator;
  existingQuote: Locator;
  existingQuoteNumber: Locator;
  overwriteExistingQuote: Locator;
  copyQuoteBtn: Locator;
  saveAndContinue: Locator;

  constructor(page: Page) {
    super(page);
    // Preview Locators
    this.addNewButton = page.getByText("addNew");
    this.backButton = page.getByText("arrow_backBack");
    this.ellipsis = page.getByText("more_vert");
    this.previewButton = page.locator("#preview");
    this.newButton = page.locator("a#addnew").nth(1);
    this.saveButton = page.locator("a#save").nth(1);
    this.createButton = page.getByText("saveCreate");
    this.copyQuoteOption = page.getByText("content_copy Copy Quote");
    this.existingQuote = page.locator("#existingQuote");
    this.existingQuoteNumber = page.getByRole("textbox", { name: "Quote No." });
    this.overwriteExistingQuote = page.locator("#chk-overwrite-quote");
    this.copyQuoteBtn = page.getByRole("button", { name: "Copy" });
    this.saveAndContinue = page.getByRole("button", {
      name: "Save & Continue",
    });

    // Repairer Quote Listing Page Locators
    this.quoteAnalysis = page
      .locator('label[for="quoteAnalysis"]')
      .filter({ hasText: /^\s*Quote Analysis\s*$/i });

    // Sales Analysis Listing Page Locators
    this.salesAnalysis = page.locator(
      'label[for="salesAnalysis"]:has-text("Sales Analysis")',
    );

    // Print Preview Button locators
    this.printButton = page
      .locator('button[data-tooltip="Print report"]')
      .filter({ hasText: /^\s*Print\s*$/i });

    // Print Preview Title Locator [H1]
    this.printPreviewTitle = page.getByRole("heading", {
      name: "Print Preview",
      level: 1,
    });

    // Ok Button Locator
    this.okButton = page.locator(
      'button[data-tooltip="Generate report(s)"]:has-text("Ok")',
    );
  }

  // Toast Validation Method
  getToast(message: string): Locator {
    const toastMsg = this.page.getByRole("alert").filter({ hasText: message });
    return toastMsg;
  }
  async expectToast(message: string): Promise<void> {
    await step(`Verify toast message: "${message}"`, async () => {
      await expect(this.getToast(message)).toBeVisible();
    });
  }

  // Method to open the preview
  async openPreview() {
    await step("Click more options menu", async () => {
      await this.ellipsis.click();
    });

    await step("Click Preview", async () => {
      await this.previewButton.click();
    });
  }

  // Clicking Three dots
  async clickEllipisBtn() {
    await step("Click more options menu", async () => {
      await this.ellipsis.click();
    });
  }

  // Copy to New Quote
  async copyToNewQuote() {
    await step("Clicking Copy Button", async () => {
      await this.copyQuoteBtn.click();
    });
  }

  // Copy to Existing Quote
  async copyToExistingQuote(quoteNo: string) {
    await step("Clicking Existing Quote Radio Button", async () => {
      await this.existingQuote.click();
    });
    await step("Filling existing quote number", async () => {
      await this.existingQuoteNumber.fill(quoteNo);
    });
    await step("Select the Overwrite checkbox", async () => {
      await this.overwriteExistingQuote.check();
    });
    await step("Clicking Copy Button", async () => {
      await this.copyQuoteBtn.click();
    });
  }

  // Clicking Copy Quote
  async selectCopyQuote() {
    await step("Select Copy Quote Option", async () => {
      await this.copyQuoteOption.click();
    });
  }

  // Sorting Table in Asscending Order to select First record
  async captureFirstQuoteNoAfterAction(
    urlPattern: string,
    action: () => Promise<void>,
  ): Promise<string> {
    return await step(
      "Capture first quoteNo from sorted list response",
      async () => {
        let firstQuoteNo = "";
        await this.page.route(`**${urlPattern}**`, async (route) => {
          try {
            const apiResponse = await route.fetch();
            const data = (await apiResponse.json()) as Record<
              string,
              unknown
            >[];
            if (data.length > 0) {
              firstQuoteNo = String(data[0].quoteNo ?? "");
            }
            await route.fulfill({ response: apiResponse });
          } catch {
            await route.continue();
          }
        });
        await action();
        await this.page.waitForResponse(
          (res) => res.url().includes(urlPattern) && res.status() === 200,
        );
        await this.page.unroute(`**${urlPattern}**`);
        return firstQuoteNo;
      },
    );
  }

  async openRecordByQuoteNoFromTable(quoteNo: string): Promise<void> {
    await step(`Open record for quote ${quoteNo}`, async () => {
      const targetRow = this.page
        .getByRole("table")
        .first()
        .getByRole("row")
        .filter({ has: this.page.locator("td") })
        .filter({ hasText: quoteNo })
        .first();
      await expect(targetRow).toBeVisible();
      const hrefLink = targetRow.locator("a[href]").first();
      const hasHref = await hrefLink.isVisible().catch(() => false);
      const link = hasHref ? hrefLink : targetRow.locator("a").first();
      await expect(link).toBeVisible();
      const urlBefore = this.page.url();
      await link.click();
      await this.page.waitForURL((url) => url.toString() !== urlBefore, {
        waitUntil: "domcontentloaded",
      });
      await Promise.race([
        this.page
          .locator('div[name="headerMoreButtons"]')
          .waitFor({ state: "visible" }),
        this.page
          .locator("a.button.is-primary.is-outlined.is-inverted")
          .waitFor({ state: "visible" }),
        this.page
          .locator("button.button.is-primary")
          .first()
          .waitFor({ state: "visible" }),
      ]);
    });
  }

  // Wait for table rows to fully load before opening preview
  async waitForTableToLoad(): Promise<void> {
    await step("Wait for table to load", async () => {
      await this.page
        .getByRole("table")
        .first()
        .getByRole("row")
        .filter({ has: this.page.locator("td") })
        .first()
        .waitFor({ state: "visible" });
    });
  }

  // Method to select date filter option
  async selectDateFilter(
    option:
      | "today"
      | "tomorrow"
      | "next7days"
      | "lastweek"
      | "thismonth"
      | "custom",
  ): Promise<void> {
    await step(`Select date filter: ${option}`, async () => {
      await this.page
        .locator("select.has-text-weight-bold")
        .selectOption(option);
    });
  }

  // Clicking New Button Method
  async clickNewButton() {
    await step("Click New button", async () => {
      await this.newButton.click();
    });
  }

  // Clicking New Plus  Button Method
  async clickPlusNewButton() {
    await step("Click New button", async () => {
      await this.addNewButton.click();
    });
  }

  // Clicking Create Button Method
  async clickCreateButton() {
    await step("Click Create button", async () => {
      await this.createButton.click();
    });
  }

  // Cliking Save Button Method
  async clickSaveButton() {
    await step("Click Save button", async () => {
      await this.saveButton.click();
    });
  }

  // Cliking Save And Continue Button Method
  async clickSaveAndContinueButton() {
    await step("Click Save button", async () => {
      await this.saveAndContinue.click();
    });
  }

  // Click Save & Continue only if visible, then verify toast; skip both if not visible
  async clickSaveAndContinueIfVisible(toastMessage: string): Promise<void> {
    await step("Click Save & Continue if visible", async () => {
      const visible = await this.saveAndContinue.isVisible();
      if (visible) {
        await this.saveAndContinue.click();
        await expect(this.getToast(toastMessage)).toBeVisible();
      }
    });
  }

  // Clicking Back Button Method
  async clickBackButton() {
    await step("Click Back button", async () => {
      await this.backButton.click();
    });
  }

  // Method to Verify Print Preview H1 Title
  async verifyPrintPreviewTitle(page: Page = this.page): Promise<void> {
    await step("Verify Print Preview title", async () => {
      await expect(page).toHaveURL(/printpreview/);
      await expect(page).toHaveTitle(/Print Preview/i);
    });
  }

  // PDF Verification Method
  async verifyPdfLoadedAndNoError(
    reportName: string | string[],
    errorText?: string,
    page: Page = this.page,
    preCapturedResponse?: PlaywrightResponse,
  ) {
    await expect(page).toHaveURL(/printpreview/);
    const reportNames = Array.isArray(reportName) ? reportName : [reportName];
    const response = preCapturedResponse
      ? preCapturedResponse
      : await page.waitForResponse(
          (res) =>
            reportNames.some((name) =>
              res.url().includes(`/reports/postreport/${name}/pdf`),
            ) &&
            res.status() === 200 &&
            res.headers()["content-type"]?.includes("application/pdf"),
        );
    await step(
      `Verify PDF "${reportNames.join(" or ")}" loaded successfully`,
      async () => {
        expect(response.ok()).toBeTruthy();
      },
    );
    if (errorText) {
      await step(`Verify "${errorText}" is not in PDF`, async () => {
        const pdfBuffer = await response.body();
        const isPdfValid =
          pdfBuffer[0] === 0x25 &&
          pdfBuffer[1] === 0x50 &&
          pdfBuffer[2] === 0x44 &&
          pdfBuffer[3] === 0x46;
        expect(isPdfValid, "Response is not a valid PDF").toBeTruthy();
        const pdfData = await pdfParse(pdfBuffer);
        const normalizedPdfText = pdfData.text.replace(/\s+/g, " ");
        const normalizedErrorText = errorText.replace(/\s+/g, " ");
        expect
          .soft(
            normalizedPdfText,
            `Error found in PDF: "${errorText}" should NOT be present`,
          )
          .not.toContain(normalizedErrorText);
      });
    }
    return response;
  }

  // Check First Row Checkbox and Open New Tab
  async checkFirstRowCheckbox(
    printButtonText: string = "Print Statement",
  ): Promise<Page> {
    let newTab!: Page;
    await step(`Check checkbox and open ${printButtonText}`, async () => {
      const table = this.page.getByRole("table").first();
      const firstDataRow = table
        .getByRole("row")
        .filter({ has: this.page.locator("td") })
        .first();
      await expect(firstDataRow).toBeVisible();
      const checkbox = firstDataRow.locator('input[type="checkbox"]').first();
      await checkbox.check();
      await expect(checkbox).toBeChecked();
      const printButton = this.page.locator("button.button.is-primary", {
        hasText: printButtonText,
      });
      const [tab] = await Promise.all([
        this.page.context().waitForEvent("page"),
        printButton.click(),
      ]);
      await tab.waitForLoadState("domcontentloaded");
      await expect(tab).toHaveURL(/\/v2\/printpreview\//);
      newTab = tab;
    });
    return newTab;
  }

  async uncheckFirstRowCheckbox(): Promise<void> {
    await step("Uncheck the first row checkbox", async () => {
      const table = this.page.getByRole("table").first();
      const firstDataRow = table
        .getByRole("row")
        .filter({ has: this.page.locator("td") })
        .first();
      await expect(firstDataRow).toBeVisible();
      const checkbox = firstDataRow.locator('input[type="checkbox"]').first();
      await expect(checkbox).toBeVisible();
      await checkbox.uncheck();
      await expect(checkbox).not.toBeChecked();
    });
  }

  // Table First Row Interaction Methods
  // Method to open the first record from the table based on the provided URL
  async openFirstRecordFromTable(route: string): Promise<void> {
    await step(`Open first record from table on route: ${route}`, async () => {
      await this.page.waitForURL(`**${route}**`);
      const table = this.page.getByRole("table").first();
      const firstDataRow = table
        .getByRole("row")
        .filter({ has: this.page.locator("td") })
        .first();
      await expect(firstDataRow).toBeVisible();
      const firstHrefLink = firstDataRow.locator("a[href]").first();
      const hasVisibleHref = await firstHrefLink.isVisible().catch(() => false);
      const link = hasVisibleHref
        ? firstHrefLink
        : firstDataRow.locator("a").first();
      await expect(link).toBeVisible();
      const urlBeforeClick = this.page.url();
      await link.click();
      await this.page.waitForURL((url) => url.toString() !== urlBeforeClick, {
        waitUntil: "domcontentloaded",
      });
      await Promise.race([
        this.page
          .locator('div[name="headerMoreButtons"]')
          .waitFor({ state: "visible" }),
        this.page
          .locator("a.button.is-primary.is-outlined.is-inverted")
          .waitFor({ state: "visible" }),
        this.page
          .locator("button.button.is-primary")
          .first()
          .waitFor({ state: "visible" }),
      ]);
    });
  }

  // Common Methods
  // Method For Repairer Quote Listing Page to open Quote Analysis
  async openQuoteAnalysis() {
    await step("Click Quote Analysis", async () => {
      await expect(this.quoteAnalysis).toBeVisible();
      await this.quoteAnalysis.click();
    });

    await step("Clicking Print Button", async () => {
      await expect(this.printButton).toBeVisible();
      await this.printButton.click();
    });
  }

  // Method For Sales Analysis Listing Page
  async openSalesAnalysis() {
    await step("Click Sales Analysis", async () => {
      await expect(this.salesAnalysis).toBeVisible();
      await this.salesAnalysis.click();
    });

    await step("Clicking Print Button", async () => {
      await expect(this.printButton).toBeVisible();
      await this.printButton.click();
    });
  }

  // Ok Button Click Method in Print Preview
  async clickOkButton(opensNewTab: boolean = false): Promise<Page | undefined> {
    let newTab: Page | undefined;
    await step("Click Ok button", async () => {
      if (opensNewTab) {
        // Case 2: New tab
        const [tab] = await Promise.all([
          this.page.context().waitForEvent("page"),
          this.okButton.click(),
        ]);
        await tab.waitForLoadState("domcontentloaded");
        await expect(tab).toHaveURL(/printpreview/);
        newTab = tab;
      } else {
        // Case 1: Same tab
        await this.okButton.click();
      }
    });
    return newTab;
  }

  // Method Extracting the Quote Total
  parseCurrencyAmount(amountText: string): number {
    const amount = Number(amountText.replace(/[^0-9.-]/g, ""));
    if (Number.isNaN(amount)) {
      throw new Error(
        `Unable to parse currency amount from text: ${amountText}`,
      );
    }
    return Math.round((amount + Number.EPSILON) * 100) / 100;
  }

  parseXmlAmount(xml: string, tagName: string): number {
    const regex = new RegExp(`<${tagName}>\\s*([\\d.]+)\\s*<\\/${tagName}>`);
    const match = xml.match(regex);

    if (!match) {
      throw new Error(`${tagName} not found in XML.`);
    }
    const amount = Number(match[1]);
    if (Number.isNaN(amount)) {
      throw new Error(`Invalid amount for ${tagName}: ${match[1]}`);
    }
    return Math.round((amount + Number.EPSILON) * 100) / 100;
  }

  private quoteTotalAmountLocator(label: "Ex GST" | "Inc GST"): Locator {
    const labelText = `Total (${label})`;
    return this.page
      .locator(
        `div:has(> span.is-size-6.has-text-weight-semibold:has-text("${labelText}")) > span.has-text-success`,
      )
      .first();
  }

  async fetchQuoteTotal(): Promise<{
    totalExGstAmount: number;
    totalIncGstAmount: number;
  }> {
    return await step(
      "Fetch quote Total Ex GST and Total Inc GST from header",
      async () => {
        const totalExGstLocator = this.quoteTotalAmountLocator("Ex GST");
        const totalIncGstLocator = this.quoteTotalAmountLocator("Inc GST");

        const totalExGstText = await totalExGstLocator.innerText();
        const totalIncGstText = await totalIncGstLocator.innerText();

        return {
          totalExGstAmount: this.parseCurrencyAmount(totalExGstText),
          totalIncGstAmount: this.parseCurrencyAmount(totalIncGstText),
        };
      },
    );
  }
}
