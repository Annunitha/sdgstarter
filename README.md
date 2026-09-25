# SDG Hackathon Starter

A deliberately simple, modular starter project for an SDG-focused hackathon.

## Stack

- Web: HTML5, CSS3, vanilla JavaScript
- Backend: Node.js + Express
- Database: PostgreSQL
- Mobile: React Native
- Authentication: JWT + bcrypt
- API: REST/JSON
- Map: intentionally inactive placeholder so the problem statement can determine the final map provider and behavior

## Project structure

```text
sdg-hackathon-starter/
├── backend/       Express API + PostgreSQL schema
├── web/           Vanilla HTML/CSS/JavaScript frontend
├── mobile/        React Native Android application
└── README.md
```

## 1. Requirements

Install:

- Node.js 18+ (20+ recommended)
- PostgreSQL 14+
- Android Studio + Android SDK for React Native Android development
- JDK 17 for the current React Native Android toolchain

## 2. Backend setup

Open a terminal:

```bash
cd backend
npm install
```

Create a PostgreSQL database named `sdg_hackathon`.

Then run:

```bash
psql -U postgres -d sdg_hackathon -f database/schema.sql
psql -U postgres -d sdg_hackathon -f database/seed.sql
```

Copy the environment template:

```bash
copy .env.example .env
```

On macOS/Linux:

```bash
cp .env.example .env
```

Edit `.env`.

The important values are:

- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: a long random secret used to sign login tokens
- `PORT`: API port, normally 5000

Start the API:

```bash
npm run dev
```

The API should be available at:

```text
http://localhost:5000
```

Test:

```text
GET http://localhost:5000/api/health
```

## 3. Web setup

The web frontend is static. It can be served using any local static server.

From the project root:

```bash
cd web
npx serve .
```

Or use VS Code Live Server.

The web application expects the API at:

```text
http://localhost:5000/api
```

If you change the backend port, edit:

```text
web/js/api.js
```

## 4. Demo accounts

The seed file creates:

```text
Admin
email: admin@example.com
password: Admin@123

User
email: user@example.com
password: User@123
```

Change these before any real deployment.

## 5. React Native Android

The `mobile/` directory contains a minimal React Native project source.

Install dependencies:

```bash
cd mobile
npm install
```

Then, with an Android emulator or USB-connected device:

```bash
npx react-native run-android
```

### Android API address

When using an Android emulator, `localhost` refers to the emulator itself. Therefore the default mobile API URL is:

```text
http://10.0.2.2:5000/api
```

For a physical Android device, replace it with the LAN IP address of the computer running the backend, for example:

```text
http://192.168.1.10:5000/api
```

Edit:

```text
mobile/src/config.js
```

## 6. Authentication model

There are separate login pages/screens:

- User login
- Admin login

Both use the same backend authentication service. The backend verifies the role after login.

JWT tokens are stored locally for this starter. For a production application, use platform-appropriate secure storage and consider refresh-token rotation.

## 7. Map

The map is intentionally a placeholder.

The database already supports:

```text
name
description
category
latitude
longitude
status
```

This can later support:

- restaurants
- water sources
- hospitals
- schools
- shelters
- food distribution points
- public infrastructure
- climate/environment locations
- any other location-based SDG entity

A real map can be added later using a suitable provider/library.

## 8. SDG customization

The starter intentionally uses generic labels such as:

- Resources
- Locations
- Reports
- Alerts
- Categories

Replace those labels and database entities after receiving the exact problem statement.

Potential SDG mapping:

| SDG | Example module |
|---|---|
| 2 | food resources, nutrition, food distribution |
| 3 | health facilities, medical resources |
| 4 | schools, learning centers, educational resources |
| 6 | water sources, water quality, sanitation |
| 11 | urban services, public facilities, mobility |
| 13 | climate reports, environmental observations |

## 9. API endpoints

### Public

```text
GET  /api/health
POST /api/auth/register
POST /api/auth/login
POST /api/auth/admin-login
```

### Authenticated

```text
GET /api/auth/me
GET /api/locations
POST /api/locations
GET /api/notifications
GET /api/reports
POST /api/reports
```

### Admin

```text
GET    /api/admin/users
PATCH  /api/admin/users/:id/status
DELETE /api/admin/users/:id
```

## 10. Important deployment note

This is a hackathon starter, not a production security configuration.

Before deployment:

- Replace all sample credentials.
- Generate a strong `JWT_SECRET`.
- Use HTTPS.
- Restrict CORS to the actual frontend origins.
- Use secure HTTP-only cookies or secure token storage where appropriate.
- Add input validation and rate limiting.
- Use database migrations.
- Do not commit `.env`.
