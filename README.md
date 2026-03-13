# Lendsqr Frontend Assessment

A Next.js application built for the Lendsqr frontend engineering assessment. This project demonstrates the implementation of an admin console for managing lending operations with React, TypeScript, and SCSS.

## Tech Stack

- **Framework**: [Next.js 16.1.6](https://nextjs.org/) (App Router)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/) (strict mode)
- **Styling**: [SCSS](https://sass-lang.com/) with custom design tokens and mixins
- **Linting**: [ESLint 9](https://eslint.org/) (flat config) + [Prettier](https://prettier.io/)
- **Git Hooks**: [Husky](https://typicode.github.io/husky/) + [lint-staged](https://github.com/lint-staged/lint-staged)

## Prerequisites

- **Node.js**: v18 or higher
- **npm**: v9 or higher
- **Git**: For version control

## Getting Started

### Installation

1. Clone the repository:

```bash
git clone https://github.com/<your-username>/lendsqr-fe-test.git
cd lendsqr-fe-test
```

2. Install dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Build for Production

Create an optimized production build:

```bash
npm run build
```

Run the production server:

```bash
npm start
```

## Available Scripts

| Script                   | Description                                    |
| ------------------------ | ---------------------------------------------- |
| `npm run dev`            | Start the development server with hot reload   |
| `npm run build`          | Build the application for production           |
| `npm start`              | Run the production server                      |
| `npm run lint`           | Run ESLint to check for code quality issues    |
| `npm run format`         | Format all files with Prettier                 |
| `npm run format:check`   | Check if files are formatted correctly         |
| `npm run generate:users` | Generate 500 mock users into `data/users.json` |
| `npm test`               | Run unit tests (Jest + React Testing Library)  |
| `npm run test:e2e`       | Run E2E tests (Cypress; starts dev server)     |

## Project Structure

```
lendsqr-fe-test/
├── data/
│   └── users.json            # Generated 500 mock users (npm run generate:users)
├── scripts/
│   └── generate-users.mjs    # Faker script to generate users.json
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/        # Login page
│   │   │   └── forgot-password/  # Forgot password placeholder
│   │   ├── (dashboard)/      # Dashboard route group (header + sidebar layout)
│   │   │   ├── dev/styles/   # Design system explorer page
│   │   │   ├── users/        # Users list page
│   │   │   │   └── [id]/     # User details page
│   │   │   ├── layout.tsx    # Dashboard shell layout (auth guard)
│   │   │   └── page.tsx      # Dashboard home
│   │   ├── api/
│   │   │   └── users/        # GET /api/users (list), GET /api/users/[id]
│   │   ├── layout.tsx        # Root layout (QueryProvider, AuthProvider)
│   │   └── page.tsx          # Root redirect to /users
│   ├── components/
│   │   ├── icons/            # SVG icon components
│   │   ├── layout/
│   │   │   ├── Header/       # Top navigation bar
│   │   │   └── Sidebar/      # Side navigation with grouped menu items
│   │   ├── providers/        # QueryClientProvider wrapper
│   │   └── ui/
│   │       ├── Avatar/       # User avatar with image/fallback
│   │       ├── Button/       # Button with variants, sizes, loading
│   │       ├── Card/         # Content container with shadow
│   │       ├── Input/        # Form input with label, error, helper
│   │       └── Table/        # Data table (TanStack Table), hidePagination option
│   ├── context/
│   │   └── AuthContext.tsx   # AuthProvider, useAuth (login/logout/token)
│   ├── lib/
│   │   ├── api/users.ts      # getUsers, getUserById (calls /api/users)
│   │   ├── auth.ts           # mockLogin, logout, getToken (localStorage)
│   │   ├── persistence/userOverrides.ts  # IndexedDB (Dexie) + localStorage fallback
│   │   └── validations/      # Zod schemas (auth, user details)
│   ├── styles/
│   │   ├── globals.scss      # Global styles and CSS reset
│   │   ├── _variables.scss   # Design tokens (colors, spacing, typography)
│   │   └── _mixins.scss      # SCSS mixins and utilities
│   └── types/
│       └── user.ts           # AppUser, UserOverrides
├── public/                   # Static assets (e.g. login-illustration.svg)
└── ...config files
```

## Components

### Layout

| Component | Description                                                                                                 |
| --------- | ----------------------------------------------------------------------------------------------------------- |
| `Header`  | Fixed top bar with logo, search, notifications, and user menu. Hamburger toggle on mobile.                  |
| `Sidebar` | Navigation sidebar with grouped menu items (Customers, Businesses, Settings). Responsive overlay on mobile. |

### UI

| Component | Props                                                       | Description                                                                             |
| --------- | ----------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `Button`  | `variant`, `size`, `fullWidth`, `loading`, `disabled`       | Supports primary, secondary, outline, ghost, danger variants and sm/md/lg sizes.        |
| `Input`   | `label`, `error`, `helperText` + native input attrs         | Form input with accessible labels, error states, and helper text.                       |
| `Card`    | `padding` (`none`, `sm`, `md`, `lg`)                        | Content container with border, shadow, and configurable padding.                        |
| `Avatar`  | `src`, `alt`, `size`, `fallback`                            | Displays user image or falls back to initials. Sizes: sm (32px), md (40px), lg (100px). |
| `Table`   | `columns`, `data`, `pageSize`, `onFilter`, `hidePagination` | Generic typed table (TanStack Table) with sorting, filter buttons, optional pagination. |

### Design System Explorer

Visit `/dev/styles` to see all color tokens, typography scale, spacing, and live component examples.

## Features

- [x] Responsive dashboard layout (header + sidebar + content)
- [x] Reusable component library (Button, Input, Card, Avatar, Table)
- [x] Design system explorer page
- [x] Login page with form validation (React Hook Form + Zod)
- [x] Dashboard with user statistics
- [x] Users list with pagination, search, and sorting (500 records)
- [x] User details page with local persistence (IndexedDB/localStorage)
- [x] Unit and E2E tests

## Tests

- **Unit tests** (Jest + React Testing Library):
  - Run all unit tests:

    ```bash
    npm test
    ```

  - Coverage includes login validation, table pagination behaviour, and persistence logic for user details.

- **E2E tests** (Cypress):
  - Run the happy-path E2E flow (starts the dev server and runs Cypress headlessly):

    ```bash
    npm run test:e2e
    ```

  - The main scenario covers: login → navigate to users → open the first user’s **More actions → View Details** → land on the user details page.

## Design

The application follows the design specifications from the [Figma design file](https://www.figma.com/file/ZKILoCoIoy1IESdBpq3GNC/Frontend).

## Live Demo

**URL**: `https://abdulrasheed-akintola-lendsqr-fe-test.vercel.app`

## How to Review

- **Login**
  - Open the live URL (or run `npm run dev` and go to http://localhost:3000).
  - Use **any valid email and any non-empty password** (auth is mocked; token is stored in `localStorage`).
  - Example: Email `reviewer@example.com`, Password `password123`.

- **Flows to check**
  1. **Login**: Submit with empty fields to see validation; then log in with valid credentials — you should land on the users page.
  2. **Users page**: Stat cards, search, sort, column filters, and pagination. Open **More actions** (⋮) on a row → **View Details** to go to user details.
  3. **User details**: Profile card (avatar, name, tier, balance), tabs (General Details, Documents, etc.), and General Details content (personal info, education/employment, socials, guarantors).

- **Tests**
  - Unit: `npm test`
  - E2E: `npm run test:e2e` (starts the dev server and runs Cypress headlessly).

## Mock API

The app includes a built-in mock API served by Next.js. When you run `npm run dev` or `npm start`, the following endpoint is available:

**Base**: Same origin as the app (e.g. `http://localhost:3000` when running locally).

**List users** (paginated, searchable, sortable):

```bash
curl "http://localhost:3000/api/users?page=1&limit=20"
```

Optional query params: `search` (filter by name, email, phone, organization), `sort` (e.g. `createdAt`, `fullName`, `email`), `order` (`asc` or `desc`).

**Get user by ID**:

```bash
curl "http://localhost:3000/api/users/1"
```

The 500 user records are generated by `npm run generate:users` and stored in `data/users.json` (committed to the repo). To regenerate the file, run `npm run generate:users`.

## Submission Artefacts

- **Repository**: `https://github.com/lograshad/lendsqr-fe-test`
- **Live demo**: `https://abdulrasheed-akintola-lendsqr-fe-test.vercel.app`
- **Decisions / review doc**: `https://www.notion.so/32217521958a80498e66c7da6a2275ec?source=copy_link`
- **Loom video (≤ 3 min)**: (add link after recording)

## Development Decisions

### SCSS Architecture

- **Design Tokens**: Centralized in `_variables.scss` for colors, typography, spacing, and breakpoints
- **Mixins**: Reusable responsive breakpoints, typography, and utility mixins in `_mixins.scss`
- **SCSS Modules**: Component-scoped styles to prevent naming conflicts

### Code Quality

- **Strict TypeScript**: Enabled all strict compiler options for type safety
- **ESLint + Prettier**: Enforced code style and formatting
- **Git Hooks**: Pre-commit hooks run linters and formatters automatically
- **Conventional Structure**: Clear separation of concerns with organized directory structure

### Performance

- **Next.js App Router**: Leverages React Server Components for optimal performance
- **SCSS**: Compiled CSS for faster runtime performance vs CSS-in-JS

## License

Private - Assessment Project

## Contact

For questions regarding this assessment, contact: careers@lendsqr.com
