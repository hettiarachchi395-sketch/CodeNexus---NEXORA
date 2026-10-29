SELECT c.title,s.full_name,e.total_xp
FROM enrollments e JOIN courses c ON c.id=e.course_id JOIN students s ON s.id=e.student_id
ORDER BY c.id,e.total_xp DESC,s.id;
SELECT student_id,course_id,source,amount FROM xp_ledger ORDER BY id DESC LIMIT 15;
SELECT * FROM quiz_attempts ORDER BY submitted_at DESC LIMIT 15;
-- Check denormalized total against ledger: should return zero rows.
SELECT e.student_id,e.course_id,e.total_xp,COALESCE(sum(x.amount),0) AS ledger_xp
FROM enrollments e LEFT JOIN xp_ledger x ON x.student_id=e.student_id AND x.course_id=e.course_id
GROUP BY e.student_id,e.course_id,e.total_xp HAVING e.total_xp<>COALESCE(sum(x.amount),0);
