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
  readonly contactEmail: Locator;
  readonly footer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mainTitle = page.locator('#main-title');
    this.mainSubtitle = page.locator('#main-subtitle');
    this.plBtn = page.locator('#pl-btn');
    this.enBtn = page.locator('#en-btn');
    this.plContent = page.locator('#pl-content');
    this.enContent = page.locator('#en-content');
    this.plToc = page.locator('nav.toc[aria-label="Spis treści"]');
    this.enToc = page.locator('nav.toc[aria-label="Table of Contents"]');
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
}
