import { test, expect } from '@playwright/test';

test('homepage loads hero and navigates to financing simulator', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /Jelajahi Mitsubishi/i })).toBeVisible();

  await page.getByRole('link', { name: 'Hitung Cicilan' }).click();
  await expect(page).toHaveURL(/\/financing/);
  await expect(page.getByRole('heading', { name: /Hitung DP dan Estimasi Angsuran/i })).toBeVisible();
});

test('model selector switches the active vehicle name', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Xpander', exact: true }).first().click();
  await expect(page.getByRole('link', { name: /Jelajahi Xpander/i })).toBeVisible();
});
