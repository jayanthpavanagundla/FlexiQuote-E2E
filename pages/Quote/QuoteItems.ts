import { expect, type Page, type Locator } from "@playwright/test";

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
  partsType: Locator;
  categoryTabs: Locator;
  itemRows: Locator;
  rateInputs: Locator;
  itemDescSpan: Locator;

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

  _escape(str: string) {
    return String(str).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  _exact(text: string) {
    return new RegExp(`^\\s*${this._escape(text)}\\s*$`);
  }
}
