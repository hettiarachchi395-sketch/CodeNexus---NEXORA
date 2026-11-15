package lk.nexora.repo;
import lk.nexora.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
public interface CourseRepo extends JpaRepository<Course,String>{}
