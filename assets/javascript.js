
let formE1 = document.querySelector("#task-form");
let tasksToDoE1= document.querySelector("#tasks-to-do");
let taskNameInput = document.querySelector("input[name='task-name']").value;
let taskTypeInput = document.querySelector("select[name='task-type']").value;


createTaskHandler = function(event){

    event.preventDefault();

    let listItemE1 = document.createElement("li")
    listItemE1.className = "task-item";

    let taskInfoE1 = document.createElement("div");

    taskInfoE1.className = "task-info";

    taskInfoE1.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
    listItemE1.appendChild(taskInfoE1);
    tasksToDoE1.appendChild(listItemE1);
};
formE1.addEventListener("submit", createTaskHandler);
