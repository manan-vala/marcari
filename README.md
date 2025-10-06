# Marcari

An open-source fullstack marketplace web app where users can buy and sell items. "marcari" is built with a Node/Express + MongoDB backend and a React + Vite + TypeScript frontend styled with Tailwind/Shadcn components.

---

## Table of contents

* [Project overview](#project-overview)
* [Features](#features)
* [Tech stack](#tech-stack)
* [Repository structure](#repository-structure)
* [Quickstart (local development)](#quickstart-local-development)

  * [Prerequisites](#prerequisites)
  * [Backend setup](#backend-setup)
  * [Frontend setup](#frontend-setup)
* [Environment variables](#environment-variables)
* [API reference (summary)](#api-reference-summary)
* [Data seeding / init scripts](#data-seeding--init-scripts)
* [Authentication & security notes](#authentication--security-notes)
* [Future improvements / TODOs](#future-improvements--todos)
* [License](#license)

---

## Project overview

`marcari` is a marketplace application intended to let users register, list products for sale, edit/delete their listings, and browse or view product details. It is split into two main parts:

* `backend/` — Express server, MongoDB (Mongoose) models, authentication with Passport.js (local strategy), and REST API endpoints.
* `frontend/` — React + TypeScript single-page app built with Vite and Tailwind (shadcn components) providing the UI for browsing and managing products.

This README documents how to run the app locally and explains the API surface.

---

## Features

* User registration and login (Passport local + bcrypt hashed passwords)
* Session-based authentication (express-session)
* CRUD operations for products (create, read, update, delete)
* CORS configured to allow the frontend dev server
* Starter UI components (product cards, create/edit forms, product details, auth pages)

---

## Tech stack

* Backend: Node.js, Express, Mongoose, MongoDB
* Auth: passport, passport-local, bcryptjs
* Middleware: express-session, cookie-parser, cors, method-override
* Frontend: React, TypeScript, Vite, Tailwind CSS, shadcn/ui

---

## Repository structure

```
marcari/
├── backend/
│   ├── app.js
│   ├── package.json
│   ├── config/passport.js
│   ├── init/data.js
│   ├── init/index.js
│   ├── models/product.js
│   ├── models/user.js
│   └── public/ (static css/js)
└── frontend/
    ├── package.json
    ├── vite.config.ts
    └── src/
        ├── main.tsx
        ├── App.tsx
        ├── main-components/ (Products, CreateForm, ProductDetails, etc.)
        └── components/ (ui and form components)
```

---

## Quickstart (local development)

### Prerequisites

* Node.js (v16+ recommended) and npm/yarn
* MongoDB running locally (or a MongoDB Atlas URI)

### Backend setup

1. Open a terminal and navigate to `backend/`:

```bash
cd backend
npm install
```

2. (Optional) Add environment variables (see below) or create a `.env` file. The default code uses `mongodb://127.0.0.1:27017/marcari` and port `3000` if no env variables are provided.

3. Start the server:

```bash
# dev with nodemon (if you add it)
npm run dev
# or
node app.js
```

The backend listens on **port 3000** by default (`http://localhost:3000`). The API base path in the code is `http://localhost:3000/api`.

### Frontend setup

1. In a new terminal, navigate to `frontend/`:

```bash
cd frontend
npm install
npm run dev
```

2. Vite dev server usually runs on **port 5173** (`http://localhost:5173`). The backend CORS is configured to allow requests from `http://localhost:5173` in `app.js`.

---

## Environment variables

Add these to your environment or `.env` file (recommended for production / flexibility):

* `PORT` — port for backend server (default 3000)
* `MONGODB_URI` — MongoDB connection string (default `mongodb://127.0.0.1:27017/marcari` in code)
* `SESSION_SECRET` — secret string for express-session (do not commit)
* `FRONTEND_URL` — allowed origin for CORS (e.g., `http://localhost:5173`)

> Note: The repository currently contains hard-coded values in `app.js` (session secret and Mongo URI). Replace them with env variables before deploying.

---

## API reference (summary)

Base URL: `http://localhost:3000/api`

### Products

* `GET /products` — list all products
* `GET /products/:id` — get a single product by id
* `POST /products` — create a new product

  * Body: JSON with product fields (see `models/product.js`) e.g. `{ title, description, price, category, image, owner }`
* `PUT /products/:id` — update product by id
* `DELETE /products/:id` — delete product by id

### Users / Auth

* `POST /users/register` — register a new user

  * Body: `{ email, password }` — registers, hashes the password, creates user and logs them in
* `POST /users/login` — login (uses passport local strategy). The server creates a session cookie.
* `POST /users/logout` — logout (destroys session)
* `GET /users/me` — get current authenticated user (requires session)

### Example curl commands

```bash
# register
curl -X POST http://localhost:3000/api/users/register \
  -H 'Content-Type: application/json' \
  -d '{"email":"alice@example.com","password":"password123"}' \
  -c cookies.txt

# login
curl -X POST http://localhost:3000/api/users/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"alice@example.com","password":"password123"}' \
  -c cookies.txt -b cookies.txt

# list products
curl http://localhost:3000/api/products

# create product (authenticated — send cookies)
curl -X POST http://localhost:3000/api/products \
  -H 'Content-Type: application/json' \
  -d '{"title":"Vintage Lamp","description":"Nice lamp","price":1200}' \
  -b cookies.txt
```

---

## Data seeding / init scripts

The project includes `backend/init/data.js` and `backend/init/index.js` for initial data seeding or sample data. Run these scripts manually or wire them into an npm script to populate the DB with sample products/users.

---

## Authentication & security notes

* Passwords are hashed using `bcryptjs` before saving.
* Sessions are stored server-side using `express-session` and client receives a cookie. For production:

  * Use a persistent session store (Redis, MongoStore) instead of default memory store.
  * Set `cookie.secure = true` and serve over HTTPS.
  * Use a strong `SESSION_SECRET` from env variables.
  * Add rate-limiting, input validation, and helmet for security headers.

---

## License

This project is released under the **MIT License**. See `LICENSE` for full text.

---

## Contact

Author: Manan Vala