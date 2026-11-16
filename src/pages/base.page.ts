import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(path: string = '', retries = 2) {
    for (let i = 0; i <= retries; i++) {
      try {
        await this.page.goto(path, { waitUntil: 'load', timeout: 30000 });
        return;
      } catch (error: any) {
        if (i === retries) throw error;
        console.log(`Navigation to "${path}" reset/failed. Retrying in 2s (${i + 1}/${retries})...`);
        await this.page.waitForTimeout(2000);
      }
    }
  }

  async clickElement(locator: Locator) {
    await locator.scrollIntoViewIfNeeded();
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  async fillText(locator: Locator, text: string) {
    await locator.scrollIntoViewIfNeeded();
    await locator.waitFor({ state: 'visible' });
    await locator.fill(text);
  }

  async reloadPage() {
    await this.page.reload({ waitUntil: 'domcontentloaded' });
  }

  async getPageUrl(): Promise<string> {
    return this.page.url();
  }
}