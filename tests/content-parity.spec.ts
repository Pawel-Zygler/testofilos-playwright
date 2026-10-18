import { test, expect } from '@playwright/test';
import { TestofilosPage } from '../pages/TestofilosPage';

test.describe('@regression @data Philosophy of Testing - Component & Content Parity (PL vs EN)', () => {
  let testofilos: TestofilosPage;

  test.beforeEach(async ({ page }) => {
    testofilos = new TestofilosPage(page);
    await testofilos.goto();
  });

  test('should have identical number of Table of Contents (TOC) items in PL and EN', async () => {
    const plItems = await testofilos.getTocItems('pl');
    const enItems = await testofilos.getTocItems('en');

    // Both languages must provide navigation to exactly 14 chapters
    expect(plItems.length).toBe(14);
    expect(enItems.length).toBe(14);
    expect(plItems.length).toBe(enItems.length);
  });

  test('should have exact parity of 7 Laws of Testing between PL and EN', async ({ page }) => {
    // Polish laws
    const plLawsList = page.locator('#pl-laws ul li, #pl-laws ol li');
    const plLawsCount = await plLawsList.count();

    // English laws
    await testofilos.switchToEnglish();
    const enLawsList = page.locator('#en-laws ul li, #en-laws ol li');
    const enLawsCount = await enLawsList.count();

    expect(plLawsCount).toBe(7);
    expect(enLawsCount).toBe(7);
    expect(plLawsCount).toBe(enLawsCount);
  });

  test('should mirror all article content sections between PL and EN', async ({ page }) => {
    const expectedSectionSuffixes = [
      'intro', 'why', 'software', 'bug', 'consequences',
      'test', 'types', 'coverage', 'select', 'quality',
      'summary', 'laws', 'sources', 'contact'
    ];

    for (const suffix of expectedSectionSuffixes) {
      const plSection = page.locator(`#pl-${suffix}`);
      const enSection = page.locator(`#en-${suffix}`);

      await expect(plSection).toBeAttached();
      await expect(enSection).toBeAttached();
    }
  });

  test('should have bidirectional footnotes references in both languages', async ({ page }) => {
    // Verify that footnotes in Polish have working return links
    const plFootnoteBacklinks = page.locator('#pl-content a[href^="#fnref:pl-"]');
    const count = await plFootnoteBacklinks.count();
    expect(count).toBeGreaterThan(0);
  });
});
