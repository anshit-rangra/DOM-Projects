function addLiElem(parent, content) {
    const li = document.createElement("li")
    li.innerHTML = `
                    <h4> ${content} </h4>

                    <div class="functions">
                        <input type="checkbox" id="check">
                        <i class="ri-delete-bin-line" id="delete"></i>
                    </div>
        `

    li.classList.add("tasks")

    parent.appendChild(li)
}

function removeElem(li) {
    
    li.remove()
    
}

function completeTask(li){
    let task = li.querySelector("h4")
    task.classList.toggle("complete")
}


let ul = document.querySelector("ul")


const form = document.querySelector("form");


ul.addEventListener("click", function(event) {
    const li = event.target.closest("li")
    const id = event.target.id


    if(id === "check"){
        completeTask(li)
    } else if(id === "delete"){
        removeElem(li)
    }

})


form.addEventListener("submit", function (event) {
    event.preventDefault()

    let input = event.target.querySelector("input")

    addLiElem(ul, input.value)

    input.value = ""
})


