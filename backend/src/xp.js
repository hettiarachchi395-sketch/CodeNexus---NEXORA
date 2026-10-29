export const XP_PER_CORRECT_ANSWER = 10;
export function calculateXP(correctCount) {
  if (!Number.isSafeInteger(correctCount) || correctCount < 0) throw new Error('Invalid correct answer count');
  return correctCount * XP_PER_CORRECT_ANSWER;
}
export function evaluateAnswers(questions, answers) {
  if (!Array.isArray(answers) || answers.length !== questions.length) {
    throw Object.assign(new Error('Answer each quiz question before submitting'), { status: 400 });
  }
  const byQuestion = new Map();
  for (const a of answers) {
    if (!Number.isSafeInteger(a?.questionId) || !Number.isSafeInteger(a?.choiceId) || byQuestion.has(a.questionId)) {
      throw Object.assign(new Error('Invalid or duplicate question answer'), { status: 400 });
    }
    byQuestion.set(a.questionId, a.choiceId);
  }
  const results = questions.map(q => {
    const choiceId = byQuestion.get(q.id);
    const choice = q.choices.find(c => c.id === choiceId);
    if (!choice) throw Object.assign(new Error('An answer does not belong to the quiz'), { status: 400 });
    return { questionId: q.id, choiceId, correct: choice.isCorrect };
  });
  const correctCount = results.filter(r=>r.correct).length;
  return { results, correctCount, totalQuestions: questions.length, earnedXP:calculateXP(correctCount) };
}
