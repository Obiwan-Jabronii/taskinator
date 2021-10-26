var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContent = document.querySelector("#page-content");
var tasksInProgressE1 = document.querySelector("#tasks-in-progress");
var tasksCompletedE1 = document.querySelector("#tasks-completed");
var tasks = [];

var taskButtonHandler = function(event) {
  var targetE1 = event.target;

  if(targetE1.matches(".edit-btn")) {
    var taskId = targetE1.getAttribute("data-task-id");
   editTask(taskId);
    }   
    else if(targetE1.matches(".delete-btn")) {
       var taskId = targetE1.getAttribute("data-task-id");
      deleteTask(taskId);
    }
}


pageContent.addEventListener("click",taskButtonHandler);

var taskStatusChangeHandler = function (event) {
    var taskId = event.target.getAttribute("data-task-id");

    var statusValue = event.target.value.toLowerCase ();

    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    } else if (statusValue === "in progress") {
        tasksInProgressE1.appendChild(taskSelected);
    } else if (statusValue === "completed") {
        tasksCompletedE1.appendChild(taskSelected);
    }
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
          tasks[i].status = statusValue;
        }
      };
      saveTasks();
};
var createTaskEl = function (taskDataObj) {
    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
  
    listItemEl.setAttribute("data-task-id", taskIdCounter);
  
    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    var taskActionsE1 = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsE1);

    taskDataObj.id = taskIdCounter;

    tasks.push(taskDataObj);
    saveTasks();
  
    tasksToDoEl.appendChild(listItemEl);
  
    taskIdCounter++;
};


var taskFormHandler = function(event) {
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;
  if(!taskNameInput || !taskTypeInput) {
      alert("You need to fill out the task form!");
      return false;
  }
  formEl.reset();

  var isEdit = formEl.hasAttribute("data-task-id");

  // package up data as an object
  var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput,
      status: "to do"
  };

 if (isEdit) {
     var taskId = formEl.getAttribute("data-task-id")
     completeEditTask(taskNameInput, taskTypeInput,taskId);
 } else{
     var taskDataObj = {
         name: taskNameInput,
         type: taskTypeInput
     };

     createTaskEl(taskDataObj);
 }
};

var createTaskActions = function(taskId) {
    var actionContainerE1 = document.createElement("div");
    actionContainerE1.className = "task-actions";
    var editButtonE1 = document.createElement("button");
    editButtonE1.textContent = "Edit";
    editButtonE1.className = "bt edit-btn";
    editButtonE1.setAttribute("data-task-id", taskId); 

    actionContainerE1.appendChild(editButtonE1);

    var deleteButtonE1 = document.createElement("button");
    deleteButtonE1.textContent = "Delete";
    deleteButtonE1.className = "bt delete-btn";
    deleteButtonE1.setAttribute("data-task-id", taskId); 

    actionContainerE1.appendChild(deleteButtonE1);

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContainerE1.appendChild(statusSelectEl);

    var statusChoices = ["To Do", "In Progress", "Completed"];

    for (var i = 0; i < statusChoices.length; i++){
        var statusOptionE1 = document.createElement("option");
        statusOptionE1.textContent = statusChoices[i];
        statusOptionE1.setAttribute("value", statusChoices[i]);

        statusSelectEl.appendChild(statusOptionE1);
        }

    return actionContainerE1;

};
var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
    var updatedTaskArr = [];

for (var i = 0; i < tasks.length; i++) {
  // if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
  if (tasks[i].id !== parseInt(taskId)) {
    updatedTaskArr.push(tasks[i]);
  };
  saveTasks();
}

// reassign tasks array to be the same as updatedTaskArr
tasks = updatedTaskArr;
};
var editTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    
    var taskName = taskSelected.querySelector("h3.task-name").textContent;

    var taskType = taskSelected.querySelector("span.task-type").textContent;

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id", taskId);
}
formEl.addEventListener("submit", taskFormHandler);

var completeEditTask = function (taskName, taskType, taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
          tasks[i].name = taskName;
          tasks[i].type = taskType;
        };
    alert("Task Updated!");
    saveTasks();

    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
};
}

var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
pageContent.addEventListener("change", taskStatusChangeHandler);
