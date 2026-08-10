import { expect, test } from '@playwright/test';

test('home page communicates the developer value proposition and primary journeys', async ({
	page
}) => {
	await page.goto('/');

	await expect(
		page.getByText('Mengubah kebutuhan bisnis menjadi aplikasi yang skalabel dan mudah digunakan.')
	).toBeVisible();

	await expect(page.getByRole('link', { name: 'Lihat proyek unggulan' })).toHaveAttribute(
		'href',
		'/project'
	);
	await expect(page.getByRole('link', { name: 'Mari bekerja sama' })).toHaveAttribute(
		'href',
		'/contact'
	);
});
