import { test as setup, expect } from "@playwright/test";
import path from "path";
import { LoginPage } from "../pages/Auth/LoginPage.js";
import { epic, feature, story } from "allure-js-commons";

const authFile = path.join(__dirname, "../.auth/admin.json");

setup("Repairer admin sign in", async ({ page }) => {
  await epic("Auth-Setup");
  await feature("Admin");
  const loginPage = new LoginPage(page);
  await loginPage.loginAsAdmin(
    process.env.FQ_ADMIN_COMPANY_ID!,
    process.env.FQ_ADMIN_USERNAME!,
    process.env.FQ_ADMIN_PASSWORD!,
  );

  await page.waitForURL("**/v2/", { waitUntil: "domcontentloaded" });
  await expect(page).toHaveURL(/\/v2\/$/);

  await page.context().storageState({ path: authFile });
});
