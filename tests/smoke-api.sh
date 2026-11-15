#!/usr/bin/env bash
set -euo pipefail
BASE=${BASE:-http://localhost:8080}
echo 'Courses:'; curl -fsS "$BASE/api/leaderboards/courses?studentId=4"; echo
echo 'Robotics:'; curl -fsS "$BASE/api/leaderboards/robotics?studentId=4"; echo
ID="smoke-$(date +%s)-$$"
BODY="{\"attemptId\":\"$ID\",\"courseId\":\"robotics\",\"studentId\":4,\"correctAnswers\":4,\"totalQuestions\":5}"
echo 'First award should grant 40 XP:'; curl -fsS -H 'Content-Type: application/json' -d "$BODY" "$BASE/api/demo/quiz-results"; echo
echo 'Retry must grant 0 XP:'; curl -fsS -H 'Content-Type: application/json' -d "$BODY" "$BASE/api/demo/quiz-results"; echo
