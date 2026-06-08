# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/regression/specificRecordPreview.csr.spec.ts >> Listing Preview >> Specific Debtor List Listing Preview
- Location: tests/regression/specificRecordPreview.csr.spec.ts:236:7

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: browserContext.waitForEvent: Test timeout of 60000ms exceeded.
```

# Page snapshot

```yaml
- generic [ref=e4]:
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
            - generic [ref=e37]: 11:58
            - generic [ref=e38]: AM
          - button "notifications" [ref=e41] [cursor=pointer]:
            - generic [ref=e42]: notifications
          - generic [ref=e45]:
            - generic [ref=e47] [cursor=pointer]:
              - generic [ref=e48]: SKY Smash & Repair
              - generic [ref=e50]: 󰅀
            - text: 󰀄 󰈙 󱥉 󰀦 󰍃 󰙎
  - navigation [ref=e54]:
    - generic: 󰍜 󰈝 󰇮
    - heading "Print Preview" [level=1] [ref=e57]:
      - generic [ref=e58]: Print Preview
    - generic [ref=e61]:
      - paragraph [ref=e62]:
        - generic [ref=e63] [cursor=pointer]:
          - generic [ref=e65]: 󰈝
          - generic [ref=e66]: Export
      - paragraph [ref=e67]:
        - generic [ref=e68] [cursor=pointer]:
          - generic [ref=e70]: 󰇮
          - generic [ref=e71]: Email
      - paragraph [ref=e72]:
        - generic [ref=e73] [cursor=pointer]:
          - generic [ref=e75]: 󰜱
          - generic [ref=e76]: Back
```

# Test source

```ts
  310 |       const firstDataRow = table
  311 |         .getByRole("row")
  312 |         .filter({ has: this.page.locator("td") })
  313 |         .first();
  314 | 
  315 |       await expect(firstDataRow).toBeVisible();
  316 |       const checkbox = firstDataRow.locator('input[type="checkbox"]').first();
  317 |       await expect(checkbox).toBeVisible();
  318 |       await checkbox.uncheck();
  319 |       await expect(checkbox).not.toBeChecked();
  320 |     });
  321 |   }
  322 | 
  323 |   //------------------------ Table First Row Interaction Methods ------------------------//
  324 | 
  325 |   // Method to open the first record from the table based on the provided URL
  326 | 
  327 |   async openFirstRecordFromTable(route: string): Promise<void> {
  328 |     await step(`Open first record from table on route: ${route}`, async () => {
  329 |       await this.page.waitForURL(`**${route}**`);
  330 | 
  331 |       const table = this.page.getByRole("table").first();
  332 | 
  333 |       const firstDataRow = table
  334 |         .getByRole("row")
  335 |         .filter({ has: this.page.locator("td") })
  336 |         .first();
  337 | 
  338 |       await expect(firstDataRow).toBeVisible();
  339 | 
  340 |       // Dynamically resolve the best clickable link
  341 |       const firstHrefLink = firstDataRow.locator("a[href]").first();
  342 |       const hasVisibleHref = await firstHrefLink.isVisible().catch(() => false);
  343 |       const link = hasVisibleHref
  344 |         ? firstHrefLink
  345 |         : firstDataRow.locator("a").first();
  346 | 
  347 |       await expect(link).toBeVisible();
  348 | 
  349 |       // Capture URL before click
  350 |       const urlBeforeClick = this.page.url();
  351 | 
  352 |       await link.click();
  353 | 
  354 |       // Wait until URL changes
  355 |       await this.page.waitForURL((url) => url.toString() !== urlBeforeClick, {
  356 |         waitUntil: "domcontentloaded",
  357 |       });
  358 | 
  359 |       // Wait for record page to be ready — any indicator
  360 |       await Promise.race([
  361 |         this.page
  362 |           .locator('div[name="headerMoreButtons"]')
  363 |           .waitFor({ state: "visible" }),
  364 |         this.page
  365 |           .locator("a.button.is-primary.is-outlined.is-inverted")
  366 |           .waitFor({ state: "visible" }),
  367 |         this.page
  368 |           .locator("button.button.is-primary")
  369 |           .first()
  370 |           .waitFor({ state: "visible" }),
  371 |       ]);
  372 |     });
  373 |   }
  374 | 
  375 |   //----------------------- Common Methods ------------------------//
  376 | 
  377 |   // Method For Repairer Quote Listing Page to open Quote Analysis
  378 |   async openQuoteAnalysis() {
  379 |     await step("Click Quote Analysis", async () => {
  380 |       await expect(this.quoteAnalysis).toBeVisible();
  381 |       await this.quoteAnalysis.click();
  382 |     });
  383 | 
  384 |     await step("Clicking Print Button", async () => {
  385 |       await expect(this.printButton).toBeVisible();
  386 |       await this.printButton.click();
  387 |     });
  388 |   }
  389 | 
  390 |   // Method For Sales Analysis Listing Page
  391 |   async openSalesAnalysis() {
  392 |     await step("Click Sales Analysis", async () => {
  393 |       await expect(this.salesAnalysis).toBeVisible();
  394 |       await this.salesAnalysis.click();
  395 |     });
  396 | 
  397 |     await step("Clicking Print Button", async () => {
  398 |       await expect(this.printButton).toBeVisible();
  399 |       await this.printButton.click();
  400 |     });
  401 |   }
  402 | 
  403 |   // Ok Button Click Method in Print Preview
  404 |   async clickOkButton(opensNewTab: boolean = false): Promise<Page | undefined> {
  405 |     let newTab: Page | undefined;
  406 |     await step("Click Ok button", async () => {
  407 |       if (opensNewTab) {
  408 |         // Case 2: New tab
  409 |         const [tab] = await Promise.all([
> 410 |           this.page.context().waitForEvent("page"),
      |                               ^ Error: browserContext.waitForEvent: Test timeout of 60000ms exceeded.
  411 |           this.okButton.click(),
  412 |         ]);
  413 |         await tab.waitForLoadState("domcontentloaded");
  414 |         await expect(tab).toHaveURL(/printpreview/);
  415 |         newTab = tab;
  416 |       } else {
  417 |         // Case 1: Same tab
  418 |         await this.okButton.click();
  419 |       }
  420 |     });
  421 |     return newTab;
  422 |   }
  423 | 
  424 |   // Method Extracting the Quote Total
  425 |   parseCurrencyAmount(amountText: string): number {
  426 |     const amount = Number(amountText.replace(/[^0-9.-]/g, ""));
  427 |     if (Number.isNaN(amount)) {
  428 |       throw new Error(
  429 |         `Unable to parse currency amount from text: ${amountText}`,
  430 |       );
  431 |     }
  432 |     return Math.round((amount + Number.EPSILON) * 100) / 100;
  433 |   }
  434 | 
  435 |   parseXmlAmount(xml: string, tagName: string): number {
  436 |     const regex = new RegExp(`<${tagName}>\\s*([\\d.]+)\\s*<\\/${tagName}>`);
  437 |     const match = xml.match(regex);
  438 | 
  439 |     if (!match) {
  440 |       throw new Error(`${tagName} not found in XML.`);
  441 |     }
  442 |     const amount = Number(match[1]);
  443 |     if (Number.isNaN(amount)) {
  444 |       throw new Error(`Invalid amount for ${tagName}: ${match[1]}`);
  445 |     }
  446 |     return Math.round((amount + Number.EPSILON) * 100) / 100;
  447 |   }
  448 | 
  449 |   private quoteTotalAmountLocator(label: "Ex GST" | "Inc GST"): Locator {
  450 |     const labelText = `Total (${label})`;
  451 |     return this.page
  452 |       .locator(
  453 |         `div:has(> span.is-size-6.has-text-weight-semibold:has-text("${labelText}")) > span.has-text-success`,
  454 |       )
  455 |       .first();
  456 |   }
  457 | 
  458 |   async fetchQuoteTotal(): Promise<{
  459 |     totalExGstAmount: number;
  460 |     totalIncGstAmount: number;
  461 |   }> {
  462 |     return await step(
  463 |       "Fetch quote Total Ex GST and Total Inc GST from header",
  464 |       async () => {
  465 |         const totalExGstLocator = this.quoteTotalAmountLocator("Ex GST");
  466 |         const totalIncGstLocator = this.quoteTotalAmountLocator("Inc GST");
  467 | 
  468 |         const totalExGstText = await totalExGstLocator.innerText();
  469 |         const totalIncGstText = await totalIncGstLocator.innerText();
  470 | 
  471 |         return {
  472 |           totalExGstAmount: this.parseCurrencyAmount(totalExGstText),
  473 |           totalIncGstAmount: this.parseCurrencyAmount(totalIncGstText),
  474 |         };
  475 |       },
  476 |     );
  477 |   }
  478 | }
  479 | 
```