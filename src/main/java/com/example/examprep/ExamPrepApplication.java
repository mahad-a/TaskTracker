package com.example.examprep;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ExamPrepApplication {

    public static void main(String[] args) {
        SpringApplication.run(ExamPrepApplication.class, args);
    }

    @Bean
    CommandLineRunner taskCommandLineRunner(TaskRepository taskRepository) {
        return args -> {
            Task task1 = new Task("Complete Homework", "Finish the math homework.");
            Task task2 = new Task("Grocery Shopping", "Buy vegetables and snacks.");
            Task task3 = new Task("Clean Room", "Organize the desk and wardrobe.");

            taskRepository.save(task1);
            taskRepository.save(task2);
            taskRepository.save(task3);
        };
    }

}
