# Chime Clone

A clone of the [Chime](https://www.chime.com/) banking website built with Next.js, React, and styled-components. Connects to a NestJS GraphQL backend ([chime-clone-api](https://github.com/marcmoo/chime-clone-api)).

## Features

- **Marketing Pages** — Landing page, debit card, savings account, fee-free banking
- **Authentication** — Sign up and log in with JWT
- **Dashboard** — Account overview with balances, tabbed transaction history
- **Transfers** — Move money between checking and savings accounts
- **Admin Panel** — Create, edit, and delete transactions

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 12 | Framework (SSR + routing) |
| React 18 | UI library |
| TypeScript 4.8 | Type safety |
| styled-components | CSS-in-JS styling |
| Apollo Client 3 | GraphQL client |
| react-hook-form | Form handling |

## Getting Started

### Prerequisites

- Node.js 20+
- [chime-clone-api](https://github.com/marcmoo/chime-clone-api) running on port 4000

### Installation

```bash
git clone https://github.com/marcmoo/chime-clone.git
cd chime-clone
npm install
```

### Environment Setup (optional)

The app defaults to `http://localhost:4000/graphql` for the API. To override:

```bash
export NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql
```

### Running

```bash
# Development
npm run dev

# Production
npm run build
npm run start
```

Open `http://localhost:3000` in your browser.

## Project Structure

```
pages/
  index.tsx                    # Landing page
  dashboard/index.tsx          # Account dashboard
  dashboard/transfer.tsx       # Money transfer
  admin.tsx                    # Transaction admin panel
  users/log-in.tsx             # Login
  users/sign-up.tsx            # Registration
  chime-financial.tsx          # Marketing pages
  debit-card.tsx
  savings-account.tsx
  ...
common/
  components/
    composition/               # Layouts (Main, Modal, Dashboard)
    pages/                     # Page-specific components
    elements/                  # Reusable UI components
    sections/                  # Page sections
  lib/apollo-client.ts         # Apollo Client setup
  hooks/                       # useUser hook
  services/                    # Auth services
  constants/                   # Colors, breakpoints, nav data
  styles/                      # Global styles
  ts/                          # Types, interfaces, enums
```

## Production Deployment

**Server:** Hostinger KVM 2 VPS (193.46.198.236)

### Quick Deploy

```bash
./deploy-production.sh
```

### Manual Deploy

```bash
ssh root@193.46.198.236
cd /var/www/chime-clone
git pull origin main
npm install
NEXT_PUBLIC_GRAPHQL_URL=http://193.46.198.236/chime/graphql npm run build
pm2 delete chime-web && pm2 start npm --name chime-web -- start -- -p 3001
pm2 save
```

### Server Details

| Component | Value |
|-----------|-------|
| Path | `/var/www/chime-clone` |
| PM2 name | `chime-web` |
| App port | 3001 |
| Nginx port | 8080 |
| URL | `http://193.46.198.236:8080` |
| Backend | `http://193.46.198.236/chime/graphql` |

## Credits

UI design based on the original [Chime](https://www.chime.com/) website.

## License

MIT
