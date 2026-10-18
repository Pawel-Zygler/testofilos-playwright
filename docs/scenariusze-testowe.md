# Scenariusze Testowe - Filozofia Testowania

Dokumentacja scenariuszy testowych dla aplikacji internetowej **Filozofia Testowania** ([https://pawel-zygler.github.io/testofilos/](https://pawel-zygler.github.io/testofilos/)).

---

## 📋 Spis Treści
1. [Metryka i konwencja](#metryka-i-konwencja)
2. [Scenariusze zautomatyzowane (Aktywne)](#scenariusze-zautomatyzowane-aktywne)
   - [SC-01: Ładowanie strony głównej w języku polskim](#sc-01-ładowanie-strony-głównej-w-języku-polskim)
   - [SC-02: Przełączenie języka na angielski (EN)](#sc-02-przełączenie-języka-na-angielski-en)
   - [SC-03: Cykl przełączania języków (PL -> EN -> PL)](#sc-03-cykl-przełączania-języków-pl---en---pl)
   - [SC-04: Integralność sekcji "Prawa testowania" (PL)](#sc-04-integralność-sekcji-prawa-testowania-pl)
   - [SC-05: Weryfikacja kontaktu e-mail oraz stopki](#sc-05-weryfikacja-kontaktu-e-mail-oraz-stopki)
3. [Scenariusze planowane do automatyzacji (Backlog)](#scenariusze-planowane-do-automatyzacji-backlog)
   - [SC-06: Nawigacja po spisie treści (TOC) i przewijanie](#sc-06-nawigacja-po-spisie-treści-toc-i-przewijanie)
   - [SC-07: Poprawność odnośników do przypisów (Footnotes)](#sc-07-poprawność-odnośników-do-przypisów-footnotes)
   - [SC-08: Audyt dostępności (a11y - WCAG 2.1 AA)](#sc-08-audyt-dostępności-a11y---wcag-21-aa)
   - [SC-09: Regresja wizualna (Visual Snapshot Testing)](#sc-09-regresja-wizualna-visual-snapshot-testing)
   - [SC-10: Czystość konsoli i brak błędów sieciowych (HTTP 4xx/5xx)](#sc-10-czystość-konsoli-i-brak-błędów-sieciowych-http-4xx5xx)

---

## Metryka i konwencja

Każdy przypadek testowy opisany jest według standardu:
- **ID**: Unikalny identyfikator scenariusza.
- **Priorytet**: Krytyczny (P1), Wysoki (P2), Średni (P3).
- **Typ**: E2E / Funkcjonalny / Dostępność / Regresja.
- **Plik testowy**: Odnośnik do implementacji w Playwright.
- **Warunki wstępne (Preconditions)**.
- **Kroki wykonania (Steps)**.
- **Oczekiwany rezultat (Expected Result)**.

---

## Scenariusze zautomatyzowane (Aktywne)

### SC-01: Ładowanie strony głównej w języku polskim
- **ID**: `SC-01`
- **Priorytet**: `P1 (Krytyczny)`
- **Typ**: E2E / Funkcjonalny
- **Implementacja**: [`tests/testofilos.spec.ts`](../tests/testofilos.spec.ts)
- **Warunki wstępne**:
  - Przeglądarka ma dostęp do sieci internetowej.
- **Kroki wykonania**:
  1. Otwórz adres URL: `https://pawel-zygler.github.io/testofilos/`.
  2. Sprawdź tytuł karty przeglądarki (`document.title`).
  3. Sprawdź tekst nagłówka głównego (`#main-title`).
  4. Sprawdź podtytuł artykułu (`#main-subtitle`).
  5. Zweryfikuj stan przycisków wyboru języka (`#pl-btn`, `#en-btn`).
  6. Zweryfikuj widoczność kontenerów treści (`#pl-content`, `#en-content`).
- **Oczekiwany rezultat**:
  - Tytuł karty to: `"Filozofia Testowania"`.
  - Nagłówek główny zawiera słowa: `"Filozofia"` oraz `"Testowania"`.
  - Podtytuł brzmi: `"Próba naukowego podejścia do umiejętności testowania oprogramowania."`.
  - Przycisk `#pl-btn` posiada klasę CSS `.active`.
  - Przycisk `#en-btn` **nie** posiada klasy `.active`.
  - Kontener `#pl-content` jest widoczny.
  - Kontener `#en-content` jest ukryty (posiada klasę `.hidden`).

---

### SC-02: Przełączenie języka na angielski (EN)
- **ID**: `SC-02`
- **Priorytet**: `P1 (Krytyczny)`
- **Typ**: E2E / Interakcja użytkownika
- **Implementacja**: [`tests/testofilos.spec.ts`](../tests/testofilos.spec.ts)
- **Warunki wstępne**:
  - Strona jest załadowana w domyślnym języku polskim.
- **Kroki wykonania**:
  1. Kliknij przycisk języka angielskiego (`#en-btn`).
  2. Sprawdź tytuł karty przeglądarki.
  3. Sprawdź nagłówek główny i podtytuł.
  4. Zweryfikuj stany przycisków językowych.
  5. Zweryfikuj widoczność sekcji językowych.
- **Oczekiwany rezultat**:
  - Tytuł karty zmienia się na: `"Philosophy of Testing"`.
  - Nagłówek główny zmienia się na: `"Philosophy of Testing"`.
  - Podtytuł zmienia się na: `"A scientific approach to the craft of software testing."`.
  - Przycisk `#en-btn` otrzymuje klasę `.active`.
  - Przycisk `#pl-btn` traci klasę `.active`.
  - Kontener `#en-content` jest w pełni widoczny.
  - Kontener `#pl-content` otrzymuje klasę `.hidden`.

---

### SC-03: Cykl przełączania języków (PL -> EN -> PL)
- **ID**: `SC-03`
- **Priorytet**: `P2 (Wysoki)`
- **Typ**: E2E / Zarządzanie stanem UI
- **Implementacja**: [`tests/testofilos.spec.ts`](../tests/testofilos.spec.ts)
- **Warunki wstępne**:
  - Strona załadowana w języku polskim.
- **Kroki wykonania**:
  1. Kliknij przycisk `#en-btn` (przełączenie na język angielski).
  2. Upewnij się, że treść angielska jest widoczna.
  3. Kliknij przycisk `#pl-btn` (powrót do języka polskiego).
  4. Zweryfikuj tytuł karty oraz widoczność kontenerów.
- **Oczekiwany rezultat**:
  - Po ponownym kliknięciu `#pl-btn`, strona bezbłędnie przywraca polski tytuł, `#pl-content` staje się widoczny, a `#en-content` ukryty.

---

### SC-04: Integralność sekcji "Prawa testowania" (PL)
- **ID**: `SC-04`
- **Priorytet**: `P2 (Wysoki)`
- **Typ**: E2E / Walidacja kluczowej treści (Core Value)
- **Implementacja**: [`tests/testofilos.spec.ts`](../tests/testofilos.spec.ts)
- **Warunki wstępne**:
  - Strona otwarta w wersji polskiej.
- **Kroki wykonania**:
  1. Zlokalizuj sekcję o identyfikatorze `#pl-laws`.
  2. Sprawdź obecność 7 praw testowania zdefiniowanych w manifeście:
     - Prawo informacji
     - Prawo aksjomatu
     - Prawo asercji
     - Prawo granic
     - Prawo ryzyka
     - Prawo jakości
     - Prawo inspekcji
- **Oczekiwany rezultat**:
  - Wszystkie 7 praw znajduje się w DOM, są czytelne i nie zostały usunięte ani zniekształcone podczas aktualizacji kodu.

---

### SC-05: Weryfikacja kontaktu e-mail oraz stopki
- **ID**: `SC-05`
- **Priorytet**: `P3 (Średni)`
- **Typ**: E2E / Dostępność danych kontaktowych
- **Implementacja**: [`tests/testofilos.spec.ts`](../tests/testofilos.spec.ts)
- **Warunki wstępne**:
  - Strona jest otwarta.
- **Kroki wykonania**:
  1. Znajdź odnośnik pocztowy `a[href^="mailto:"]`.
  2. Zweryfikuj wartość atrybutu `href`.
  3. Sprawdź widoczność stopki `.site-footer`.
- **Oczekiwany rezultat**:
  - Link pocztowy wskazuje dokładnie na: `mailto:pawel.zygler@gmail.com`.
  - Stopka zawiera aktualną notę prawno-autorską serwisu.

---

## Scenariusze planowane do automatyzacji (Backlog)

### SC-06: Nawigacja po spisie treści (TOC) i przewijanie
- **ID**: `SC-06`
- **Priorytet**: `P2`
- **Opis**: Kliknięcie każdego elementu w spisie treści (`nav.toc a`) powinno płynnie przewinąć viewport do odpowiedniego nagłówka sekcji (`#pl-intro`, `#pl-why`, `#pl-software` itd.), a adres URL powinien zaktualizować się o odpowiedni fragment `#hash`.

### SC-07: Poprawność odnośników do przypisów (Footnotes)
- **ID**: `SC-07`
- **Priorytet**: `P3`
- **Opis**: Kliknięcie odnośnika przypisu `sup[id^="fnref:"] a` przenosi do dolnego przypisu, a kliknięcie strzałki powrotu `↑` cofa użytkownika do miejsca w tekście.

### SC-08: Audyt dostępności (a11y - WCAG 2.1 AA)
- **ID**: `SC-08`
- **Priorytet**: `P2`
- **Opis**: Integracja z biblioteką `@axe-core/playwright` – automatyczna weryfikacja kontrastu kolorów, poprawnej hierarchii nagłówków (`H1` -> `H2` -> `H3`), atrybutów `aria-label` w nawigacji oraz focus states przy nawigacji klawiaturą (`Tab`).

### SC-09: Regresja wizualna (Visual Snapshot Testing)
- **ID**: `SC-09`
- **Priorytet**: `P2`
- **Opis**: Wykonanie zrzutu ekranu (`toHaveScreenshot()`) na widokach Desktop (1920x1080) oraz Mobile (iPhone 14 / Pixel 7), aby wychwycić niepożądane przesunięcia marginesów i układu siatki `.content-grid`.

### SC-10: Czystość konsoli i brak błędów sieciowych (HTTP 4xx/5xx)
- **ID**: `SC-10`
- **Priorytet**: `P1`
- **Opis**: Nasłuchiwanie na zdarzenia `page.on('console')` oraz `page.on('response')` – test zawodzi, jeżeli w konsoli przeglądarki pojawi się błąd JS (`Uncaught exception`) lub dowolny zasób (font, CSS, favicon) zwróci status HTTP >= 400.
