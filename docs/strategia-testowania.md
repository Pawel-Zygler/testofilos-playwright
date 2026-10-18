# Strategia Testowania (Test Strategy) - Filozofia Testowania

> *„Testowanie to poznanie jakości, nie jej zapewnienie. Testowanie nie tworzy jakości, tylko ją obserwuje.”*  
> — Manifest Filozofii Testowania

Niniejszy dokument definiuje architektoniczne podejście do weryfikacji jakości, automatyzacji oraz integracji ciągłej (CI/CD) dla aplikacji **Filozofia Testowania** ([https://pawel-zygler.github.io/testofilos/](https://pawel-zygler.github.io/testofilos/)).

---

## 1. Cel i Aksjomaty Jakościowe
- **Główny cel**: Zapewnienie szybkiej, powtarzalnej i deterministycznej informacji zwrotnej (feedback loop) o stanie produktu przy każdej zmianie kodu.
- **Aksjomat ryzyka**: Skupiamy testy automatyczne wokół kluczowej wartości dla użytkownika (czytelność treści, integralność manifestu, przełączanie wersji językowych, responsywność).
- **Zasada Shift-Left**: Wykrywanie anomalii najwcześniej jak to możliwe (lokalnie u dewelopera i na poziomie Pull Requesta).

---

## 2. Model Piramidy i Trofeum Testów (Test Distribution)

```
        /   E2E Tests (Playwright)   \       <-- Krytyczne ścieżki użytkownika (język, TOC, footer)
       /------------------------------\
      /   Visual & a11y Tests (Axe)    \     <-- Spójność wizualna (desktop/mobile) + WCAG 2.1
     /----------------------------------\
    /   Integracyjne / Walidacja DOM     \   <-- Parsowanie i renderowanie sekcji
   /--------------------------------------\
  /       Statyczna analiza (Lint/Type)    \  <-- TypeScript strict mode, ESLint, Prettier
```

---

## 3. Zakres Testów (Scope)

### 3.1. W zakresie (In-Scope)
- **E2E & Functional**:
  - Ładowanie strony, renderowanie nagłówków, autorstwa i stopki.
  - Prawidłowe działanie przełącznika wersji językowej PL / EN.
  - Nawigacja w spisie treści (TOC) oraz działanie odnośników do przypisów (Footnotes).
- **Visual Regression**:
  - Weryfikacja layoutu CSS (`.content-grid`, zachowanie sidebaru na desktopie i mobile).
- **Accessibility (a11y)**:
  - Zgodność z WCAG 2.1 AA (kontrast DM Sans, etykiety `aria-label`, nawigacja klawiaturą).
- **Integritet Sieciowy i Konsoli**:
  - Zero nieobsłużonych błędów JS w konsoli przeglądarki.
  - Zero błędów 4xx/5xx dla pobieranych assetów (fonty Google DM Sans, DM Mono, favicon).

### 3.2. Poza zakresem (Out-of-Scope)
- Testy wydajnościowe obciążeniowe (Load/Stress) – witryna serwowana ze statycznego GitHub Pages CDN.
- Bezpieczeństwo backendu / bazy danych – witryna jest w 100% statycznym JAMstack/HTML.

---

## 4. Środowiska Testowe i Dane (Environments)
- **Local Dev**: `localhost` / preview serwera statycznego.
- **Preview / PR**: Ephemeral deployment lub lokalny podgląd przed mergem.
- **Production (GitHub Pages)**: `https://pawel-zygler.github.io/testofilos/` (testy sanity / post-deployment smoke tests).

---

## 5. Standardy Automatyzacji i Architektura Kodu
- **Framework**: Playwright z językiem TypeScript.
- **Wzorzec projektowy**: Page Object Model (POM) – izolacja lokatorów i akcji od asercji testowych.
- **Niezależność testów (Atomic & Isolated)**: Każdy test jest autonomiczny, posiada własny stan przeglądarki i nie polega na kolejności wykonywania.
- **Szybkość i współbieżność**: Domyślne uruchamianie w trybie `fullyParallel: true`.
- **Raportowanie**: HTML Reporter, Tracing (`on-first-retry`), Zrzuty ekranu i nagrania wideo przy błędzie.

---

## 6. Bramki Jakościowe (Quality Gates w CI/CD)

Każdy Pull Request do gałęzi `main` musi spełnić kryteria:
1. `TypeScript TypeCheck` (`tsc --noEmit`) – brak błędów typowania.
2. `Playwright E2E Tests` (Chromium + Mobile Chrome) – 100% testów zakończonych statusem PASS.
3. Czas wykonania suite w CI poniżej 60 sekund.
4. Publikacja raportu jako artefaktu w GitHub Actions.

---

## 7. Metryki i Obserwowalność Testów
- **Flakiness Rate**: < 1% (brak niestabilnych testów, deterministyczne auto-waiting w Playwright).
- **Execution Time**: Całość suite E2E poniżej 15 sekund lokalnie.
- **Test Pass Rate**: 100% na gałęzi produkcyjnej.
