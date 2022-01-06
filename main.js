// Setting Up variables
let input = document.querySelector(`[type="text"]`),
  addBtn = document.querySelector(".add-task span"),
  tasksContainer = document.querySelector(".task-content"),
  tasksCount = document.querySelector(".tasks-count span"),
  tasksCompleted = document.querySelector(".tasks-completed span ");

// focus on input feild
window.onload = function () {
  input.focus();
};
// Adding Task
addBtn.addEventListener("click", function () {
  if (input.value === "") {
    // sweet alert
    swal({
      title: "Oops...",
      text: "Please Enter Your Task",
      icon: "error",
    });
  } else {
    let noTaskMessage = document.querySelector(".no-task-message");

    //remove no task
    if (document.body.contains(noTaskMessage)) {
      // Remove No Tasks Message
      noTaskMessage.remove();
    }

    // create main span element & Delete btn
    let mainSpan = document.createElement("span");
    let deleteSpan = document.createElement("span");

    // create main span text & delete btn text
    let spanText = document.createTextNode(input.value);
    let deleteText = document.createTextNode("Delete");

    // add text to main span
    mainSpan.appendChild(spanText);
    mainSpan.className = "task-box";
    // add text to delete btn
    deleteSpan.appendChild(deleteText);
    deleteSpan.className = "delete";
    // add delete button to main span
    mainSpan.appendChild(deleteSpan);

    // append to task content
    tasksContainer.appendChild(mainSpan);

    // Add to local Storage
    // localStorage.setItem("task", input.value);

    // empty the input
    input.value = "";

    //focuse on field
    input.focus();
    calcTasks();
  }
});

// Delete Tasks & finish Tasks
document.addEventListener("click", function (event) {
  if (event.target.className == "delete") {
    event.target.parentNode.remove();
    calcTasks();

    if (tasksContainer.childElementCount === 0) {
      createNoTask();
    }
  }
  if (event.target.classList.contains("task-box")) {
    event.target.classList.toggle("finished");
    calcTasks();
  }
});

// Delete All    &    Finish All
let deleteAll = document.querySelector(".delete-all"),
  finishAll = document.querySelector(".finish-all");

deleteAll.addEventListener("click", function () {
  document.querySelectorAll(".task-box").forEach((e) => e.remove());
  createNoTask();

  calcTasks();
});
finishAll.addEventListener("click", function () {
  document
    .querySelectorAll(".task-box")
    .forEach((e) => e.classList.toggle("finished"));
  calcTasks();
});

//function Create No task Message
function createNoTask() {
  let noMsgSpan = document.createElement("span");
  noMsgSpan.append(document.createTextNode("No Tasks To Show"));

  noMsgSpan.className = "no-task-message";

  // append message to task container
  tasksContainer.appendChild(noMsgSpan);
}

//function to calculate tasks
function calcTasks() {
  // all task
  tasksCount.innerHTML = document.querySelectorAll(
    ".task-content .task-box"
  ).length;

  // completed task
  tasksCompleted.innerHTML = document.querySelectorAll(
    ".task-content .finished"
  ).length;
}
