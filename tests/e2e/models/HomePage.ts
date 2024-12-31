import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigate() {
    await this.page.goto('/');
    await this.waitForPageLoad();
  }

  async searchTrip(from: string, to: string, stops: number) {
    await this.page.fill('[data-testid="start-location"]', from);
    await this.page.fill('[data-testid="end-location"]', to);
    await this.page.fill('[data-testid="stops-input"]', String(stops));
    await this.page.click('[data-testid="search-button"]');
  }

  async expectSearchResults() {
    await expect(this.page.locator('[data-testid="trip-results"]')).toBeVisible();
  }

  async switchLanguage(locale: string) {
    await this.page.click('[data-testid="language-switcher"]');
    await this.page.click(`[data-testid="language-${locale}"]`);
  }
}