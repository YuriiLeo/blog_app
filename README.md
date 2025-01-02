## Overview

This is a full-stack blog application built with Next.js for the frontend and Express.js for the backend. The application uses TypeORM to interact with a PostgreSQL database and features modern web development tools and best practices.

## Table of Contents

- [Installation](#installation)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Installation

To set up the project, follow these steps:

1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   cd blog_app
   ```

2. **Install dependencies:**
   ```sh
   pnpm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root of the project and add the necessary environment variables. Refer to [Environment Variables](#environment-variables) for details.

## Scripts

The following scripts are available:

- `dev`: Starts the Next.js development server.
- `build`: Builds the Next.js application for production.
- `start`: Starts the Next.js application in production mode.
- `lint`: Lints the project files.
- `prettier`: Formats the project files using Prettier.
- `format`: Runs both lint and prettier.
- `commitlint`: Lints commit messages.
- `type:check`: Runs TypeScript type checking.
- `prepare`: Sets up Husky for Git hooks.
- `start-server`: Starts the Express.js server.
- `migration:run`: Runs TypeORM migrations.

To run a script, use:
```sh
pnpm run <script-name>
```

## Environment Variables

Create a `.env` file in the root of your project with the following variables:

```
NEXT_PUBLIC_DATABASE_HOST=
NEXT_PUBLIC_DATABASE_PORT=
NEXT_PUBLIC_DATABASE_USER=
NEXT_PUBLIC_DATABASE_PASSWORD=
NEXT_PUBLIC_DATABASE_NAME=
PORT=
NEXT_PUBLIC_API_URL=http://localhost:3002
```

Adjust these variables according to your environment setup.

## Database Setup

Ensure you have PostgreSQL installed and running. Create a database for the project and update the `DATABASE_URL` in your `.env` file accordingly.

To run the migrations and set up the database schema, use:

```sh
pnpm run migration:run
```

## Running the Application

### Development

To start the development server, run:

```sh
pnpm run start-server
```

This will start both the Next.js frontend and the Express.js backend.

### Production

To build and start the application in production mode, use:

```sh
pnpm run build
pnpm run start
```

## Technologies Used

- **Frontend:**
  - Next.js
  - React
  - TypeScript
  - Redux Toolkit
  - Styled-components
  - Material-UI

- **Backend:**
  - Express.js
  - TypeORM
  - PostgreSQL

- **Tools:**
  - Husky
  - Prettier
  - ESLint
  - Commitlint
  - PNPM

## Contributing

Contributions are welcome! Please follow the steps below to contribute:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Ensure all tests and linting pass.
5. Commit your changes and push to your fork.
6. Open a pull request.
