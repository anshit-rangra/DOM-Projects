let createTaskButton = document.querySelector("nav button")
let formSection = document.querySelector("#form-section")



createTaskButton.addEventListener("click", function () {
    formSection.style.display = "flex"

})

let formBackButton = document.querySelector("#form-back-button")

formBackButton.addEventListener("click", function (e) {
    e.preventDefault()
    formSection.style.display = "none";
})

let form = document.querySelector(".form form")
let task = document.querySelector(".form form input")
let option = document.querySelector(".form form select")

let tasks = []

form.addEventListener("submit", function(e) {
    e.preventDefault();
    
    let obj = {
        task : task.value,
        option: option.value
    }
    tasks.push(obj)

    createTaskElement(obj)


    formSection.style.display = "none"
})


function createTaskElement(data) {


let taskListElem = document.querySelector(".tasks-list")

    let li = document.createElement("li")
    li.innerHTML = `
            <span>${data.task}</span>

            <div class="actions">
                <button class="complete">✓</button>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </div>
    `

    li.classList.add("task")
    taskListElem.appendChild(li)

}``