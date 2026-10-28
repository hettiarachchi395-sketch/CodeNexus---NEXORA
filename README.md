# NEXORA — Guest + Student Portal (React + Tailwind CSS)

A runnable frontend inspired by the NEXORA university-viva Figma prototype. It is **not** a pixel-perfect automated export of the entire Figma file; it recreates the recognizable visual language and key guest/student user flows as editable React components.

## Run locally

Requirements: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Open the URL printed by Vite (normally `http://localhost:5173`).

To create a production bundle:

```bash
npm run build
npm run preview
```

## Demo access

1. Open Guest Course Catalogue (no login required).
2. Click **Enroll Now**, complete the Student registration (use **dummy credentials only**).
3. Student portal contains courses, assignments, quizzes, XP rankings, live classroom mockup, recordings playlist, code studio, circuit checker, recommendations, reviews, hardware kits, checkout and tracking.
4. Use **Logout** in the student sidebar to return to the public welcome page.

## Implemented vs simulated

**Live frontend logic:** React routing, responsive sidebar, guest catalogue search/filter, registration form validation, mock sign-in/out, quiz auto-scoring, course-wise leaderboard pages, 100%-complete review eligibility, assignments with local draft and submission state, fake order confirmation/tracking search, local chat messages, local code editor text changes, basic rule-based circuit checking.

**Simulated only:** password/authentication security, backend persistence (demo uses browser localStorage), file upload storage, Python/C++ compilation, Blockly execution, accurate circuit simulation, WebRTC and live chat, playback of real lesson recordings, payment gateway, courier/vendor updates, automated XP persistence/real multiuser ranking.

**Security:** Do not enter real passwords or payment details. This is an educational UI demo, not a deployed service. Real access control, storage, payments and video need server/API integrations.

## Project structure

- `src/App.jsx` – pages, demo data, interactive UI flows and routes
- `src/index.css` – Tailwind classes and NEXORA design primitives
- `src/main.jsx` – React entrypoint
- `tailwind.config.js` – theme configuration

## Source reference

NEXORA Figma prototype: https://www.figma.com/design/7Zekz5yALMzEJ2nJK4JT49

The interface includes placeholder images from Unsplash. They require network access when viewing the website and may not match original Figma assets exactly.
