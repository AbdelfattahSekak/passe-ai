import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async expectMetaTitle(title: string) {
    await expect(this.page).toHaveTitle(new RegExp(title));
  }

  async expectUrl(url: string) {
    await expect(this.page).toHaveURL(new RegExp(url));
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `./test-results/screenshots/${name}.png` });
  }
}