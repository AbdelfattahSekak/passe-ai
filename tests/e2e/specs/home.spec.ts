import { test, expect } from '@playwright/test';
import { HomePage } from '../models/HomePage';

test.describe('Home Page', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
  });

  test('should load home page successfully', async () => {
    await homePage.expectMetaTitle('AI Road Trip Planner');
    await homePage.expectUrl('/');
  });

  test('should perform trip search', async () => {
    await homePage.searchTrip('Paris, France', 'Rome, Italy', 3);
    await homePage.expectSearchResults();
  });

  test('should switch language', async () => {
    await homePage.switchLanguage('fr');
    await homePage.expectUrl('/fr');
    await expect(page.locator('h1')).toContainText('Votre Assistant de Voyage IA');
  });

  test('should handle mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await homePage.navigate();
    await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible();
  });
});