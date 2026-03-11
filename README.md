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

| Script                 | Description                                  |
| ---------------------- | -------------------------------------------- |
| `npm run dev`          | Start the development server with hot reload |
| `npm run build`        | Build the application for production         |
| `npm start`            | Run the production server                    |
| `npm run lint`         | Run ESLint to check for code quality issues  |
| `npm run format`       | Format all files with Prettier               |
| `npm run format:check` | Check if files are formatted correctly       |

## Project Structure

```
lendsqr-fe-test/
├── src/
│   ├── app/
│   │   ├── (auth)/           # Auth route group (login)
│   │   ├── (dashboard)/      # Dashboard route group (header + sidebar layout)
│   │   │   ├── dev/styles/   # Design system explorer page
│   │   │   ├── layout.tsx    # Dashboard shell layout
│   │   │   └── page.tsx      # Dashboard home
│   │   ├── layout.tsx        # Root layout (fonts + globals)
│   │   └── page.tsx          # Root redirect
│   ├── components/
│   │   ├── icons/            # SVG icon components
│   │   ├── layout/
│   │   │   ├── Header/       # Top navigation bar
│   │   │   └── Sidebar/      # Side navigation with grouped menu items
│   │   └── ui/
│   │       ├── Avatar/       # User avatar with image/fallback
│   │       ├── Button/       # Button with variants, sizes, loading
│   │       ├── Card/         # Content container with shadow
│   │       ├── Input/        # Form input with label, error, helper
│   │       └── Table/        # Data table with typed columns
│   ├── styles/
│   │   ├── globals.scss      # Global styles and CSS reset
│   │   ├── _variables.scss   # Design tokens (colors, spacing, typography)
│   │   └── _mixins.scss      # SCSS mixins and utilities
│   ├── lib/                  # Utility functions and helpers (TBD)
│   └── types/                # TypeScript type definitions (TBD)
├── public/                   # Static assets
└── ...config files
```

## Components

### Layout

| Component | Description                                                                                                 |
| --------- | ----------------------------------------------------------------------------------------------------------- |
| `Header`  | Fixed top bar with logo, search, notifications, and user menu. Hamburger toggle on mobile.                  |
| `Sidebar` | Navigation sidebar with grouped menu items (Customers, Businesses, Settings). Responsive overlay on mobile. |

### UI

| Component | Props                                                 | Description                                                                             |
| --------- | ----------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `Button`  | `variant`, `size`, `fullWidth`, `loading`, `disabled` | Supports primary, secondary, outline, ghost, danger variants and sm/md/lg sizes.        |
| `Input`   | `label`, `error`, `helperText` + native input attrs   | Form input with accessible labels, error states, and helper text.                       |
| `Card`    | `padding` (`none`, `sm`, `md`, `lg`)                  | Content container with border, shadow, and configurable padding.                        |
| `Avatar`  | `src`, `alt`, `size`, `fallback`                      | Displays user image or falls back to initials. Sizes: sm (32px), md (40px), lg (100px). |
| `Table`   | `columns`, `data`, `keyExtractor`, `onFilter`         | Generic typed table with column filter buttons and empty state.                         |

### Design System Explorer

Visit `/dev/styles` to see all color tokens, typography scale, spacing, and live component examples.

## Features

- [x] Responsive dashboard layout (header + sidebar + content)
- [x] Reusable component library (Button, Input, Card, Avatar, Table)
- [x] Design system explorer page
- [ ] Login page with form validation
- [ ] Dashboard with user statistics
- [ ] Users list with pagination, search, and filtering (500 records)
- [ ] User details page with local persistence (IndexedDB/localStorage)
- [ ] Unit and E2E tests

## Design

The application follows the design specifications from the [Figma design file](https://www.figma.com/file/ZKILoCoIoy1IESdBpq3GNC/Frontend).

## Live Demo

**URL**: TBD (will be deployed to Vercel/Netlify)

## Mock API

**Endpoint**: TBD (will host 500 user records)

## Testing

**Test suite**: TBD (Jest + React Testing Library + Playwright)

Run tests:

```bash
npm test
```

## Deployment

The application will be deployed to a cloud platform (Vercel/Netlify) with the URL pattern:

```
https://<candidate-name>-lendsqr-fe-test.<platform-domain>
```

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

## Contributing

This is a private assessment project. Contributions are not accepted.

## License

Private - Assessment Project

## Contact

For questions regarding this assessment, contact: careers@lendsqr.com
