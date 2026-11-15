package lk.nexora.repo;
import lk.nexora.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
public interface StudentRepo extends JpaRepository<Student,Long>{}
