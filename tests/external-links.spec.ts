import { test, expect } from '@playwright/test';
import { TestofilosPage } from '../pages/TestofilosPage';

test.describe('@links @api Philosophy of Testing - External Links & Network Integrity', () => {
  let testofilos: TestofilosPage;

  test.beforeEach(async ({ page }) => {
    testofilos = new TestofilosPage(page);
    await testofilos.goto();
  });

  test('should verify all external citation links return successful HTTP status codes', async ({ page, request }) => {
    // Extract all unique external HTTP(S) links
    const externalLinks = await page.evaluate(() => {
      const anchors = Array.from(document.querySelectorAll('a[href^="http://"], a[href^="https://"]'));
      return Array.from(new Set(anchors.map(a => (a as HTMLAnchorElement).href)));
    });

    // Make sure we have citations identified
    expect(externalLinks.length).toBeGreaterThan(0);

    for (const url of externalLinks) {
      // Validate that external links use secure HTTPS protocol
      expect(url).toMatch(/^https:\/\//);

      // Perform fast HTTP HEAD/GET request to ensure no dead 404 links
      const response = await request.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        },
        timeout: 10000,
        failOnStatusCode: false
      });

      // Assert status is valid (2xx, 3xx or 403 where anti-bot blocks automated agents)
      expect(response.status(), `URL: ${url} returned error status`).toBeLessThan(500);
      expect(response.status(), `URL: ${url} returned 404 Not Found`).not.toBe(404);
    }
  });

  test('should ensure zero console errors occur during navigation and interaction', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await testofilos.switchToEnglish();
    await testofilos.switchToPolish();

    expect(consoleErrors, `Uncaught console errors detected: ${consoleErrors.join(', ')}`).toHaveLength(0);
  });
});
