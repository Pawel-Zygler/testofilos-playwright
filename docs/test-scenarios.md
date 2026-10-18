# Test Scenarios

Test cases for [Filozofia Testowania](https://pawel-zygler.github.io/testofilos/).

## Summary

| ID | Suite | Priority | Automated | Description |
|---|---|---|---|---|
| SC-01 | Language | P1 (Blocker) | Yes (`@smoke`) | Default Polish landing page loads with valid titles |
| SC-02 | Language | P1 (Blocker) | Yes (`@smoke`) | Switches content and titles to English |
| SC-03 | Language | P2 | Yes (`@smoke`) | Switches back to Polish (PL -> EN -> PL cycle) |
| SC-04 | Parity | P2 | Yes (`@regression`) | 14 TOC chapters mirror between PL and EN |
| SC-05 | Parity | P2 | Yes (`@regression`) | 7 Laws of Testing mirror between PL and EN |
| SC-06 | Parity | P2 | Yes (`@regression`) | Sections and footnotes integrity |
| SC-07 | Network | P2 | Yes (`@links`) | External citations return valid HTTP status (no 404s) |
| SC-08 | Network | P1 | Yes (`@links`) | Zero unhandled console errors |
| SC-09 | a11y | P1 (Blocker) | Yes (`@a11y`) | Axe-core WCAG 2.1 AA audit passes |
| SC-10 | a11y | P2 | Yes (`@a11y`) | Keyboard navigation focus states |
| SC-11 | Visual | P2 | Yes (`@visual`) | Preserves CSS custom variables and styling |
| SC-12 | Visual | P2 | Yes (`@visual`) | Prevents horizontal layout overflow |
| SC-13 | Visual | P2 | Yes (`@visual`) | Header visual appearance snapshot match |

## Scenarios

### SC-01: Default Polish Landing Page
- **Preconditions**: User navigates to base URL.
- **Steps**:
  1. Check document title.
  2. Verify main title contains "Filozofia" and "Testowania".
  3. Verify PL button is active and EN button is inactive.
  4. Confirm `#pl-content` is visible and `#en-content` is hidden.
- **Expected**: Polish content and headings display correctly.

### SC-02: Switch to English
- **Preconditions**: Landing page is loaded in Polish.
- **Steps**:
  1. Click `#en-btn`.
  2. Check document title and headings.
  3. Confirm EN button is active and PL button is inactive.
  4. Verify `#en-content` is visible and `#pl-content` is hidden.
- **Expected**: English content displays with updated title "Philosophy of Testing".

### SC-03: Two-Way Language Cycle
- **Preconditions**: Landing page is loaded.
- **Steps**:
  1. Switch to English.
  2. Switch back to Polish.
- **Expected**: Polish content and title re-render seamlessly.

### SC-04 & SC-05: TOC & Laws Parity
- **Preconditions**: Page loaded.
- **Steps**:
  1. Count TOC navigation links in PL and EN.
  2. Count items in `#pl-laws` and `#en-laws`.
- **Expected**: Exactly 14 TOC chapters and 7 Laws of Testing in both languages.

### SC-07 & SC-08: External Links and Console Errors
- **Preconditions**: Page loaded.
- **Steps**:
  1. Extract all external links.
  2. Send HTTP requests to each URL.
  3. Monitor browser `console.error` events during navigation.
- **Expected**: No 404/500 HTTP responses and zero uncaught JavaScript errors.

### SC-09 & SC-10: WCAG 2.1 AA Accessibility
- **Preconditions**: Page loaded in PL and EN.
- **Steps**:
  1. Run axe-core accessibility audit for WCAG 2.1 A and AA rules.
  2. Test Tab key navigation on language controls.
- **Expected**: Zero accessibility violations and focus outlines visible.

### SC-11 to SC-13: Visual Regression & Layout
- **Preconditions**: Page loaded.
- **Steps**:
  1. Inspect root CSS variables (`--bg`, `--text`, `--line`).
  2. Verify `scrollWidth <= clientWidth`.
  3. Compare header visual snapshot against baseline.
- **Expected**: Visual style is preserved without layout shifts.
