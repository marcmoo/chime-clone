# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Chime Clone is a Next.js 12 clone of the [Chime](https://www.chime.com/) banking website. It uses React 18, TypeScript 4.8, styled-components for CSS-in-JS, and Apollo Client 3.x for GraphQL communication with the NestJS backend (`chime-clone-api`). Auth uses JWT stored in localStorage.

## Commands

```bash
npm run dev          # Start development server (localhost:3000)
npm run build        # Production build
npm run lint         # ESLint (next/core-web-vitals + prettier)
npm run format       # Check formatting (prettier)
npm run format:fix   # Auto-fix formatting
```

No test framework is configured.

## Environment Variables

- `NEXT_PUBLIC_GRAPHQL_URL` — GraphQL endpoint (default: `http://localhost:4000/graphql`)

## Architecture

### Directory Structure

- `pages/` — Next.js file-based routing
  - `pages/dashboard/index.tsx` — Dark-themed dashboard with accounts + tabbed transactions
  - `pages/dashboard/transfer.tsx` — Move Money page with confirmation modal
  - `pages/admin.tsx` — Admin panel for transaction CRUD (deposit, create, edit, delete) + check image audit modal
  - `pages/users/log-in.tsx` / `pages/users/sign-up.tsx` — Auth pages
- `common/` — All shared code, organized by concern:
  - `components/composition/` — Layouts: `MainLayout`, `ModalLayout`, `DashboardLayout`
  - `components/pages/` — Page-specific styled components: `dashboard/`, `transfer/`, `admin/`, etc.
  - `components/elements/` — Reusable UI components
  - `components/sections/` — Page sections (DualSection, MonoSection, BannerSection)
  - `constants/` — Colors (including dark theme), breakpoints, HTTP status codes, navigation data
  - `hooks/` — `useUser` hook (Apollo `ME_QUERY` + localStorage JWT)
  - `services/` — `loginUser` and `registerUser` (GraphQL mutations)
  - `styles/` — GlobalStyle and `tags/` with styled HTML element primitives
  - `ts/` — TypeScript types, interfaces, enums
  - `utils/` — Utility functions (`getMedia`, `getResizeTransition`)
  - `lib/` — Apollo Client initialization (auth link + http link)
- `public/static/` — SVGs and images

### Path Aliases

Configured in `tsconfig.json` — use these for imports:
- `@types`, `@interfaces`, `@enums` — TypeScript definitions from `common/ts/`
- `@constants`, `@hooks`, `@api`, `@utils`, `@lib`, `@services`, `@database` — barrel exports from `common/`
- `@lib/*` — Direct file access (e.g., `@lib/apollo-client`)
- `@components/*` — `common/components/*`
- `@styles/*` — `common/styles/*`
- `@static/*` — `public/static/*`
- `@pages/*` — `pages/*`

### Key Patterns

**Per-page layouts:** Pages export a `getLayout` function consumed by `_app.tsx`. Main pages use `MainLayout`; auth pages use `ModalLayout`; authenticated dashboard/transfer/admin pages use `DashboardLayout`.

**Dark theme:** Dashboard, transfer, and admin pages use dark green color scheme (`BG_DARK`, `BG_DARK_CARD`, `BRIGHT_GREEN`, etc.) defined in `constants/colors.ts`.

**Styled-components with SSR:** Babel plugin configured in `.babelrc` for SSR support. `displayName` enabled in dev, disabled in prod.

**Auth flow:** JWT-based. Backend issues JWT on login/signup. Frontend stores token in `localStorage`, injected into GraphQL requests via Apollo auth link. `useUser` hook queries `ME_QUERY` with `cache-and-network` policy.

**Account auto-creation:** On signup, the backend auto-creates both a CHECKING and SAVINGS account ($0 balance). Frontend dashboard has a fallback that creates missing accounts via `createAccount` mutation (uses `useRef` guard to prevent duplicates from React 18 strict mode).

**GraphQL:** Apollo Client 3.x (not 4.x — v4 has incompatible module exports with Next.js 12). Endpoint at `localhost:4000/graphql`. Key queries: `MY_ACCOUNTS`, `TRANSACTIONS`, `ME_QUERY`. Key mutations: `TRANSFER_MONEY`, `CREATE_TRANSACTION`, `UPDATE_TRANSACTION`, `DELETE_TRANSACTION`, `REMOVE_TRANSACTION_IMAGES`.

**Transfer logic:** Creates two linked transactions (debit + credit) with same `transactionDate` and opposite amounts. Deleting a transfer transaction auto-deletes its paired transaction and reverses both account balances.

**Transaction date:** All forms (deposit, create transaction, transfer) include a date/time picker defaulting to now. Backend accepts optional `transactionDate`; falls back to `new Date()`. Transactions are sorted by `transactionDate DESC`.

**Account numbers:** 15-digit numbers starting with `3`, randomly generated on creation.

**Check deposit audit (admin):** Transactions with check images (`frontImageUrl`/`backImageUrl`) show an image badge in the admin table. Clicking a deposit row opens a modal displaying front/back check images. Modal has three actions: "Close", "Remove Photos" (deletes images but keeps the deposit), and "Delete Deposit" (reverses balance and removes the transaction entirely). Images are served from backend at `API_BASE_URL + imageUrl`.

## Production Deployment
- **Server:** Hostinger KVM 2 VPS (193.46.198.236)
- **Path:** `/var/www/chime-clone`
- **Process manager:** PM2 (name: `chime-web`, port 3001)
- **Nginx:** Port 8080 proxying to localhost:3001
- **URL:** `http://193.46.198.236:8080`
- **Backend API:** `http://193.46.198.236/chime/graphql`
- **Deploy script:** `./deploy-production.sh`
- `NEXT_PUBLIC_GRAPHQL_URL` must be set at **build time** (baked into client bundle)

## Backend (chime-clone-api)

Separate NestJS repo at `~/projects/chime-clone-api`. GraphQL code-first, TypeORM + MySQL.

- 4 entities: User, Account, Transaction, Card
- 6 modules: Users, Auth, Accounts, Transactions, Cards, Uploads + SeedModule
- Auth: JWT strategy with `GqlAuthGuard` and `@CurrentUser` decorator
- Seed: `npm run seed` creates test users (john@doe.com / jane@doe.com, password: doe123)
- Transaction mutations: `createTransaction`, `transferMoney`, `updateTransaction`, `deleteTransaction`, `removeTransactionImages`
- Transaction entity has `frontImageUrl` and `backImageUrl` nullable columns for check deposit images
- File uploads: `POST /uploads/check-images` REST endpoint (multer + sharp compression)
- Static file serving: `/uploads` path serves uploaded images
- `synchronize: false` in production (true in dev) — use migration SQL scripts for schema changes

## Formatting Conventions

- Prettier: `arrowParens: "avoid"`, `endOfLine: "crlf"`
- ESLint extends `next/core-web-vitals` and `prettier`
- TypeScript strict mode enabled
