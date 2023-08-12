# Short URL

This is a simple URL shortener project built as a part of the John Crickett's Coding Challenges [codingchallenges.fyi](https://codingchallenges.fyi/challenges/challenge-url-shortener).

## Table of Contents

- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Testing](#testing)
- [Deployment](#deployment)
- [Extra commands](#extra-commands)

## Tech Stack

[Next.js](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/), [React MUI](https://mui.com/), [Tailwind CSS](https://tailwindcss.com/), [Cypress](https://www.cypress.io/) and [MongoDB](https://www.mongodb.com/)

## Installation

```bash
# To install dependencies
npm ci

# To install and setup husky
npm husky install
```

## Getting Started

Before starting the server make sure you have a `.env.local` file in the root directory with the same template as mentioned in `.env.template` file.

```bash
# Prisma migration
npm run prisma-dev-push

# To start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

Before starting the test, make sure you have a `cypress.env.json` file in the root directory with the same template as mentioned in `cypress.env.template.json` file.

```bash
# To use the Cypress GUI
npm run test

# To run Cypress in headless mode
npm run test:headless
```

## Deployment

```bash
# Build the optimized production build
npm run build

# Start the production server
npm run start
```

## Extra commands

```bash
# To lint the code
npm run lint

# To check formatting using Prettier
npm run check-format

# To format the code using Prettier
npm run format
```
