let taskListElem = document.querySelector(".tasks-list");

const taskData = getLocal("tasks") || [];

console.log(taskData);

taskData.forEach((task, idx) => {
  createTaskElement(task);
});

let createTaskButton = document.querySelector("nav button");
let formSection = document.querySelector("#form-section");

createTaskButton.addEventListener("click", function () {
  formSection.style.display = "flex";
});

let formBackButton = document.querySelector("#form-back-button");

formBackButton.addEventListener("click", function (e) {
  e.preventDefault();
  formSection.style.display = "none";
});

let form = document.querySelector(".form form");
let task = document.querySelector(".form form input");
let option = document.querySelector(".form form select");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let obj = {
    id: taskData.length,
    task: task.value.trim(),
    priority: option.value,
    completed: false,
  };

  createTaskElement(obj);

  taskData.push(obj);

  setLocal(taskData);

  task.value = ""

  formSection.style.display = "none";
});

function createTaskElement(data) {
  let li = document.createElement("li");
  li.innerHTML = `
            <div class="task-info">
                <span class="task-name">${data.task}</span>
                <button class="priority ${data.priority}-priority">${data.priority}</button>
            </div>

            <div class="actions">
                <button data-type="complete" class="complete">✓</button>
                <button data-type="edit" class="edit">Edit</button>
                <button data-type="delete" class="delete">Delete</button>
            </div>
    `;

  li.dataset.id = data.id;

  if (data?.completed) {
    li.querySelector(".task-name").style.textDecoration = "line-through";
  }

  li.classList.add("task");
  taskListElem.appendChild(li);
}

taskListElem.addEventListener("click", function (e) {
  if (e.target.dataset.type === "complete") {
    setComplete(e.target);
  } else if (e.target.dataset.type === "delete") {
    deleteTask(e.target);
  }
});

function setComplete(elem) {
  let grandParent = elem.parentElement.parentElement;

  let id = grandParent.dataset.id;


  taskData[id].completed = !taskData[id].completed;

    if (taskData[id].completed) {
    grandParent.querySelector(".task-name").style.textDecoration =
      "line-through";
  } else {

    grandParent.querySelector(".task-name").style.textDecoration = "none"
  }


  setLocal(taskData);
}

function deleteTask(elem) {
  let grandParent = elem.parentElement.parentElement;
  let id = grandParent.dataset.id;

  grandParent.remove();

  console.log(id);

  taskData.splice(id, 1);

  console.log(taskData);

  setLocal(taskData);
}

function setLocal(data) {
  data = JSON.stringify(data);
  localStorage.setItem("tasks", data);
}

function getLocal(key) {
  let data = localStorage.getItem(key);
  data = JSON.parse(data);
  return data;
}
