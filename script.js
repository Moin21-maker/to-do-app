document.addEventListener('DOMContentLoaded', function() {
  loadTasks();
});

function addTask() {
  var taskInput = document.getElementById("taskInput");
  var taskList = document.getElementById("taskList");

  if (taskInput.value.trim() !== "") {
      var li = document.createElement("li");
      li.textContent = taskInput.value.trim();
      taskList.appendChild(li);
      taskInput.value = "";

      li.addEventListener("click", toggleTask);

      li.addEventListener("contextmenu", function(e) {
          e.preventDefault();
          removeTask(this);
      });

      saveTasks();
  } else {
      alert("Please enter a task.");
  }
}

function toggleTask() {
  this.classList.toggle("completed");
  saveTasks();
}

function removeTask(task) {
  task.remove();
  saveTasks();
}

function filterTasks() {
  var filter = document.getElementById("filter").value;
  var tasks = document.querySelectorAll("li");

  tasks.forEach(function(task) {
      if (filter === "all") {
          task.style.display = "flex";
      } else if (filter === "pending" && !task.classList.contains("completed")) {
          task.style.display = "flex";
      } else if (filter === "completed" && task.classList.contains("completed")) {
          task.style.display = "flex";
      } else {
          task.style.display = "none";
      }
  });
}

function saveTasks() {
  var tasks = [];
  var taskList = document.getElementById("taskList").children;

  for (var i = 0; i < taskList.length; i++) {
      var task = {
          text: taskList[i].textContent,
          completed: taskList[i].classList.contains("completed")
      };
      tasks.push(task);
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  var tasks = JSON.parse(localStorage.getItem("tasks"));

  if (tasks) {
      var taskList = document.getElementById("taskList");

      tasks.forEach(function(task) {
          var li = document.createElement("li");
          li.textContent = task.text;

          if (task.completed) {
              li.classList.add("completed");
          }

          li.addEventListener("click", toggleTask);
          li.addEventListener("contextmenu", function(e) {
              e.preventDefault();
              removeTask(this);
          });

          taskList.appendChild(li);
      });
  }
}
