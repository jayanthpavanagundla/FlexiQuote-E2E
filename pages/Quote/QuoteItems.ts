import { expect, type Page, type Locator } from "@playwright/test";
import { step } from "allure-js-commons";

const CATEGORY_INDEX: Record<string, number> = {
  rr: 0,
  repair: 1,
  paint: 2,
  mech: 3,
  parts: 4,
  misc: 5,
  sublets: 6,
};

export class QuoteItemsPage {
  page: Page;
  editableField: (id: string) => Locator;
  paintLoadingPrefix: string;
  paintConsumablesText: string;

  // LOGIN
  username: Locator;
  password: Locator;
  nextBtn: Locator;
  companyInput: Locator;
  companyOption: Locator;
  signInBtn: Locator;

  // NAVIGATION
  quoteTab: Locator;
  repairerQuote: Locator;
  searchBox: Locator;
  searchResult: Locator;
  editQuote: Locator;

  // DELETE BUTTONS
  deleteBtn: Locator;
  deleteMiscBtn: Locator;
  saveBtn: Locator;

  // LABOUR (R&R)
  rrTab: Locator;
  addItemBtn1: Locator;
  itemDesc: Locator;
  reportTag: Locator;
  rateInput: Locator;
  hoursInput: Locator;
  genericTextbox4: Locator;
  itemNo: Locator;
  capitalizedInput: Locator;
  addItemBtn2: Locator;
  labourDynamicClick: Locator;
  percentageDropdown: Locator;
  addItemBtn3: Locator;
  comboboxS1: Locator;

  // MECH
  addItemBtn4: Locator;
  itemDescription: Locator;
  mechItemDescription: Locator;
  mechTagClick: Locator;
  hoursLowercase: Locator;
  mechAmountClick: Locator;

  // PARTS
  addItemBtn5: Locator;
  partCombobox: Locator;
  partTagClick: Locator;
  partDetailsDropdown: Locator;
  partNo: Locator;
  qtyInput: Locator;
  part2Dynamic: Locator;
  part2PriceClick: Locator;

  // MISC
  miscTab: Locator;
  paintMaterial: Locator;
  setupColor: Locator;
  miscRate: Locator;

  // SUBLETS
  subletsTab: Locator;
  subletAddBtn: Locator;
  subletTag: Locator;
  subletAmount: Locator;
  subletSelect: Locator;
  vendorDropdown: Locator;
  vendorOption: Locator;
  subletSecondRow: Locator;

  // ERROR / ALERT
  error400: Locator;
  alert: Locator;

  // COMMON
  addItemButtons: Locator;
  labourSection: Locator;
  labourRows: Locator;
  partsSection: Locator;
  partsRows: Locator;
  paintItemRows: Locator;
  partsType: Locator;
  categoryTabs: Locator;
  itemRows: Locator;
  rateInputs: Locator;
  itemDescSpan: Locator;

  // VEHICLE SECTION SEARCH
  vehicleSearchFilter: Locator;

  constructor(page: Page) {
    this.page = page;

    // LOGIN
    this.username = page.getByRole("textbox", {
      name: "Username New Password Confirm",
    });
    this.password = page.getByRole("textbox", {
      name: "Password",
      exact: true,
    });
    this.nextBtn = page.getByRole("button", { name: "Next" });
    this.companyInput = page.getByRole("textbox", { name: "Select a company" });
    this.companyOption = page.locator("#ui-id-914");
    this.signInBtn = page.getByRole("button", { name: "Sign In" });

    // NAVIGATION
    this.quoteTab = page.getByText("Quote", { exact: true });
    this.repairerQuote = page
      .locator("#main-nav-menu")
      .getByText("Repairer Quote");
    this.searchBox = page.getByRole("textbox", {
      name: "Search the system...",
    });
    this.searchResult = page.getByRole("button", {
      name: "367FGBICR 27701 Quote To Be",
    });
    this.editQuote = page.getByRole("link", { name: "edit_document Quoting" });

    // DELETE BUTTONS
    this.deleteBtn = page.getByRole("button", { name: "Delete delete" });
    this.deleteMiscBtn = page.getByRole("button", {
      name: "Delete Misc Item delete",
    });
    this.saveBtn = page.getByText("saveSave");

    // LABOUR (R&R)
    this.rrTab = page.locator("span").filter({ hasText: "R&R" });
    this.addItemBtn1 = page.getByRole("button", { name: "+ Add Item" }).first();
    this.itemDesc = page.getByRole("textbox", { name: "Item Description" });
    this.reportTag = page.getByText("R", { exact: true }).nth(1);
    this.rateInput = page.getByRole("textbox", { name: "Rate" });
    this.hoursInput = page.getByRole("textbox", { name: "H(s)" });
    this.genericTextbox4 = page.getByRole("textbox").nth(4);
    this.itemNo = page.getByRole("textbox", { name: "Item No." });
    this.capitalizedInput = page.locator(".input.is-capitalized");
    this.addItemBtn2 = page.getByRole("button", { name: "+ Add Item" }).nth(1);
    this.labourDynamicClick = page.locator(
      '[id="147ce76c-51e5-4339-aaa6-fdc2d3544a85"] > .fixed-grid.has-12-cols.is-align-self-center > .grid.is-align-self-center > div:nth-child(3)',
    );
    this.percentageDropdown = page.getByText("0%10%25%R $3.00 delete");
    this.addItemBtn3 = page.getByRole("button", { name: "+ Add Item" }).nth(2);
    this.comboboxS1 = page
      .getByRole("article")
      .filter({ hasText: "Quote ItemsItems: $67.70" })
      .getByRole("combobox");

    // MECH
    this.addItemBtn4 = page.getByRole("button", { name: "+ Add Item" }).nth(3);
    this.itemDescription = page.getByRole("textbox", {
      name: "Item Description",
    });
    this.mechItemDescription = page.getByRole("textbox", {
      name: "Item Description",
    });
    this.mechTagClick = page.locator(
      "#ef4249db-9663-4970-8257-192b2a461a3f > .fixed-grid.has-12-cols.is-align-self-center > div > .cell.is-flex.is-align-items-center.is-justify-content-space-evenly > .is-clickable > .is-flex > .tag",
    );
    this.hoursLowercase = page.getByRole("textbox", { name: "h(s)" });
    this.mechAmountClick = page.locator(
      "#ef4249db-9663-4970-8257-192b2a461a3f > .fixed-grid.has-12-cols.is-align-self-center > div > .cell.is-col-span-4 > .fixed-grid > .grid > .cell.is-col-span-5 > .is-flex",
    );

    // PARTS
    this.addItemBtn5 = page.getByRole("button", { name: "+ Add Item" }).nth(4);
    this.partCombobox = page
      .getByRole("article")
      .filter({ hasText: "Quote ItemsItems: $28.00" })
      .getByRole("combobox");
    this.partTagClick = page.locator(
      '[id="5ceef3ae-44c5-43c9-8b03-a79e70d253a3"] > div > div > div > div > .fixed-grid > .grid > div:nth-child(3) > .is-clickable > .is-flex > .tag',
    );
    this.partDetailsDropdown = page.getByText(
      "NEWUSEDEXCHRECRRECDALTNAFTCAFTAFTAPARR $0.00 delete Unit Price:Mark up:Buy",
    );
    this.partNo = page.getByRole("textbox", { name: "Part No." });
    this.qtyInput = page.locator('input[type="tel"]').nth(2);
    this.part2Dynamic = page.locator(
      '[id="1835bbde-46e6-492f-b8f3-7aa124ee29ad"] > div > div > div > div > .fixed-grid > .grid > div:nth-child(3) > .is-clickable > .is-flex > .tag',
    );
    this.part2PriceClick = page.locator(
      '[id="1835bbde-46e6-492f-b8f3-7aa124ee29ad"] > div > div > div > div:nth-child(4) > div',
    );

    // MISC
    this.miscTab = page.locator("span").filter({ hasText: "Misc" });
    this.paintMaterial = page.getByText("PAINT MATERIALS S1 R $28.00");
    this.setupColor = page.getByText("SETUP / COLOUR MATCH 2 COLOUR").nth(1);
    this.miscRate = page.getByRole("textbox").nth(2);

    // SUBLETS
    this.subletsTab = page.locator("span").filter({ hasText: "Sublets" });
    this.subletAddBtn = page.locator(".mb-4 > div:nth-child(3) > .button");
    this.subletTag = page.locator(
      ".is-flex.is-clickable.is-align-items-center > .tag",
    );
    this.subletAmount = page.getByRole("textbox").nth(2);
    this.subletSelect = page
      .getByRole("article")
      .filter({ hasText: "Quote ItemsItems: $28.00" })
      .locator("select");
    this.vendorDropdown = page.locator(".multiselect__select");
    this.vendorOption = page.getByText("Test Vendor 1");
    this.subletSecondRow = page.locator(
      "#da5128d9-a7bf-46d3-b045-e63e4c461552 > .fixed-grid.has-12-cols.is-align-self-center > div > .cell.is-col-span-1",
    );

    // ERROR / ALERT
    this.error400 = page.getByText("Error 400: The request is");
    this.alert = page.getByRole("alert");

    // COMMON
    this.addItemButtons = page.locator('button:has-text("+ Add Item")');
    this.labourSection = page.locator(".quote-items-section.labour");
    this.labourRows = this.labourSection.locator(
      ".item-row-quote-builder-labour",
    );
    this.partsSection = page.locator(".quote-items-section.parts");
    this.partsRows = this.partsSection.locator(".item-row-quote-builder-parts");
    this.paintItemRows = page.locator(
      ".item-row-quote-builder-labour.type-PAINT:not(.is-hidden)",
    );
    this.partsType = page.locator("//div[@class='select']//select");
    this.editableField = (id: string) => page.locator(`#${id}`);
    this.categoryTabs = page.locator(".tabs li");
    this.itemRows = page.locator(
      "article, tr, .item-row-quote-builder-parts, .item-row-quote-builder-labour",
    );
    this.rateInputs = page.getByRole("textbox", { name: "Rate" });
    this.itemDescSpan = page.locator(
      'span.is-quote-item-field-editable[id$="-itemDesc"]',
    );

    // NTAR / PAINT LOADING
    this.paintLoadingPrefix = "Paint Loading,";
    this.paintConsumablesText = "Paint Consumables. Per Paint hour";

    // VEHICLE SECTION SEARCH
    this.vehicleSearchFilter = page.getByRole("textbox", {
      name: "Start typing to filter",
    });
  }

  // NTAR / BUTTERFLY ITEM TYPE

  async selectPartsType(typeCode: string) {
    await this.partsType.selectOption(typeCode);
  }

  // PAINT LOADING (NTAR)

  getPaintLoadingItem(itemName: string) {
    return this.page.getByText(`${this.paintLoadingPrefix} ${itemName}`).last();
  }

  async expectPaintLoadingVisible(itemName: string) {
    const expectedText = `${this.paintLoadingPrefix} ${itemName}`;
    const locator = this.getPaintLoadingItem(itemName);
    await expect(locator).toBeVisible();
    const actualText = (await locator.textContent())?.trim();
    expect(actualText).toBe(expectedText);
  }

  async selectPaintLoading(itemName: string) {
    const element = this.getPaintLoadingItem(itemName);
    await expect(element).toBeVisible();
    await element.click();
  }

  // CONSUMABLES (NTAR) — USED/EXCHANGE auto-adds paint loading + misc;
  // NEW must NOT add them. Both directions are verified per part.
  async expectConsumablesAdded(
    changedParts: {
      description: string;
      condition: "USED" | "EXCHANGE" | "NEW";
    }[],
    stepLabel: string = "Verify Paint and Misc consumables added",
  ): Promise<void> {
    const qualifying = changedParts.filter(
      (p) => p.condition === "USED" || p.condition === "EXCHANGE",
    );
    const newParts = changedParts.filter((p) => p.condition === "NEW");

    await step(stepLabel, async () => {
      for (const { description } of qualifying) {
        await step(
          `Paint consumable "${this.paintLoadingPrefix} ${description}" added to Paint`,
          async () => {
            await this.expectPaintLoadingVisible(description);
          },
        );
      }
      for (const { description } of newParts) {
        await step(
          `Paint consumable "${this.paintLoadingPrefix} ${description}" NOT added for NEW part`,
          async () => {
            await expect(this.getPaintLoadingItem(description)).toBeHidden();
          },
        );
      }
      if (qualifying.length > 0) {
        await step(
          `Misc consumable "${this.paintConsumablesText}" added to Misc`,
          async () => {
            await expect(
              this.page
                .getByText(this.paintConsumablesText, { exact: true })
                .last(),
            ).toBeVisible();
          },
        );
      } else {
        await step(
          `Misc consumable "${this.paintConsumablesText}" NOT added (all parts are NEW)`,
          async () => {
            await expect(
              this.page
                .getByText(this.paintConsumablesText, { exact: true })
                .last(),
            ).toBeHidden();
          },
        );
      }
    });
  }

  // CONSUMABLES (NTAR) — deleting the "Paint Loading" item also removes the
  // auto-added Paint consumable items under Misc.
  async expectConsumablesRemoved(
    changedParts: {
      description: string;
      condition: "USED" | "EXCHANGE" | "NEW";
    }[],
    stepLabel: string = "Verify Paint and Misc consumables removed",
  ): Promise<void> {
    const qualifying = changedParts.filter(
      (p) => p.condition === "USED" || p.condition === "EXCHANGE",
    );
    await step(stepLabel, async () => {
      for (const { description } of qualifying) {
        await step(
          `Paint consumable "${this.paintLoadingPrefix} ${description}" deleted from Paint`,
          async () => {
            await expect(this.getPaintLoadingItem(description)).toBeHidden();
          },
        );
      }
      if (qualifying.length > 0) {
        await step(
          `Misc consumable "${this.paintConsumablesText}" deleted from Misc`,
          async () => {
            await expect(
              this.page
                .getByText(this.paintConsumablesText, { exact: true })
                .last(),
            ).toBeHidden();
          },
        );
      }
    });
  }

  async fillRateAndHours({
    rate,
    hours,
  }: { rate?: string; hours?: string } = {}) {
    if (rate !== undefined) await this.rateInput.fill(String(rate));
    if (hours !== undefined) await this.hoursInput.fill(String(hours));
  }

  // GENERIC ACTIONS

  async clickAddItem(category: string | number = 0) {
    const index =
      typeof category === "string"
        ? CATEGORY_INDEX[category.toLowerCase()]
        : category;
    await this.page
      .getByRole("button", { name: "+ Add Item" })
      .nth(index)
      .click();
  }

  getCategoryTab(name: string) {
    return this.categoryTabs.filter({
      has: this.page.locator("a, span", { hasText: this._exact(name) }),
    });
  }

  getItemRow(description: string) {
    return this.page
      .locator(
        "article, tr, .item-row-quote-builder-parts, .item-row-quote-builder-labour",
      )
      .filter({
        hasText: description,
      })
      .first();
  }

  async selectCategory(name: string) {
    await this.getCategoryTab(name).click();
  }

  async selectItem(description: string) {
    await this.page.getByText(description, { exact: true }).nth(1).click();
  }

  getItemDescription(description: string) {
    return this.itemDescSpan.filter({ hasText: this._exact(description) });
  }

  async expectItemVisible(description: string) {
    await expect(this.getItemDescription(description).first()).toBeVisible();
  }

  async setRateByIndex(index: number, value: string) {
    const rateInput = this.rateInputs.nth(index);
    await rateInput.waitFor({ state: "visible" });
    await rateInput.fill(value);
  }

  async fillEditableField(locator: Locator, value: string) {
    await locator.fill(value);
  }

  // LABOUR METHODS (R&R)

  async fillLabourItem({
    description,
    rate,
    hours,
  }: {
    description?: string;
    rate?: string;
    hours?: string;
  }) {
    if (description) await this.fillEditableField(this.itemDesc, description);
    if (rate) await this.fillEditableField(this.rateInput, rate);
    if (hours) await this.fillEditableField(this.hoursInput, hours);
  }

  // PARTS METHODS

  async fillPartItem({
    description,
    partNo,
    qty,
  }: {
    description?: string;
    partNo?: string;
    qty?: string;
  }) {
    if (description)
      await this.fillEditableField(this.itemDescription, description);
    if (partNo) await this.fillEditableField(this.partNo, partNo);
    if (qty) await this.fillEditableField(this.qtyInput, qty);
  }

  // MECH METHODS

  async fillMechItem({
    description,
    hours,
  }: {
    description?: string;
    hours?: string;
  }) {
    if (description) {
      const descLocator = (await this.mechItemDescription
        .isVisible()
        .catch(() => false))
        ? this.mechItemDescription
        : this.itemDescription;
      await this.fillEditableField(descLocator, description);
    }
    if (hours) await this.fillEditableField(this.hoursLowercase, hours);
  }

  // MISC METHODS

  async selectMiscItem() {
    await this.paintMaterial.click();
  }

  async fillMiscItem({
    description,
    rate,
  }: {
    description?: string;
    rate?: string;
  }) {
    if (description)
      await this.fillEditableField(this.itemDescription, description);
    if (rate) await this.fillEditableField(this.miscRate, rate);
  }

  // SUBLETS METHODS

  async fillSubletItem({
    description,
    amount,
    vendor,
  }: {
    description?: string;
    amount?: string;
    vendor?: boolean;
  }) {
    if (description)
      await this.fillEditableField(this.itemDescription, description);
    if (amount) await this.fillEditableField(this.subletAmount, amount);
    if (vendor) {
      await this.vendorDropdown.click();
      await this.vendorOption.click();
    }
  }

  // FULL FORM FILL (DYNAMIC)

  async fillQuoteItems(data: {
    labour?: { description?: string; rate?: string; hours?: string };
    parts?: { description?: string; partNo?: string; qty?: string };
    mech?: { description?: string; hours?: string };
    misc?: { description?: string; rate?: string } | boolean;
    sublets?: { description?: string; amount?: string; vendor?: boolean };
  }) {
    if (data.labour) await this.fillLabourItem(data.labour);
    if (data.parts) await this.fillPartItem(data.parts);
    if (data.mech) await this.fillMechItem(data.mech);
    if (data.misc) {
      if (typeof data.misc === "object") await this.fillMiscItem(data.misc);
      else await this.selectMiscItem();
    }
    if (data.sublets) await this.fillSubletItem(data.sublets);
  }

  // VALIDATIONS

  async verifyLabourItemVisible(text: string) {
    await expect(this.labourSection).toContainText(text);
  }

  async verifyPartItemVisible(text: string) {
    await expect(this.partsSection).toContainText(text);
  }

  // VEHICLE SECTIONS: ADD ITEMS BY INDEX
  async addQuotingItemsByIndex(count: number): Promise<string[]> {
    return await step(
      `Add ${count} quoting items from Vehicle Sections in sequence`,
      async () => {
        const clickableRows = this.page.locator(
          "table tbody tr:has(td:last-child div.butterfly-item-values)",
        );
        await expect(clickableRows.first()).toBeVisible({ timeout: 10000 });
        const total = await clickableRows.count();
        if (total < count) {
          throw new Error(
            `Not enough rows to add ${count}; only ${total} available`,
          );
        }
        const addedPartNames: string[] = [];
        for (let i = 0; i < count; i++) {
          const row = clickableRows.nth(i);
          const partName = (
            (await row.locator("td").nth(1).textContent()) ?? ""
          ).trim();
          addedPartNames.push(partName);
          const button = row.locator("td:last-child div.butterfly-item-values");
          await button.scrollIntoViewIfNeeded();
          await expect(button).toBeVisible();
          await button.click({ force: true });
          await this.page.waitForTimeout(300);
          await step(`Added item ${i + 1}: "${partName}"`, async () => {});
        }
        return addedPartNames;
      },
    );
  }
  // VERIFY PARTS ORDER IN DOM AFTER RELOAD
  async verifyPartsOrderAfterReload(addedParts: string[]): Promise<void> {
    await step(
      "Verify quote part rows order matches the sequence",
      async () => {
        await this.partsSection.scrollIntoViewIfNeeded();
        const visibleRows = this.partsSection.locator(
          ".item-row-quote-builder-parts:not(.is-hidden)",
        );
        await expect(visibleRows.first()).toBeVisible({ timeout: 10000 });
        const partDescriptions: string[] = [];
        const rowCount = await visibleRows.count();
        for (let i = 0; i < rowCount; i++) {
          const descSpan = visibleRows.nth(i).locator('span[id$="-itemDesc"]');
          const text = ((await descSpan.textContent()) ?? "").trim();
          partDescriptions.push(text);
        }
        await step("Verify part sequence matches add order", async () => {
          for (let i = 0; i < addedParts.length; i++) {
            const expected = addedParts[i];
            const actual = partDescriptions[i];
            expect
              .soft(actual, `Row ${i + 1} should be "${expected}"`)
              .toBe(expected);
            await step(
              `Row ${i + 1}: expected="${expected}" actual="${actual ?? "NOT FOUND"}"`,
              async () => {},
            );
          }
        });
      },
    );
  }

  // CAPTURE CURRENT PARTS ORDER (e.g. on source quote, before copying to an existing quote)
  async captureQuotingItemsSequence(): Promise<string[]> {
    return await step("Capture quoting items sequence", async () => {
      await this.partsSection.scrollIntoViewIfNeeded();
      const visibleRows = this.partsSection.locator(
        ".item-row-quote-builder-parts:not(.is-hidden)",
      );
      await expect(visibleRows.first()).toBeVisible({ timeout: 10000 });
      const rowCount = await visibleRows.count();
      const partDescriptions: string[] = [];
      for (let i = 0; i < rowCount; i++) {
        const descSpan = visibleRows.nth(i).locator('span[id$="-itemDesc"]');
        const text = ((await descSpan.textContent()) ?? "").trim();
        partDescriptions.push(text);
      }
      return partDescriptions;
    });
  }

  // VERIFY COPIED-TO-EXISTING QUOTE PARTS SEQUENCE MATCHES THE SOURCE QUOTE
  async verifyCopytoExistingItemsSequence(
    expectedSequence: string[],
  ): Promise<void> {
    await step(
      "Verify existing quote parts sequence matches copied quote",
      async () => {
        const actualSequence = await this.captureQuotingItemsSequence();
        expect
          .soft(actualSequence.length, "Total parts count should match")
          .toBe(expectedSequence.length);
        for (let i = 0; i < expectedSequence.length; i++) {
          const expected = expectedSequence[i];
          const actual = actualSequence[i];
          expect
            .soft(actual, `Row ${i + 1} should be "${expected}"`)
            .toBe(expected);
          await step(
            `Row ${i + 1}: expected="${expected}" actual="${actual ?? "NOT FOUND"}"`,
            async () => {},
          );
        }
      },
    );
  }

  // VERIFY LINE NUMBER SEQUENCE ACROSS PARTS ROWS
  async verifyLineNumberSequence(): Promise<void> {
    await step(
      "Verify parts line numbers increment by 1 for each consecutive row",
      async () => {
        await this.partsSection.scrollIntoViewIfNeeded();

        const visibleRows = this.partsSection.locator(
          ".item-row-quote-builder-parts:not(.is-hidden)",
        );
        await expect(visibleRows.first()).toBeVisible({ timeout: 30000 });

        const count = await visibleRows.count();
        const lineNumbers: number[] = [];

        for (let i = 0; i < count; i++) {
          await visibleRows.nth(i).click();
          const lineNoValue = await this.page
            .getByRole("textbox")
            .nth(4)
            .inputValue();
          const lineNo = parseInt(lineNoValue, 10);
          lineNumbers.push(lineNo);
          await step(
            `Row ${i + 1}: line number = ${lineNoValue}`,
            async () => {},
          );
        }

        await step(
          "Verify each row's line number equals previous + 1",
          async () => {
            for (let i = 1; i < lineNumbers.length; i++) {
              const expected = lineNumbers[i - 1] + 1;
              const actual = lineNumbers[i];
              expect
                .soft(actual, `Row ${i + 1} should be line ${expected}`)
                .toBe(expected);
            }
          },
        );
      },
    );
  }

  // DELETE ALL PARTS AND VERIFY COUNT REACHES ZERO
  async deleteAllParts(): Promise<void> {
    await step(
      "Delete all parts rows and verify Parts count shows (0)",
      async () => {
        await this.partsSection.scrollIntoViewIfNeeded();

        const visibleRows = this.partsSection.locator(
          ".item-row-quote-builder-parts:not(.is-hidden)",
        );
        await expect(visibleRows.first()).toBeVisible({ timeout: 30000 });

        let remaining = await visibleRows.count();
        while (remaining > 0) {
          const firstRow = visibleRows.first();
          await firstRow.scrollIntoViewIfNeeded();

          // Hover the delete button (not the row) to trigger its CSS
          // transition from hidden/ghost to clickable, then click it.
          const deleteBtn = firstRow.locator('button[data-tooltip="Delete"]');
          await deleteBtn.hover({ force: true });
          await deleteBtn.click();

          await this.page.waitForTimeout(300);
          remaining = await visibleRows.count();
        }
        await expect(
          this.partsSection.locator("span.ml-2:not(.has-text-weight-bold)"),
        ).toHaveText("(0)", { timeout: 10000 });
      },
    );
  }

  // DELETE ALL PAINT ITEMS AND VERIFY COUNT REACHES ZERO (NTAR)
  async deleteAllPaintItems(): Promise<void> {
    await step(
      "Delete all Paint rows and verify Paint count shows (0)",
      async () => {
        const visibleRows = this.paintItemRows;
        await expect(visibleRows.first()).toBeVisible({ timeout: 30000 });

        let remaining = await visibleRows.count();
        while (remaining > 0) {
          const firstRow = visibleRows.first();
          await firstRow.scrollIntoViewIfNeeded();

          const deleteBtn = firstRow.locator('button[data-tooltip="Delete"]');
          await deleteBtn.hover({ force: true });
          await deleteBtn.click();

          await this.page.waitForTimeout(300);
          remaining = await visibleRows.count();
        }
        await expect(visibleRows).toHaveCount(0);
      },
    );
  }

  // CHANGE ALL PARTS CONDITION FROM NEW TO USED/EXCHANGE
  async changePartsToUsedOrExchange(
    condition: "USED" | "EXCHANGE" | "NEW",
  ): Promise<
    { description: string; condition: "USED" | "EXCHANGE" | "NEW" }[]
  > {
    return await step(
      `Change all parts condition to ${condition}`,
      async () => {
        await this.partsSection.scrollIntoViewIfNeeded();
        const visibleRows = this.partsSection.locator(
          ".item-row-quote-builder-parts:not(.is-hidden)",
        );
        await visibleRows.first().scrollIntoViewIfNeeded();
        const rowCount = await visibleRows.count();

        // Map condition to select value
        const conditionMap: {
          [key in "USED" | "EXCHANGE" | "NEW"]: string;
        } = {
          USED: "U",
          EXCHANGE: "X",
          NEW: "--",
        };
        const value = conditionMap[condition];

        const results: {
          description: string;
          condition: "USED" | "EXCHANGE" | "NEW";
        }[] = [];

        for (let i = 0; i < rowCount; i++) {
          const row = visibleRows.nth(i);

          // Click the row to open it for editing
          await row.click();

          // Get description
          const descContainer = row.locator('[id$="-itemDesc"]').first();
          const descInput = descContainer.locator("input");
          const description = (
            (await descInput.count()) > 0
              ? await descInput.first().inputValue()
              : ((await descContainer.textContent()) ?? "")
          ).trim();

          // Select the option
          await row.locator("select").selectOption(value);

          results.push({ description, condition });
          await step(
            `Row ${i + 1} "${description}": set condition to ${condition}`,
            async () => {},
          );
        }
        return results;
      },
    );
  }

  _escape(str: string) {
    return String(str).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  _exact(text: string) {
    return new RegExp(`^\\s*${this._escape(text)}\\s*$`);
  }

  // NTAR Methods
  async selectVehiclePart(partName: string) {
    await this.vehicleSearchFilter.click();
    await this.vehicleSearchFilter.clear();
    await this.vehicleSearchFilter.pressSequentially(partName);
    const partRow = this.page
      .locator("tbody tr")
      .filter({
        has: this.page.locator("td", {
          hasText: this._exact(partName.toUpperCase()),
        }),
      })
      .first();
    await expect(partRow).toBeVisible();
    await partRow.locator("div.butterfly-item-values").click();
  }
}
