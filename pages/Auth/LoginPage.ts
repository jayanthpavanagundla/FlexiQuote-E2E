import { type Page, type Locator } from "@playwright/test";
import { step } from "allure-js-commons";
import { BasePage } from "../Base/BasePage.js";

export class LoginPage extends BasePage {
  readonly companyId: Locator;
  readonly username: Locator;
  readonly password: Locator;
  readonly signInButton: Locator;
  readonly proceedButton: Locator;
  readonly nextButton: Locator;
  readonly companySearch: Locator;

  constructor(page: Page) {
    super(page);
    this.companyId = page.getByLabel("Company ID");
    this.username = page.getByLabel("Username");
    this.password = page.getByLabel("Password", { exact: true });
    this.signInButton = page.getByRole("button", { name: "Sign In" });
    this.proceedButton = page.getByRole("button", { name: "Proceed" });
    this.nextButton = page.getByRole("button", { name: "Next" });
    this.companySearch = page.getByPlaceholder("Select a company");
  }

  private async handleProceedModal() {
    await this.proceedButton.click({ timeout: 5000 }).catch(() => {});
  }

  private async fillAndSubmit(
    companyId: string,
    username: string,
    password: string,
  ) {
    await this.companyId.fill(companyId);
    await this.username.fill(username);
    await this.password.fill(password);
    await this.signInButton.click();
    await this.handleProceedModal();
  }

  async loginAsUser(companyId: string, username: string, password: string) {
    await step("Sign in as User", async () => {
      await this.navigate("SignIn.aspx");
      await this.fillAndSubmit(companyId, username, password);
    });
  }

  async loginAsAdmin(companyId: string, username: string, password: string) {
    await step("Sign in as Repairer Admin", async () => {
      await this.navigate("SignIn.aspx");
      await this.fillAndSubmit(companyId, username, password);
    });
  }

  async loginAsSuper(companyId: string, username: string, password: string) {
    await step("Sign in as Super Admin", async () => {
      await this.navigate("SignIn.aspx");
      await this.fillAndSubmit(companyId, username, password);
    });
  }

  async loginAsCsr(username: string, password: string, companyName: string) {
    await step(`Sign in as CSR — ${companyName}`, async () => {
      await this.navigate("SignInCsr.aspx");
      await this.username.fill(username);
      await this.password.fill(password);
      await this.nextButton.click();
      await this.companySearch.fill(companyName);
      await this.page
        .getByRole("listitem")
        .filter({ hasText: companyName })
        .click();
      await this.signInButton.click();
      await this.handleProceedModal();
    });
  }
}
