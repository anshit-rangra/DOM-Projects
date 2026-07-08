export function todoList() {
  const todoBtn = document.getElementById("todo-btn");
  const todoSection = document.getElementById("todo-section");
  const closeTodo = document.getElementById("close-todo");
  const addTaskBtn = document.getElementById("add-task");
  const taskTitle = document.getElementById("task-title");
  const taskDesc = document.getElementById("task-desc");
  const taskList = document.getElementById("task-list");

  todoBtn.onclick = () => {
    todoSection.classList.remove("hidden");
  };

  closeTodo.onclick = () => {
    todoSection.classList.add("hidden");
  };

  let tasks = [];

  addTaskBtn.onclick = () => {
    const title = taskTitle.value.trim();
    const desc = taskDesc.value.trim();

    if (!title) {
      alert("Please enter task title");
      return;
    }

    tasks.push({
      title,
      desc,
      done: false,
    });

    taskTitle.value = "";
    taskDesc.value = "";

    renderTasks();
  };

  function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
      taskList.innerHTML += `

      <div class="border rounded-lg p-3 shadow">

        <h3 class="font-bold text-lg ${
          task.done ? "line-through text-gray-500" : ""
        }">
          ${task.title}
        </h3>


        <p class="text-sm text-gray-600 mt-1 ${
          task.done ? "line-through" : ""
        }">
          ${task.desc}
        </p>


        <div class="flex gap-2 mt-3">


          <button
            data-action="done"
            data-index="${index}"
            class="bg-green-500 text-white px-3 py-1 rounded"
          >
            ${task.done ? "Undo" : "Done"}
          </button>


          <button
            data-action="delete"
            data-index="${index}"
            class="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>


        </div>


      </div>

      `;
    });
  }

  // Handle buttons
  taskList.addEventListener("click", (e) => {
    const button = e.target.closest("button");

    if (!button) return;

    const index = button.dataset.index;

    const action = button.dataset.action;

    if (action === "done") {
      tasks[index].done = !tasks[index].done;
    }

    if (action === "delete") {
      tasks.splice(index, 1);
    }

    renderTasks();
  });
}