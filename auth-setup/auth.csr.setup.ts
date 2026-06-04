import { test as setup, expect } from "@playwright/test";
import path from "path";
import { LoginPage } from "../pages/Auth/LoginPage.js";
import { epic, feature, story } from "allure-js-commons";

const authFile = path.join(__dirname, "../.auth/csr.json");

setup("CSR Sign In", async ({ page }) => {
  await epic("Auth-Setup");
  await feature("CSR");
  const loginPage = new LoginPage(page);
  await loginPage.loginAsCsr(
    process.env.CSR_USERNAME!,
    process.env.CSR_PASSWORD!,
    "SKY Smash & Repair",
  ); //SKY Smash & Repair // QA Branch AU 2

  await page.waitForURL("**/v2/");
  await expect(page).toHaveURL(/\/v2\/$/);

  await page.context().storageState({ path: authFile });
});
