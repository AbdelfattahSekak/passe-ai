import { test, expect } from '@playwright/test';
import { HomePage } from '../models/HomePage';
import { TripPage } from '../models/TripPage';

test.describe('Trip Page', () => {
  let homePage: HomePage;
  let tripPage: TripPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    tripPage = new TripPage(page);
  });

  test('should create and display trip', async () => {
    await homePage.navigate();
    await homePage.searchTrip('Paris, France', 'Rome, Italy', 3);
    await tripPage.waitForTripLoad();
    await tripPage.expectTripDetails(3);
  });

  test('should share trip', async () => {
    await homePage.navigate();
    await homePage.searchTrip('Paris, France', 'Rome, Italy', 3);
    await tripPage.waitForTripLoad();
    await tripPage.shareTrip();
  });

  test('should save trip', async () => {
    await homePage.navigate();
    await homePage.searchTrip('Paris, France', 'Rome, Italy', 3);
    await tripPage.waitForTripLoad();
    await tripPage.saveTrip();
  });

  test('should handle API errors', async ({ page }) => {
    // Mock failed API response
    await page.route('**/api/inference', route => 
      route.fulfill({ status: 500 })
    );
    
    await homePage.navigate();
    await homePage.searchTrip('Invalid', 'Location', 1);
    await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
  });
});