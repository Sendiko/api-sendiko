# Express API with TypeScript, Sequelize, and MySQL

This is a robust backend API built with Express, TypeScript, Sequelize, and MySQL. It serves as the backend for a portfolio application, managing authentication, tech stacks, experiences, projects, and contact messages.

## 🚀 Features

-   **Authentication**: Secure user sign-in using JWT.
-   **Tech Stack Management**: CRUD operations for managing technology stacks with icon uploads.
-   **Experience Management**: Manage professional experiences.
-   **Project Management**: Showcase projects with details.
-   **Contact Me**: Handle contact form submissions.
-   **Role-Based Access Control**: Authorization middleware to protect routes.
-   **File Uploads**: Integrated Multer for handling file uploads (e.g., icons).
-   **Validation**: Request validation using Zod/Yup (implied by dependencies).
-   **Logging**: Structured logging with Pino.
-   **Security**: Helmet for security headers, rate limiting, and CORS configuration.

## 🛠️ Tech Stack

-   **Runtime**: Node.js
-   **Language**: TypeScript
-   **Framework**: Express.js
-   **Database**: MySQL
-   **ORM**: Sequelize (with `sequelize-typescript`)
-   **Authentication**: JSON Web Tokens (JWT), Argon2 for hashing
-   **File Handling**: Multer
-   **Logging**: Pino
-   **Utilities**: Lodash, date-fns, uuid

## 📋 Prerequisites

Before you begin, ensure you have met the following requirements:

-   **Node.js**: >= 20.x
-   **MySQL**: Installed and running

## ⚡ Getting Started

Follow these steps to get the project up and running on your local machine.

### 1. Clone the repository

```bash
git clone https://github.com/NRestFzn/portofolio-sendiko-be.git
cd portofolio-sendiko-be
```

### 2. Set up environment variables

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Open `.env` and update the database credentials and other settings.

To generate a JWT secret key, you can run:

```bash
npm run generate:secret
```

### 3. Install dependencies

```bash
npm install
```

### 4. Set up the database

Create the database and seed it with initial data:

```bash
npm run db:create && npm run db:reset
```

Or run individual commands:

```bash
npm run db:create
npm run db:migrate
npm run db:seed
```

### 5. Start the server

**Development Mode (with file watching):**

```bash
npm run watch:dev
```

**Production Build & Start:**

```bash
npm run build
npm start
```

## 📜 Scripts

-   `npm run generate:secret`: Generates a random secret key for JWT.
-   `npm run build`: Builds the TypeScript project to JavaScript in `dist/`.
-   `npm start`: Starts the production server from `dist/main.js`.
-   `npm run watch:dev`: Starts the development server with hot reloading.
-   `npm run db:create`: Creates the database.
-   `npm run db:drop`: Drops the database.
-   `npm run db:migrate`: Runs pending migrations.
-   `npm run db:reset`: Resets the database (drop, create, migrate, seed).

## 📚 API Documentation

### Base URL
`http://localhost:3000/v1` (default)

### Authentication
-   **POST** `/auth/signin`: Sign in a user.

### Tech Stack
-   **GET** `/techstack`: Get all tech stacks.
-   **GET** `/techstack/:id`: Get a specific tech stack.
-   **POST** `/techstack`: Create a new tech stack (requires auth, file upload).
-   **PUT** `/techstack/:id`: Update a tech stack (requires auth, file upload).
-   **DELETE** `/techstack/:id`: Delete a tech stack (requires auth).

### Experience
-   **GET** `/experience`: Get all experiences.
-   **GET** `/experience/:id`: Get a specific experience.
-   **POST** `/experience`: Add a new experience (requires auth).
-   **PUT** `/experience/:id`: Update an experience (requires auth).
-   **DELETE** `/experience/:id`: Delete an experience (requires auth).

### Project
-   **GET** `/project`: Get all projects.
-   **GET** `/project/:id`: Get a specific project.
-   **POST** `/project`: Add a new project (requires auth).
-   **PUT** `/project/:id`: Update a project (requires auth).
-   **DELETE** `/project/:id`: Delete a project (requires auth).

### Contact Me
-   **POST** `/contactme`: Submit a contact message.
-   **GET** `/contactme`: Get all messages (requires auth).

## 📂 Project Structure

```
src/
├── config/         # Configuration files (DB, etc.)
├── controllers/    # Route controllers and services
├── database/       # Migrations, seeders, and models
├── helper/         # Utility helper functions
├── lib/            # Shared libraries and modules
├── middleware/     # Express middleware (Auth, Error handling)
├── routes/         # API route definitions
└── main.ts         # Application entry point
```

## 📄 License

This project is licensed under the ISC License.
