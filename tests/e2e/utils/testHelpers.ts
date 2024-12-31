import { Page } from '@playwright/test';

export async function mockGeolocation(page: Page, latitude: number, longitude: number) {
  await page.setGeolocation({ latitude, longitude });
}

export async function mockLocalStorage(page: Page, data: Record<string, string>) {
  await page.evaluate((storageData) => {
    for (const [key, value] of Object.entries(storageData)) {
      localStorage.setItem(key, value);
    }
  }, data);
}

export async function clearLocalStorage(page: Page) {
  await page.evaluate(() => localStorage.clear());
}

export async function waitForNetworkIdle(page: Page) {
  await page.waitForLoadState('networkidle');
}

export async function mockApiResponse(page: Page, url: string, data: any) {
  await page.route(url, route => 
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(data)
    })
  );
}