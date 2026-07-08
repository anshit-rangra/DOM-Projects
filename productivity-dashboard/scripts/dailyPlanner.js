export function dailyplanner() {
  const plannerBtn = document.getElementById("planner-btn");
  const plannerSection = document.getElementById("planner-section");
  const closePlanner = document.getElementById("close-planner");

  const plannerList = document.getElementById("planner-list");

  const addPlan = document.getElementById("add-plan");

  const planDate = document.getElementById("plan-date");
  const planTime = document.getElementById("plan-time");
  const planTitle = document.getElementById("plan-title");
  const planDesc = document.getElementById("plan-desc");
  const planPriority = document.getElementById("plan-priority");

  plannerBtn.onclick = () => {
    plannerSection.classList.remove("hidden");
  };

  closePlanner.onclick = () => {
    plannerSection.classList.add("hidden");
  };

  let plans = [];

  addPlan.onclick = () => {
    if (planTitle.value.trim() === "") {
      alert("Enter title");
      return;
    }

    plans.push({
      date: planDate.value,
      time: planTime.value,
      title: planTitle.value,
      desc: planDesc.value,
      priority: planPriority.value,
      done: false,
    });

    planDate.value = "";
    planTime.value = "";
    planTitle.value = "";
    planDesc.value = "";
    planPriority.value = "Medium";

    renderPlans();
  };

  function renderPlans() {
    plannerList.innerHTML = "";

    plans.forEach((plan, index) => {
      let color = "bg-green-500";

      if (plan.priority === "Medium") color = "bg-yellow-500";
      if (plan.priority === "High") color = "bg-red-500";

      plannerList.innerHTML += `

    <div class="border rounded-lg p-4 shadow">

        <div class="flex justify-between items-center">

            <h3 class="font-bold text-lg ${
              plan.done ? "line-through text-gray-500" : ""
            }">
                ${plan.title}
            </h3>


            <span class="${color} text-white text-xs px-2 py-1 rounded">
                ${plan.priority}
            </span>

        </div>


        <p class="text-sm text-gray-500 mt-1">
            📅 ${plan.date}
        </p>


        <p class="text-sm text-gray-500">
            ⏰ ${plan.time}
        </p>


        <p class="mt-2 ${plan.done ? "line-through text-gray-400" : ""}">
            ${plan.desc}
        </p>



        <div class="flex gap-2 mt-4">


            <button
                data-action="done"
                data-index="${index}"
                class="bg-green-600 text-white px-3 py-1 rounded"
            >
                ${plan.done ? "Undo" : "Done"}
            </button>


            <button
                data-action="delete"
                data-index="${index}"
                class="bg-red-600 text-white px-3 py-1 rounded"
            >
                Delete
            </button>


        </div>


    </div>

    `;
    });
  }

  plannerList.addEventListener("click", (e) => {
    const button = e.target.closest("button");

    if (!button) return;

    const index = button.dataset.index;
    const action = button.dataset.action;

    if (action === "done") {
      plans[index].done = !plans[index].done;
    }

    if (action === "delete") {
      plans.splice(index, 1);
    }

    renderPlans();
  });
}