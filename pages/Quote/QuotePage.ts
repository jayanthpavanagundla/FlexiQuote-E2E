import { expect, type Page, type Locator } from "@playwright/test";
import { step, attachment, parameter } from "allure-js-commons";
import { BasePage } from "../Base/BasePage.js";
import { ORM } from "../ORM.js";
import {
  generateRandomCustomer,
  generateInsuranceClaimNo,
  generateRegistrationNo,
  generateVinNo,
  getFutureDateTime,
  randomNumbersGenerate,
} from "../../helpers/dataGenerators.js";

type SelectionResult = {
  oldLabel: string;
  selectedLabel: string;
  selectedValue: string;
};

type QuoteFieldValues = {
  regNo: string;
  transmission: string;
  paintGroup: string;
  color: string;
  vin: string;
  engineNo: string;
  cylinders: string;
  engineSize: string;
  trimCode: string;
  paintCode: string;
  firstName: string;
  lastName: string;
  insurer: string;
};

export class QuotePage extends BasePage {
  ormMsgPage: ORM;

  private previousState?: string;

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
  odometerInput: Locator;
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
  makeModelTitle: Locator;
  cloudDoneIcon: Locator;
  syncIcon: Locator;

  constructor(page: Page) {
    super(page);
    this.ormMsgPage = new ORM(page);
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
    this.makeModelTitle = page.locator("p.modal-card-title", {
      hasText: "Make/Model",
    });
    this.filterBtn = page.getByRole("button", { name: "󰍉 Filter" });

    // Dropdown selections
    // Paint Group
    this.dropdown1 = page
      .locator(
        "//label[contains(.,'Paint Group')]/following-sibling::div//select",
      )
      .first();
    // Transmission
    this.dropdown2 = page
      .locator(
        "//label[contains(.,'Transmission')]/following-sibling::div//select",
      )
      .first();

    // Color Input
    this.colorInput = page.locator(
      "//label[contains(.,'Colour')]/following-sibling::p//input",
    );

    // VIN + Engine
    this.vinInput = page.locator('input[name="vin"]');
    this.engineInput = page
      .locator(".field-body > div:nth-child(2) > .control > .input")
      .first();
    this.odometerInput = page.locator('input[placeholder="e.g. 6"]').first();

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

    // AutoSave
    this.syncIcon = page
      .locator("span.material-symbols-rounded.loading", { hasText: "sync" })
      .first();

    this.cloudDoneIcon = page
      .locator("span.material-symbols-rounded", { hasText: "cloud_done" })
      .first();
  }

  // Handle AutoSave Sync
  async waitForAutoSaveCloudDone() {
    await step("Wait for Auto Save Cloud Done", async () => {
      try {
        await expect(this.syncIcon).toBeVisible();
      } catch {
        // sync may finish very fast, so ignore
      }
      await expect(this.syncIcon).toBeHidden();
      await expect(this.cloudDoneIcon).toBeVisible();
    });
  }

  // Customer Model
  async handleUpdateCustomerModal(): Promise<void> {
    const option: "create" | "modify" =
      Math.random() < 0.5 ? "create" : "modify";
    const label =
      option === "create"
        ? "Create a new customer profile"
        : "Update the existing customer's details";
    await step(
      `Handle Update Customer modal — selected: "${label}"`,
      async () => {
        const modal = this.page.locator(".modal-card:has(> .modal-card-head)");
        await step("Verify Update Customer modal is visible", async () => {
          await expect(modal).toBeVisible({ timeout: 8000 });
          await expect(modal.getByText("Update Customer")).toBeVisible();
        });
        await step(`Select option: ${label}`, async () => {
          await modal
            .locator(`label:has(input[type="radio"][value="${option}"])`)
            .click();
        });
        await modal.locator("button.is-primary").click();
        await expect(modal).not.toBeVisible();
      },
    );
  }

  //--------------------------- COMMON METHODS ----------------------------//
  private async fillGeneratedInput(params: {
    fieldName: string;
    input: Locator;
    generate: () => string;
    clear?: boolean;
  }): Promise<string> {
    const { fieldName, input, generate, clear = false } = params;
    return await step(`Fill ${fieldName}`, async () => {
      const value = generate();
      if (clear) {
        await input.click({ clickCount: 3 });
        await input.pressSequentially(value);
      } else {
        await input.fill(value);
      }
      await input.blur();
      await step(`Filled ${fieldName}: ${value}`, async () => {});
      return value;
    });
  }

  private async selectDifferentDropdownOption(params: {
    fieldName: string;
    dropdown: Locator;
    stepName: string;
    clickBeforeSelect?: boolean;
  }): Promise<SelectionResult> {
    const { fieldName, dropdown, stepName, clickBeforeSelect = false } = params;
    return await step(stepName, async () => {
      await dropdown.waitFor({ state: "visible" });
      const oldOption = await dropdown.evaluate(
        (select: HTMLSelectElement) => ({
          label: select.selectedOptions[0]?.textContent?.trim() || "",
          value: select.value || "",
        }),
      );
      await step(
        `Extracted ${fieldName}: ${oldOption.label || "Empty / Placeholder"}`,
        async () => {},
      );
      const dropdownOptions = await dropdown
        .locator("option")
        .evaluateAll((options: HTMLOptionElement[]) =>
          options
            .map((option) => ({
              label: option.textContent?.trim() || "",
              value: option.value,
              disabled: option.disabled,
            }))
            .filter(
              (option) => option.label && option.value && !option.disabled,
            ),
        );
      const availableOptions = dropdownOptions.filter(
        (option) =>
          option.label !== oldOption.label && option.value !== oldOption.value,
      );
      if (availableOptions.length === 0) {
        throw new Error(
          `No other ${fieldName} option available apart from: ${oldOption.label}`,
        );
      }
      const randomOption =
        availableOptions[Math.floor(Math.random() * availableOptions.length)];
      if (clickBeforeSelect) {
        await dropdown.click();
      }
      await dropdown.selectOption(randomOption.value);
      await step(`Filled ${fieldName}: ${randomOption.label}`, async () => {});
      const selectedOption = await dropdown.evaluate(
        (select: HTMLSelectElement) => ({
          label: select.selectedOptions[0]?.textContent?.trim() || "",
          value: select.value || "",
        }),
      );
      await step(
        `Newly Selected ${fieldName}: ${selectedOption.label}`,
        async () => {},
      );
      return {
        oldLabel: oldOption.label,
        selectedLabel: selectedOption.label,
        selectedValue: selectedOption.value,
      };
    });
  }

  private async selectDifferentAutocompleteOption(params: {
    fieldName: string;
    input: Locator;
    values: string[];
    stepName: string;
    exclude?: string;
  }): Promise<SelectionResult> {
    const { fieldName, input, values, stepName, exclude } = params;
    return await step(stepName, async () => {
      await input.waitFor({ state: "visible" });
      // 1. Extract current value from UI
      const oldValue = (await input.inputValue()).trim();
      await step(
        `Extracted ${fieldName}: ${oldValue || "Empty / Placeholder"}`,
        async () => {},
      );
      // 2. Select value apart from current value
      const availableValues = values.filter(
        (value) => value !== oldValue && value !== exclude,
      );
      if (availableValues.length === 0) {
        throw new Error(
          `No other ${fieldName} option available apart from: ${oldValue}`,
        );
      }
      const randomValue =
        availableValues[Math.floor(Math.random() * availableValues.length)];
      await input.click();
      await input.fill(randomValue);
      await input.press("Enter");
      await input.blur();
      await step(`Filled ${fieldName}: ${randomValue}`, async () => {});
      // 3. Extract selected value again from UI
      const selectedValue = (await input.inputValue()).trim();
      await step(
        `Newly Selected ${fieldName}: ${selectedValue}`,
        async () => {},
      );
      return {
        oldLabel: oldValue,
        selectedLabel: selectedValue,
        selectedValue,
      };
    });
  }

  //--------------------------- VEHICLE SECTION 01 ----------------------------//
  async fillRegNo() {
    await step("Fill Registration Number", async () => {
      await this.regoInput.fill(generateRegistrationNo());
    });
  }

  async selectState() {
    await step("Select Random State", async () => {
      const states = ["ACT", "NSW", "NT", "QLD", "SA"];
      let randomState: string;
      do {
        randomState = states[Math.floor(Math.random() * states.length)];
      } while (randomState === this.previousState);
      this.previousState = randomState;
      await this.stateDropdown.selectOption(randomState);
    });
  }

  async makeAndModel() {
    await step("Select Random Make and Model", async () => {
      const makeAndModels = ["F687", "F685", "F620", "F680", "F615"];
      const randomMakeModel =
        makeAndModels[Math.floor(Math.random() * makeAndModels.length)];
      await this.scheduleBtn.click();
      await expect(this.makeModelTitle).toBeVisible();
      await this.scheduleInput.fill("F");
      await this.filterBtn.click();
      await this.page
        .getByRole("cell", { name: randomMakeModel })
        .first()
        .click();
      await expect(this.makeModelTitle).not.toBeVisible();
      await step(`Filled Make and Model: ${randomMakeModel}`, async () => {});
    });
  }

  async selectDifferentPaintGroup(): Promise<{
    oldPaintGroup: string;
    selectedPaintGroup: string;
    selectedPaintGroupValue: string;
  }> {
    const result = await this.selectDifferentDropdownOption({
      fieldName: "Paint Group",
      dropdown: this.dropdown1,
      stepName: "Select Different Paint Group",
    });
    return {
      oldPaintGroup: result.oldLabel,
      selectedPaintGroup: result.selectedLabel,
      selectedPaintGroupValue: result.selectedValue,
    };
  }

  async selectDifferentTransmission(): Promise<{
    oldTransmission: string;
    selectedTransmission: string;
    selectedTransmissionValue: string;
  }> {
    const result = await this.selectDifferentDropdownOption({
      fieldName: "Transmission",
      dropdown: this.dropdown2,
      stepName: "Select Different Transmission",
      clickBeforeSelect: true,
    });
    return {
      oldTransmission: result.oldLabel,
      selectedTransmission: result.selectedLabel,
      selectedTransmissionValue: result.selectedValue,
    };
  }

  async selectDifferentColor(exclude?: string): Promise<{
    oldColor: string;
    selectedColor: string;
    selectedColorValue: string;
  }> {
    const result = await this.selectDifferentAutocompleteOption({
      fieldName: "Colour",
      input: this.colorInput,
      stepName: "Select Different Colour",
      values: ["BLACK", "BLUE", "GREEN", "GREY", "RED", "SILVER", "WHITE"],
      exclude,
    });

    return {
      oldColor: result.oldLabel,
      selectedColor: result.selectedLabel,
      selectedColorValue: result.selectedValue,
    };
  }

  async fillVinNo(): Promise<string> {
    return this.fillGeneratedInput({
      fieldName: "VIN Number",
      input: this.vinInput,
      generate: generateVinNo,
    });
  }

  async fillEngineNo(): Promise<string> {
    return this.fillGeneratedInput({
      fieldName: "Engine Number",
      input: this.engineInput,
      generate: () => randomNumbersGenerate(10),
    });
  }

  async fillOdometer(): Promise<string> {
    return this.fillGeneratedInput({
      fieldName: "Odometer",
      input: this.odometerInput,
      generate: () => randomNumbersGenerate(6),
    });
  }

  async fillCylinders(): Promise<string> {
    return this.fillGeneratedInput({
      fieldName: "Cylinders",
      input: this.cylInput,
      generate: () => randomNumbersGenerate(2),
    });
  }

  async fillEngineSize(): Promise<string> {
    return this.fillGeneratedInput({
      fieldName: "Engine Size",
      input: this.ccInput,
      generate: () => randomNumbersGenerate(4),
    });
  }

  async fillTrimCode(): Promise<string> {
    return this.fillGeneratedInput({
      fieldName: "Trim Code",
      input: this.paint1,
      generate: () => randomNumbersGenerate(10),
    });
  }

  async fillPaintCode(): Promise<string> {
    return this.fillGeneratedInput({
      fieldName: "Paint Code",
      input: this.paint2,
      generate: () => randomNumbersGenerate(8),
    });
  }

  //--------------------------- CUSTOMER DETAILS 02 ----------------------------//
  async fillFirstName(): Promise<string> {
    return await step("Fill First Name", async () => {
      const name = generateRandomCustomer().firstName;
      await this.firstName.fill(name);
      return name;
    });
  }

  async fillLastName(): Promise<string> {
    return await step("Fill Last Name", async () => {
      const name = generateRandomCustomer().lastName;
      await this.lastName.fill(name);
      return name;
    });
  }

  async selectDifferentFirstName(): Promise<{
    oldFirstName: string;
    newFirstName: string;
  }> {
    return await step("Select Different First Name", async () => {
      await this.firstName.waitFor({ state: "visible" });
      const oldFirstName = (await this.firstName.inputValue()).trim();
      await step(
        `Extracted First Name: ${oldFirstName || "Empty"}`,
        async () => {},
      );
      const newFirstName = generateRandomCustomer().firstName;
      await this.firstName.click();
      await this.firstName.press("End");
      for (let i = 0; i < oldFirstName.length; i++) {
        await this.firstName.press("Backspace");
      }
      await this.firstName.pressSequentially(newFirstName);
      await this.firstName.press("Tab");
      await step(`Newly Filled First Name: ${newFirstName}`, async () => {});
      return { oldFirstName, newFirstName };
    });
  }

  async selectDifferentLastName(): Promise<{
    oldLastName: string;
    newLastName: string;
  }> {
    return await step("Select Different Last Name", async () => {
      await this.lastName.waitFor({ state: "visible" });
      const oldLastName = (await this.lastName.inputValue()).trim();
      await step(
        `Extracted Last Name: ${oldLastName || "Empty"}`,
        async () => {},
      );
      const newLastName = generateRandomCustomer().lastName;
      await this.lastName.click();
      await this.lastName.press("End");
      for (let i = 0; i < oldLastName.length; i++) {
        await this.lastName.press("Backspace");
      }
      await this.lastName.pressSequentially(newLastName);
      await step(`Newly Filled Last Name: ${newLastName}`, async () => {});
      return { oldLastName, newLastName };
    });
  }

  //--------------------------- INSURER DETAILS 03 ----------------------------//
  async selectRandomInsurer(exclude?: string): Promise<string> {
    let insurerName = "";
    await step("Select random insurer", async () => {
      await this.insurerDropdown.click();
      const options = this.page.locator('li[id^="null-"][role="option"]');
      const count = Math.min(await options.count(), 10);
      if (count === 0) {
        throw new Error("No insurers found");
      }
      const names: string[] = [];
      for (let i = 0; i < count; i++) {
        names.push(((await options.nth(i).textContent()) ?? "").trim());
      }
      const candidates = names
        .map((name, idx) => ({ name, idx }))
        .filter(({ name }) => name !== exclude);
      if (candidates.length === 0) {
        throw new Error("No insurer candidates after exclusion");
      }
      const picked = candidates[Math.floor(Math.random() * candidates.length)];
      insurerName = picked.name;
      await Promise.all([
        this.page.waitForResponse(
          (r) =>
            r.url().includes("/UniqApi/v1/insurers/") &&
            r.request().method() === "GET" &&
            r.status() === 200,
        ),
        options.nth(picked.idx).click(),
      ]);
    });
    return insurerName.trim();
  }

  async selectDifferentInsurer(): Promise<{
    oldInsurer: string;
    selectedInsurer: string;
  }> {
    return await step("Select Different Insurer", async () => {
      // 1. Extract currently selected insurer name from the multiselect display
      const oldInsurer = (
        (await this.selectedInsurer.textContent()) ?? ""
      ).trim();
      await step(`Extracted Insurer: ${oldInsurer || "Empty"}`, async () => {});
      // 2. Open the dropdown
      await this.insurerDropdown.click();
      // 3. Collect all visible options (cap at 10 to keep iteration fast)
      const options = this.page.locator('li[id^="null-"][role="option"]');
      const count = Math.min(await options.count(), 10);
      if (count === 0) {
        throw new Error("No insurer options found");
      }
      const names: string[] = [];
      for (let i = 0; i < count; i++) {
        names.push(((await options.nth(i).textContent()) ?? "").trim());
      }
      // 4. Exclude the current selection
      const candidates = names
        .map((name, idx) => ({ name, idx }))
        .filter(({ name }) => name !== oldInsurer);
      if (candidates.length === 0) {
        throw new Error(`No other insurer available apart from: ${oldInsurer}`);
      }
      // 5. Pick a random candidate
      const picked = candidates[Math.floor(Math.random() * candidates.length)];
      await step(`Filled Insurer: ${picked.name}`, async () => {});
      // 6. Click and wait for the insurer detail API call to complete
      await Promise.all([
        this.page.waitForResponse(
          (r) =>
            r.url().includes("/UniqApi/v1/insurers/") &&
            r.request().method() === "GET" &&
            r.status() === 200,
        ),
        options.nth(picked.idx).click(),
      ]);
      // 7. Read back confirmed selection from the multiselect display
      const newInsurer = (
        (await this.selectedInsurer.textContent()) ?? ""
      ).trim();
      await step(`Newly Selected Insurer: ${newInsurer}`, async () => {});
      return { oldInsurer, selectedInsurer: newInsurer };
    });
  }

  async fillClaimNumber() {
    await step("Fill Claim Number", async () => {
      await this.claimNumberInput.fill(generateInsuranceClaimNo());
    });
  }

  //--------------------------- VERIFYING EDITED INPUT DATA ----------------------------//
  async verifyEditedQuoteValuesAfterReload(expected: {
    transmission: string;
    paintGroup: string;
    color: string;
    vin: string;
    engineNo: string;
    odometer: string;
    cylinders: string;
    engineSize: string;
    trimCode: string;
    paintCode: string;
    insurer: string;
    firstName: string;
    lastName: string;
  }) {
    await step("Verify Edited Quote Values After Reload", async () => {
      // 1. Transmission
      const actualTransmission = await this.dropdown2.evaluate(
        (select: HTMLSelectElement) =>
          select.selectedOptions[0]?.textContent?.trim() || "",
      );
      expect
        .soft(actualTransmission, "Verify Transmission after reload")
        .toBe(expected.transmission);

      // 2. Paint Group
      const actualPaintGroup = await this.dropdown1.evaluate(
        (select: HTMLSelectElement) =>
          select.selectedOptions[0]?.textContent?.trim() || "",
      );
      expect
        .soft(actualPaintGroup, "Verify Paint Group after reload")
        .toBe(expected.paintGroup);

      // 3. Colour
      const actualColor = (await this.colorInput.inputValue()).trim();
      expect
        .soft(actualColor, "Verify Colour after reload")
        .toBe(expected.color);

      // 4. VIN
      await expect
        .soft(this.vinInput, "Verify VIN after reload")
        .toHaveValue(expected.vin);

      // 5. Engine No
      await expect
        .soft(this.engineInput, "Verify Engine No after reload")
        .toHaveValue(expected.engineNo);

      // 6. Odometer
      await expect
        .soft(this.odometerInput, "Verify Odometer after reload")
        .toHaveValue(expected.odometer);

      // 7. Cylinders
      await expect
        .soft(this.cylInput, "Verify Cylinders after reload")
        .toHaveValue(expected.cylinders);

      // 8. Engine Size
      await expect
        .soft(this.ccInput, "Verify Engine Size after reload")
        .toHaveValue(expected.engineSize);

      // 9. Trim Code
      await expect
        .soft(this.paint1, "Verify Trim Code after reload")
        .toHaveValue(expected.trimCode);

      // 10. Paint Code
      await expect
        .soft(this.paint2, "Verify Paint Code after reload")
        .toHaveValue(expected.paintCode);

      // 11. Insurer — displayed in .multiselect__single, not a <select> element
      const actualInsurer = (
        (await this.selectedInsurer.textContent()) ?? ""
      ).trim();
      expect
        .soft(actualInsurer, "Verify Insurer after reload")
        .toBe(expected.insurer);

      // 12. First Name
      await expect
        .soft(this.firstName, "Verify First Name after reload")
        .toHaveValue(expected.firstName);

      // 13. Last Name
      await expect
        .soft(this.lastName, "Verify Last Name after reload")
        .toHaveValue(expected.lastName);

      // Allure Steps
      await step(
        `Transmission Verified: ${actualTransmission}`,
        async () => {},
      );
      await step(`Paint Group Verified: ${actualPaintGroup}`, async () => {});
      await step(`Colour Verified: ${actualColor}`, async () => {});
      await step(`VIN Verified: ${expected.vin}`, async () => {});
      await step(`Engine No Verified: ${expected.engineNo}`, async () => {});
      await step(`Odometer Verified: ${expected.odometer}`, async () => {});
      await step(`Cylinders Verified: ${expected.cylinders}`, async () => {});
      await step(
        `Engine Size Verified: ${expected.engineSize}`,
        async () => {},
      );
      await step(`Trim Code Verified: ${expected.trimCode}`, async () => {});
      await step(`Paint Code Verified: ${expected.paintCode}`, async () => {});
      await step(`Insurer Verified: ${expected.insurer}`, async () => {});
      await step(`First Name Verified: ${expected.firstName}`, async () => {});
      await step(`Last Name Verified: ${expected.lastName}`, async () => {});
    });
  }

  //--------------------------- CAPTURE & VERIFY COPIED QUOTE DATA (UI) ----------------------------//
  async captureQuoteFieldValues(): Promise<QuoteFieldValues> {
    return await step("Capture quote field values from UI", async () => {
      const regNo = (await this.regoInput.inputValue()).trim();
      const transmission = await this.dropdown2.evaluate(
        (select: HTMLSelectElement) =>
          select.selectedOptions[0]?.textContent?.trim() || "",
      );
      const paintGroup = await this.dropdown1.evaluate(
        (select: HTMLSelectElement) =>
          select.selectedOptions[0]?.textContent?.trim() || "",
      );
      const color = (await this.colorInput.inputValue()).trim();
      const vin = (await this.vinInput.inputValue()).trim();
      const engineNo = (await this.engineInput.inputValue()).trim();
      const cylinders = (await this.cylInput.inputValue()).trim();
      const engineSize = (await this.ccInput.inputValue()).trim();
      const trimCode = (await this.paint1.inputValue()).trim();
      const paintCode = (await this.paint2.inputValue()).trim();
      const firstName = (await this.firstName.inputValue()).trim();
      const lastName = (await this.lastName.inputValue()).trim();
      const insurer = ((await this.selectedInsurer.textContent()) ?? "").trim();

      return {
        regNo,
        transmission,
        paintGroup,
        color,
        vin,
        engineNo,
        cylinders,
        engineSize,
        trimCode,
        paintCode,
        firstName,
        lastName,
        insurer,
      };
    });
  }

  async verifyCopiedQuoteValuesMatch(
    original: QuoteFieldValues,
    copied: QuoteFieldValues,
    newQuoteNumber?: string,
  ): Promise<void> {
    await step("Verify copied quote values match original (UI)", async () => {
      await attachment(
        "Original Quote Field Values (UI)",
        JSON.stringify(original, null, 2),
        "application/json",
      );
      await attachment(
        "Copied Quote Field Values (UI)",
        JSON.stringify(copied, null, 2),
        "application/json",
      );
      if (newQuoteNumber) {
        await parameter("New Quote Number", newQuoteNumber);
      }

      const fields: Array<{ label: string; key: keyof QuoteFieldValues }> = [
        { label: "Registration No.", key: "regNo" },
        { label: "Transmission", key: "transmission" },
        { label: "Paint Group", key: "paintGroup" },
        { label: "Colour", key: "color" },
        { label: "VIN", key: "vin" },
        { label: "Engine No.", key: "engineNo" },
        { label: "Cylinders", key: "cylinders" },
        { label: "Engine Size", key: "engineSize" },
        { label: "Trim Code", key: "trimCode" },
        { label: "Paint Code", key: "paintCode" },
        { label: "First Name", key: "firstName" },
        { label: "Last Name", key: "lastName" },
        { label: "Insurer", key: "insurer" },
      ];
      for (const { label, key } of fields) {
        expect
          .soft(copied[key], `Verify ${label} matches copied quote`)
          .toBe(original[key]);
        await step(
          `${label} - expected: "${original[key]}", actual: "${copied[key]}"`,
          async () => {},
        );
      }
    });
  }
}
