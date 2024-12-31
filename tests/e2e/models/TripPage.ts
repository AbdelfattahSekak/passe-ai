import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class TripPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async waitForTripLoad() {
    await this.page.waitForSelector('[data-testid="trip-details"]');
  }

  async expectTripDetails(stops: number) {
    const stopElements = await this.page.locator('[data-testid="trip-stop"]').count();
    expect(stopElements).toBe(stops);
  }

  async shareTrip() {
    await this.page.click('[data-testid="share-button"]');
    await expect(this.page.locator('[data-testid="share-dialog"]')).toBeVisible();
  }

  async saveTrip() {
    await this.page.click('[data-testid="save-trip"]');
    await expect(this.page.locator('[data-testid="success-message"]')).toBeVisible();
  }
}