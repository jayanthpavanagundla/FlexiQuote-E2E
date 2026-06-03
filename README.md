# flexiquote-e2e

![Node.js](https://img.shields.io/badge/Node.js-20.20.0-339933?logo=node.js&logoColor=white)
![npm](https://img.shields.io/badge/npm-10.8.2-CB3837?logo=npm&logoColor=white)
![npx](https://img.shields.io/badge/npx-10.8.2-CB3837?logo=npm&logoColor=white)

Playwright end-to-end tests for FlexiQuote, runnable against **staging**, **production**, or a **local** dev server.

## Setup

```bash
npm install
npx playwright install
```

Copy the example files for whichever environment(s) you'll run against, then fill in the credentials:

```bash
cp .env.staging.example    .env.staging
cp .env.production.example .env.production
cp .env.local.example      .env.local
```

Each file looks like this:

```env
BASE_URL=https://play.flexiquote.app/

# CSR portal sign-in
CSR_USERNAME=your-csr-username
CSR_PASSWORD=your-csr-password

# Regular user sign-in
FQ_USERNAME=your-username
FQ_PASSWORD=your-password
FQ_COMPANY_ID=your-company-id

# Repairer admin sign-in (same form as regular user, elevated permissions)
FQ_ADMIN_USERNAME=your-admin-username
FQ_ADMIN_PASSWORD=your-admin-password
FQ_ADMIN_COMPANY_ID=your-admin-company-id

# Super admin sign-in (same form; cross-company management under Admin menu)
SUPER_ADMIN_USERNAME=your-super-admin-username
SUPER_ADMIN_PASSWORD=your-super-admin-password
SUPER_ADMIN_COMPANY_ID=your-super-admin-company-id
```

> The `.env.<env>.example` files are committed (placeholder values only). The real `.env.staging`, `.env.production`, and `.env.local` are gitignored — never commit credentials.

## Running tests

| Command | What it does |
|---|---|
| `npm test` | Runs against staging (default) |
| `npm run test:staging` | Runs against staging explicitly |
| `npm run test:local` | Runs against `http://localhost/uniqms/` |
| `npm run test:prod` | Runs against production (use sparingly) |

### Choosing the auth path

Specs are routed to a session by filename:

| Filename pattern | Project | Auth used |
|---|---|---|
| `*.csr.spec.ts` | `flexiquote-csr` | `.auth/csr.json` (CSR portal) |
| `*.admin.spec.ts` | `flexiquote-admin` | `.auth/admin.json` (Repairer admin) |
| `*.super.spec.ts` | `flexiquote-super` | `.auth/super.json` (Super admin) |
| any other `*.spec.ts` | `flexiquote-user` | `.auth/user.json` (regular user) |

By default, **all** suites run. To pick one path explicitly, target the project:

```bash
# Only regular-user specs (and only the user-setup login)
npm run test:staging -- --project=flexiquote-user

# Only CSR specs (and only the CSR-setup login)
npm run test:staging -- --project=flexiquote-csr

# Only Repairer admin specs (and only the admin-setup login)
npm run test:staging -- --project=flexiquote-admin

# Only Super admin specs (and only the super-setup login)
npm run test:staging -- --project=flexiquote-super

# Run only a setup project (refresh stored session without running specs)
npm run test:staging -- --project=user-setup
npm run test:staging -- --project=csr-setup
npm run test:staging -- --project=admin-setup
npm run test:staging -- --project=super-setup
```

Per-spec override (rare — use only when a single test needs the other auth):

```ts
test.use({ storageState: '.auth/csr.json' });
```

### Choosing the browser

Scripts follow the pattern `test:<env>[:<browser>]`. Chromium is the default; add `:firefox` or `:webkit` to switch:

```bash
npm run test:staging              # staging + chromium (default)
npm run test:staging:firefox      # staging + firefox
npm run test:staging:webkit       # staging + webkit
npm run test:prod:firefox         # production + firefox
npm run test:local:webkit         # local + webkit
# ...etc — one script per env × browser combo
```

Run `npx playwright install firefox` (or `webkit`) once before first use to download the browser binary. Valid values: `chromium` (default), `firefox`, `webkit`. Anything else fails fast at config load with a clear error.

Pass extra Playwright flags after `--`, exactly like the staging-only scripts:

```bash
npm run test:prod:firefox -- --headed --project=flexiquote-user
```

### Passing extra flags

Use `--` to forward flags to Playwright:

```bash
npm run test:staging -- --headed                # see the browser
npm run test:staging -- --debug                 # step-through debugger
npm run test:staging -- tests/quote.details.spec.ts   # one file
```

### Reports

After any run, view the HTML report:

```bash
npm run report
```

Reports include screenshots, videos, and traces for failed tests.

## `npm` vs `npx` — what each does

Both ship with Node.js. Quick rules of thumb:

| Tool | Use when |
|---|---|
| `npm run <script>` | Running a named script from `package.json`. Adds `node_modules/.bin` to `PATH` so binaries resolve. |
| `npm test` | Shortcut for `npm run test`. Same goes for `start`, `stop`, `restart`. |
| `npx <binary>` | Running a binary from `node_modules/.bin` directly (e.g. `npx playwright`). Also fetches and runs a package one-off if not installed (e.g. `npx create-react-app`). |

### npm scripts (in this project)

| Command | Resolves to |
|---|---|
| `npm install` | Installs everything in `package.json` to `node_modules/` |
| `npm install -D <pkg>` | Adds `<pkg>` as a dev dependency |
| `npm test` | `playwright test` (defaults to staging) |
| `npm run test:staging` | `cross-env ENV=staging playwright test` |
| `npm run test:staging:firefox` | `cross-env ENV=staging BROWSER=firefox playwright test` |
| `npm run test:staging:webkit` | `cross-env ENV=staging BROWSER=webkit playwright test` |
| `npm run test:prod` | `cross-env ENV=production playwright test` |
| `npm run test:prod:firefox` | `cross-env ENV=production BROWSER=firefox playwright test` |
| `npm run test:prod:webkit` | `cross-env ENV=production BROWSER=webkit playwright test` |
| `npm run test:local` | `cross-env ENV=local playwright test` |
| `npm run test:local:firefox` | `cross-env ENV=local BROWSER=firefox playwright test` |
| `npm run test:local:webkit` | `cross-env ENV=local BROWSER=webkit playwright test` |
| `npm run report` | `playwright show-report` |

### Common npx commands

| Command | What it does |
|---|---|
| `npx playwright install` | Downloads the browser binaries Playwright needs (Chromium, etc.) — run once after `npm install` |
| `npx playwright test` | Runs tests directly (no env switching — uses default `ENV=staging`) |
| `npx playwright test --headed` | Runs with a visible browser window |
| `npx playwright test --debug` | Opens the Playwright Inspector for step-through debugging |
| `npx playwright test --ui` | Opens the interactive UI mode (recommended while writing tests) |
| `npx playwright codegen <url>` | Records actions in a browser and emits Playwright code |
| `npx playwright show-report` | Opens the HTML report from the last run |
| `npx playwright show-trace <path>` | Opens a saved `.zip` trace |
| `npx cross-env ENV=local playwright test` | Ad-hoc env switch without using an npm script |

### Passing flags through `npm run`

`npm` swallows flags it doesn't recognise. To pass `--headed` (or any other flag) through to the script, separate with `--`:

```bash
npm run test:staging -- --headed
npm run test:staging -- --debug --project=flexiquote-user
```

Without the `--`, `npm` would treat `--headed` as one of its own flags and Playwright would never see it.

## How it works

- **Environment selection** — `playwright.config.ts` reads `process.env.ENV` and loads `.env.${ENV}`. Defaults to `staging`.
- **Browser selection** — All projects run in Chromium by default. Set `BROWSER=firefox` (or `webkit`) at invocation time to switch. The value is validated at config load.
- **`baseURL`** — set from `BASE_URL` in the active `.env.${ENV}`. All tests use **relative paths** (`'v2/'`, `'SignInCsr.aspx'`) so they work whether the app is at the root (prod/staging) or under a path prefix like `/uniqms/` (local).
- **Auth setups** — Four login flows live under `auth-setup/`:
  - `auth.csr.setup.ts` → saves `.auth/csr.json` (CSR portal)
  - `auth.user.setup.ts` → saves `.auth/user.json` (regular user with Company ID)
  - `auth.admin.setup.ts` → saves `.auth/admin.json` (Repairer admin — same form as regular user, elevated permissions)
  - `auth.super.setup.ts` → saves `.auth/super.json` (Super admin — same form; cross-company management under `/v2/superadmin/*`)
- **Spec routing** — Specs are matched to a session by filename:
  - `*.csr.spec.ts` → runs in the `flexiquote-csr` project, uses `.auth/csr.json`
  - `*.admin.spec.ts` → runs in the `flexiquote-admin` project, uses `.auth/admin.json`
  - `*.super.spec.ts` → runs in the `flexiquote-super` project, uses `.auth/super.json`
  - everything else (`*.spec.ts`) → runs in the `flexiquote-user` project, uses `.auth/user.json`
- **Choosing one path** — `npm run test:staging -- --project=flexiquote-csr` runs only CSR specs (and only the CSR setup). Same with `flexiquote-user`, `flexiquote-admin`, and `flexiquote-super`.

## Project structure

```
.
├── .env.<env> / .env.<env>.example     # per-env config (real files gitignored, examples committed)
├── playwright.config.ts                # picks .env.${ENV}, sets baseURL, defines projects
├── tsconfig.json                       # editor TS support
│
├── auth-setup/                         # login flows that hydrate .auth/*.json
│   ├── auth.csr.setup.ts               # CSR portal → .auth/csr.json
│   ├── auth.user.setup.ts              # regular user → .auth/user.json
│   ├── auth.admin.setup.ts             # repairer admin → .auth/admin.json
│   └── auth.super.setup.ts             # super admin → .auth/super.json
│
├── tests/                              # filename suffix routes the spec to a session (see "Choosing the auth path")
│   ├── smoke/                          # critical-path tests (run on every build)
│   ├── regression/                     # broader regression suite
│   ├── quote.details.spec.ts           # sample — runs under flexiquote-user
│   ├── quote.details.csr.spec.ts       # sample — runs under flexiquote-csr
│   ├── quote.details.admin.spec.ts     # sample — runs under flexiquote-admin
│   └── company.details.super.spec.ts   # sample — runs under flexiquote-super
│
├── pages/                              # cross-cutting Page Object Models
├── fixtures/                           # Playwright test.extend(...) fixtures
├── helpers/                            # pure utility functions
├── reporters/                          # custom Playwright reporters
│
├── .auth/                              # stored session state (gitignored, auto-generated)
├── playwright-report/                  # generated HTML report (gitignored)
└── test-results/                       # generated traces/screenshots/videos (gitignored)
```

## Adding a new environment

1. Create `.env.<name>` with `BASE_URL` and credentials.
2. Add a script to `package.json`:
   ```json
   "test:<name>": "cross-env ENV=<name> playwright test"
   ```
3. Run with `npm run test:<name>`.
