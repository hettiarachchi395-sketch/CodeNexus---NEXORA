package lk.nexora.model;
import jakarta.persistence.*;
import java.time.Instant;
@Entity @Table(name="xp_awards",uniqueConstraints=@UniqueConstraint(name="uq_quiz_attempt",columnNames="attempt_id"),indexes=@Index(name="idx_course_student",columnList="course_id,student_id"))
public class XpAward {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id;
 @Column(name="attempt_id",nullable=false,updatable=false,length=120) public String attemptId;
 @Column(name="course_id",nullable=false,updatable=false) public String courseId;
 @Column(name="student_id",nullable=false,updatable=false) public Long studentId;
 @Column(name="correct_answers",nullable=false,updatable=false) public int correctAnswers;
 @Column(name="xp",nullable=false,updatable=false) public int xp;
 @Column(name="created_at",nullable=false,updatable=false) public Instant createdAt=Instant.now();
 protected XpAward(){}
 public XpAward(String attemptId,String courseId,Long studentId,int correctAnswers,int xp){this.attemptId=attemptId;this.courseId=courseId;this.studentId=studentId;this.correctAnswers=correctAnswers;this.xp=xp;}
}
