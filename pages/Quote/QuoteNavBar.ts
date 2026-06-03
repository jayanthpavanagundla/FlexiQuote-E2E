import { type Page, type Locator } from '@playwright/test';
import { step } from 'allure-js-commons';
import { BasePage } from '../Base/BasePage.js';

export class QuoteNavBar extends BasePage {
    navbar: Locator;
    quoteNumber: Locator;
    statusDropdown: Locator;
    customerName: Locator;
    vehicleInfo: Locator;
    totalExGST: Locator;
    totalIncGST: Locator;
    createButton: Locator;
    saveButton: Locator;
    backButton: Locator;
    moreMenu: Locator;
    previewOption: Locator;
    copyQuoteOption: Locator;
    headerTab: Locator;
    quotingTab: Locator;
    partsTab: Locator;
    imagesTab: Locator;
    assessmentsTab: Locator;
    summaryTab: Locator;
    invoiceTab: Locator;
    excessTab: Locator;
    docsTab: Locator;
    commsTab: Locator;
    remarksTab: Locator;
    ratesTab: Locator;
    annotationsTab: Locator;

    constructor(page: Page) {
        super(page);

        // ROOT
        this.navbar = page.locator('#detail-nav-menu');

        // QUOTE HEADER INFO
        this.quoteNumber = this.navbar.locator('.is-size-4.has-text-weight-bold');
        this.statusDropdown = this.navbar.locator('select');
        this.customerName = this.navbar.locator('span.has-text-weight-semibold').nth(0);
        this.vehicleInfo = this.navbar.locator('span.has-text-weight-semibold').nth(1);

        // TOTALS
        this.totalExGST = this.navbar.locator('text=Total').locator('..').first();
        this.totalIncGST = this.navbar.locator('text=Total').locator('..').nth(1);

        // ACTION BUTTONS
        this.createButton = page.getByText('saveCreate');
        this.saveButton = page.getByText('saveSave');
        this.backButton = page.locator('#cancel').last();
        this.moreMenu = page.locator('[name="headerMoreButtons"]');

        // More menu options
        this.previewOption = page.getByText('Preview');
        this.copyQuoteOption = page.getByText('Copy Quote');

        // TABS (SECOND ROW)
        this.headerTab = page.getByText('Header');
        this.quotingTab = page.getByText('Quoting');
        this.partsTab = page.getByText('Parts');
        this.imagesTab = page.getByText('Images');
        this.assessmentsTab = page.getByText('Assessments');
        this.summaryTab = page.getByText('Summary');
        this.invoiceTab = page.getByText('Invoice');
        this.excessTab = page.getByText('Excess');
        this.docsTab = page.getByText('Docs');
        this.commsTab = page.getByText('Comms');
        this.remarksTab = page.getByText('Remarks');
        this.ratesTab = page.getByText('Rates & Markups');
        this.annotationsTab = page.getByText('Annotations');
    }

    // HEADER METHODS

    async getQuoteNumber() {
        return (await this.quoteNumber.textContent())!.trim();
    }

    async getCustomerName() {
        return (await this.customerName.textContent())!.trim();
    }

    async getVehicleInfo() {
        return (await this.vehicleInfo.textContent())!.trim();
    }

    async changeStatus(statusText: string) {
        await this.statusDropdown.selectOption({ label: statusText });
    }

    // ACTION METHODS

    async clickCreate() {
        await step('Create Quote', async () => {
            await this.createButton.click();
        });
    }

    async clickSave() {
        await step('Save Quote', async () => {
            await this.saveButton.click();
        });
    }

    async clickBack() {
        await step('Go Back', async () => {
            await this.backButton.click();
        });
    }

    async openMoreMenu() {
        await this.moreMenu.click();
    }

    async clickPreview() {
        await step('Preview Quote', async () => {
            await this.previewOption.click();
        });
    }

    async clickCopyQuote() {
        await step('Copy Quote', async () => {
            await this.copyQuoteOption.click();
        });
    }

    // TAB NAVIGATION METHODS

    async goToHeaderTab() { await this.headerTab.click(); }
    async goToQuotingTab() { await this.quotingTab.click(); }
    async goToPartsTab() { await this.partsTab.click(); }
    async goToImagesTab() { await this.imagesTab.click(); }
    async goToAssessmentsTab() { await this.assessmentsTab.click(); }
    async goToSummaryTab() { await this.summaryTab.click(); }
    async goToInvoiceTab() { await this.invoiceTab.click(); }
    async goToExcessTab() { await this.excessTab.click(); }
    async goToDocsTab() { await this.docsTab.click(); }
    async goToCommsTab() { await this.commsTab.click(); }
    async goToRemarksTab() { await this.remarksTab.click(); }
    async goToRatesTab() { await this.ratesTab.click(); }
    async goToAnnotationsTab() { await this.annotationsTab.click(); }
}
