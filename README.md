# Employee Shift Board

A full-stack Mini HR Utility for managing employee shifts.

## Tech Stack

- **Backend**: Node.js, Express, SQLite, Sequelize
- **Frontend**: React, Vite, TailwindCSS

## Setup Instructions

### Prerequisites

- Node.js installed

### 1. Backend Setup

The backend runs on port `5001`.

1. Open a terminal and navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Seed the database (creates Admin and User accounts):
   ```bash
   node seed.js
   ```
4. Start the server:
   ```bash
   npm start
   ```

### 2. Frontend Setup

The frontend runs on port `5173`.

1. Open a **new** terminal and navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

- Open your browser and go to `http://localhost:5173`.
- **Admin Login**:
  - Email: `hire-me@anshumat.org`
  - Password: `HireMe@2025!`
- **User Login**:
  - Email: `user@example.com`
  - Password: `HireMe@2025!`

## API Documentation

- `POST /api/login`: Login user.
- `GET /api/employees`: Get all employees (Authenticated).
- `POST /api/shifts`: Create a shift (Admin only).
- `GET /api/shifts`: Get shifts (Admin sees all, User sees own).
