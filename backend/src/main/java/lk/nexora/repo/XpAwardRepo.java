package lk.nexora.repo;
import lk.nexora.model.XpAward;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.*;
public interface XpAwardRepo extends JpaRepository<XpAward,Long>{
 boolean existsByAttemptId(String attemptId);
 @Query("select a.studentId as studentId, coalesce(sum(a.xp),0) as xp from XpAward a where a.courseId=:course group by a.studentId")
 List<CourseTotal> totals(@Param("course") String course);
 interface CourseTotal { Long getStudentId(); Long getXp(); }
}
