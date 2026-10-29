# Integrating into the existing NEXORA LMS

This repo is a standalone feature implementation with a demo authentication system and a demo database. Do **not** replace the existing NEXORA student login, course enrollment, or quiz tables without mapping them first.

## Recommended integration points

1. `frontend/src/App.jsx`: extract `Hub`, `Board`, and `Quiz` into your NEXORA React routes or components. Apply the site's shared layout/sidebar in place of the standalone sidebar if your team has already implemented it.
2. `backend/src/server.js`: mount course leaderboard and quiz routes under the team's existing Express app, replacing the demo `mustAuth` middleware with the main NEXORA login middleware.
3. `req.studentId`: populate **only from a verified auth session or access token**. Never accept it from the frontend JSON request.
4. `courses`, `students`, `enrollments` tables: map to the team's canonical database tables. If they use UUID keys, update types and joins accordingly. Avoid duplicate students/enrollments.
5. `quiz_attempts`, `attempt_answers`, `xp_ledger`: retain or adapt as separate feature-owned tables. Preserve unique `(student_id,quiz_id)` and `quiz_attempt_id` constraints.
6. Each quiz should have an immutable answer key when an attempt is recorded; editing question keys later must not retroactively recalculate historical XP.
7. If the team's quiz module already grades answers, use its trusted grading result and update the leaderboard XP in the **same** transaction or via a reliable idempotent event consumer. Avoid two independent XP writers.
8. The team's deployment should use migration scripts, not this demo `db:setup` script.

## UI reference mapping

- Figma node `42:105` Course Leaderboards Hub → React `Hub`
- Figma node `42:154` Robotics & Arduino course leaderboard → React `Board` (dynamic for all six courses)
- Figma node `42:191` Python Programming leaderboard → React `Board` with Python course ID
- Similar Figma nodes `42:228`, `42:265`, `42:302`, `42:339` → same reusable `Board`

This preserves the course card / course ranking visual structure and functional navigation. The sign-in form and quiz screen are extensions built for a working vertical slice, not copied from the Figma leaderboard screens.
