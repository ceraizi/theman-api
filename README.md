# THEMAN API - Task Management System

A robust and scalable RESTful API built with Node.js, TypeScript, and Express. This project was developed as a deep-dive into modern backend architecture, focusing on type safety, clean code principles, and professional error handling.


## Project Purpose

This is a dedicated learning project designed to master the transition from Backend-as-a-Service (like Supabase) to building a custom, professional-grade server from scratch. The main goal was to implement a complete **CRUD** (Create, Read, Update, Delete) system while following industry-standard design patterns.

## Key Features & Learning Milestones

* **MVC Lite Architecture**: Organized folder structure separating concerns into Routes, Controllers, Models, and Middlewares.
* **Database Persistence**: Integrated with PostgreSQL (hosted on Supabase) using **Prisma ORM** for type-safe database queries.
* **Data Validation**: Strict input validation using Zod, preventing "dirty data" from entering the system.
* **Custom Middleware**: Implemented a reusable validation middleware to keep controllers clean and focused on business logic.
* **Global Error Handling**: A centralized system to catch and format errors (`AppError`), ensuring consistent API responses and removing the need for redundant `try/catch` blocks.
* **Advanced Querying**: Support for filtering tasks via Query Parameters (e.g., searching by completion status).

## Tech Stack

| Component | Technology |
| --- | --- |
| **Runtime** | Node.js |
| **Language** | TypeScript |
| **Framework** | Express.js |
| **ORM** | Prisma |
| **Database** | PostgreSQL (via Supabase) |
| **Validation** | Zod |
| **Development** | ts-node-dev |

## Getting Started

### 1. Prerequisites

* Node.js
* A PostgreSQL database instance (or a Supabase project)

### 2. Installation

Clone the repository and install the dependencies:

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory and add your database connection string:

```env
PORT=3000
DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres"
```

### 4. Database Migration & Generation

Run the Prisma migrations to create the database tables and generate the client:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Running the API

Start the server in development mode:

```bash
npm run dev
```

The API will be available at `http://localhost:3000`.

---

## API Endpoints

| Method | Endpoint | Description | Query Params |
| --- | --- | --- | --- |
| `GET` | `/tasks` | Get all tasks | `completed=true/false` |
| `POST` | `/tasks` | Create a new task | - |
| `PUT` | `/tasks/:id` | Update a task | - |
| `DELETE` | `/tasks/:id` | Delete a task | - |

---

## Architecture Overview

The project follows a linear and predictable data flow to ensure maintainability and security:

1. **Route**: Receives the incoming request.
2. **Middleware (Zod)**: Validates that the `req.body` matches the required schema before reaching the logic.
3. **Controller**: Handles the business logic (wrapped in `catchAsync` to automate error propagation).
4. **Prisma**: Communicates with the PostgreSQL database using a singleton instance.
5. **Global Error Handler**: If any step fails, this central middleware catches the error, formats it, and sends a standardized JSON response.