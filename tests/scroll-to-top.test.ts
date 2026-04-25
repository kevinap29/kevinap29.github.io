import { expect, test } from '@playwright/test';

test('scroll to top button appears and works', async ({ page }) => {
	await page.goto('/');
	
	// Ensure button is not visible initially
	const scrollBtn = page.locator('button[aria-label="Scroll to top"]');
	await expect(scrollBtn).not.toBeVisible();

	// Scroll down
	await page.evaluate(() => window.scrollTo(0, 500));
	
	// Button should appear
	await expect(scrollBtn).toBeVisible();

	// Click button
	await scrollBtn.click();

	// Wait for smooth scroll (or just check if scroll is 0)
	await page.waitForFunction(() => window.scrollY === 0);
	
	// Expect scroll to be 0
	const scrollY = await page.evaluate(() => window.scrollY);
	expect(scrollY).toBe(0);
});
