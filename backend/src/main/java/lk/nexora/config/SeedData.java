package lk.nexora.config;
import lk.nexora.model.*;
import lk.nexora.repo.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.*;
import java.util.*;
@Configuration @Profile("demo") public class SeedData {
 @Bean CommandLineRunner seed(StudentRepo students,CourseRepo courses,XpAwardRepo awards){return args->{
  List<Student> learners=List.of(new Student(1L,"Sara Perera"),new Student(2L,"Nimal Silva"),new Student(3L,"Ishani Fernando"),new Student(4L,"Alex Fernando"),new Student(5L,"Ayesha Fernando"));
  List<Course> catalog=List.of(new Course("robotics","Robotics & Arduino"),new Course("python","Python Programming"),new Course("circuits","Circuit Design"),new Course("cpp","C++ Foundations"),new Course("iot","Smart IoT & Sensors"),new Course("blockly","Creative Blockly"));
  learners.forEach(s->{if(!students.existsById(s.id))students.save(s);});catalog.forEach(c->{if(!courses.existsById(c.id))courses.save(c);});
  int[][] xp={{150,130,90,70,50},{140,110,80,60,40},{120,110,100,50,20},{110,90,70,40,30},{100,90,60,30,20},{80,70,60,20,10}};
  for(int i=0;i<catalog.size();i++)for(int j=0;j<learners.size();j++){String id="seed-"+catalog.get(i).id+"-"+learners.get(j).id;if(!awards.existsByAttemptId(id))awards.save(new XpAward(id,catalog.get(i).id,learners.get(j).id,xp[i][j]/10,xp[i][j]));}
 };}
}
