import { expect, test } from '@playwright/test'

test('renders the application shell at the reference viewport', async ({ page }, testInfo) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'Get started' })).toBeVisible()

  const viewport = page.viewportSize()
  const expectedWidth = testInfo.project.name === 'mobile-chromium' ? 390 : 1440
  expect(viewport?.width).toBe(expectedWidth)
})
