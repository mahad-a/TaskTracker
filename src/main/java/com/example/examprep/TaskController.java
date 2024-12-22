package com.example.examprep;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Controller
@RequestMapping("/tasks")
public class TaskController {
    @Autowired
    private TaskRepository taskRepository;

    public TaskController(){

    }

    @GetMapping("/getTasks")
    public ResponseEntity<List<Task>> getTasks(){
        List<Task> tasks = taskRepository.findAll();
        return ResponseEntity.ok(tasks);
    }

    @PostMapping("/addTask")
    public ResponseEntity<String> addTask(@RequestBody Map<String, String> taskData){
        String title = taskData.get("title");
        String description = taskData.get("description");
        Task newTask = new Task(title, description);
        taskRepository.save(newTask);
        return ResponseEntity.ok("Added new task");
    }

    @PostMapping("/updateTask")
    public ResponseEntity<String> updateTask(@RequestBody Map<String, String> taskData){
        Long id = Long.valueOf(taskData.get("id"));
        String title = taskData.get("title");
        String description = taskData.get("description");
        Optional<Task> t = taskRepository.findById(id);
        if (t.isPresent()){
            t.get().setTitle(title);
            t.get().setDescription(description);
            taskRepository.save(t.get());
            return ResponseEntity.ok("Updated task");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Task not found");
        }

    }

    @DeleteMapping("/deleteTask")
    public ResponseEntity<String> deleteTask(@RequestParam Long taskID){
        Optional<Task> optionalTask = taskRepository.findById(taskID);
        if (optionalTask.isPresent()) {
            taskRepository.delete(optionalTask.get());
            return ResponseEntity.ok("Deleted task");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Task not found");
    }

    @PostMapping("/markTask")
    public ResponseEntity<String> markTaskCompleted(@RequestParam Long taskID){
        Optional<Task> optionalTask = taskRepository.findById(taskID);
        if (optionalTask.isPresent()) {
            Task task = optionalTask.get();
            task.setStatus(!task.isStatus());
            taskRepository.save(task);
            return ResponseEntity.ok("Updated status of task");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Task not found");
    }
}
