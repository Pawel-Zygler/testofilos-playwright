# Testofilos - Playwright E2E Tests (TypeScript)

Projekt testów automatycznych End-to-End (E2E) w **Playwright** + **TypeScript** dla strony [Filozofia Testowania](https://pawel-zygler.github.io/testofilos/).

## 🎯 Co sprawdza zestaw testów

Testy weryfikują kluczowe funkcjonalności i treści serwisu:
1. **Ładowanie strony startowej w języku polskim**: weryfikacja tytułu strony, nagłówka `Filozofia Testowania`, podtytułu oraz domyślnej widoczności treści polskiej.
2. **Przełączanie języka na angielski (EN)**: kliknięcie przycisku `EN`, weryfikacja zmiany tytułu na `Philosophy of Testing`, nagłówka, podtytułu oraz widoczności treści w języku angielskim.
3. **Przełączanie z powrotem na język polski (PL)**: płynna dwukierunkowa zmiana języków.
4. **Weryfikacja sekcji "Prawa testowania"**: obecność 7 fundamentalnych praw testowania (Prawo informacji, aksjomatu, asercji, granic, ryzyka, jakości, inspekcji).
5. **Weryfikacja stopki i kontaktu**: sprawdzenie linku kontaktowego `mailto:pawel.zygler@gmail.com` i praw autorskich.

## 📁 Struktura projektu

```text
testofilos-playwright/
├── pages/
│   └── TestofilosPage.ts     # Page Object Model (lokatory, nawigacja, akcje)
├── tests/
│   └── testofilos.spec.ts    # Zestaw testów Playwright E2E
├── playwright.config.ts      # Konfiguracja Playwright (baseURL, reporter, przeglądarki)
├── tsconfig.json             # Konfiguracja TypeScript
├── package.json              # Zależności i skrypty npm
└── .gitignore                # Ignorowane pliki (node_modules, raporty, artefakty)
```

## 🚀 Jak uruchamiać testy

Wszystkie polecenia wykonuj w katalogu projektu:

```bash
cd /Users/pawelzygler/Documents/programowanie/testofilos-playwright
```

### 1. Domyślne uruchomienie (headless)
Szybkie uruchomienie testów w tle:
```bash
npm test
```

### 2. Uruchomienie z widocznym oknem przeglądarki (headed)
Zobacz jak Playwright steruje przeglądarką na żywo:
```bash
npm run test:headed
```

### 3. Interaktywny tryb UI (Playwright UI Mode)
Najwygodniejszy tryb do podglądu kroków, drzewa DOM, network i time-travel:
```bash
npm run test:ui
```

### 4. Tryb debugowania (Playwright Inspector)
Krok po kroku z możliwością zatrzymywania i inspekcji:
```bash
npm run test:debug
```

### 5. Przeglądanie raportu HTML z wynikami
Wyświetlenie interaktywnego raportu z wynikami, czasem trwania, zrzutami ekranu:
```bash
npm run report
```
*(lub bezpośrednio `npx playwright show-report`)*
