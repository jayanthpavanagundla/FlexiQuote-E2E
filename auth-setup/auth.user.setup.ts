import { test as setup, expect } from "@playwright/test";
import path from "path";
import { LoginPage } from "../pages/Auth/LoginPage.js";
import { epic, feature, story } from "allure-js-commons";

const authFile = path.join(__dirname, "../.auth/user.json");

setup("Regular user sign in", async ({ page }) => {
  await epic("Auth-Setup");
  await feature("User");
  const loginPage = new LoginPage(page);
  await loginPage.loginAsUser(
    process.env.FQ_COMPANY_ID!,
    process.env.FQ_USERNAME!,
    process.env.FQ_PASSWORD!,
  );

  await page.waitForURL("**/v2/");
  await expect(page).toHaveURL(/\/v2\/$/);

  await page.context().storageState({ path: authFile });
});
