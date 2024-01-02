import { test, expect } from '@playwright/test';

test('test close pop up login to google', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await page.frameLocator('iframe[name="callout"]').getByLabel('Tetap logout').click();
  await expect(page.getByText(/Login ke Google/i)).not.toBeVisible(); // verify Pop Up successfully closed
});

test('test search text playwright on search bar', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await page.getByLabel('Cari').click();
  await page.getByLabel('Cari').fill('playwright');
  await page.getByLabel('Penelusuran Google').first().click();
  await expect(page.url()).toContain("search?q=playwright"); // verify the query to search 'playwright'
  await expect(page.getByText(/Playwright: Fast and reliable end-to-end testing/i)).toHaveCount(1); // verify search result to have content about Playwright
});

test('test search text playwright and open the content from https://playwright.dev/', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await page.getByLabel('Cari').click();
  await page.getByLabel('Cari').fill('playwright');
  await page.getByLabel('Penelusuran Google').first().click();
  await page.getByRole('link', { name: 'Playwright: Fast and reliable' }).click(); // action to open the content and page on https://playwright.dev/
  await expect(page.url()).toBe("https://playwright.dev/"); // verify to open url https://playwright.dev/
  await expect(page.getByTitle(/Playwright enables reliable end-to-end testing for modern web apps./i)).toBeTruthy(); // verify have that title 
});
