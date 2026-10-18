# Testofilos - Playwright E2E & Quality Engineering Suite (TypeScript)

Projekt profesjonalnego ekosystemu testowego dla serwisu [Filozofia Testowania](https://pawel-zygler.github.io/testofilos/).

---

## 📚 Dokumentacja Architektoniczna i Plan Jakości

- 📋 [**Master Test Plan (docs/test-plan.md)**](./docs/test-plan.md) – pełna specyfikacja 5 filarów jakości, bramek CI/CD oraz partnerstwa z deweloperami.
- 🧪 [**Scenariusze Testowe (docs/scenariusze-testowe.md)**](./docs/scenariusze-testowe.md) – katalog przypadków testowych z mapowaniem na tagi.
- 🧭 [**Strategia Testowania (docs/strategia-testowania.md)**](./docs/strategia-testowania.md) – model piramidy testów i zasady Shift-Left.

---

## 🎯 5 Kluczowych Obszarów Jakościowych (Core Functionality)

1. **Wersje językowe (PL i EN)** (`@smoke`, `@e2e`):
   - Weryfikacja startu w języku polskim, przełączania na angielski oraz powrotu.
   - Dynamiczna podmiana tytułów, nagłówków i zawartości sekcji.
2. **Symetria komponentów i treści** (`@regression`, `@data`):
   - Weryfikacja parzystości 14 rozdziałów w spisie treści (TOC).
   - Weryfikacja 7 fundamentalnych Praw Testowania w obu wersjach językowych.
   - Parzystość przypisów dolnych i odnośników zwrotnych.
3. **Linki zewnętrzne i czystość konsoli** (`@links`, `@api`):
   - Walidacja kodów HTTP (brak 404, 500) dla wszystkich zewnętrznych cytowań.
   - Zero błędów typu `console.error` w przeglądarce podczas interakcji.
4. **Dostępność cyfrowa WCAG 2.1 AA** (`@a11y` — *Deployment Blocker*):
   - Zautomatyzowany audyt silnikiem Axe (`@axe-core/playwright`).
   - Poprawność focus states przy nawigacji klawiaturą (`Tab`).
5. **Regresja wizualna i zachowanie stylu** (`@visual`):
   - Weryfikacja zmiennych stylów CSS (`--bg: #fafafa`, `--text: #111`).
   - Zabezpieczenie przed horyzontalnym overflow.
   - Snapshoty wizualne nagłówka i komponentów.

---

## 🚀 Uruchamianie Testów

Wszystkie polecenia wykonuj w katalogu projektu:

```bash
cd /Users/pawelzygler/Documents/programowanie/testofilos-playwright
```

### Podstawowe polecenia
```bash
# Uruchomienie wszystkich 17 testów (headless)
npm test

# Uruchomienie z widocznym oknem przeglądarki
npm run test:headed

# Interaktywny tryb Playwright UI Mode
npm run test:ui

# Podgląd raportu HTML z wynikami
npm run report
```

### Uruchamianie według tagów i bramek jakościowych
```bash
# 1. Deployment Blocker: Smoke testy języka i ścieżek krytycznych
npm run test:smoke

# 2. Deployment Blocker: Dostępność cyfrowa WCAG 2.1 AA
npm run test:a11y

# 3. Symetria treści i komponentów PL vs EN
npm run test:regression

# 4. Sprawdzenie linków zewnętrznych i konsoli
npm run test:links

# 5. Regresja wizualna (snapshoty UI)
npm run test:visual

# 6. Szybka walidacja typów TypeScript (Shift-Left)
npm run typecheck
```

---

## 🛡️ CI/CD & Bramki Jakościowe (GitHub Actions)

Plik potoku zdefiniowany w [`.github/workflows/playwright.yml`](./.github/workflows/playwright.yml):
1. **Job 1 (Shift-Left)**: Walidacja typów `tsc --noEmit`.
2. **Job 2 (Quality Gates)**: Równoległe uruchomienie testów Playwright:
   - **Deployment Blocker 1**: `@smoke` musi przejść na 100%.
   - **Deployment Blocker 2**: `@a11y` musi przejść na 100%.
   - Jeśli którykolwiek blocker zawiedzie, wdrożenie na GitHub Pages zostaje zablokowane.
3. **Job 3 (Deploy Guarded)**: Publikacja na GitHub Pages następuje tylko po przejściu wszystkich bramek.

---

## 🤝 Partnerstwo z Deweloperami (Shift-Left)

1. **Standard `data-testid`**:
   - Wprowadzony standard atrybutów testowych (np. `<button data-testid="lang-switch-pl">PL</button>`).
   - Page Object Model wspiera zarówno nowe selektory `[data-testid="..."]`, jak i ID.
2. **Pre-commit hooks (Husky + lint-staged)**:
   - Przy każdym `git commit` automatycznie uruchamiany jest type-check (`tsc --noEmit`), uniemożliwiając commitowanie uszkodzonego kodu.
