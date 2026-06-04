import { expect, type Page, type Locator } from "@playwright/test";
import { step } from "allure-js-commons";
import { BasePage } from "../Base/BasePage.js";
import { generateRandomCustomer } from "../../helpers/dataGenerators.js";

export class QuotePage extends BasePage {
  repairerQuote: Locator;
  addNewBtn: Locator;
  quoteSearchInput: Locator;
  regoInput: Locator;
  stateDropdown: Locator;
  scheduleBtn: Locator;
  scheduleInput: Locator;
  filterBtn: Locator;
  dropdown1: Locator;
  dropdown2: Locator;
  colorInput: Locator;
  vinInput: Locator;
  engineInput: Locator;
  yearInput: Locator;
  cylInput: Locator;
  ccInput: Locator;
  paint1: Locator;
  paint2: Locator;
  firstName: Locator;
  lastName: Locator;
  addAltContact: Locator;
  removeAltContact: Locator;
  quoteNumber: Locator;
  altFirstName: Locator;
  altLastName: Locator;
  addressInput: Locator;
  addressSelect: Locator;
  insurerDropdown: Locator;
  selectedInsurer: Locator;
  claimNumberInput: Locator;
  saveCreate: Locator;
  save: Locator;
  backBtn: Locator;

  constructor(page: Page) {
    super(page);

    // Navigation
    this.repairerQuote = page
      .locator("#main-nav-menu")
      .getByText("Repairer Quote");

    // Create Quote
    this.addNewBtn = page.getByText("addNew");

    // Quote List Search
    this.quoteSearchInput = page
      .getByRole("textbox", { name: "Search" })
      .first();

    this.quoteNumber = page.locator("span.has-text-weight-bold.mx-1");

    // Vehicle Details
    this.regoInput = page.locator(
      "//div[contains(@class,'autocomplete')]//input[@type='text' and @maxlength='10']",
    );
    this.stateDropdown = page.getByRole("combobox").first();

    // Schedule
    this.scheduleBtn = page.getByRole("button", { name: "󰍉 Schedules" });
    this.scheduleInput = page.getByRole("textbox", { name: "MTA Schedule" });
    this.filterBtn = page.getByRole("button", { name: "󰍉 Filter" });

    // Dropdown selections
    this.dropdown1 = page.getByRole("combobox").nth(3);
    this.dropdown2 = page.getByRole("combobox").nth(5);

    // Color
    this.colorInput = page.locator(
      "//label[contains(.,'Colour')]/following-sibling::p//input",
    );
    // VIN + Engine
    this.vinInput = page.locator('input[name="vin"]');
    this.engineInput = page
      .locator(".field-body > div:nth-child(2) > .control > .input")
      .first();

    // Year / Cyl / CC
    this.yearInput = page.getByRole("textbox", { name: "e.g." }).first();
    this.cylInput = page.getByRole("textbox", { name: "e.g." }).nth(1);
    this.ccInput = page.getByRole("textbox", { name: "e.g. 1300" });

    // Paint fields
    this.paint1 = page
      .locator("div:nth-child(11) > .field-body > div > .control > .input")
      .first();
    this.paint2 = page.locator(
      "div:nth-child(11) > .field-body > div:nth-child(2) > .control > .input",
    );

    // Customer
    this.firstName = page.getByRole("textbox", { name: "First Name" }).first();
    this.lastName = page.getByRole("textbox", { name: "Last Name" }).first();

    // Alt Contact
    this.addAltContact = page.getByRole("button", {
      name: "Add Alternative Contact add",
    });
    this.removeAltContact = page.getByRole("button", {
      name: "Remove Alternative Contact",
    });
    this.altFirstName = page
      .getByRole("textbox", { name: "First Name" })
      .nth(1);
    this.altLastName = page.getByRole("textbox", { name: "Last Name" }).nth(1);

    // Address
    this.addressInput = page.getByRole("textbox", {
      name: "Start typing address",
    });
    this.addressSelect = page.getByRole("button", {
      name: "󰍎 Test Ridge Trail, Banda",
    });

    // Insurance
    this.insurerDropdown = page.locator(".multiselect__select");
    this.selectedInsurer = page.locator(".multiselect__single");
    this.claimNumberInput = page.getByRole("textbox", { name: "Claim Number" });

    // Save
    this.saveCreate = page.getByText("saveCreate");
    this.save = page.getByText("saveSave");

    // Navigation
    this.backBtn = page.getByText("arrow_backBack");
  }

  // ACTION METHODS (DYNAMIC)

  async getQuoteNumber(): Promise<string> {
    return ((await this.quoteNumber.textContent()) ?? "").trim();
  }

  async openRepairerQuote() {
    await this.repairerQuote.click();
  }

  async createNewQuote() {
    await step("Open New Quote Form", async () => {
      await this.addNewBtn.click();
    });
  }

  async searchAndOpenQuote(quoteNumber: string) {
    await step(`Search and Open Quote ${quoteNumber}`, async () => {
      await this.quoteSearchInput.fill(quoteNumber);
      await this.page.keyboard.press("Enter");
      await this.page.getByText(quoteNumber).first().click();
    });
  }

  async editVehicleDetails(data: {
    rego?: string;
    vin?: string;
    color?: string;
  }) {
    await step("Edit Vehicle Details", async () => {
      if (data.rego) {
        await this.regoInput.clear();
        await this.regoInput.fill(data.rego);
      }
      if (data.vin) {
        await this.vinInput.clear();
        await this.vinInput.fill(data.vin);
      }
      if (data.color) {
        await this.colorInput.clear();
        await this.colorInput.fill(data.color);
      }
    });
  }

  async fillVehicleDetails(data: { rego?: string; state?: string }) {
    await step("Fill Vehicle Details", async () => {
      if (data.rego) await this.regoInput.fill(data.rego);
      if (data.state) await this.stateDropdown.selectOption(data.state);
    });
  }

  async selectSchedule(data: {
    scheduleSearch?: string;
    scheduleOption?: string;
  }) {
    await step(`Select Schedule "${data.scheduleOption ?? ""}"`, async () => {
      await this.scheduleBtn.click();
      if (data.scheduleSearch)
        await this.scheduleInput.fill(data.scheduleSearch);
      await this.filterBtn.click();
      if (data.scheduleOption)
        await this.page
          .getByRole("cell", { name: data.scheduleOption })
          .click();
    });
  }

  async fillVehicleSpecs(data: {
    model?: string;
    transmission?: string;
    color?: string;
    vin?: string;
    engine?: string;
    year?: string;
    cyl?: string;
    cc?: string;
  }) {
    await step("Fill Vehicle Specs", async () => {
      if (data.model) await this.dropdown1.selectOption(data.model);
      if (data.transmission)
        await this.dropdown2.selectOption(data.transmission);
      if (data.color) await this.colorInput.fill(data.color);
      if (data.vin) await this.vinInput.fill(data.vin);
      if (data.engine) await this.engineInput.fill(data.engine);
      if (data.year) await this.yearInput.fill(data.year);
      if (data.cyl) await this.cylInput.fill(data.cyl);
      if (data.cc) await this.ccInput.fill(data.cc);
    });
  }

  async fillPaintDetails(data: { paint1?: string; paint2?: string }) {
    await step("Fill Paint Details", async () => {
      if (data.paint1) await this.paint1.fill(data.paint1);
      if (data.paint2) await this.paint2.fill(data.paint2);
    });
  }

  async fillCustomerDetails(data: { firstName?: string; lastName?: string }) {
    await step("Fill Customer Details", async () => {
      if (data.firstName) await this.firstName.fill(data.firstName);
      if (data.lastName) await this.lastName.fill(data.lastName);
    });
  }

  async createUniqueCustomer() {
    let customerData!: ReturnType<typeof generateRandomCustomer>;
    await step("Create New Customer", async () => {
      customerData = generateRandomCustomer();
      await this.firstName.fill(customerData.firstName);
      await this.lastName.fill(customerData.lastName);
    });
    return customerData;
  }

  async selectExistingCustomer(firstName: string) {
    await step(`Select Existing Customer "${firstName}"`, async () => {
      await this.firstName.fill(firstName);
      await this.page
        .getByRole("button", { name: new RegExp(firstName, "i") })
        .click();
      await expect(this.firstName).toHaveValue(/.+/);
      await expect(this.lastName).toHaveValue(/.+/);
    });
  }

  async addAlternativeContact(data: { firstName?: string; lastName?: string }) {
    await step("Add Alternative Contact", async () => {
      await this.addAltContact.click();
      if (data.firstName) await this.altFirstName.fill(data.firstName);
      if (data.lastName) await this.altLastName.fill(data.lastName);
    });
  }

  async fillAddress(data: { address?: string; selectAddress?: boolean }) {
    await step("Fill Address", async () => {
      if (data.address) await this.addressInput.fill(data.address);
      if (data.selectAddress) await this.addressSelect.click();
    });
  }

  async fillClaimNumber(): Promise<string> {
    let claimNumber!: string;
    await step("Fill Claim Number", async () => {
      claimNumber = `CL-${Math.floor(100000 + Math.random() * 900000)}`;
      await this.claimNumberInput.fill(claimNumber);
    });
    return claimNumber;
  }

  async selectInsurer(primary: string) {
    await step(`Select Insurer "${primary}"`, async () => {
      await this.insurerDropdown.click();
      if (primary) {
        await Promise.all([
          this.page.waitForResponse(
            (r) =>
              r.url().includes("/UniqApi/v1/insurers/") &&
              r.request().method() === "GET" &&
              r.status() === 200,
          ),
          this.page.getByText(primary, { exact: true }).click(),
        ]);
      }
    });
  }

  async expectInsurerSelected(name: string) {
    await expect(this.selectedInsurer).toHaveText(name);
  }

  async updateInsurer(secondary: string) {
    await step(`Update Insurer to "${secondary}"`, async () => {
      await this.insurerDropdown.click();
      if (secondary)
        await this.page.getByText(secondary, { exact: true }).first().click();
    });
  }

  async getAllToastMessages() {
    const toasts = this.page.getByRole("alert");
    await toasts.first().waitFor({ state: "visible", timeout: 10000 });
    const count = await toasts.count();
    const messages: (string | null)[] = [];
    for (let i = 0; i < count; i++) {
      messages.push(await toasts.nth(i).textContent());
    }
    return messages;
  }

  async goBack() {
    await this.backBtn.click();
  }
}
