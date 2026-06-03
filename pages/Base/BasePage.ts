import { expect, type Page } from '@playwright/test';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate(url: string) {
        await this.page.goto(url, { waitUntil: 'networkidle' });
    }

    async expectTitle(title: string) {
        await expect(this.page).toHaveTitle(title);
    }
}
