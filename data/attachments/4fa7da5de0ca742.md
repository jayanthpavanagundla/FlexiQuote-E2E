# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/regression/specificRecordPreview.csr.spec.ts >> Listing Preview >> Specific Repairer Quote Listing Preview
- Location: tests/regression/specificRecordPreview.csr.spec.ts:24:7

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.waitFor: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('div[name="headerMoreButtons"]') to be visible

```

# Page snapshot

```yaml
- banner [ref=e5]:
  - navigation [ref=e6]:
    - generic [ref=e7]:
      - img "Home" [ref=e9] [cursor=pointer]
      - text: 󰈙 󰀦 󰍃
    - generic [ref=e10]:
      - generic [ref=e11]:
        - generic [ref=e12]:
          - generic [ref=e13] [cursor=pointer]: Quote
          - generic:
            - generic:
              - generic: Repairer Quote
            - generic:
              - generic: Misc Quote
            - generic:
              - generic: PDR Quote
            - generic:
              - generic: Quote Template
            - generic:
              - generic: AudaNet Tasks
            - generic:
              - generic: PNET Messages
            - generic:
              - generic: Estimage Messages
            - generic:
              - generic: ORM Messages
            - generic:
              - generic: ORM Batching
            - generic:
              - generic: Image Uploader
        - generic [ref=e14]:
          - generic [ref=e15] [cursor=pointer]: Debtor
          - generic:
            - generic:
              - generic: Quick Invoice
            - generic:
              - generic: Debtor Adjustment
            - generic:
              - generic: Receipt Entry
        - generic [ref=e16]:
          - generic [ref=e17] [cursor=pointer]: Creditor
          - generic:
            - generic:
              - generic: Sundry Creditor
            - generic:
              - generic: Payment Entry
            - generic:
              - generic: Purchase Order
            - generic:
              - generic: Return Parts
            - generic:
              - generic: Dealer Credit Entry
            - generic:
              - generic: Parts Check
        - generic [ref=e18]:
          - generic [ref=e19] [cursor=pointer]: Reports
          - generic:
            - generic:
              - generic: JCNI
            - generic:
              - generic: Due In & Due Out
            - generic:
              - generic: Capacity Calendar
            - generic:
              - generic: Job Invoiced
            - generic:
              - generic: Outstanding Parts
            - generic:
              - generic: Outstanding Credits
            - generic:
              - generic: Sales Analysis
            - generic:
              - separator
              - generic: Debtors
              - generic: Debtor List
              - generic: Receipts
              - separator
            - generic:
              - generic: Creditors
              - generic: Creditor List
              - generic: Payment List
              - separator
            - generic:
              - generic: Payroll Reports
        - generic [ref=e20]:
          - generic [ref=e21] [cursor=pointer]: Tables
          - generic:
            - generic:
              - generic: Insurer
            - generic:
              - generic: Customer
            - generic:
              - generic: Vendor
            - generic:
              - generic: Contact Profile
            - generic:
              - generic: Recurring Remarks
            - generic:
              - generic: Quick Item
            - generic:
              - generic: Item
            - generic:
              - generic: Other labour
            - generic:
              - generic: Vehicle
            - generic:
              - generic: Unscheduled Model
        - generic [ref=e22]:
          - generic [ref=e23] [cursor=pointer]: Admin
          - generic:
            - generic:
              - generic: Company Setting
            - generic:
              - generic: Users
            - generic:
              - generic: Chart of Accounts
            - generic:
              - generic: G/L Mapping
            - generic:
              - generic: Book-In
            - generic:
              - generic: Audit Trail
            - generic:
              - generic: Forgot Password Log
            - generic:
              - generic: Email/SMS Log
            - generic:
              - generic: Vehicle Lookup
      - generic [ref=e26]:
        - generic: search
        - textbox "Search the system..." [ref=e28]
      - generic [ref=e29]:
        - button "routine" [ref=e33] [cursor=pointer]:
          - generic [ref=e34]: routine
        - generic [ref=e36]:
          - generic [ref=e37]: 2:04
          - generic [ref=e38]: PM
        - button "notifications" [ref=e41] [cursor=pointer]:
          - generic [ref=e42]: notifications
        - generic [ref=e45]:
          - generic [ref=e47] [cursor=pointer]:
            - generic [ref=e48]: SKY Smash & Repair
            - generic [ref=e50]: 󰅀
          - text: 󰀄 󰈙 󱥉 󰀦 󰍃 󰙎
```

# Test source

```ts
  279 |   //             hasText: 'Print Statement'
  280 |   //         });
  281 |   //         const [tab] = await Promise.all([
  282 |   //             this.page.context().waitForEvent('page'),
  283 |   //             printButton.click()
  284 |   //         ]);
  285 |   //         await tab.waitForLoadState('domcontentloaded');
  286 |   //         await expect(tab).toHaveURL(/\/v2\/printpreview\//);
  287 | 
  288 |   //         newTab = tab;
  289 |   //     });
  290 |   //     return newTab;
  291 |   // }
  292 | 
  293 |   async checkFirstRowCheckbox(
  294 |     printButtonText: string = "Print Statement",
  295 |   ): Promise<Page> {
  296 |     let newTab!: Page;
  297 |     await step(`Check checkbox and open ${printButtonText}`, async () => {
  298 |       const table = this.page.getByRole("table").first();
  299 |       const firstDataRow = table
  300 |         .getByRole("row")
  301 |         .filter({ has: this.page.locator("td") })
  302 |         .first();
  303 | 
  304 |       await expect(firstDataRow).toBeVisible();
  305 |       const checkbox = firstDataRow.locator('input[type="checkbox"]').first();
  306 |       await checkbox.check();
  307 |       await expect(checkbox).toBeChecked();
  308 |       const printButton = this.page.locator("button.button.is-primary", {
  309 |         hasText: printButtonText,
  310 |       });
  311 |       const [tab] = await Promise.all([
  312 |         this.page.context().waitForEvent("page"),
  313 |         printButton.click(),
  314 |       ]);
  315 |       await tab.waitForLoadState("domcontentloaded");
  316 |       await expect(tab).toHaveURL(/\/v2\/printpreview\//);
  317 |       newTab = tab;
  318 |     });
  319 |     return newTab;
  320 |   }
  321 | 
  322 |   async uncheckFirstRowCheckbox(): Promise<void> {
  323 |     await step("Uncheck the first row checkbox", async () => {
  324 |       const table = this.page.getByRole("table").first();
  325 | 
  326 |       const firstDataRow = table
  327 |         .getByRole("row")
  328 |         .filter({ has: this.page.locator("td") })
  329 |         .first();
  330 | 
  331 |       await expect(firstDataRow).toBeVisible();
  332 |       const checkbox = firstDataRow.locator('input[type="checkbox"]').first();
  333 |       await expect(checkbox).toBeVisible();
  334 |       await checkbox.uncheck();
  335 |       await expect(checkbox).not.toBeChecked();
  336 |     });
  337 |   }
  338 | 
  339 |   //------------------------ Table First Row Interaction Methods ------------------------//
  340 | 
  341 |   // Method to open the first record from the table based on the provided URL
  342 | 
  343 |   async openFirstRecordFromTable(route: string): Promise<void> {
  344 |     await step(`Open first record from table on route: ${route}`, async () => {
  345 |       await this.page.waitForURL(`**${route}**`);
  346 | 
  347 |       const table = this.page.getByRole("table").first();
  348 | 
  349 |       const firstDataRow = table
  350 |         .getByRole("row")
  351 |         .filter({ has: this.page.locator("td") })
  352 |         .first();
  353 | 
  354 |       await expect(firstDataRow).toBeVisible();
  355 | 
  356 |       // Dynamically resolve the best clickable link
  357 |       const firstHrefLink = firstDataRow.locator("a[href]").first();
  358 |       const hasVisibleHref = await firstHrefLink.isVisible().catch(() => false);
  359 |       const link = hasVisibleHref
  360 |         ? firstHrefLink
  361 |         : firstDataRow.locator("a").first();
  362 | 
  363 |       await expect(link).toBeVisible();
  364 | 
  365 |       // Capture URL before click
  366 |       const urlBeforeClick = this.page.url();
  367 | 
  368 |       await link.click();
  369 | 
  370 |       // Wait until URL changes
  371 |       await this.page.waitForURL((url) => url.toString() !== urlBeforeClick, {
  372 |         waitUntil: "domcontentloaded",
  373 |       });
  374 | 
  375 |       // Wait for record page to be ready — any indicator
  376 |       await Promise.race([
  377 |         this.page
  378 |           .locator('div[name="headerMoreButtons"]')
> 379 |           .waitFor({ state: "visible" }),
      |            ^ Error: locator.waitFor: Test timeout of 60000ms exceeded.
  380 |         this.page
  381 |           .locator("a.button.is-primary.is-outlined.is-inverted")
  382 |           .waitFor({ state: "visible" }),
  383 |         this.page
  384 |           .locator("button.button.is-primary")
  385 |           .first()
  386 |           .waitFor({ state: "visible" }),
  387 |       ]);
  388 |     });
  389 |   }
  390 | 
  391 |   //----------------------- Common Methods ------------------------//
  392 | 
  393 |   // Method For Repairer Quote Listing Page to open Quote Analysis
  394 |   async openQuoteAnalysis() {
  395 |     await step("Click Quote Analysis", async () => {
  396 |       await expect(this.quoteAnalysis).toBeVisible();
  397 |       await this.quoteAnalysis.click();
  398 |     });
  399 | 
  400 |     await step("Clicking Print Button", async () => {
  401 |       await expect(this.printButton).toBeVisible();
  402 |       await this.printButton.click();
  403 |     });
  404 |   }
  405 | 
  406 |   // Method For Sales Analysis Listing Page
  407 |   async openSalesAnalysis() {
  408 |     await step("Click Sales Analysis", async () => {
  409 |       await expect(this.salesAnalysis).toBeVisible();
  410 |       await this.salesAnalysis.click();
  411 |     });
  412 | 
  413 |     await step("Clicking Print Button", async () => {
  414 |       await expect(this.printButton).toBeVisible();
  415 |       await this.printButton.click();
  416 |     });
  417 |   }
  418 | 
  419 |   // Ok Button Click Method in Print Preview
  420 |   async clickOkButton(opensNewTab: boolean = false): Promise<Page | undefined> {
  421 |     let newTab: Page | undefined;
  422 |     await step("Click Ok button", async () => {
  423 |       if (opensNewTab) {
  424 |         // Case 2: New tab
  425 |         const [tab] = await Promise.all([
  426 |           this.page.context().waitForEvent("page"),
  427 |           this.okButton.click(),
  428 |         ]);
  429 |         await tab.waitForLoadState("domcontentloaded");
  430 |         await expect(tab).toHaveURL(/printpreview/);
  431 |         newTab = tab;
  432 |       } else {
  433 |         // Case 1: Same tab
  434 |         await this.okButton.click();
  435 |       }
  436 |     });
  437 |     return newTab;
  438 |   }
  439 | 
  440 |   // Method Extracting the Quote Total
  441 |   parseCurrencyAmount(amountText: string): number {
  442 |     const amount = Number(amountText.replace(/[^0-9.-]/g, ""));
  443 |     if (Number.isNaN(amount)) {
  444 |       throw new Error(
  445 |         `Unable to parse currency amount from text: ${amountText}`,
  446 |       );
  447 |     }
  448 |     return Math.round((amount + Number.EPSILON) * 100) / 100;
  449 |   }
  450 | 
  451 |   parseXmlAmount(xml: string, tagName: string): number {
  452 |     const regex = new RegExp(`<${tagName}>\\s*([\\d.]+)\\s*<\\/${tagName}>`);
  453 |     const match = xml.match(regex);
  454 | 
  455 |     if (!match) {
  456 |       throw new Error(`${tagName} not found in XML.`);
  457 |     }
  458 |     const amount = Number(match[1]);
  459 |     if (Number.isNaN(amount)) {
  460 |       throw new Error(`Invalid amount for ${tagName}: ${match[1]}`);
  461 |     }
  462 |     return Math.round((amount + Number.EPSILON) * 100) / 100;
  463 |   }
  464 | 
  465 |   private quoteTotalAmountLocator(label: "Ex GST" | "Inc GST"): Locator {
  466 |     const labelText = `Total (${label})`;
  467 |     return this.page
  468 |       .locator(
  469 |         `div:has(> span.is-size-6.has-text-weight-semibold:has-text("${labelText}")) > span.has-text-success`,
  470 |       )
  471 |       .first();
  472 |   }
  473 | 
  474 |   async fetchQuoteTotal(): Promise<{
  475 |     totalExGstAmount: number;
  476 |     totalIncGstAmount: number;
  477 |   }> {
  478 |     return await step(
  479 |       "Fetch quote Total Ex GST and Total Inc GST from header",
```