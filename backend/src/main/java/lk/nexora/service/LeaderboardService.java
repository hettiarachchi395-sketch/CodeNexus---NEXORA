package lk.nexora.service;

import lk.nexora.model.*;
import lk.nexora.repo.*;
import java.util.*;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LeaderboardService {

    private final StudentRepo students;
    private final CourseRepo courses;
    private final XpAwardRepo awards;

    public LeaderboardService(StudentRepo students, CourseRepo courses, XpAwardRepo awards) {
        this.students = students;
        this.courses = courses;
        this.awards = awards;
    }

    public record Rank(Long studentId, String name, long xp, int rank, boolean isMe) {
    }

    public record CourseLeaderboard(
            String courseId,
            String courseName,
            long myXp,
            Integer myRank,
            List<Rank> rankings
    ) {
    }

    public record CourseSummary(String id, String name, long myXp) {
    }

    public record QuizResult(
            String attemptId,
            String courseId,
            Long studentId,
            int correctAnswers,
            int totalQuestions
    ) {
    }

    public record AwardResponse(boolean duplicate, int xpAwarded) {
    }

    @Transactional(readOnly = true)
    public CourseLeaderboard get(String courseId, long viewer) {
        Course course = courses.findById(courseId)
                .orElseThrow(() -> new NoSuchElementException("Unknown course"));

        Map<Long, Long> totals = new HashMap<>();
        for (var total : awards.totals(courseId)) {
            totals.put(total.getStudentId(), total.getXp());
        }

        List<Student> list = students.findAll();
        list.sort(
                Comparator.<Student>comparingLong(student -> totals.getOrDefault(student.id, 0L))
                        .reversed()
                        .thenComparing(student -> student.id)
        );

        List<Rank> ranks = new ArrayList<>();
        int position = 0;
        long lastXp = -1;
        int actualRank = 0;
        long myXp = 0;
        Integer myRank = null;

        for (Student student : list) {
            position++;
            long xp = totals.getOrDefault(student.id, 0L);

            if (xp != lastXp) {
                actualRank = position;
                lastXp = xp;
            }

            boolean isMe = student.id == viewer;
            if (isMe) {
                myRank = actualRank;
                myXp = xp;
            }

            ranks.add(new Rank(student.id, student.name, xp, actualRank, isMe));
        }

        return new CourseLeaderboard(course.id, course.name, myXp, myRank, ranks);
    }

    @Transactional(readOnly = true)
    public List<CourseSummary> summaries(long viewer) {
        return courses.findAll().stream()
                .sorted(Comparator.comparing(course ->
                        List.of("robotics", "python", "circuits", "cpp", "iot", "blockly")
                                .indexOf(course.id)))
                .map(course -> new CourseSummary(course.id, course.name, get(course.id, viewer).myXp()))
                .toList();
    }

    // Member 4 should call this trusted service after grading server-side;
    // do not accept answers from public clients in production.
    @Transactional
    public AwardResponse record(QuizResult result) {
        if (result.attemptId() == null
                || result.attemptId().isBlank()
                || result.attemptId().length() > 120
                || result.studentId() == null
                || result.correctAnswers() < 0
                || result.totalQuestions() < 1
                || result.correctAnswers() > result.totalQuestions()) {
            throw new IllegalArgumentException("Invalid evaluated quiz result");
        }

        if (!courses.existsById(result.courseId()) || !students.existsById(result.studentId())) {
            throw new NoSuchElementException("Unknown course/student");
        }

        if (awards.existsByAttemptId(result.attemptId())) {
            return new AwardResponse(true, 0);
        }

        // The database unique constraint is the final duplicate protection against concurrent requests.
        awards.saveAndFlush(new XpAward(
                result.attemptId(),
                result.courseId(),
                result.studentId(),
                result.correctAnswers(),
                result.correctAnswers() * 10
        ));

        return new AwardResponse(false, result.correctAnswers() * 10);
    }
}
