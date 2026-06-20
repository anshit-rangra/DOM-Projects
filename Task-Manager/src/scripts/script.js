let taskListElem = document.querySelector(".tasks-list");

const taskData = getLocal("tasks") || [];

taskData.forEach((task) => {
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

const form = document.querySelector(".form form");
const task = document.querySelector(".form form input");
const option = document.querySelector(".form form select");
const editForm = document.querySelector("#edit-form-section")

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let randomId = Math.floor((Math.random() * 1000) + 1)

  let obj = {
    id: randomId,
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
  } else if (e.target.dataset.type === "edit"){


    editContainer(e.target)

    // editTask(e.target)

  }
});

function setComplete(elem) {
  let grandParent = elem.parentElement.parentElement;

  let id = grandParent.dataset.id;



  let currentTask = taskData.find((elem) => {
    return elem.id == id
  })

  currentTask.completed = !currentTask.completed

    if (currentTask.completed) {
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

  let removeIdx = taskData.findIndex(function(elem, idx) {
    return elem.id == id
  })


  taskData.splice(removeIdx, 1);


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


function editContainer(elem){

    editForm.style.display = "flex"

    let editFormBackButton = editForm.querySelector("#edit-form-back-button")
    let formEdit = editForm.querySelector("form")
    let input = formEdit.querySelector("input")
    let option = formEdit.querySelector("select")


    editFormBackButton.addEventListener("click", () => {
      editForm.style.display = "none"
    })

    formEdit.addEventListener("submit", (e) => {
      e.preventDefault();
      
      editTask(elem, input.value.trim(), option.value)
      editForm.style.display = "none"

    })



}


function editTask(elem, taskInput, priority) {
  let grandParent = elem.parentElement.parentElement;
  let id = grandParent.dataset.id;

  let taskIndex = taskData.findIndex(function(elem, idx) {
    return elem.id == id
  })

  let obj = {
    id: elem.id,
    task: taskInput,
    priority: priority,
    completed: elem.completed,
  };

  taskData.splice(taskIndex, 1, obj)

  grandParent.querySelector(".task-name").textContent = obj.task;
  grandParent.querySelector(".priority").textContent= obj.priority;

  grandParent.querySelector(".priority").classList.remove(`${elem.priority}-priority`)

  grandParent.querySelector(".priority").classList.add(`${obj.priority}-priority`)

  

  setLocal(taskData)

}