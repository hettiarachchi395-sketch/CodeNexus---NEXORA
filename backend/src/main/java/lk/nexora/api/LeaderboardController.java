package lk.nexora.api;
import lk.nexora.service.LeaderboardService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;
import java.util.*;
@RestController @RequestMapping("/api/leaderboards") public class LeaderboardController {
 private final LeaderboardService service; public LeaderboardController(LeaderboardService service){this.service=service;}
 @GetMapping("/courses") public Object courses(@RequestParam(defaultValue="4") long studentId){return service.summaries(studentId);}
 @GetMapping("/{courseId}") public Object course(@PathVariable String courseId,@RequestParam(defaultValue="4") long studentId){return service.get(courseId,studentId);}
 @ExceptionHandler(NoSuchElementException.class) public ResponseEntity<?> notFound(Exception e){return ResponseEntity.status(404).body(Map.of("error",e.getMessage()));}
}
