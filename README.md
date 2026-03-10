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
│   ├── app/              # Next.js app directory (pages & layouts)
│   ├── components/       # Reusable React components (TBD)
│   ├── styles/           # Global SCSS and design tokens
│   │   ├── globals.scss  # Global styles and CSS reset
│   │   ├── _variables.scss  # Design tokens (colors, spacing, typography)
│   │   └── _mixins.scss     # SCSS mixins and utilities
│   ├── lib/              # Utility functions and helpers (TBD)
│   └── types/            # TypeScript type definitions (TBD)
├── public/               # Static assets
└── ...config files
```

## Features (Planned)

- [ ] Login page with form validation
- [ ] Dashboard with user statistics
- [ ] Users list with pagination, search, and filtering (500 records)
- [ ] User details page with local persistence (IndexedDB/localStorage)
- [ ] Mobile-responsive design
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
