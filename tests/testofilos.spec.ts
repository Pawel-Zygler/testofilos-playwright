import { test, expect } from '@playwright/test';
import { TestofilosPage } from '../pages/TestofilosPage';

test.describe('Filozofia Testowania - E2E tests', () => {
  let testofilos: TestofilosPage;

  test.beforeEach(async ({ page }) => {
    testofilos = new TestofilosPage(page);
    // Wchodzi na stronę "https://pawel-zygler.github.io/testofilos/" na start każdego testu
    await testofilos.goto();
  });

  test('powinien załadować stronę startową w języku polskim', async ({ page }) => {
    // Weryfikacja tytułu karty przeglądarki
    await expect(page).toHaveTitle('Filozofia Testowania');

    // Weryfikacja nagłówka głównego i podtytułu
    await expect(testofilos.mainTitle).toContainText('Filozofia');
    await expect(testofilos.mainTitle).toContainText('Testowania');
    await expect(testofilos.mainSubtitle).toHaveText('Próba naukowego podejścia do umiejętności testowania oprogramowania.');

    // Domyślnie język PL jest aktywny, a treść EN jest ukryta
    await expect(testofilos.plBtn).toHaveClass(/active/);
    await expect(testofilos.enBtn).not.toHaveClass(/active/);
    await expect(testofilos.plContent).toBeVisible();
    await expect(testofilos.enContent).toBeHidden();
  });

  test('powinien poprawnie przełączyć język na angielski (EN)', async ({ page }) => {
    // Przełączenie na EN
    await testofilos.switchToEnglish();

    // Weryfikacja zmian po przełączeniu języka
    await expect(page).toHaveTitle('Philosophy of Testing');
    await expect(testofilos.mainTitle).toContainText('Philosophy');
    await expect(testofilos.mainTitle).toContainText('of Testing');
    await expect(testofilos.mainSubtitle).toHaveText('A scientific approach to the craft of software testing.');

    // Przycisk EN aktywny, treść EN widoczna, PL ukryta
    await expect(testofilos.enBtn).toHaveClass(/active/);
    await expect(testofilos.plBtn).not.toHaveClass(/active/);
    await expect(testofilos.enContent).toBeVisible();
    await expect(testofilos.plContent).toBeHidden();
  });

  test('powinien umożliwić przełączenie z powrotem na język polski (PL)', async ({ page }) => {
    // Przełącz na EN, a potem z powrotem na PL
    await testofilos.switchToEnglish();
    await testofilos.switchToPolish();

    await expect(page).toHaveTitle('Filozofia Testowania');
    await expect(testofilos.plContent).toBeVisible();
    await expect(testofilos.enContent).toBeHidden();
  });

  test('powinien wyświetlać Prawa testowania w wersji polskiej', async ({ page }) => {
    const lawsSection = page.locator('#pl-laws');
    await expect(lawsSection).toBeVisible();
    await expect(lawsSection).toContainText('Prawo informacji');
    await expect(lawsSection).toContainText('Prawo aksjomatu');
    await expect(lawsSection).toContainText('Prawo asercji');
    await expect(lawsSection).toContainText('Prawo granic');
    await expect(lawsSection).toContainText('Prawo ryzyka');
    await expect(lawsSection).toContainText('Prawo jakości');
    await expect(lawsSection).toContainText('Prawo inspekcji');
  });

  test('powinien zawierać działający link kontaktowy mailto oraz stopkę', async () => {
    await expect(testofilos.contactEmail.first()).toHaveAttribute('href', 'mailto:pawel.zygler@gmail.com');
    await expect(testofilos.footer).toContainText('Filozofia Testowania');
  });
});
