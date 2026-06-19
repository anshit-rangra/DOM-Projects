
let themeBtn = document.getElementById("themebtn");
let allthem = document.querySelectorAll(".theme");

themeBtn.addEventListener("click", () => {
    if (themeBtn.classList.toggle("dark")) {
        themeBtn.innerHTML = "☀️ Light Mode";
        allthem.forEach(element => {
            element.classList.add("dark");
        });
    }
    else {
        themeBtn.innerHTML = "🌙 Dark Mode";
        allthem.forEach(element => {
            element.classList.remove("dark");
            element.computedStyleMap.color = "red";
        });
    }
});


// add task

let taskInput = document.getElementById("taskinput");
let selectOption = document.getElementById("selectOption");
let addTaskBtn = document.querySelector(".addTask");
let tasklist = document.getElementById("tasklist");
let totalCount = document.getElementById("totalcount");
let pendingCount = document.getElementById("pendingcount");

addTaskBtn.addEventListener("click", () => {
    let title = taskInput.value;
    let category = selectOption.value;

    console.log(`Task: ${title}, Category: ${category}`);

    // color 
    const categoryColors =
        category.toLowerCase() === "work"
            ? "border border-red-500 text-red-500 px-2 rounded"
            : category.toLowerCase() === "personal"
                ? "border border-green-500 text-green-500 px-2 rounded"
                : category.toLowerCase() === "health"
                    ? "border border-blue-500 text-blue-500 px-2 rounded"
                    : category.toLowerCase() === "other"
                        ? "border border-yellow-400 text-yellow-500 px-2 rounded"
                        : null;
    if (title.trim() === "") return;
    tasklist.innerHTML += `
    <div class="taskItem flex justify-between items-center p-3 border-2 border-gray-300 rounded-xl">
                    <h3>${title}</h3>
                    <div class="flex gap-2">
                        <button class="${categoryColors} category">${category}</button>
                        <button class="done">Done</button>
                        <button class="editTask">Edit</button>
                        <button class="delete">Delete</button>
                    </div>
                </div>`
    totalCount.textContent = parseInt(totalCount.textContent) + 1;
    pendingCount.textContent = parseInt(pendingCount.textContent) + 1;
    taskInput.value = "";
});


// delete 
tasklist.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
        e.target.parentElement.parentElement.remove();
        totalCount.textContent = parseInt(totalCount.textContent) - 1;
        if (e.target.parentElement.parentElement.querySelector(".done").textContent === "✅ Done") {
            doneCount.textContent = parseInt(doneCount.textContent) - 1;
        }
        else {
            pendingCount.textContent = parseInt(pendingCount.textContent) - 1;
        }
    }
});

let doneCount = document.getElementById("donecount");
// task done
tasklist.addEventListener("click", (e) => {
    if (e.target.classList.contains("done")) {
        e.target.textContent = "✅ Done";
        
        if (doneCount.textContent < totalCount.textContent) {
            doneCount.textContent = parseInt(doneCount.textContent) + 1;
        }

        if (pendingCount.textContent > 0) {
            pendingCount.textContent = parseInt(pendingCount.textContent) - 1;
        }
    }
});

// clear task 

let clearTaskBtn = document.querySelector(".clearTask");
clearTaskBtn.addEventListener("click", () => {
    tasklist.innerHTML = "";
    totalCount.textContent = "0";
    pendingCount.textContent = "0";
    doneCount.textContent = "0";
});





