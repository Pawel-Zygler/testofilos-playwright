# Testofilos Playwright Tests

End-to-End test suite for [Filozofia Testowania](https://pawel-zygler.github.io/testofilos/) built with Playwright and TypeScript.

## Documentation

- [Test Plan](docs/test-plan.md) - test strategy, quality gates, and requirements
- [Test Scenarios](docs/scenariusze-testowe.md) - test cases and priority matrix
- [Strategy](docs/strategia-testowania.md) - testing model and principles

## Test Coverage

1. **Language Switching**: verifies PL/EN switching, titles, and localized content (`@smoke`, `@e2e`)
2. **Content Parity**: mirrors 14 TOC chapters, 7 testing laws, and footnotes between PL and EN (`@regression`, `@data`)
3. **Links & Console**: validates HTTP status codes for external references and checks for console errors (`@links`, `@api`)
4. **Accessibility (WCAG 2.1 AA)**: automated axe-core audits and keyboard navigation (`@a11y`)
5. **Visual Regression**: CSS variables, layout overflow, and header snapshot (`@visual`)

## Running Tests

```bash
# Run all tests
npm test

# UI mode
npm run test:ui

# Headed mode
npm run test:headed

# View HTML report
npm run report
```

### Targeted Runs

```bash
npm run test:smoke       # Critical user flows
npm run test:a11y        # Accessibility audit
npm run test:regression  # Content parity
npm run test:links       # External links
npm run test:visual      # Visual regression
npm run typecheck        # TypeScript validation
```

## CI/CD Quality Gates

GitHub Actions pipeline (`.github/workflows/playwright.yml`):
- **Shift-Left**: static analysis and type-check (`tsc --noEmit`).
- **Deployment Blockers**: failing `@smoke` or `@a11y` tests block deployment to GitHub Pages.
- **Reporting**: uploads HTML test reports and traces on failure.

## Developer Workflow

- **Test IDs**: supports `data-testid` standard alongside DOM IDs in Page Objects.
- **Pre-commit**: Husky runs `tsc --noEmit` on staged files before every commit.
