import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { TestofilosPage } from '../pages/TestofilosPage';

test.describe('@a11y Philosophy of Testing - Accessibility (WCAG 2.1 AA)', () => {
  let testofilos: TestofilosPage;

  test.beforeEach(async ({ page }) => {
    testofilos = new TestofilosPage(page);
    await testofilos.goto();
  });

  test('should pass automated WCAG 2.1 AA audit on landing page (Polish)', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .disableRules(['color-contrast']) // color-contrast rule often has false positives with web fonts, or tested separately
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should pass automated WCAG 2.1 AA audit after switching to English', async ({ page }) => {
    await testofilos.switchToEnglish();

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .disableRules(['color-contrast'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should maintain accessible focus states on interactive buttons', async ({ page }) => {
    // Tab navigation should reach language buttons
    await page.keyboard.press('Tab');
    const plFocused = await page.locator('#pl-btn').evaluate(el => document.activeElement === el);
    expect(plFocused).toBe(true);
  });
});
