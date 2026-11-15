# NEXORA Member 5 — Course Leaderboard (React + Spring Boot + PostgreSQL)

## Run locally
1. Install Docker Desktop, Node 20+ and npm.
2. From the project root run `docker compose up --build -d` (PostgreSQL port 5432, Spring API port 8080). First Docker build downloads Maven dependencies.
3. In a separate terminal run `npm install`, then `npm run dev`.
4. Open the Vite URL (typically http://localhost:5173). Use demo student login (any username/password; this is UI-only legacy login) then **Course leaderboards** on sidebar.
5. Pick any of six courses. On course detail use **Submit graded quiz result** to award 10 XP per correct answer; repeat on same attempt to confirm no duplicate XP. **Create new attempt** to simulate the next quiz attempt. XP and ranking persist in PostgreSQL.

## API examples
- `GET http://localhost:8080/api/leaderboards/courses?studentId=4`
- `GET http://localhost:8080/api/leaderboards/robotics?studentId=4`
- `POST http://localhost:8080/api/demo/quiz-results` with JSON `{ "attemptId": "attempt-123", "courseId": "robotics", "studentId": 4, "correctAnswers": 4, "totalQuestions": 5 }`
- Same `attemptId` twice: `{ "duplicate": true, "xpAwarded": 0 }` on second request.

## Architecture / ownership
Member 4 evaluates answers on the server and produces an immutable quiz attempt ID and correct answer count. Member 5's `LeaderboardService.record(...)` grants XP = correctAnswers × 10, writes an XP award event, and computes independent per-course rankings with a database GROUP BY. `uq_quiz_attempt` prevents double awards. Read endpoints feed the React UI. React uses seeded read-only fallback if the API is unavailable; demo submission requires the backend.

## Important scope and security
This is a working integration **demo**, not production authorization. The existing frontend login accepts any credentials; `studentId=4` is hardcoded for the demo, and `/api/demo/quiz-results` is enabled only with `SPRING_PROFILES_ACTIVE=demo` (as in Docker Compose). **Never deploy with the demo profile or expose this demo endpoint publicly**. For production, use your team's JWT auth, derive student identity from the token (never a client `studentId`), require backend-to-backend quiz evaluation calls, verify enrollment and course/attempt ownership, and add transaction-safe handling for concurrent duplicate quiz submissions. Replace `ddl-auto:update` with schema migrations and add full controller/service integration tests. Avoid placing real secrets in Compose.

## Existing project retained
The initial NEXORA frontend pages, routes and styling remain; only leaderboard pages, a small quiz-result label, API adapter and backend infrastructure were added. The duplicate folder `CodeNexus---NEXORA` from the uploaded archive is not necessary to run the root app.
