import { Page, expect } from '@playwright/test';
import { NavBarPage } from '../pages/NavBarPage.js';
import { QuotePage } from '../pages/Quote/QuotePage.js';
import { QuoteNavBar } from '../pages/Quote/QuoteNavBar.js';
import { buildQuoteData } from './quoteData.js';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CreateQuoteOptions {
  useExistingCustomer?: string;
}

export interface CreateQuoteResult {
  quoteNumber: string;
  customerFirstName: string;
}

// ─── Create Quote Flow ────────────────────────────────────────────────────────

export async function createQuoteFlow(
  page: Page,
  options?: CreateQuoteOptions
): Promise<CreateQuoteResult> {
  const quoteData = buildQuoteData();
  const navBarPage = new NavBarPage(page);
  const quotePage = new QuotePage(page);
  const quoteNavBar = new QuoteNavBar(page);

  // Navigate
  await page.goto('v2/');
  await navBarPage.openQuoteDropdown();
  await navBarPage.selectRepairerQuote();
  await quotePage.createNewQuote();

  // Vehicle
  await quotePage.fillVehicleDetails(quoteData.vehicle);
  await quotePage.selectSchedule(quoteData.schedule);
  await quotePage.fillVehicleSpecs(quoteData.vehicleSpecs);
  await quotePage.fillPaintDetails(quoteData.paint);

  // Customer
  let customerFirstName: string;
  if (options?.useExistingCustomer) {
    await quotePage.selectExistingCustomer(options.useExistingCustomer);
    customerFirstName = options.useExistingCustomer;
  } else {
    const customer = await quotePage.createUniqueCustomer();
    customerFirstName = customer.firstName;
  }
  await expect(quotePage.firstName).toHaveValue(/.+/);
  await expect(quotePage.lastName).toHaveValue(/.+/);

  // Insurance & address
  await quotePage.fillAddress(quoteData.address);
  await quotePage.selectInsurer(quoteData.insurance.primary);
  await quotePage.fillClaimNumber();

  // Create — leaves browser on the quote detail page for post-create actions
  await quoteNavBar.clickCreate();

  const quoteNumber = await quotePage.getQuoteNumber();

  return { quoteNumber, customerFirstName };
}

// ─── Quote List Helpers ───────────────────────────────────────────────────────

export async function navigateToRepairerQuotes(page: Page): Promise<void> {
  const nav = page.locator('#main-nav-menu');
  await nav.getByText('Quote', { exact: true }).hover();
  await nav.getByText('Repairer Quote').click();

  await expect(page).toHaveURL(/\/v2\/quotes$/);
  await expect(page.getByRole('heading', { name: 'Quotes' })).toBeVisible();
}

export async function openRandomQuote(page: Page): Promise<string> {
  const quoteNumberLinks = page.getByRole('link', { name: /^\d+$/ });
  await expect(quoteNumberLinks.first()).toBeVisible();

  const allNumbers = (await quoteNumberLinks.allInnerTexts()).map((t) => t.trim());
  const uniqueNumbers = [...new Set(allNumbers)];
  expect(uniqueNumbers.length).toBeGreaterThan(0);

  const randomQuoteNumber = uniqueNumbers[Math.floor(Math.random() * uniqueNumbers.length)];
  await page.getByRole('link', { name: randomQuoteNumber }).first().click();

  return randomQuoteNumber;
}
