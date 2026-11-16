#Playwright + TypeScript Framework

This ZIP contains the reusable framework structure and configuration only.
It intentionally contains **no sample tests, no demo test cases, and no application-specific locators**.

## Setup

1. Extract this ZIP.
2. Open the extracted folder in VS Code.
3. Open the integrated terminal.
4. Install dependencies:

   ```bash
   npm install
   ```

5. Install Playwright browsers:

   ```bash
   npx playwright install
   ```

6. Copy `.env.example` to `.env` and set your application's URL in `BASE_URL`.
7. Add your own test files under `tests/`.

## Folder structure

```text
playwright-empty-framework/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── docs/
│   ├── architecture.md
│   ├── coding-standards.md
│   └── execution-guide.md
├── src/
│   ├── api/
│   │   ├── clients/
│   │   ├── endpoints/
│   │   └── models/
│   ├── components/
│   ├── config/
│   ├── constants/
│   ├── data/
│   ├── fixtures/
│   ├── helpers/
│   ├── pages/
│   ├── services/
│   ├── types/
│   └── utils/
├── tests/
│   ├── api/
│   ├── integration/
│   └── ui/
│       ├── authentication/
│       ├── dashboard/
│       └── modules/
├── test-data/
│   ├── environments/
│   └── schemas/
├── .env.example
├── .gitignore
├── .prettierrc.json
├── eslint.config.mjs
├── package.json
├── playwright.config.ts
└── tsconfig.json
```

## Intended responsibilities

- `tests/ui`: your browser-based UI test specifications.
- `tests/api`: your API test specifications.
- `tests/integration`: end-to-end or cross-layer scenarios.
- `src/pages`: Page Object Model classes for application pages.
- `src/components`: reusable page components (navigation, dialogs, tables, etc.).
- `src/fixtures`: shared Playwright fixtures and test setup.
- `src/api`: API clients, endpoint wrappers, and request/response models.
- `src/services`: reusable business-level workflows.
- `src/config`: environment and framework configuration.
- `src/constants`: routes, messages, and other constants.
- `src/data` and `test-data`: generated/static test data and environment data.
- `src/helpers` and `src/utils`: reusable support functions.
- `src/types`: shared TypeScript types.
- `docs`: architecture and team conventions.
- `.github/workflows`: CI pipeline.

Empty directories are preserved with `.gitkeep` files. No tests are included.

## Commands

- `npm test`
- `npm run test:headed`
- `npm run test:debug`
- `npm run test:ui-mode`
- `npm run test:chromium`
- `npm run test:firefox`
- `npm run test:webkit`
- `npm run report`
- `npm run typecheck`
- `npm run lint`
- `npm run format`

The starter has not been connected to your application or run against your environment.
