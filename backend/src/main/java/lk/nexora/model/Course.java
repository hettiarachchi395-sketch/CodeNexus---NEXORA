package lk.nexora.model;
import jakarta.persistence.*;
@Entity @Table(name="courses") public class Course {
 @Id public String id;
 @Column(nullable=false) public String name;
 protected Course(){}
 public Course(String id,String name){this.id=id;this.name=name;}
}
