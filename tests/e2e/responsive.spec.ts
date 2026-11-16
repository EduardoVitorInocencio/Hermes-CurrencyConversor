import { expect, test } from '@playwright/test'

const referenceWidths = [375, 390, 430, 768, 1024, 1280, 1440]

test('keeps the document within the viewport at reference widths', async ({ page }, testInfo) => {
  test.skip(
    testInfo.project.name === 'mobile-chromium',
    'The desktop project owns the width sweep; the mobile project covers the device profile.',
  )

  for (const width of referenceWidths) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')

    await expect(page.getByRole('main', { name: 'Moedas e câmbio' })).toBeVisible()
    await expect(page.locator('#mobile-navigation')).toBeAttached()

    const hasNoHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    )

    expect(hasNoHorizontalOverflow, `horizontal overflow at ${width}px`).toBe(true)
  }
})
