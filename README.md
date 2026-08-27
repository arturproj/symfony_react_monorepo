# Symfony React Monorepo

Full-stack web application integrating a **Symfony** backend with a **React.js (TypeScript)** frontend, organized as a single **monorepo**.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running in Development](#running-in-development)
- [Production Build](#production-build)
- [Project Structure](#project-structure)
- [License](#license)

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Symfony `>=8.1.*` |
| Frontend | React.js + TypeScript |
| Frontend/Backend Integration | Symfony UX Stimulus (React components mounted via Stimulus controllers, not a separate SPA) |
| Asset Bundler | Webpack Encore |
| PHP Package Manager | Composer |
| JS Package Manager | `npm` |

## Architecture

The project follows a **monorepo** approach: backend and frontend live in the same repository, without a split into two separate applications.

React does not run as a standalone Single Page Application, but is **integrated via Stimulus**: React components are mounted onto DOM elements rendered by Symfony (Twig), following the pattern promoted by Symfony UX.

```
┌─────────────────────────────┐
│         Browser             │
│  Twig template + Stimulus   │
│  controller → mounts React  │
└───────────────┬─────────────┘
                │
┌───────────────▼───────────────┐
│      Symfony (backend)        │
│  Routing / Controller / API   │
│  Doctrine / Business logic    │
└───────────────────────────────┘
```

`[TO BE COMPLETED: add a more detailed diagram if the backend also exposes a separate REST/GraphQL API]`

## Prerequisites

- PHP `>=8.4`
- Composer `2.10.*`
- Node.js `v24.12.*`
- NPM `11.6.*`
- Symfony CLI (optional but recommended)

## Installation

```bash
# Clone the repository
git clone https://github.com/arturproj/symfony_react_monorepo.git
cd symfony_react_monorepo

# Install PHP dependencies
composer install

# Install JavaScript dependencies
npm install
```

## Running in Development

```bash
# Start the Symfony server
symfony serve
# or
php -S localhost:8000 -t public/

# In a second terminal, start Webpack Encore in watch mode
npm run watch
```

## Production Build

```bash
npm run build
php bin/console cache:clear --env=prod
```

## Project Structure

```
symfony_react_demo/
├── assets/
│   ├── controllers/       # Stimulus controllers (mount the React components)
│   ├── react/              # React components (TypeScript)
│   └── styles/
├── config/                 # Symfony configuration
├── migrations/              # Doctrine migrations
├── public/                  # Document root
├── src/
│   ├── Controller/
│   ├── Entity/
│   └── Repository/
├── templates/                # Twig templates
├── webpack.config.js
├── composer.json
└── package.json
```

## License

`MIT`
