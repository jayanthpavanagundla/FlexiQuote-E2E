import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

const env = process.env.ENV ?? 'staging';
dotenv.config({ path: `.env.${env}` });

const required = [
  'BASE_URL',
  'CSR_USERNAME',
  'CSR_PASSWORD',
  'FQ_USERNAME',
  'FQ_PASSWORD',
  'FQ_COMPANY_ID',
  'FQ_ADMIN_USERNAME',
  'FQ_ADMIN_PASSWORD',
  'FQ_ADMIN_COMPANY_ID',
  'SUPER_ADMIN_USERNAME',
  'SUPER_ADMIN_PASSWORD',
  'SUPER_ADMIN_COMPANY_ID',
];
const missing = required.filter((k) => !process.env[k]);
if (missing.length) {
  throw new Error(
    `Missing env vars in .env.${env}: ${missing.join(', ')}. Copy .env.${env}.example and fill in values.`,
  );
}

type BrowserName = 'chromium' | 'firefox' | 'webkit';
const validBrowsers: readonly BrowserName[] = ['chromium', 'firefox', 'webkit'];
const browserName = (process.env.BROWSER || 'chromium') as BrowserName;
if (!validBrowsers.includes(browserName)) {
  throw new Error(
    `Invalid BROWSER='${process.env.BROWSER}'. Must be one of: ${validBrowsers.join(', ')}.`,
  );
}

export default defineConfig({
  reporter: [['list'], ['html', { open: 'never' }], ["allure-playwright"]],
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 1,
  timeout: 60000,
  expect: { timeout: 10000 },
  projects: [
    // Auth setups — each writes to its own .auth/*.json
    {
      name: 'csr-setup',
      testDir: './auth-setup',
      testMatch: /auth\.csr\.setup\.ts/,
    },
    {
      name: 'user-setup',
      testDir: './auth-setup',
      testMatch: /auth\.user\.setup\.ts/,
    },
    {
      name: 'admin-setup',
      testDir: './auth-setup',
      testMatch: /auth\.admin\.setup\.ts/,
    },
    {
      name: 'super-setup',
      testDir: './auth-setup',
      testMatch: /auth\.super\.setup\.ts/,
    },
    // CSR specs (filenames ending in .csr.spec.ts) — use CSR session
    {
      name: 'flexiquote-csr',
      testDir: './tests',
      testMatch: /.*\.csr\.spec\.ts/,
      dependencies: ['csr-setup'],
      use: {
        storageState: '.auth/csr.json',
      },
    },
    // Repairer admin specs (filenames ending in .admin.spec.ts) — use admin session
    {
      name: 'flexiquote-admin',
      testDir: './tests',
      testMatch: /.*\.admin\.spec\.ts/,
      dependencies: ['admin-setup'],
      use: {
        storageState: '.auth/admin.json',
      },
    },
    // Super admin specs (filenames ending in .super.spec.ts) — use super-admin session
    {
      name: 'flexiquote-super',
      testDir: './tests',
      testMatch: /.*\.super\.spec\.ts/,
      dependencies: ['super-setup'],
      use: {
        storageState: '.auth/super.json',
      },
    },
    // Regular user specs (everything else *.spec.ts) — use user session
    {
      name: 'flexiquote-user',
      testDir: './tests',
      testMatch: /.*\.spec\.ts/,
      testIgnore: /.*\.(csr|admin|super)\.spec\.ts/,
      dependencies: ['user-setup'],
      use: {
        storageState: '.auth/user.json',
      },
    },
  ],
  use: {
    baseURL: process.env.BASE_URL,
    viewport: {width: 1400,height: 800,},
    browserName,
    trace: 'on',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    permissions: ['geolocation']
  },
});