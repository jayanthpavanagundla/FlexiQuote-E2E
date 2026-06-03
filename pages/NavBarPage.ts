import { expect, type Page, type Locator } from '@playwright/test';
import { step } from 'allure-js-commons';
import { BasePage } from './Base/BasePage.js';

export class NavBarPage extends BasePage {
    companyMenuLink: Locator;
    signOutLink: Locator;
    dropdownContainer: Locator;
    quoteMenu: Locator;
    repairerQuote: Locator;
    miscQuote: Locator;
    quoteTemplate: Locator;
    bookings: Locator;
    audaNetTasks: Locator;
    pnetMessages: Locator;
    estimateMessages: Locator;
    ormMessages: Locator;
    ormBatching: Locator;
    imageUploader: Locator;
    debtorMenu: Locator;
    quickInvoice: Locator;
    debtorAdjustment: Locator;
    receiptEntry: Locator;
    creditorMenu: Locator;
    sundryCreditor: Locator;
    paymentEntry: Locator;
    paymentEntryTitle: Locator;
    purchaseOrder: Locator;
    returnParts: Locator;
    reportMenu: Locator;
    jcni: Locator;
    dueInDueOut: Locator;
    jobInvoiced: Locator;
    outStandingParts: Locator;
    outstandingCredits: Locator;
    salesAnalysis: Locator;
    debtorList: Locator;
    receipts: Locator;
    creditorList: Locator;
    paymentList: Locator;
    tablesMenu: Locator;
    insurer: Locator;
    customer: Locator;
    vendor: Locator;
    contactProfile: Locator;
    recurringRemarks: Locator;
    quickItem: Locator;
    item: Locator;
    otherLabour: Locator;
    vehicle: Locator
    unscheduledModel: Locator;
    adminMenu: Locator;
    glMapping: Locator
    emailSMS: Locator;
    bookedIn: Locator;
    waitingOnParts: Locator;
    vehicleArrived: Locator;

    constructor(page: Page) {
        super(page);

        // EXISTING (kept as-is)
        this.companyMenuLink = page.locator('a').filter({ hasText: 'PartsCheck' });
        this.signOutLink = page.getByRole('link', { name: '󰍃 Sign Out' });

        // DROPDOWN CONTAINERS
        this.dropdownContainer = page.locator('#main-nav-menu');

        // QUOTE MENU
        this.quoteMenu = page.locator("//a[normalize-space()='Quote']");

        this.repairerQuote = this.dropdownContainer.getByText('Repairer Quote', { exact: true });
        this.miscQuote = this.dropdownContainer.getByText('Misc Quote', { exact: true });
        this.quoteTemplate = this.dropdownContainer.getByText('Quote Template', { exact: true });
        this.bookings = this.dropdownContainer.getByText('Bookings', { exact: true });
        this.audaNetTasks = this.dropdownContainer.getByText('AudaNet Tasks', { exact: true });
        this.pnetMessages = this.dropdownContainer.getByText('PNET Messages', { exact: true });
        this.estimateMessages = this.dropdownContainer.getByText('Estimate Messages', { exact: true });
        this.ormMessages = this.dropdownContainer.getByText('ORM Messages', { exact: true });
        this.ormBatching = this.dropdownContainer.getByText('ORM Batching', { exact: true });
        this.imageUploader = this.dropdownContainer.getByText('Image Uploader', { exact: true });

        // DEBTOR DROPDOWN
        this.debtorMenu = page.locator('a.navbar-link', { hasText: 'Debtor' });

        this.quickInvoice = this.dropdownContainer.getByText('Quick Invoice', { exact: true });
        this.debtorAdjustment = this.dropdownContainer.getByText('Debtor Adjustment', { exact: true });
        this.receiptEntry = this.dropdownContainer.getByText('Receipt Entry', { exact: true });

        // CREDITOR DROPDOWN
        this.creditorMenu = page.locator('a.navbar-link', { hasText: 'Creditor' }); 
        this.sundryCreditor = this.dropdownContainer.getByText('Sundry Creditor', { exact: true });
        this.paymentEntry = this.dropdownContainer.getByText('Payment Entry', { exact: true });
        this.paymentEntryTitle = this.page.locator('h1.title span').filter({ hasText: 'Payment Entry' }).first();
        this.purchaseOrder = this.dropdownContainer.getByText('Purchase Order', { exact: true });
        this.returnParts = this.dropdownContainer.getByText('Return Parts', { exact: true });

        // REPORTS DROPDOWN
        this.reportMenu = page.locator('a.navbar-link', { hasText: 'Reports' });
        this.jcni = this.dropdownContainer.getByText('JCNI', { exact: true });
        this.dueInDueOut = this.dropdownContainer.getByText(' Due In & Due Out ', { exact: true });
        this.jobInvoiced = this.dropdownContainer.getByText('Job Invoiced', { exact: true });
        this.outStandingParts = this.dropdownContainer.getByText('Outstanding Parts', { exact: true });
        this.outstandingCredits = this.dropdownContainer.getByText('Outstanding Credits', { exact: true });
        this.salesAnalysis = this.dropdownContainer.getByText('Sales Analysis', { exact: true });
        this.debtorList = this.dropdownContainer.getByText('Debtor List', { exact: true });
        this.receipts = this.dropdownContainer.getByText('Receipts', { exact: true });
        this.creditorList = this.dropdownContainer.getByText('Creditor List', { exact: true });
        this.paymentList = this.dropdownContainer.getByText('Payment List', { exact: true });   

        // TABLES DROPDOWN
        this.tablesMenu = page.locator("//a[normalize-space()='Tables']");

        this.insurer = this.dropdownContainer.getByText('Insurer', { exact: true });
        this.customer = this.dropdownContainer.getByText('Customer', { exact: true });
        this.vendor = this.dropdownContainer.getByText('Vendor', { exact: true });
        this.contactProfile = this.dropdownContainer.getByText('Contact Profile', { exact: true });
        this.recurringRemarks = this.dropdownContainer.getByText('Recurring Remarks', { exact: true });
        this.quickItem = this.dropdownContainer.getByText('Quick Item', { exact: true });
        this.item = this.dropdownContainer.getByText('Item', { exact: true });
        this.otherLabour = this.dropdownContainer.getByText('Other labour', { exact: true });
        this.vehicle = this.dropdownContainer.getByText('Vehicle', { exact: true });
        this.unscheduledModel = this.dropdownContainer.getByText('Unscheduled Model', { exact: true });

        // ADMIN DROPDOWN
        this.adminMenu = page.locator('a.navbar-link', { hasText: 'Admin' });
        this.glMapping = this.dropdownContainer.getByText('G/L Mapping', { exact: true });
        this.emailSMS = this.dropdownContainer.getByText('Email/SMS Log', { exact: true });

        // DASHBOARD VALIDATION
        // this.jobStatusHeader = page.locator('text=JOB STATUS');

        // JOB STATUS COUNTS (example - can refine later)
        this.bookedIn = page.locator('text=Booked In');
        this.waitingOnParts = page.locator('text=Waiting On Parts');
        this.vehicleArrived = page.locator('text=Vehicle Arrived');
    }

    async expectDashboardVisible() {
        await this.expectTitle('FlexiQuote Dashboard');
    }

    async openCompanyMenu() {
        await this.companyMenuLink.click();
    }

    async expectCompanyName(name: string = 'PartsCheck') {
        await expect(this.companyMenuLink).toContainText(name);
    }

    async signOut() {
        await this.signOutLink.click();
        await this.page.waitForURL(/SignInCSR\.aspx/i, { timeout: 15000 });
    }

    async openQuoteDropdown() {
        await step('Open Quote Menu', async () => {
            await this.quoteMenu.click();
        });
    }

    async selectRepairerQuote() {
        await step('Navigate to Repairer Quotes', async () => {
            await this.repairerQuote.click();
        });
    }

    async selectMiscQuote() {
        await step('Navigate to Misc Quotes', async () => {
            await this.miscQuote.click();
        });
    }

    async selectQuoteTemplate() {
        await step('Navigate to Quote Templates', async () => {
            await this.quoteTemplate.click();
        });
    }

    async selectBookings() {
        await step('Navigate to Bookings', async () => {
            await this.bookings.click();
        });
    }

    async selectORMMessages() {
        await step('Navigate to ORM Messages', async () => {
            await this.ormMessages.click();
        });
    }

    async openDebtorDropdown() {
        await step('Open Debtor Menu', async () => {
            await this.debtorMenu.click();
        });
    }

    async selectQuickInvoice() {
        await step('Navigate to Quick Invoice', async () => {
            await this.quickInvoice.click();
        });
    }

    async selectDebtorAdjustment() {
        await step('Navigate to Debtor Adjustment', async () => {
            await this.debtorAdjustment.click();
        });
    }

    async selectReceiptEntry() {
        await step('Navigate to Receipt Entry', async () => {
            await this.receiptEntry.click();
        });
    }

    async openCreditorDropdown() {
        await step('Open Creditor Menu', async () => {
            await this.creditorMenu.click();
        });
    }

    async selectSundryCreditor() {
        await step('Navigate to Sundry Creditor', async () => {
            await this.sundryCreditor.click();
        });
    }

    async selectPaymentEntry() {
        await step('Navigate to Payment Entry', async () => {
            await this.paymentEntry.click();
            await this.paymentEntryTitle.click();
        });
    }

    async selectPurchaseOrder() {
        await step('Navigate to Purchase Order', async () => {
            await this.purchaseOrder.click();
        });
    }

    async selectReturnParts() {
        await step('Navigate to Return Parts', async () => {
            await this.returnParts.click();
        });
    }

    async openReportDropdown() {
        await step('Open Reports Menu', async () => {
            await this.reportMenu.click();
        });
    }

    async selectJCNI() {
        await step('Navigate to JCNI Report', async () => {
            await this.jcni.click();
        });
    }

    async selectDueInDueOut() { 
        await step('Navigate to Due In & Due Out Report', async () => {
            await this.dueInDueOut.click();
        });
    }   
    
    async selectJobInvoiced() {
        await step('Navigate to Job Invoiced Report', async () => {
            await this.jobInvoiced.click();
        }); 
    }

    async selectOutstandingParts() {
        await step('Navigate to Outstanding Parts Report', async () => {
            await this.outStandingParts.click();
        });
    }

    async selectOutstandingCredits() {
        await step('Navigate to Outstanding Credits Report', async () => {
            await this.outstandingCredits.click();
        });
    }

    async selectSalesAnalysis() {
        await step('Navigate to Sales Analysis Report', async () => {
            await this.salesAnalysis.click();
        });
    }

    async selectDebtorList() {
        await step('Navigate to Debtor List Report', async () => {
            await this.debtorList.click();
        }); 
    }

    async selectReceipts() {
        await step('Navigate to Receipts Report', async () => {
            await this.receipts.click();
        }); 
    }

    async selectCreditorList() {
        await step('Navigate to Creditor List Report', async () => {
            await this.creditorList.click();
        }); 
    }

    async selectPaymentList() {
        await step('Navigate to Payment List Report', async () => {
            await this.paymentList.click();
        }); 
    }

    async openTablesDropdown() {
        await step('Open Tables Menu', async () => {
            await this.tablesMenu.click();
        });
    }

    async selectInsurer() {
        await step('Navigate to Insurer Table', async () => {
            await this.insurer.click();
        });
    }

    async selectCustomer() {
        await step('Navigate to Customer Table', async () => {
            await this.customer.click();
        });
    }

    async selectVendor() {
        await step('Navigate to Vendor Table', async () => {
            await this.vendor.click();
        });
    }

    async selectContactProfile() {
        await step('Navigate to Contact Profile Table', async () => {
            await this.contactProfile.click();
        });
    }

    async selectRecurringRemarks() {
        await step('Navigate to Recurring Remarks', async () => {
            await this.recurringRemarks.click();
        });
    }

    async selectQuickItem() {
        await step('Navigate to Quick Item Table', async () => {
            await this.quickItem.click();
        });
    }

    async selectItem() {
        await step('Navigate to Item Table', async () => {
            await this.item.click();
        });
    }

    async selectOtherLabour() {
        await step('Navigate to Other Labour Table', async () => {
            await this.otherLabour.click();
        }); 
    }

    async selectVehicle() {
        await step('Navigate to Vehicle Table', async () => {
            await this.vehicle.click();
        }); 
    }

    async selectUnscheduledModel() {
        await step('Navigate to Unscheduled Model Table', async () => {
            await this.unscheduledModel.click();
        });
    }

    async openAdminDropdown() {
        await step('Open Admin Menu', async () => {
            await this.adminMenu.click();
        }   
    )};

    async selectGLMapping() {
        await step('Navigate to G/L Mapping', async () => {
            await this.glMapping.click();
        });
    }

    async selectEmailSMSLog() {
        await step('Navigate to Email/SMS Log', async () => {
            await this.emailSMS.click();
        });
    }
}
