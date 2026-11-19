import { expect, test } from '@playwright/test';
import en from '../messages/en.json' with { type: 'json' };
import id from '../messages/id.json' with { type: 'json' };

test('home page communicates the developer value proposition and primary journeys', async ({
	page
}) => {
	await page.goto('/');

	const lang = await page.locator('html').getAttribute('lang');
	const dict = lang === 'en' ? en : id;

	await expect(page.getByText(dict.hero_value_proposition)).toBeVisible();

	await expect(page.getByRole('link', { name: dict.hero_primary_cta })).toHaveAttribute(
		'href',
		'/project'
	);
	await expect(page.getByRole('link', { name: dict.hero_secondary_cta })).toHaveAttribute(
		'href',
		'/contact'
	);

	await expect(page.getByRole('heading', { name: dict.featured_projects_title })).toBeVisible();
	await expect(page.getByRole('link', { name: dict.featured_projects_view_all })).toHaveAttribute(
		'href',
		'/project'
	);

	const featuredLinks = page.locator('a[href^="/project/"]');
	expect(await featuredLinks.count()).toBeGreaterThanOrEqual(1);
});
