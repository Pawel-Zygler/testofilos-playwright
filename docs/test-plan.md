# Test Plan

Master test plan for [Filozofia Testowania](https://pawel-zygler.github.io/testofilos/).

## Core Scope

1. **Language Switching** (`@smoke`, `@e2e`):
   - Polish default view, English translation, and two-way toggling.
2. **Content & Component Parity** (`@regression`, `@data`):
   - 14 TOC chapters mirrored in PL and EN.
   - 7 Laws of Testing present in both languages.
   - Footnotes and backlink integrity.
3. **Links & Network Integrity** (`@links`, `@api`):
   - Fast HTTP verification of external citations (zero 404/500 errors).
   - Zero console errors during interactions.
4. **Accessibility** (`@a11y`):
   - WCAG 2.1 AA automated compliance via axe-core.
   - Keyboard tab navigation focus states.
5. **Visual Regression** (`@visual`):
   - CSS styling variables (`--bg: #fafafa`, `--text: #111`).
   - Overflow prevention and header visual snapshot.

## CI/CD Quality Gates

GitHub Actions workflow (`.github/workflows/playwright.yml`):
- **Shift-Left**: static type checking (`tsc --noEmit`).
- **Deployment Blockers**: failure in `@smoke` or `@a11y` blocks deployment to GitHub Pages.
- **Artifacts**: test reports and failure traces retained for 14 days.

## Developer Workflow

- **Test IDs**: supports `data-testid` attributes alongside DOM IDs.
- **Shift-Left Pre-commit**: Husky runs `tsc --noEmit` before commits.

## Test Tags

| Tag | Target | Trigger | Gate Role |
|---|---|---|---|
| `@smoke` | Language and core flow | Every push / PR | Deployment Blocker |
| `@a11y` | WCAG 2.1 AA | Every push / PR | Deployment Blocker |
| `@regression` | Parity and sections | Every push / PR | Quality Gate |
| `@links` | External link checking | Nightly / PR | Quality Monitor |
| `@visual` | Layout and snapshots | UI PRs | Visual Gate |
