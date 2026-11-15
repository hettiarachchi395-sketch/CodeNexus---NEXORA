package lk.nexora.api;
import lk.nexora.service.LeaderboardService;
import org.springframework.context.annotation.Profile;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;
import java.util.*;
@RestController @Profile("demo") @RequestMapping("/api/demo") public class DemoQuizController {
 private final LeaderboardService service;public DemoQuizController(LeaderboardService service){this.service=service;}
 @PostMapping("/quiz-results") public Object submit(@RequestBody LeaderboardService.QuizResult r){try{return service.record(r);}catch(IllegalArgumentException e){return ResponseEntity.badRequest().body(Map.of("error",e.getMessage()));}catch(NoSuchElementException e){return ResponseEntity.status(404).body(Map.of("error",e.getMessage()));}}
}
