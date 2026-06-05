import { test, expect } from "@playwright/test";
import { NavBarPage } from "../../pages/NavBarPage";
import { SubNavBarPage } from "../../pages/SubNavBarPage";
import { ORM } from "../../pages/ORM";
import { epic, feature, story, step } from "allure-js-commons";

test.describe("ORM Integration", () => {
  let navBarPage: NavBarPage;
  let subNavBarPage: SubNavBarPage;
  let ormMsgPage: ORM;

  // Variables
  let generatedQuoteNumber: string;
  // let generatedQuoteNumber: string = "10131";

  let changedPartValues: number[] = [];
  let changedGrandTotalExTax: number = 0;
  let changedTaxAmount: number = 0;
  let changedGrandTotalIncTax: number = 0;

  test.beforeEach(async ({ page }) => {
    await epic("ORM Integration");

    navBarPage = new NavBarPage(page);
    subNavBarPage = new SubNavBarPage(page);
    ormMsgPage = new ORM(page);

    await page.goto("v2/");
    await expect(page).toHaveURL(/\/v2\/$/);
  });

  test("Load RFQ", async ({ page }) => {
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectORMMessages();
    await subNavBarPage.clickNewButton();

    const { insuranceClaimNo, registrationNo } = await ormMsgPage.pasteRfqXml();
    let editorValue: string = "";
    await step("Read current XML content from CodeMirror editor", async () => {
      editorValue = await page.evaluate(() => {
        const cmInstance = (document.querySelector(".CodeMirror") as any)
          .CodeMirror;
        return cmInstance.getValue();
      });
    });
    await step(
      `Verify XML editor contains InsuranceClaimNo: ${insuranceClaimNo}`,
      async () => {
        expect(editorValue).toContain(
          `<InsuranceClaimNo>${insuranceClaimNo}</InsuranceClaimNo>`,
        );
      },
    );
    await step(
      `Verify XML editor contains RegistrationNo: ${registrationNo}`,
      async () => {
        expect(editorValue).toContain(
          `<RegistrationNo>${registrationNo}</RegistrationNo>`,
        );
      },
    );

    await ormMsgPage.clickUidInput("PJ");
    await ormMsgPage.clickMessageNoInput("0");
    await subNavBarPage.clickSaveButton();
    await subNavBarPage.expectToast("New ORM Messages added");
    await subNavBarPage.clickBackButton();
    await ormMsgPage.clickRegNoInput(registrationNo);
    await ormMsgPage.clickFilterButton();
    await ormMsgPage.clickLoadMessageButton();
    await ormMsgPage.clickNextButton();
    await ormMsgPage.clickFirstRow();
    await ormMsgPage.clickNextButton();
    await ormMsgPage.clickExistingUserRadioButton();
    await ormMsgPage.clickFirstRow();
    const result = await ormMsgPage.clickContinueAndVerify("Print Preview");
    generatedQuoteNumber = result.quoteNumber;
    await ormMsgPage.openORMTab();
    await ormMsgPage.validateQuoteStatus("Assessing Quote Request");
  });

  test("Submit Quote to ORM", async ({ page }) => {
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await ormMsgPage.searchAndOpenQuoteByNumber(generatedQuoteNumber);
    await ormMsgPage.SelectTransmission("M");
    await ormMsgPage.enterColour("Red");
    await ormMsgPage.enterOdometer("50300");
    await ormMsgPage.enterEstimator("John Doe");
    await ormMsgPage.enterEstimateStartDate();
    await ormMsgPage.enterEstimateEndDate();
    await subNavBarPage.clickSaveButton();
    await subNavBarPage.expectToast(`Quote ${generatedQuoteNumber} saved`);
    await ormMsgPage.openQuotingTab();
    await ormMsgPage.openVehicleSectionsTab();
    await ormMsgPage.selectingQuotingItemsRandom();
    await subNavBarPage.clickSaveButton();
    await ormMsgPage.openManualSectionsTab();
    await ormMsgPage.randomPriceForItems();
    await subNavBarPage.clickSaveButton();
    await ormMsgPage.openORMTab();
    await ormMsgPage.openORMDropdown();
    await ormMsgPage.clickSubmitQuote();
    await ormMsgPage.clickAngleNextButton();
    await ormMsgPage.fillAllCommentInputsWithSpecialChars();
    await ormMsgPage.clickAngleNextButton();
    await ormMsgPage.clickORMSubmitButton();
    await subNavBarPage.expectToast(`Send Quote submitted`);
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle").catch(() => {});
    await ormMsgPage.validateQuoteStatus("Quote Submitted");
  });

  test("Load Authority", async ({ page }) => {
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await ormMsgPage.searchAndOpenQuoteByNumber(generatedQuoteNumber);
    await ormMsgPage.openORMTab();
    await ormMsgPage.openORMDropdown();
    await ormMsgPage.clickViewMessages();
    await ormMsgPage.selectViewMsgFirstRow();
    await ormMsgPage.getAndModifyQMLQuote();
    await subNavBarPage.clickSaveButton();
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectORMMessages();
    await subNavBarPage.clickNewButton();
    await ormMsgPage.clickUidInput("PJ");
    await ormMsgPage.clickMessageNoInput(ormMsgPage.incrementedMessageNo);
    await ormMsgPage.clickQMLQuote();
    await ormMsgPage.pasteModifiedQMLQuote();
    await subNavBarPage.clickSaveButton();
    await subNavBarPage.clickBackButton();
    await ormMsgPage.clickLoadMessageButton(
      "Print Preview",
      "Quote Authorised",
    );
  });

  test("Simultaneously Load Authority", async ({ page }) => {
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await ormMsgPage.searchAndOpenQuoteByNumber(generatedQuoteNumber);
    await ormMsgPage.openORMTab();
    await ormMsgPage.openORMDropdown();
    await ormMsgPage.clickViewMessages();
    await ormMsgPage.selectViewMsgFirstRow();
    const totals =
      await ormMsgPage.getAndModifyQMLQuoteWithRandomChangedPartValues();

    // Store values for further comparison in next steps/tests
    changedPartValues = totals.partValues;
    changedGrandTotalExTax = totals.grandTotalExTax;
    changedTaxAmount = totals.taxAmount;
    changedGrandTotalIncTax = totals.grandTotalIncTax;

    const expectedGrandTotalExTax = changedPartValues.reduce(
      (sum, value) => sum + value,
      0,
    );

    const expectedTaxAmount =
      Math.round((expectedGrandTotalExTax * 0.1 + Number.EPSILON) * 100) / 100;
    const expectedGrandTotalIncTax =
      Math.round(
        (expectedGrandTotalExTax + expectedTaxAmount + Number.EPSILON) * 100,
      ) / 100;

    await step(
      `Verify XML totals: Ex GST=$${changedGrandTotalExTax} | Tax=$${changedTaxAmount} | Inc GST=$${changedGrandTotalIncTax}`,
      async () => {
        expect(changedGrandTotalExTax).toBe(expectedGrandTotalExTax);
        expect(changedTaxAmount).toBe(expectedTaxAmount);
        expect(changedGrandTotalIncTax).toBe(expectedGrandTotalIncTax);
      },
    );

    await step(
      "Verify modified XML contains correct GrandTotalExTax, TaxAmount and CHANGED status",
      async () => {
        expect(ormMsgPage.modifiedXml).toContain(
          `<GrandTotalExTax>${ormMsgPage.formatXmlAmount(changedGrandTotalExTax)}</GrandTotalExTax>`,
        );
        expect(ormMsgPage.modifiedXml).toContain(
          `<TaxAmount>${ormMsgPage.formatXmlAmount(changedTaxAmount)}</TaxAmount>`,
        );
        expect(ormMsgPage.modifiedXml).toContain(
          "<UpdateStatus>CHANGED</UpdateStatus>",
        );
      },
    );

    await subNavBarPage.clickSaveButton();

    await navBarPage.openQuoteDropdown();
    await navBarPage.selectORMMessages();
    await subNavBarPage.clickNewButton();

    await ormMsgPage.clickUidInput("PJ");
    await ormMsgPage.clickMessageNoInput(ormMsgPage.incrementedMessageNo);
    await ormMsgPage.clickQMLQuote();

    await ormMsgPage.pasteModifiedQMLQuote();

    await subNavBarPage.clickSaveButton();
    await subNavBarPage.clickBackButton();

    const newTab = await ormMsgPage.clickLoadMessageButton(
      "Print Preview",
      "Quote Authorised",
    );

    if (newTab) {
      subNavBarPage = new SubNavBarPage(newTab);
    }

    const { totalExGstAmount, totalIncGstAmount } =
      await subNavBarPage.fetchQuoteTotal();

    const expectedGrandTotalExTax01 = subNavBarPage.parseXmlAmount(
      ormMsgPage.modifiedXml,
      "GrandTotalExTax",
    );

    const expectedTaxAmount01 = subNavBarPage.parseXmlAmount(
      ormMsgPage.modifiedXml,
      "TaxAmount",
    );

    const expectedTotalIncGst =
      Math.round(
        (expectedGrandTotalExTax01 + expectedTaxAmount01 + Number.EPSILON) *
          100,
      ) / 100;

    await step(
      `Verify Total Ex GST: UI=$${totalExGstAmount} | XML=$${expectedGrandTotalExTax01}`,
      async () => {
        expect(totalExGstAmount).toBeCloseTo(expectedGrandTotalExTax01, 2);
      },
    );
    await step(
      `Verify Total Inc GST: UI=$${totalIncGstAmount} | XML=$${expectedTotalIncGst}`,
      async () => {
        expect(totalIncGstAmount).toBeCloseTo(expectedTotalIncGst, 2);
      },
    );
  });

  test("Addition of Extra Quote Item By Insurer", async ({ page }) => {
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await ormMsgPage.searchAndOpenQuoteByNumber(generatedQuoteNumber);

    // Capture UI totals BEFORE loading the new authority (baseline)
    const { totalExGstAmount: preLoadExGst, totalIncGstAmount: preLoadIncGst } =
      await subNavBarPage.fetchQuoteTotal();

    await ormMsgPage.openORMTab();
    await ormMsgPage.openORMDropdown();
    await ormMsgPage.clickViewMessages();
    await ormMsgPage.selectViewMsgFirstRow();

    const totals = await ormMsgPage.getAndModifyQMLQuoteWithExtraItem();

    await step(
      "Verify modified XML contains correct GrandTotalExTax, TaxAmount and ACCEPTED status",
      async () => {
        expect(ormMsgPage.modifiedXml).toContain(
          `<GrandTotalExTax>${ormMsgPage.formatXmlAmount(totals.grandTotalExTax)}</GrandTotalExTax>`,
        );
        expect(ormMsgPage.modifiedXml).toContain(
          `<TaxAmount>${ormMsgPage.formatXmlAmount(totals.taxAmount)}</TaxAmount>`,
        );
        expect(ormMsgPage.modifiedXml).toContain(
          "<UpdateStatus>ACCEPTED</UpdateStatus>",
        );
      },
    );

    await subNavBarPage.clickSaveButton();

    await navBarPage.openQuoteDropdown();
    await navBarPage.selectORMMessages();
    await subNavBarPage.clickNewButton();

    await ormMsgPage.clickUidInput("PJ");
    await ormMsgPage.clickMessageNoInput(ormMsgPage.incrementedMessageNo);
    await ormMsgPage.clickQMLQuote();
    await ormMsgPage.pasteModifiedQMLQuote();

    await subNavBarPage.clickSaveButton();
    await subNavBarPage.clickBackButton();

    const newTab = await ormMsgPage.clickLoadMessageButton(
      "Print Preview",
      "Quote Authorised",
    );

    if (newTab) {
      subNavBarPage = new SubNavBarPage(newTab);
    }

    const { totalExGstAmount, totalIncGstAmount } =
      await subNavBarPage.fetchQuoteTotal();

    // The UI total should have increased by exactly the extra item's value
    const expectedExGst =
      Math.round(
        (preLoadExGst + totals.extraPartValue + Number.EPSILON) * 100,
      ) / 100;
    const expectedIncGst =
      Math.round((expectedExGst * 1.1 + Number.EPSILON) * 100) / 100;

    await step(
      `Verify Total Ex GST: Before=$${preLoadExGst} + Extra=$${totals.extraPartValue} → Expected=$${expectedExGst} | UI=$${totalExGstAmount}`,
      async () => {
        expect(totalExGstAmount).toBeCloseTo(expectedExGst, 2);
      },
    );
    await step(
      `Verify Total Inc GST: Expected=$${expectedIncGst} | UI=$${totalIncGstAmount}`,
      async () => {
        expect(totalIncGstAmount).toBeCloseTo(expectedIncGst, 2);
      },
    );
  });

  test("Submit Tax Invoice", async ({ page }) => {
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await ormMsgPage.searchAndOpenQuoteByNumber(generatedQuoteNumber);
    await ormMsgPage.openInvoiceTab();
    await ormMsgPage.handleInvoiceFlow(generatedQuoteNumber, subNavBarPage);
    await ormMsgPage.openORMTab();
    await ormMsgPage.openORMDropdown();
    await ormMsgPage.clickTaxInvoice();
    await ormMsgPage.clickSendTaxInvoice();
    await subNavBarPage.expectToast(`Tax invoice is being submitted`);
    // Validations
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle").catch(() => {});
    await ormMsgPage.waitForQuoteEditingLocked();
    await ormMsgPage.openORMTab();
    await ormMsgPage.validateQuoteStatus("Quote Invoice Submitted");
    await ormMsgPage.openORMDropdown();
    await ormMsgPage.verifySubmitTaxInvoiceDisabled();
    await ormMsgPage.openQuotingTab();
    await ormMsgPage.verifyQuotingNavButtonsDisabled();
  });

  test("Load Payment Authorisation", async ({ page }) => {
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await ormMsgPage.searchAndOpenQuoteByNumber(generatedQuoteNumber);
    await ormMsgPage.openORMTab();
    await ormMsgPage.openORMDropdown();
    await ormMsgPage.clickViewMessages();
    await ormMsgPage.selectViewMsgFirstRow();
    await ormMsgPage.getAndModifyQMLPaymentAuthorised();
    await subNavBarPage.clickSaveButton();
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectORMMessages();
    await subNavBarPage.clickNewButton();
    await ormMsgPage.clickUidInput("PJ");
    await ormMsgPage.clickMessageNoInput(ormMsgPage.incrementedMessageNo);
    await ormMsgPage.clickPaymentAuthorised();
    await ormMsgPage.pasteModifiedQMLPaymentAuthorised();
    await subNavBarPage.clickSaveButton();
    await subNavBarPage.clickBackButton();
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await ormMsgPage.searchAndOpenQuoteByNumber(generatedQuoteNumber);
    await ormMsgPage.openORMTab();
    await ormMsgPage.validateQuoteStatus("Payment Authorised");
  });
});
