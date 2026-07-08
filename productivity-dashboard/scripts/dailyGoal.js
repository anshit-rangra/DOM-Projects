export function dailyGoal() {
  const goalBtn = document.getElementById("goal-btn");
  const goalSection = document.getElementById("goal-section");
  const closeGoal = document.getElementById("close-goal");

  const addGoal = document.getElementById("add-goal");
  const goalList = document.getElementById("goal-list");

  const goalTitle = document.getElementById("goal-title");
  const goalTarget = document.getElementById("goal-target");
  const goalUnit = document.getElementById("goal-unit");

  goalBtn.onclick = () => {
    goalSection.classList.remove("hidden");
  };

  closeGoal.onclick = () => {
    goalSection.classList.add("hidden");
  };

  let goals = [];

  addGoal.onclick = () => {
    if (goalTitle.value === "") {
      alert("Enter goal");
      return;
    }

    goals.push({
      title: goalTitle.value,
      target: Number(goalTarget.value),
      unit: goalUnit.value,
      progress: 0,
      done: false,
    });

    goalTitle.value = "";
    goalTarget.value = "";

    renderGoals();
  };

  function renderGoals() {
    goalList.innerHTML = "";

    goals.forEach((goal, index) => {
      goalList.innerHTML += `

        <div class="border rounded-lg p-4 shadow">

            <h3 class="font-bold text-lg ${
              goal.done ? "line-through text-gray-400" : ""
            }">
                ${goal.title}
            </h3>


            <p class="text-sm text-gray-500 mt-1">
                Target: ${goal.target} ${goal.unit}
            </p>


            <div class="flex gap-2 mt-4">


                <button
                onclick="completeGoal(${index})"
                class="bg-green-600 text-white px-3 py-1 rounded"
                >
                    ${goal.done ? "Completed" : "Done"}
                </button>


                <button
                onclick="deleteGoal(${index})"
                class="bg-red-500 text-white px-3 py-1 rounded"
                >
                    Delete
                </button>


            </div>

        </div>

        `;
    });
  }

  window.completeGoal = function (index) {
    goals[index].progress = goals[index].target;

    goals[index].done = true;

    renderGoals();
  };

  window.deleteGoal = function (index) {
    goals.splice(index, 1);

    renderGoals();
  };
}