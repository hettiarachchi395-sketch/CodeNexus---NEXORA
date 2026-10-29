# NEXORA — Course-wise XP Leaderboards

**GitHub-ready independent feature module** following the NEXORA Figma `Course Leaderboards Hub` (node `42:105`) and `Leaderboard — Robotics & Arduino` (node `42:154`).

Figma reference: https://www.figma.com/design/7Zekz5yALMzEJ2nJK4JT49/NEXORA-%E2%80%94-Viva-High-Fidelity-Interactive-LMS-Prototype?node-id=42-105

## Features
- React + Tailwind visual adaptation: blue-white sidebar, six course cards, per-course ranking rows, my rank highlighted, course-specific XP.
- Working quiz pages, 5 questions per course. **+10 XP per correct answer, 0 for wrong**. No completion bonus or score-based bonus.
- PostgreSQL student/course/enrollment/quiz/answers/attempts/XP ledger tables.
- Authentication via httpOnly sameSite cookie + signed JWT. Passwords hashed with bcrypt. Demo students only.
- Backend checks correct choices; frontend never receives `is_correct` before grading.
- One rewarded attempt per (student, quiz); transactional row lock, uniqueness and ledger prevent double XP even under concurrent submissions.
- Existing course XP in Figma is imported as `historical_seed` so sample rankings appear immediately. New quiz attempts award precisely 10 XP per correct answer.
- Rate-limited sign-in, course enrollment access check, server-side parameterized SQL, bounded JSON body.
- 6 isolated per-course leaderboards; **no global XP ranking**.

## Requirements
- Node.js >=20.19 (22 LTS recommended), npm
- PostgreSQL 14+ and pgAdmin or psql
- VS Code

## 1. Create database

In pgAdmin: Databases → Create → Database → name `nexora_leaderboard`. Or run with psql:

```sql
CREATE DATABASE nexora_leaderboard;
```

## 2. Backend

```powershell
cd backend
Copy-Item .env.example .env
npm install
```

macOS/Linux: `cp .env.example .env`. Edit `backend/.env` to set your actual Postgres password in `DATABASE_URL` and a long unique `JWT_SECRET`. Example generate with `node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"`.

```powershell
npm run db:setup
npm run dev
```

`db:setup` is idempotent for seed students, courses, quizzes and seed XP; it **does not** delete new quiz submissions. It is strictly for local demo, not general production migrations.

Backend: http://localhost:4000/api/health → `{"status":"ok","database":"connected"}`.

## 3. Frontend

Open **another** terminal in project root:

```powershell
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

Demo account: **alex@nexora.demo / Demo1234!**. Also `sara@nexora.demo`, `nimal@nexora.demo`, `ishani@nexora.demo`, `ayesha@nexora.demo` with same demo password.

Course Leaderboards → Robotics & Arduino → Take course quiz → select 5 answers → Submit → earned XP and updated rank. Reload page and sign back in to verify persistence.

## Example REST APIs

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| GET | `/api/health` | None | DB health |
| POST | `/api/auth/login` | None | Student sign in |
| GET | `/api/auth/me` | Cookie | Student identity |
| POST | `/api/auth/logout` | Cookie | Student sign out |
| GET | `/api/courses` | Cookie | Enrolled courses + XP |
| GET | `/api/courses/:courseId/leaderboard` | Cookie | Course rankings |
| GET | `/api/courses/:courseId/quizzes` | Cookie | Quiz availability |
| GET | `/api/quizzes/:quizId` | Cookie | Questions WITHOUT answer keys |
| POST | `/api/quizzes/:quizId/submit` | Cookie | Mark, award XP, persist |

Submit example (send while signed in; IDs are from live GET response):

```json
{"answers":[{"questionId":1,"choiceId":1},{"questionId":2,"choiceId":5}]}
```

The real quiz has **5 questions**, so include exactly 5 valid choices. Missing, duplicate or cross-quiz choice IDs are rejected. Quiz retakes return `409` and award no extra XP.

## Tests

```powershell
cd backend
npm test
node --check src/server.js
```

For frontend: `cd frontend; npm run build`. For SQL diagnostics, run `database/verify.sql` in pgAdmin. Its last query should return **zero rows**.

## GitHub push

From repository root (do not commit `.env`):

```powershell
git init
git add .
git commit -m "feat: NEXORA Figma-matched course XP leaderboard"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/nexora-leaderboard.git
git push -u origin main
```

Create the empty GitHub repository before `git remote add`. If integrating into an existing NEXORA repo, **copy the frontend / backend / database modules into existing structure and commit on a feature branch** (`git switch -c feature/course-leaderboard`) rather than replacing the main repo.

## Architecture & integration into team NEXORA LMS

```
React student portal → /api/quizzes/:quizId/submit → server-side grading
  → PostgreSQL transaction (attempt, individual answers, XP ledger, enrollment XP)
  → GET /api/courses/:courseId/leaderboard → React leaderboard screen
```

`students` and `/api/auth/*` in this mini repo are demo-only integration scaffolding. In your team's actual application, map `req.studentId` to the verified student in the **existing auth middleware**, and map course IDs to existing courses. **Do not accept a student ID from the request body**. Keep the XP/attempt tables and transactional grading rules; never accept the earned XP from the frontend.

Other Figma sidebar module labels are visual placeholders; this is a **leaderboard feature package**, not an entire LMS. Wire those destinations to real team routes when integrating. No payment, instructor or parent workflows are included.

## Shipping checklist
- Remove demo accounts/data and replace with NEXORA auth, student verification and real enrollment rules.
- Move schema to team migration framework; never re-seed historical demo XP in production.
- Set a strong secret and HTTPS; configure `NODE_ENV=production`, `FRONTEND_ORIGIN` to actual deployed origin, and secure cookies.
- Add staging/integration tests with a real PostgreSQL instance and a CI database service for the final deployment.
- Add monitoring, backup/recovery, security review and accessibility/visual QA in target browser.

## Design fidelity
This implementation follows the exact **information architecture**, key typography sizes, spacing, navigation labels, primary colors (`#eef3ff`, `#5572f5`, `#4e67e9`, `#e5ebff`), course names and ranking row treatments from the Figma layers. Dynamic responses intentionally replace static prototype values. It is a responsive reimplementation rather than a copy of every absolute-positioned Figma layer. The additional quiz and sign-in screens are functional extensions to demonstrate the leaderboard engine.

## Optional Docker PostgreSQL

If you have Docker Desktop and port 5432 is free, from repository root run:

```powershell
docker compose up -d
```

Use `DATABASE_URL=postgresql://postgres:nexora_local_demo@localhost:5432/nexora_leaderboard` in `backend/.env`. **These are local demo credentials only.** If you already have a local PostgreSQL service on 5432, stop it first or use the existing database instead. Do not run `docker compose down -v` unless you mean to delete demo database data.

See [docs/INTEGRATION.md](docs/INTEGRATION.md) for adapting this standalone feature to your team's real NEXORA application.
