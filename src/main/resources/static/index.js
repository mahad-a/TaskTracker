$(document).ready(function () {
    function appendTasks(response) {
        $("#taskList").empty();

        response.forEach(function (task) {
            const taskItem = `
            <li class="task-item">
                <div class="task-details">
                    <strong>Task:</strong> ${task.title} <br>
                    <strong>Description:</strong> ${task.description} <br>
                    <strong>Status:</strong> ${task.status ? "Completed" : "Incomplete"} 
                    <button class="toggle-status" data-task-id="${task.id}" data-status="${task.status}">
                        ${task.status ? "Mark as Incomplete" : "Mark as Completed"}
                    </button>
                </div>
                <button class="update-task" data-task-id="${task.id}">
                    Update Task
                </button> <br>
                <button class="delete-task" data-task-id="${task.id}">
                    Delete Task
                </button>
            </li>`;
            $("#taskList").append(taskItem);
        });
    }

    function getAllTasks() {
        $.ajax({
            url: "/tasks/getTasks",
            type: "GET",
            success: function (response) {
                appendTasks(response);
            },
            error: function (xhr, status, error) {
                alert("Error fetching tasks!");
                console.error(error);
            }
        });
    }

    function toggleTaskStatus(taskId, currentStatus) {
        $.ajax({
            url: `/tasks/markTask?taskID=${taskId}`,
            type: "POST",
            data: JSON.stringify({ status: !currentStatus }),
            contentType: "application/json",
            success: function () {
                getAllTasks();
            },
            error: function (xhr, status, error) {
                alert("Error toggling task status!");
                console.error(error);
            }
        });
    }


    function deleteTask(taskId) {
        $.ajax({
            url: `/tasks/deleteTask?taskID=${taskId}`,
            type: "DELETE",
            success: function () {
                getAllTasks();
            },
            error: function (xhr, status, error) {
                alert("Error deleting task!");
                console.error(error);
            }
        });
    }

    function updateTask(taskId) {
        const title = prompt("Enter new task title:");
        if (!title) {
            alert("Task title is required.");
            return;
        }

        const description = prompt("Enter new task description:");
        if (!description) {
            alert("Task description is required.");
            return;
        }

        const taskData = { title: title, description: description, id: taskId };
        console.log("Sending task data:", taskData);
        $.ajax({
            url: "tasks/updateTask",
            data: JSON.stringify(taskData),
            contentType: "application/json",
            type: "POST",
            success: function () {
                alert("Successfully updated!")
                getAllTasks();
            },
            error: function (xhr, status, error) {
                alert("Error updating task!");
                console.error(error);
            }
        });
    }

    // Initial load of tasks
    getAllTasks();

    // Delegate toggle status button click
    $("#taskList").on("click", ".toggle-status", function () {
        const taskId = $(this).data("task-id");
        console.log(taskId)
        const currentStatus = $(this).data("status");
        toggleTaskStatus(taskId, currentStatus);
    });

    // Delegate delete button click
    $("#taskList").on("click", ".delete-task", function () {
        const taskId = $(this).data("task-id");
        console.log(taskId)
        deleteTask(taskId);
    });

    $("#taskList").on("click", ".update-task", function () {
        const taskId = $(this).data("task-id");
        console.log(taskId)
        updateTask(taskId);
    });

    $("#addTask").on("click", function () {
        const title = prompt("Enter task title:");
        if (!title) {
            alert("Task title is required.");
            return;
        }

        const description = prompt("Enter task description:");
        if (!description) {
            alert("Task description is required.");
            return;
        }

        const taskData = { title: title, description: description };
        console.log("Sending task data:", taskData);

        $.ajax({
            url: "/tasks/addTask",
            type: "POST",
            data: JSON.stringify(taskData),
            contentType: "application/json",
            success: function () {
                alert("Task added successfully!");
                getAllTasks();
            },
            error: function (xhr, status, error) {
                alert("Error adding task!");
                console.error(error);
            }
        });
    });

});
