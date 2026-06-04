import * as fs from "fs";
import * as path from "path";
import { Page, expect, type Response } from "@playwright/test";
import { type Locator } from "@playwright/test";
import { BasePage } from "./Base/BasePage.js";
import { step } from "allure-js-commons";
import {
  generateInsuranceClaimNo,
  generateRegistrationNo,
  getFutureDateTime,
} from "../helpers/dataGenerators.js";

export class ORM extends BasePage {
  page: Page; // ← NOT readonly, must be reassignable when new tab opens

  // ─────────────────────────────────────────────
  // Stored XML State
  // ─────────────────────────────────────────────
  modifiedXml: string;
  extractedMessageNo: string;
  incrementedMessageNo: string;
  transactionUuid: string;
  capturedXmlContent: string;
  changedPartValues: number[];
  changedGrandTotalExTax: number;
  changedTaxAmount: number;
  changedGrandTotalIncTax: number;

  // ─────────────────────────────────────────────
  // Locators
  // ─────────────────────────────────────────────
  uidInput: Locator;
  messageNoInput: Locator;
  regNoInput: Locator;
  filterButton: Locator;
  loadMessageButton: Locator;
  nextBtn: Locator;
  activeModal: Locator;
  firstVisibleRow: Locator;
  continueButton: Locator;
  existingUserRadioBtn: Locator;
  yesButton: Locator;
  transmissionDropdown: Locator;
  searchInput: Locator;
  ormQuoteNo: Locator;
  colourInput: Locator;
  odometerInput: Locator;
  estimatorInput: Locator;
  estimateStartDateInput: Locator;
  estimateEndDateInput: Locator;
  quotingLink: Locator;
  vehicleSectionsTab: Locator;
  manualSectionsTab: Locator;
  templatesTab: Locator;
  ormLink: Locator;
  ormDropdown: Locator;
  submitQuote: Locator;
  submitTaxInvoice: Locator;
  viewMsgs: Locator;
  angleNextButton: Locator;
  submitORMButton: Locator;
  viewMsgsFirstRow: Locator;
  xmlEditor: Locator;
  messageTypeOption: Locator;
  invoiceLink: Locator;
  createInvoice: Locator;
  saveInvoice: Locator;
  sendTaxInvoice: Locator;
  invoiceCheckBox: Locator;
  raiseInvoice: Locator;
  quoteStatusSelect: Locator;
  quoteEditingLockedText: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;

    // Stored XML State
    this.modifiedXml = "";
    this.extractedMessageNo = "";
    this.incrementedMessageNo = "";
    this.transactionUuid = "";
    this.capturedXmlContent = "";
    this.changedPartValues = [];
    this.changedGrandTotalExTax = 0;
    this.changedTaxAmount = 0;
    this.changedGrandTotalIncTax = 0;

    this.uidInput = page.getByPlaceholder("UID");
    this.messageNoInput = page.getByPlaceholder("Message No.");
    this.regNoInput = this.page.getByPlaceholder("Rego");
    this.filterButton = this.page.getByRole("button", { name: "Filter" });
    this.loadMessageButton = this.page
      .locator('a[data-tooltip="Load Message"]')
      .nth(0);
    this.nextBtn = this.page.getByRole("button", { name: "Next" });
    this.activeModal = this.page.locator(".modal.is-active");
    this.firstVisibleRow = this.activeModal
      .locator("table:visible tbody tr")
      .first();
    this.continueButton = this.page.locator('button[data-tooltip="Continue"]');
    this.existingUserRadioBtn = this.page.locator('label[for="reuse"]');
    this.yesButton = this.page
      .locator(".modal.is-active button.button.is-primary", {
        hasText: /^Yes\s*$/,
      })
      .first();

    // Filters
    this.searchInput = this.page.locator('input[placeholder="Search..."]');

    // ORM Quote Locator
    this.ormQuoteNo = this.page
      .locator("table:visible tbody tr")
      .first()
      .locator("td")
      .first()
      .locator("a[href]")
      .first();

    // Header Locators
    this.transmissionDropdown = this.page
      .locator("div:nth-child(7) > div > .field > .control > .select > select")
      .first();
    this.colourInput = this.page
      .locator('input[maxlength="20"][aria-autocomplete="list"]')
      .first();
    this.odometerInput = this.page.locator(
      'input[placeholder="e.g. 6"][content*="greater than 0"]',
    );
    this.estimatorInput = this.page.locator('input[placeholder="Quoter"]');
    this.estimateStartDateInput = this.page
      .locator('input[placeholder="Job Start Date"]')
      .first();
    this.estimateEndDateInput = this.page
      .locator('input[placeholder="Job End Date"]')
      .first();

    // Quoting Tab Locators
    this.quotingLink = this.page.getByRole("link", { name: "Quoting" });
    this.vehicleSectionsTab = this.page.locator("li", {
      hasText: "Vehicle Sections",
    });
    this.manualSectionsTab = this.page.locator("li", {
      hasText: "Manual Quote",
    });
    this.templatesTab = this.page.locator("li", { hasText: "Templates" });

    // Invoice Tab Locators
    this.invoiceLink = this.page.getByRole("link", {
      name: "receipt_long Invoice",
    });
    this.createInvoice = this.page.locator(".tooltip > .button");
    this.saveInvoice = this.page.locator(
      'a.button[data-tooltip="Save Changes"]',
    );
    this.sendTaxInvoice = this.page.locator(
      'button[data-tooltip="Send Tax Invoice"]',
    );
    this.invoiceCheckBox = this.page.locator(
      "td.has-text-centered.is-content-width .pretty.p-icon",
    );
    this.raiseInvoice = this.page.getByRole("button", {
      name: /Raise Invoice/i,
    });

    // ORM Tab Locators
    this.ormLink = this.page.getByRole("link", { name: "message ORM" });
    this.ormDropdown = this.page.getByRole("button", { name: /^ORM$/ });
    this.submitQuote = this.page.locator("a.dropdown-item", {
      hasText: "Submit Quote",
    });
    this.submitTaxInvoice = this.page.locator("a.dropdown-item", {
      hasText: "Submit Tax Invoice",
    });
    this.viewMsgs = this.page.locator("a.dropdown-item", {
      hasText: "View Messages",
    });
    this.angleNextButton = this.page.locator(
      'button[data-tooltip="Next"]:has(i.mdi-chevron-right)',
    );
    this.submitORMButton = this.page.locator('button[data-tooltip="Submit"]');
    this.viewMsgsFirstRow = this.page
      .locator(".button.is-primary.is-small")
      .first();

    // XML Editor Locators
    this.xmlEditor = this.page.locator(".CodeMirror-code");
    this.messageTypeOption = this.page.getByRole("combobox").first();

    // Validation Locators
    this.quoteStatusSelect = this.page
      .locator("tr", { hasText: "Quote Status" })
      .locator("select");
    this.quoteEditingLockedText = this.page.getByText("Quote Editing Locked");

    //
  }

  // ─────────────────────────────────────────────
  // RFQ XML Paste
  // ─────────────────────────────────────────────
  async pasteRfqXml(): Promise<{
    insuranceClaimNo: string;
    registrationNo: string;
  }> {
    const insuranceClaimNo = generateInsuranceClaimNo();
    const registrationNo = generateRegistrationNo();

    const templatePath = path.resolve(__dirname, "../helpers/rfq-request.xml");
    let xml = fs.readFileSync(templatePath, "utf-8");
    xml = xml.replace("{{INSURANCE_CLAIM_NO}}", insuranceClaimNo);
    xml = xml.replace("{{REGISTRATION_NO}}", registrationNo);

    const editor = this.page.locator(".CodeMirror");
    await editor.click();

    await this.page.evaluate((xmlContent: string) => {
      const cmInstance = (document.querySelector(".CodeMirror") as any)
        .CodeMirror;
      cmInstance.setValue(xmlContent);
    }, xml);

    return { insuranceClaimNo, registrationNo };
  }

  // ─────────────────────────────────────────────
  // XML Helper Methods
  // ─────────────────────────────────────────────

  // Returns the XML captured from the API response in selectViewMsgFirstRow()
  async getXmlContent(): Promise<string> {
    return await step("Get XML content from API", async () => {
      if (!this.capturedXmlContent) {
        throw new Error(
          "No XML content captured. Ensure selectViewMsgFirstRow() was called first.",
        );
      }
      return this.capturedXmlContent;
    });
  }

  // Replaces QR with A in Status
  replaceQRWithA(xml: string): string {
    return xml.replace(/<Status>QR<\/Status>/, "<Status>A</Status>");
  }

  // Replaces CP with A in QuoteType
  replaceCPWithA(xml: string): string {
    return xml.replace(
      /<QuoteType>CP<\/QuoteType>/,
      "<QuoteType>A</QuoteType>",
    );
  }

  // Extracts the current MessageNo from XML
  extractMessageNo(xml: string): string {
    const match = xml.match(/<MessageNo>(\d+)<\/MessageNo>/);
    return match ? match[1] : "0";
  }

  // Increments MessageNo by 1
  incrementMessageNo(xml: string): string {
    return xml.replace(
      /<MessageNo>(\d+)<\/MessageNo>/,
      (_, messageNo) => `<MessageNo>${Number(messageNo) + 1}</MessageNo>`,
    );
  }

  // Replaces all occurrences of ADDED with ACCEPTED in the XML
  replaceAddedWithAccepted(xml: string): string {
    return xml.replace(/ADDED/g, "ACCEPTED");
  }

  // Adds an Assessment block between </Totals> and <Customer>
  addAssessmentBlock(xml: string): string {
    const assessmentBlock = `</Totals>
        <Assessment>
            <AssessmentDate>2024-12-21+11:00</AssessmentDate>
            <AssessorName>Virat Kohli</AssessorName>
            <AssessorPhone>0487654332</AssessorPhone>
        </Assessment>
        <Customer>`;
    return xml.replace(/<\/Totals>\s*<Customer>/, assessmentBlock);
  }

  // Applies all XML modifications
  modifyQMLQuote(xml: string): string {
    let updatedXml = xml;
    updatedXml = this.incrementMessageNo(updatedXml); // MessageNo 1 → 2
    updatedXml = this.replaceQRWithA(updatedXml); // Status QR → A
    updatedXml = this.replaceCPWithA(updatedXml); // QuoteType CP → A
    updatedXml = this.replaceAddedWithAccepted(updatedXml); // ADDED → ACCEPTED
    updatedXml = this.addAssessmentBlock(updatedXml); // Add Assessment block
    return updatedXml;
  }

  // Reads XML from editor, modifies it, and stores in this.modifiedXml
  async getAndModifyQMLQuote(): Promise<string> {
    return await step(
      "Read, modify, and store updated XML (without pasting)",
      async () => {
        const xmlContent = await this.getXmlContent();
        this.extractedMessageNo = this.extractMessageNo(xmlContent);
        this.incrementedMessageNo = String(Number(this.extractedMessageNo) + 1);
        this.modifiedXml = this.modifyQMLQuote(xmlContent);
        return this.modifiedXml;
      },
    );
  }

  // Pastes the stored modified XML into CodeMirror
  async pasteModifiedQMLQuote(): Promise<void> {
    await step("Paste stored modified XML into CodeMirror editor", async () => {
      if (!this.modifiedXml) {
        throw new Error(
          "No modified XML found. Ensure getAndModifyQMLQuote() was called before pasteModifiedQMLQuote().",
        );
      }

      // Wait for CodeMirror element and instance to be ready
      await this.page
        .locator(".CodeMirror")
        .waitFor({ state: "visible", timeout: 10000 });
      await this.page.waitForFunction(
        () => {
          const cm = (document.querySelector(".CodeMirror") as any)?.CodeMirror;
          return !!cm;
        },
        { timeout: 15000 },
      );

      // Set the modified XML (new message editor starts empty — no prior content check needed)
      await this.page.evaluate((xmlText: string) => {
        const cmInstance = (document.querySelector(".CodeMirror") as any)
          .CodeMirror;
        cmInstance.setValue(xmlText);
        cmInstance.refresh();
      }, this.modifiedXml);

      // Verify the content was set correctly
      await this.page.waitForFunction(
        (xmlText: string) => {
          const cm = (document.querySelector(".CodeMirror") as any)?.CodeMirror;
          return cm && cm.getValue().trim() === xmlText.trim();
        },
        this.modifiedXml,
        { timeout: 10000 },
      );
    });
  }

  // ─────────────────────────────────────────────
  // Payment Authorised XML Helper Methods
  // ─────────────────────────────────────────────

  extractXmlTagValue(
    xml: string,
    tagName: string,
    fallback: string = "",
  ): string {
    const regex = new RegExp(`<${tagName}>([\\s\\S]*?)<\\/${tagName}>`);
    const match = xml.match(regex);
    return match ? match[1].trim() : fallback;
  }

  extractXmlFieldValue(
    xml: string,
    tagName: string,
    fieldName: string,
    fallback: string = "",
  ): string {
    const regex = new RegExp(
      `<${tagName}\\s+FieldName=["']${fieldName}["']>([\\s\\S]*?)<\\/${tagName}>`,
    );
    const match = xml.match(regex);
    return match ? match[1].trim() : fallback;
  }

  escapeXmlValue(value: string): string {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  }

  getCurrentQMLTimestamp(): string {
    return new Date().toISOString().replace(/\.\d{3}Z$/, "");
  }

  replaceXmlPlaceholder(
    xml: string,
    placeholder: string,
    value: string,
  ): string {
    return xml.split(`{{${placeholder}}}`).join(this.escapeXmlValue(value));
  }

  modifyQMLPaymentAuthorised(xml: string): string {
    const templatePath = path.resolve(
      __dirname,
      "../helpers/payment-authorized.xml",
    );
    let paymentAuthorisedXml = fs.readFileSync(templatePath, "utf-8");

    const currentMessageNo = Number(this.extractMessageNo(xml));
    const incrementedMessageNo = String(currentMessageNo + 1);

    const underwriterName = this.extractXmlTagValue(
      xml,
      "UnderwriterName",
      "Insurance Australia Limited",
    );
    const insurerAbn = this.extractXmlFieldValue(
      xml,
      "InsurerDetail",
      "ABN",
      "11000016722",
    );

    const repairerId = this.extractXmlTagValue(xml, "RepairerID", "U4073");
    const repairerName = this.extractXmlTagValue(
      xml,
      "RepairerName",
      "SKY Smash & Repair",
    );
    const repairerAbn = this.extractXmlFieldValue(
      xml,
      "RepairerDetails",
      "ABN",
      "11223491505",
    );

    const vehicleId = this.extractXmlTagValue(xml, "VehicleID");
    const insuranceClaimNo = this.extractXmlTagValue(xml, "InsuranceClaimNo");
    const reinstatementNo = this.extractXmlTagValue(
      xml,
      "ReinstatementNo",
      "1",
    );

    const quoteNo = this.extractXmlTagValue(xml, "QuoteNo");
    const registrationNo = this.extractXmlTagValue(xml, "RegistrationNo");
    const buildDate = this.extractXmlTagValue(xml, "BuildDate");
    const bodyStyle = this.extractXmlTagValue(xml, "BodyStyle");

    const repairerTaxInvoiceNo = this.extractXmlTagValue(
      xml,
      "RepairerTaxInvoiceNo",
    );

    // TaxInvoiceDate from copied XML becomes PayAuthorisedDate
    const payAuthorisedDate = this.extractXmlTagValue(xml, "TaxInvoiceDate");

    // TotalPayableAmount from copied XML becomes PaymentAmount
    const paymentAmount = this.extractXmlTagValue(xml, "TotalPayableAmount");

    if (!vehicleId) throw new Error("VehicleID not found in copied XML.");
    if (!insuranceClaimNo)
      throw new Error("InsuranceClaimNo not found in copied XML.");
    if (!quoteNo) throw new Error("QuoteNo not found in copied XML.");
    if (!registrationNo)
      throw new Error("RegistrationNo not found in copied XML.");
    if (!buildDate) throw new Error("BuildDate not found in copied XML.");
    if (!bodyStyle) throw new Error("BodyStyle not found in copied XML.");
    if (!repairerTaxInvoiceNo)
      throw new Error("RepairerTaxInvoiceNo not found in copied XML.");
    if (!payAuthorisedDate)
      throw new Error("TaxInvoiceDate not found in copied XML.");
    if (!paymentAmount)
      throw new Error("TotalPayableAmount not found in copied XML.");

    paymentAuthorisedXml = this.replaceXmlPlaceholder(
      paymentAuthorisedXml,
      "TIMESTAMP",
      this.getCurrentQMLTimestamp(),
    );
    paymentAuthorisedXml = this.replaceXmlPlaceholder(
      paymentAuthorisedXml,
      "MESSAGE_NO",
      incrementedMessageNo,
    );

    paymentAuthorisedXml = this.replaceXmlPlaceholder(
      paymentAuthorisedXml,
      "UNDERWRITER_NAME",
      underwriterName,
    );
    paymentAuthorisedXml = this.replaceXmlPlaceholder(
      paymentAuthorisedXml,
      "INSURER_ABN",
      insurerAbn,
    );

    paymentAuthorisedXml = this.replaceXmlPlaceholder(
      paymentAuthorisedXml,
      "REPAIRER_ID",
      repairerId,
    );
    paymentAuthorisedXml = this.replaceXmlPlaceholder(
      paymentAuthorisedXml,
      "REPAIRER_NAME",
      repairerName,
    );
    paymentAuthorisedXml = this.replaceXmlPlaceholder(
      paymentAuthorisedXml,
      "REPAIRER_ABN",
      repairerAbn,
    );

    paymentAuthorisedXml = this.replaceXmlPlaceholder(
      paymentAuthorisedXml,
      "VEHICLE_ID",
      vehicleId,
    );
    paymentAuthorisedXml = this.replaceXmlPlaceholder(
      paymentAuthorisedXml,
      "INSURANCE_CLAIM_NO",
      insuranceClaimNo,
    );
    paymentAuthorisedXml = this.replaceXmlPlaceholder(
      paymentAuthorisedXml,
      "REINSTATEMENT_NO",
      reinstatementNo,
    );

    paymentAuthorisedXml = this.replaceXmlPlaceholder(
      paymentAuthorisedXml,
      "QUOTE_NO",
      quoteNo,
    );
    paymentAuthorisedXml = this.replaceXmlPlaceholder(
      paymentAuthorisedXml,
      "REGISTRATION_NO",
      registrationNo,
    );
    paymentAuthorisedXml = this.replaceXmlPlaceholder(
      paymentAuthorisedXml,
      "BUILD_DATE",
      buildDate,
    );
    paymentAuthorisedXml = this.replaceXmlPlaceholder(
      paymentAuthorisedXml,
      "BODY_STYLE",
      bodyStyle,
    );

    paymentAuthorisedXml = this.replaceXmlPlaceholder(
      paymentAuthorisedXml,
      "REPAIRER_TAX_INVOICE_NO",
      repairerTaxInvoiceNo,
    );
    paymentAuthorisedXml = this.replaceXmlPlaceholder(
      paymentAuthorisedXml,
      "PAY_AUTHORISED_DATE",
      payAuthorisedDate,
    );
    paymentAuthorisedXml = this.replaceXmlPlaceholder(
      paymentAuthorisedXml,
      "PAYMENT_AMOUNT",
      paymentAmount,
    );

    return paymentAuthorisedXml;
  }

  async getAndModifyQMLPaymentAuthorised(): Promise<string> {
    return await step(
      "Read copied XML and create Payment Authorised XML",
      async () => {
        const xmlContent = await this.getXmlContent();

        this.extractedMessageNo = this.extractMessageNo(xmlContent);
        this.incrementedMessageNo = String(Number(this.extractedMessageNo) + 1);

        this.modifiedXml = this.modifyQMLPaymentAuthorised(xmlContent);
        return this.modifiedXml;
      },
    );
  }

  // Pastes Payment Authorised XML into CodeMirror
  async pasteModifiedQMLPaymentAuthorised(): Promise<void> {
    await step(
      "Paste Payment Authorised XML into CodeMirror editor",
      async () => {
        if (!this.modifiedXml) {
          throw new Error(
            "No Payment Authorised XML found. Ensure getAndModifyQMLPaymentAuthorised() was called first.",
          );
        }

        await this.page
          .locator(".CodeMirror")
          .waitFor({ state: "visible", timeout: 10000 });

        await this.page.waitForFunction(
          () => {
            const cm = (document.querySelector(".CodeMirror") as any)
              ?.CodeMirror;
            return !!cm;
          },
          { timeout: 15000 },
        );

        await this.page.evaluate((xmlText: string) => {
          const cmInstance = (document.querySelector(".CodeMirror") as any)
            .CodeMirror;
          cmInstance.setValue(xmlText);
          cmInstance.refresh();
        }, this.modifiedXml);

        await this.page.waitForFunction(
          (xmlText: string) => {
            const cm = (document.querySelector(".CodeMirror") as any)
              ?.CodeMirror;
            return cm && cm.getValue().trim() === xmlText.trim();
          },
          this.modifiedXml,
          { timeout: 10000 },
        );
      },
    );
  }

  // ─────────────────────────────────────────────
  // Navigation & Tab Methods
  // ─────────────────────────────────────────────

  async openInvoiceTab(): Promise<void> {
    await step("Click Invoice tab", async () => {
      await this.invoiceLink.click();
    });
  }

  async clickCreateInvoice(): Promise<void> {
    await step("Click Create Invoice button", async () => {
      await this.createInvoice.click();
    });
  }

  async clickSaveInvoice(): Promise<void> {
    await step("Click Save Invoice button", async () => {
      await this.saveInvoice.click();
    });
  }

  async openQuotingTab(): Promise<void> {
    await step("Click Quoting tab", async () => {
      await this.quotingLink.click();
    });
  }

  async openORMTab(): Promise<void> {
    await step("Click ORM tab", async () => {
      await this.ormLink.click();
    });
  }

  async openORMDropdown(): Promise<void> {
    await step("Click ORM dropdown", async () => {
      await this.ormDropdown.click();
    });
  }

  async clickSubmitQuote(): Promise<void> {
    await step("Click Submit Quote from dropdown", async () => {
      await this.submitQuote.click();
    });
  }

  async clickTaxInvoice(): Promise<void> {
    await step("Click Submit Tax Invoice from dropdown", async () => {
      await this.submitTaxInvoice.click();
    });
  }

  async verifySubmitTaxInvoiceDisabled(): Promise<void> {
    await expect(this.submitTaxInvoice).toHaveClass(/is-disabled/);
  }

  async clickSendTaxInvoice(): Promise<void> {
    await step("Click Send Tax Invoice button", async () => {
      await this.sendTaxInvoice.click();
    });
  }

  async clickInvoiceCheckBox(): Promise<void> {
    await step("Click Invoice checkbox", async () => {
      await this.invoiceCheckBox
        .first()
        .locator('input[type="checkbox"]')
        .click({ force: true });
    });
  }

  async clickRaiseInvoice(): Promise<void> {
    await step("Click Raise Invoice button", async () => {
      await this.raiseInvoice.click();
    });
  }

  async validateQuoteStatus(expectedStatus: string): Promise<void> {
    await step(`Validate Quote Status is: ${expectedStatus}`, async () => {
      await expect(this.quoteStatusSelect).toBeVisible();

      const selectedStatus = await this.quoteStatusSelect
        .locator("option:checked")
        .innerText();
      const actualStatus = selectedStatus.trim();

      expect(actualStatus).toBe(expectedStatus);
    });
  }

  async clickViewMessages(): Promise<void> {
    await step("Click View Messages from dropdown", async () => {
      await this.viewMsgs.click();
    });
  }

  async clickAngleNextButton(): Promise<void> {
    await step("Click ORM Next button with angle icon", async () => {
      await this.angleNextButton.click();
    });
  }

  async fillAllCommentInputsWithSpecialChars(): Promise<void> {
    await step("Fill all comment inputs with special characters", async () => {
      const inputs = this.page.locator("td.is-comment-input input.input");
      const count = await inputs.count();
      for (let i = 0; i < count; i++) {
        await inputs.nth(i).fill("!@#$%^&*()");
      }
    });
  }

  async clickORMSubmitButton(): Promise<void> {
    await step("Click ORM Submit button", async () => {
      await this.submitORMButton.click();
    });
  }

  async clickQMLQuote(): Promise<void> {
    await step("Select QML Quote from dropdown", async () => {
      await this.messageTypeOption.selectOption({ label: "QML Quote" });
    });
  }

  async clickPaymentAuthorised(): Promise<void> {
    await step("Select Payment Authorised from dropdown", async () => {
      await this.messageTypeOption.selectOption({
        label: "Payment Authorised",
      });
    });
  }

  async waitForQuoteEditingLocked(): Promise<void> {
    await step("Wait for Quote Editing Locked text", async () => {
      await expect(this.quoteEditingLockedText).toBeVisible();
    });
  }

  // Clicks first row and captures the transaction UUID + XML body from the API response
  async selectViewMsgFirstRow(): Promise<void> {
    await step("Select First Row from the View Messages", async () => {
      // Register listener BEFORE click; remove itself after first match to avoid duplicates
      const responsePromise = new Promise<{
        uuid: string;
        messageData: string;
      }>((resolve, reject) => {
        const handler = async (response: Response) => {
          const url = response.url();
          const match = url.match(
            /webservicetransactions\/([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})$/,
          );
          if (match) {
            this.page.off("response", handler);
            const uuid = match[1];
            try {
              const data = await response.json();
              resolve({ uuid, messageData: data.messageData as string });
            } catch (e) {
              reject(new Error(`Failed to parse API response as JSON: ${e}`));
            }
          }
        };
        this.page.on("response", handler);
      });

      await this.viewMsgsFirstRow.click();

      const { uuid, messageData } = await Promise.race([
        responsePromise,
        new Promise<never>((_, reject) =>
          setTimeout(
            () => reject(new Error("Response capture timed out after 10s")),
            10000,
          ),
        ),
      ]);

      this.transactionUuid = uuid;
      this.capturedXmlContent = messageData;

      await this.page
        .locator(".CodeMirror")
        .waitFor({ state: "visible", timeout: 10000 });
    });
  }

  async openVehicleSectionsTab(): Promise<void> {
    await step("Click Vehicle Sections tab", async () => {
      await this.vehicleSectionsTab.click();
    });
  }

  async openManualSectionsTab(): Promise<void> {
    await step("Click Manual Sections tab", async () => {
      await this.manualSectionsTab.click();
    });
  }

  async verifyQuotingNavButtonsDisabled(): Promise<void> {
    await step(
      "Verify Manual Quote, Templates and Vehicle Sections buttons are disabled",
      async () => {
        await expect(this.manualSectionsTab).toHaveClass(/disabled/);
        await expect(this.templatesTab).toHaveClass(/disabled/);
        await expect(this.vehicleSectionsTab).toHaveClass(/disabled/);
      },
    );
  }

  // ─────────────────────────────────────────────
  // Input & Form Methods
  // ─────────────────────────────────────────────

  async clickUidInput(uid: string): Promise<void> {
    await step(`Entered UID: ${uid}`, async () => {
      await this.uidInput.click();
      await this.uidInput.fill(uid);
    });
  }

  async clickMessageNoInput(messageNo: string): Promise<void> {
    await step(`Entered Message No.: ${messageNo}`, async () => {
      await this.messageNoInput.click();
      await this.messageNoInput.fill(messageNo);
    });
  }

  async clickRegNoInput(regNo: string): Promise<void> {
    await step(`Entered Registration No.: ${regNo}`, async () => {
      await this.regNoInput.click();
      await this.regNoInput.fill(regNo);
    });
  }

  async clickFilterButton(): Promise<void> {
    await step("Click Filter button", async () => {
      await this.filterButton.click();
    });
  }

  //   async clickLoadMessageButton(
  //     expectedH1?: string,
  //     expectedQuoteStatus?: string,
  //   ): Promise<void> {
  //     if (expectedH1) {
  //       await step(
  //         "Click Load Message, verify preview tab, close it, click Yes, switch to new tab, and verify quote status",
  //         async () => {
  //           const oldPage = this.page;

  //           const [previewTab] = await Promise.all([
  //             oldPage.context().waitForEvent("page"),
  //             this.loadMessageButton.click(),
  //           ]);

  //           await previewTab.waitForLoadState("domcontentloaded");
  //           await expect(
  //             previewTab.getByRole("heading", { name: expectedH1 }),
  //           ).toBeVisible();
  //           await previewTab.close();

  //           const [newTab] = await Promise.all([
  //             oldPage.context().waitForEvent("page"),
  //             this.yesButton.click(),
  //           ]);

  //           await newTab.waitForLoadState("domcontentloaded");

  //           // Switch current ORM page object to new tab
  //           this.page = newTab;
  //           this.rebindLocators();

  //           // Close old page after rebinding
  //           await oldPage.close();

  //           // Navigate to ORM tab and verify quote status
  //           if (expectedQuoteStatus) {
  //             await this.openORMTab();
  //             await this.validateQuoteStatus(expectedQuoteStatus);
  //           }
  //         },
  //       );
  //     } else {
  //       await step("Click Load Message button", async () => {
  //         await this.loadMessageButton.click();
  //       });
  //     }
  //   }

  async clickLoadMessageButton(
    expectedH1?: string,
    expectedQuoteStatus?: string,
  ): Promise<Page | undefined> {
    if (expectedH1) {
      return await step(
        "Click Load Message, verify preview tab, close it, click Yes, switch to new tab, and verify quote status",
        async () => {
          const oldPage = this.page;

          const [previewTab] = await Promise.all([
            oldPage.context().waitForEvent("page"),
            this.loadMessageButton.click(),
          ]);

          await previewTab.waitForLoadState("domcontentloaded");

          await expect(
            previewTab.getByRole("heading", { name: expectedH1 }),
          ).toBeVisible();

          await previewTab.close();

          const [newTab] = await Promise.all([
            oldPage.context().waitForEvent("page"),
            this.yesButton.click(),
          ]);

          await newTab.waitForLoadState("domcontentloaded");

          // Switch ORM page object to the newly opened quote page
          this.page = newTab;
          this.rebindLocators();

          // Do not close oldPage here if other page objects are still using it
          // await oldPage.close();

          if (expectedQuoteStatus) {
            await this.openORMTab();
            await this.validateQuoteStatus(expectedQuoteStatus);
          }

          return newTab;
        },
      );
    }

    await step("Click Load Message button", async () => {
      await this.loadMessageButton.click();
    });

    return undefined;
  }

  async clickNextButton(): Promise<void> {
    await step("Click Next button", async () => {
      await this.nextBtn.click();
    });
  }

  async clickFirstRow(): Promise<void> {
    await step("Click the first row of the table", async () => {
      await this.firstVisibleRow.click();
    });
  }

  async clickExistingUserRadioButton(): Promise<void> {
    await step("Select Existing User radio button", async () => {
      await this.existingUserRadioBtn.click();
    });
  }

  async SelectTransmission(option: string): Promise<void> {
    await step(`Select Transmission: ${option}`, async () => {
      await this.transmissionDropdown.selectOption(option);
    });
  }

  async enterColour(colour: string): Promise<void> {
    await step(`Enter Colour: ${colour}`, async () => {
      await this.colourInput.fill(colour);
    });
  }

  async enterOdometer(odometer: string): Promise<void> {
    await step(`Enter Odometer: ${odometer}`, async () => {
      await this.odometerInput.fill(odometer);
    });
  }

  async enterEstimator(estimator: string): Promise<void> {
    await step(`Enter Estimator: ${estimator}`, async () => {
      await this.estimatorInput.fill(estimator);
    });
  }

  async enterEstimateStartDate(): Promise<void> {
    await step("Enter Estimate Start Date as tomorrow", async () => {
      const startDate = getFutureDateTime(1);
      await this.estimateStartDateInput.fill(startDate);
      await this.estimateStartDateInput.press("Tab");
    });
  }

  async enterEstimateEndDate(): Promise<void> {
    await step("Enter Estimate End Date as 3 days from today", async () => {
      const endDate = getFutureDateTime(3);
      await this.estimateEndDateInput.fill(endDate);
      await this.estimateEndDateInput.press("Tab");
    });
  }

  async enterSearchText(searchValue: string): Promise<void> {
    await step(`Enter search text: ${searchValue}`, async () => {
      await this.searchInput.fill(searchValue);
      await expect(this.searchInput).toHaveValue(searchValue);
    });
  }

  async clickFirstORMQuote(): Promise<void> {
    await step("Click the ORM Quote from the search result", async () => {
      await this.ormQuoteNo.click();
    });
  }

  // Call this whenever this.page is reassigned to a new tab
  private rebindLocators(): void {
    this.ormLink = this.page.getByRole("link", { name: "message ORM" });
    this.quoteStatusSelect = this.page
      .locator("tr", { hasText: "Quote Status" })
      .locator("select");
  }

  // Click Continue, verify preview tab, close it, click Yes, switch to new tab, and verify H1 in new tab
  async clickContinueAndVerify(
    expectedH1: string,
  ): Promise<{ quoteTab: Page; quoteNumber: string }> {
    return await step(
      "Click Continue, verify new tab, click Yes, and capture quote number",
      async () => {
        const [previewTab] = await Promise.all([
          this.page.context().waitForEvent("page"),
          this.continueButton.click(),
        ]);
        await previewTab.waitForLoadState("domcontentloaded");
        await expect(
          previewTab.getByRole("heading", { name: expectedH1 }),
        ).toBeVisible();
        await previewTab.close();
        const [quoteTab] = await Promise.all([
          this.page.context().waitForEvent("page"),
          this.yesButton.click(),
        ]);
        await quoteTab.waitForLoadState("domcontentloaded");
        const quoteNumberLocator = quoteTab
          .locator(".quote-info .has-text-weight-bold")
          .first();
        const quoteNumber = (await quoteNumberLocator.innerText()).trim();
        const oldPage = this.page;
        this.page = quoteTab;
        this.rebindLocators();
        await oldPage.close();
        return { quoteTab, quoteNumber };
      },
    );
  }

  async searchAndOpenQuoteByNumber(quoteNumber: string): Promise<void> {
    await step(`Search and open Quote No: ${quoteNumber}`, async () => {
      await this.searchInput.fill(quoteNumber);
      await expect(this.searchInput).toHaveValue(quoteNumber);
      await this.filterButton.click();
      const quoteLink = this.page.locator(
        "table:visible tbody tr td:first-child a[href]",
        { hasText: new RegExp(`^\\s*${quoteNumber}\\s*$`) },
      );
      await expect(quoteLink).toBeVisible({ timeout: 30000 });
      await Promise.all([
        this.page.waitForURL(/\/v2\/quotes\//, {
          waitUntil: "domcontentloaded",
        }),
        quoteLink.click(),
      ]);
    });
  }

  // ─────────────────────────────────────────────
  // Quoting Item Methods
  // ─────────────────────────────────────────────

  async selectingQuotingItemsRandom(): Promise<void> {
    const plusButtons = this.page.locator(
      "table tbody tr td:last-child div.butterfly-item-values",
      { hasText: /^\s*\+\s*$/ },
    );

    await expect(plusButtons.first()).toBeVisible({ timeout: 10000 });

    const totalPlusButtons = await plusButtons.count();
    if (totalPlusButtons < 5) {
      throw new Error(
        `Expected at least 5 plus buttons, but found ${totalPlusButtons}`,
      );
    }

    const indexes = Array.from({ length: totalPlusButtons }, (_, i) => i);
    indexes.sort(() => Math.random() - 0.5);
    const randomFiveIndexes = indexes.slice(0, 5);

    for (const index of randomFiveIndexes) {
      const freshPlusButtons = this.page.locator(
        "table tbody tr td:last-child div.butterfly-item-values",
        { hasText: /^\s*\+\s*$/ },
      );
      const plusButton = freshPlusButtons.nth(index);
      await plusButton.scrollIntoViewIfNeeded();
      await expect(plusButton).toBeVisible();
      await plusButton.click({ force: true });
      await this.page.waitForTimeout(500);
    }
  }

  // Random Price for Quoting Items
  async randomPriceForItems(): Promise<void> {
    const allPartRows = this.page.locator(".quote-builder-item-row.type-part");
    await expect
      .poll(
        async () => {
          const count = await allPartRows.count();
          let visibleCount = 0;
          for (let i = 0; i < count; i++) {
            if (await allPartRows.nth(i).isVisible()) visibleCount++;
          }
          return visibleCount;
        },
        { timeout: 10000, message: "Waiting for visible part rows" },
      )
      .toBeGreaterThan(0);

    const rowCount = await allPartRows.count();
    for (let i = 0; i < rowCount; i++) {
      const row = allPartRows.nth(i);
      if (!(await row.isVisible())) continue;

      const rowId = await row.getAttribute("id");
      if (!rowId) continue;

      const totalValue = row.locator(`[id="${rowId}-total-val"]`);
      const totalText = ((await totalValue.textContent()) || "").trim();
      const numericTotal = Number(totalText.replace(/[^0-9.]/g, "")) || 0;
      if (numericTotal > 0) continue;

      const randomPrice = Math.floor(Math.random() * (70 - 10 + 1)) + 10;
      await row.scrollIntoViewIfNeeded();
      await totalValue.click({ force: true });

      const unitInput = row.locator(`input[id="${rowId}-unit"]`);
      await unitInput.waitFor({ state: "visible", timeout: 8000 });

      const existingValue = ((await unitInput.inputValue()) || "").trim();
      if (
        existingValue === "" ||
        existingValue === "0" ||
        existingValue === "0.00"
      ) {
        await unitInput.fill(randomPrice.toString());
        await unitInput.press("Tab");
      }
    }
  }

  // Invoice flow for  both Scenarios
  async handleInvoiceFlow(
    generatedQuoteNumber: string,
    subNavBarPage: any,
  ): Promise<void> {
    await step("Handle Invoice Flow", async () => {
      const createInvoiceVisible = await this.createInvoice
        .isVisible()
        .catch(() => false);
      const invoiceCheckBoxVisible = await this.invoiceCheckBox
        .first()
        .waitFor({ state: "attached", timeout: 5000 })
        .then(() => true)
        .catch(() => false);
      // Case 1: Create Invoice flow
      if (createInvoiceVisible) {
        await step("Case 1: Create and Save Invoice", async () => {
          await this.clickCreateInvoice();
          await this.clickSaveInvoice();
          await subNavBarPage.expectToast(
            `Quote ${generatedQuoteNumber} saved`,
          );
        });
        return;
      }
      // Case 2: Raise Invoice flow — checkbox exists in "To Be Invoiced" table
      if (invoiceCheckBoxVisible) {
        await step("Case 2: Select Invoice and Raise Invoice", async () => {
          await this.clickInvoiceCheckBox();
          await expect(this.raiseInvoice).toBeVisible();
          await this.clickRaiseInvoice();
          await subNavBarPage.expectToast(
            `Quote ${generatedQuoteNumber} saved`,
          );
        });
        return;
      }
      throw new Error(
        "No valid invoice action found. Create Invoice or Raise Invoice option is not visible.",
      );
    });
  }

  // ─────────────────────────────────────────────
  // Simultaneously Load Authority Methods
  // ─────────────────────────────────────────────
  generateRandomPartValue(min: number = 10, max: number = 70): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  roundToTwo(value: number): number {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }
  formatXmlAmount(value: number): string {
    return Number.isInteger(value) ? String(value) : value.toFixed(2);
  }

  replaceXmlTagValue(
    xml: string,
    tagName: string,
    value: string,
    required: boolean = true,
  ): string {
    const regex = new RegExp(`<${tagName}>[\\s\\S]*?<\\/${tagName}>`);
    if (!regex.test(xml)) {
      if (required) {
        throw new Error(`${tagName} tag not found in XML.`);
      }
      return xml;
    }
    return xml.replace(regex, `<${tagName}>${value}</${tagName}>`);
  }

  generateRandomPartValuesFromXml(xml: string): number[] {
    const partValueMatches =
      xml.match(/<PartValue>[\s\S]*?<\/PartValue>/g) || [];
    if (partValueMatches.length === 0) {
      throw new Error("No PartValue tags found in XML.");
    }
    return partValueMatches.map(() => this.generateRandomPartValue(10, 70));
  }

  modifyQMLQuoteWithRandomChangedPartValues(xml: string): {
    xml: string;
    partValues: number[];
    grandTotalExTax: number;
    taxAmount: number;
    grandTotalIncTax: number;
  } {
    let updatedXml = xml;

    updatedXml = this.incrementMessageNo(updatedXml);

    const randomPartValues = this.generateRandomPartValuesFromXml(updatedXml);

    let partValueIndex = 0;

    updatedXml = updatedXml.replace(/<PartValue>[\s\S]*?<\/PartValue>/g, () => {
      const randomValue = randomPartValues[partValueIndex];
      partValueIndex++;

      return `<PartValue>${this.formatXmlAmount(randomValue)}</PartValue>`;
    });

    updatedXml = updatedXml.replace(
      /<UpdateStatus>[\s\S]*?<\/UpdateStatus>/g,
      "<UpdateStatus>CHANGED</UpdateStatus>",
    );

    const grandTotalExTax = randomPartValues.reduce(
      (sum, value) => sum + value,
      0,
    );
    const taxAmount = this.roundToTwo(grandTotalExTax * 0.1);
    const grandTotalIncTax = this.roundToTwo(grandTotalExTax + taxAmount);

    updatedXml = this.replaceXmlTagValue(
      updatedXml,
      "GrandTotalExTax",
      this.formatXmlAmount(grandTotalExTax),
    );

    updatedXml = this.replaceXmlTagValue(
      updatedXml,
      "TaxAmount",
      this.formatXmlAmount(taxAmount),
    );

    updatedXml = this.replaceXmlTagValue(
      updatedXml,
      "GrandTotalIncTax",
      this.formatXmlAmount(grandTotalIncTax),
      false,
    );

    this.changedPartValues = randomPartValues;
    this.changedGrandTotalExTax = grandTotalExTax;
    this.changedTaxAmount = taxAmount;
    this.changedGrandTotalIncTax = grandTotalIncTax;

    return {
      xml: updatedXml,
      partValues: randomPartValues,
      grandTotalExTax,
      taxAmount,
      grandTotalIncTax,
    };
  }

  async getAndModifyQMLQuoteWithRandomChangedPartValues(): Promise<{
    xml: string;
    partValues: number[];
    grandTotalExTax: number;
    taxAmount: number;
    grandTotalIncTax: number;
  }> {
    return await step(
      "Read copied XML, randomize part values, update totals and tax",
      async () => {
        const xmlContent = await this.getXmlContent();

        this.extractedMessageNo = this.extractMessageNo(xmlContent);
        this.incrementedMessageNo = String(Number(this.extractedMessageNo) + 1);

        const result =
          this.modifyQMLQuoteWithRandomChangedPartValues(xmlContent);

        this.modifiedXml = result.xml;

        return result;
      },
    );
  }
}
