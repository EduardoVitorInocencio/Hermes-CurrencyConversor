import { expect, test } from '@playwright/test'

const currencies = [
  { iso_code: 'EUR', name: 'Euro', symbol: '€' },
  { iso_code: 'USD', name: 'United States Dollar', symbol: '$' },
  { iso_code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
]

test.beforeEach(async ({ page }) => {
  await page.route('https://api.frankfurter.dev/v2/currencies', (route) => route.fulfill({ json: currencies }))
  await page.route('https://api.frankfurter.dev/v2/rate/**', (route) => route.fulfill({ json: { date: '2024-01-05', base: 'EUR', quote: 'USD', rate: 1.1 } }))
  await page.route('https://api.frankfurter.dev/v2/rates**', (route) => route.fulfill({ json: [
    { date: '2024-01-01', base: 'EUR', quote: 'USD', rate: 1.08 },
    { date: '2024-01-02', base: 'EUR', quote: 'USD', rate: 1.1 },
  ] }))
})

test('converts a value from the current pair using the API rate', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Moedas e câmbio', exact: true })).toBeVisible()
  const amount = page.getByRole('textbox', { name: 'Valor' }).first()
  await amount.fill('10')
  await expect(page.getByText(/11,00|11\.00/)).toBeVisible()
  await expect(page.locator('#main-content').getByText(/Frankfurter · ECB/)).toBeVisible()
})

test('navigates to history and exposes a filtered table/export action', async ({ page }, testInfo) => {
  await page.goto('/')
  const navigation = testInfo.project.name === 'mobile-chromium' ? page.locator('#mobile-navigation') : page.locator('#desktop-navigation')
  await navigation.getByRole('button', { name: 'Histórico' }).click()
  await expect(page.getByRole('heading', { name: 'Performance' })).toBeVisible()
  await expect(page.getByRole('table')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Exportar CSV' })).toBeEnabled()
})
