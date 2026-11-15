package lk.nexora.model;
import jakarta.persistence.*;
@Entity @Table(name="students") public class Student {
 @Id public Long id;
 @Column(nullable=false) public String name;
 protected Student(){}
 public Student(Long id,String name){this.id=id;this.name=name;}
}
