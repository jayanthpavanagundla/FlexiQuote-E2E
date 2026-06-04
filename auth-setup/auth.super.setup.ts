import { test as setup } from "@playwright/test";
import path from "path";
import { LoginPage } from "../pages/Auth/LoginPage.js";
import { epic, feature, story } from "allure-js-commons";

const authFile = path.join(__dirname, "../.auth/super.json");

setup("Super admin sign in", async ({ page }) => {
  await epic("Auth-Setup");
  await feature("Super");
  const loginPage = new LoginPage(page);
  await loginPage.loginAsSuper(
    process.env.SUPER_ADMIN_COMPANY_ID!,
    process.env.SUPER_ADMIN_USERNAME!,
    process.env.SUPER_ADMIN_PASSWORD!,
  );

  await page.waitForURL((url) => !/SignIn\.aspx/i.test(url.toString()), {
    waitUntil: "domcontentloaded",
  });

  console.log(`Super admin landed at: ${page.url()}`);

  await page.context().storageState({ path: authFile });
});
