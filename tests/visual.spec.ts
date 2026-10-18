import { test, expect } from '@playwright/test';
import { TestofilosPage } from '../pages/TestofilosPage';

test.describe('@visual Philosophy of Testing - Visual Regression & Style Preservation', () => {
  let testofilos: TestofilosPage;

  test.beforeEach(async ({ page }) => {
    testofilos = new TestofilosPage(page);
    await testofilos.goto();
  });

  test('should preserve core typography and color styling variables', async ({ page }) => {
    // Verify CSS Custom Properties defined on root
    const rootStyles = await page.evaluate(() => {
      const style = getComputedStyle(document.documentElement);
      return {
        bg: style.getPropertyValue('--bg').trim(),
        text: style.getPropertyValue('--text').trim(),
        line: style.getPropertyValue('--line').trim(),
      };
    });

    expect(rootStyles.bg).toBe('#fafafa');
    expect(rootStyles.text).toBe('#111');
    expect(rootStyles.line).toBe('#e5e5e5');
  });

  test('should prevent any horizontal scrolling / layout overflow', async ({ page }) => {
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });

    expect(hasHorizontalOverflow, 'Page should not have accidental horizontal overflow').toBe(false);
  });

  test('should maintain visual snapshot of site header and language switcher', async ({ page }) => {
    const header = page.locator('.site-header');
    await expect(header).toBeVisible();

    // Verify header visual appearance snapshot
    await expect(header).toHaveScreenshot('site-header-pl.png', {
      maxDiffPixelRatio: 0.05
    });
  });
});
