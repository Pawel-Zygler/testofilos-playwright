import { test, expect } from '@playwright/test';
import { TestofilosPage } from '../pages/TestofilosPage';

test.describe('@smoke @e2e Philosophy of Testing - Language & Core Flow', () => {
  let testofilos: TestofilosPage;

  test.beforeEach(async ({ page }) => {
    testofilos = new TestofilosPage(page);
    // Navigate to "https://pawel-zygler.github.io/testofilos/" at the start of each test
    await testofilos.goto();
  });

  test('should load landing page in Polish by default', async ({ page }) => {
    // Verify browser tab title
    await expect(page).toHaveTitle('Filozofia Testowania');

    // Verify main headline and subtitle
    await expect(testofilos.mainTitle).toContainText('Filozofia');
    await expect(testofilos.mainTitle).toContainText('Testowania');
    await expect(testofilos.mainSubtitle).toHaveText('Próba naukowego podejścia do umiejętności testowania oprogramowania.');

    // PL language is active by default, EN content is hidden
    await expect(testofilos.plBtn).toHaveClass(/active/);
    await expect(testofilos.enBtn).not.toHaveClass(/active/);
    await expect(testofilos.plContent).toBeVisible();
    await expect(testofilos.enContent).toBeHidden();
  });

  test('should switch language to English (EN)', async ({ page }) => {
    // Switch to EN
    await testofilos.switchToEnglish();

    // Verify changes after language switch
    await expect(page).toHaveTitle('Philosophy of Testing');
    await expect(testofilos.mainTitle).toContainText('Philosophy');
    await expect(testofilos.mainTitle).toContainText('of Testing');
    await expect(testofilos.mainSubtitle).toHaveText('A scientific approach to the craft of software testing.');

    // EN button active, EN content visible, PL hidden
    await expect(testofilos.enBtn).toHaveClass(/active/);
    await expect(testofilos.plBtn).not.toHaveClass(/active/);
    await expect(testofilos.enContent).toBeVisible();
    await expect(testofilos.plContent).toBeHidden();
  });

  test('should allow switching back to Polish (PL)', async ({ page }) => {
    // Switch to EN, then back to PL
    await testofilos.switchToEnglish();
    await testofilos.switchToPolish();

    await expect(page).toHaveTitle('Filozofia Testowania');
    await expect(testofilos.plContent).toBeVisible();
    await expect(testofilos.enContent).toBeHidden();
  });

  test('should display Laws of Testing in Polish version', async () => {
    await expect(testofilos.plLaws).toBeVisible();
    await expect(testofilos.plLaws).toContainText('Prawo informacji');
    await expect(testofilos.plLaws).toContainText('Prawo aksjomatu');
    await expect(testofilos.plLaws).toContainText('Prawo asercji');
    await expect(testofilos.plLaws).toContainText('Prawo granic');
    await expect(testofilos.plLaws).toContainText('Prawo ryzyka');
    await expect(testofilos.plLaws).toContainText('Prawo jakości');
    await expect(testofilos.plLaws).toContainText('Prawo inspekcji');
  });

  test('should contain valid mailto contact link and footer', async () => {
    await expect(testofilos.contactEmail.first()).toHaveAttribute('href', 'mailto:pawel.zygler@gmail.com');
    await expect(testofilos.footer).toContainText('Filozofia Testowania');
  });
});
