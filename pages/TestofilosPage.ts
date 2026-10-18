import { Page, Locator, expect } from '@playwright/test';

export class TestofilosPage {
  readonly page: Page;
  readonly mainTitle: Locator;
  readonly mainSubtitle: Locator;
  readonly plBtn: Locator;
  readonly enBtn: Locator;
  readonly plContent: Locator;
  readonly enContent: Locator;
  readonly plToc: Locator;
  readonly enToc: Locator;
  readonly plLaws: Locator;
  readonly enLaws: Locator;
  readonly contactEmail: Locator;
  readonly footer: Locator;

  constructor(page: Page) {
    this.page = page;
    // Supports both the new data-testid standard (Shift-Left) and existing HTML IDs
    this.mainTitle = page.locator('[data-testid="main-title"], #main-title');
    this.mainSubtitle = page.locator('[data-testid="main-subtitle"], #main-subtitle');
    this.plBtn = page.locator('[data-testid="lang-switch-pl"], #pl-btn');
    this.enBtn = page.locator('[data-testid="lang-switch-en"], #en-btn');
    this.plContent = page.locator('[data-testid="pl-content"], #pl-content');
    this.enContent = page.locator('[data-testid="en-content"], #en-content');
    this.plToc = page.locator('nav.toc[aria-label="Spis treści"]');
    this.enToc = page.locator('nav.toc[aria-label="Table of Contents"]');
    this.plLaws = page.locator('[data-testid="pl-laws"], #pl-laws');
    this.enLaws = page.locator('[data-testid="en-laws"], #en-laws');
    this.contactEmail = page.locator('a[href^="mailto:"]');
    this.footer = page.locator('.site-footer');
  }

  async goto() {
    await this.page.goto('https://pawel-zygler.github.io/testofilos/');
  }

  async switchToEnglish() {
    await this.enBtn.click();
    await expect(this.enBtn).toHaveClass(/active/);
    await expect(this.enContent).not.toHaveClass(/hidden/);
    await expect(this.plContent).toHaveClass(/hidden/);
  }

  async switchToPolish() {
    await this.plBtn.click();
    await expect(this.plBtn).toHaveClass(/active/);
    await expect(this.plContent).not.toHaveClass(/hidden/);
    await expect(this.enContent).toHaveClass(/hidden/);
  }

  async getTocItems(lang: 'pl' | 'en'): Promise<string[]> {
    const toc = lang === 'pl' ? this.plToc : this.enToc;
    return await toc.locator('a').allInnerTexts();
  }
}
