export function streak() {
  const streakBtn = document.getElementById("streak-btn");
  const streakSection = document.getElementById("streak-section");
  const closeStreak = document.getElementById("close-streak");

  const currentStreak = document.getElementById("current-streak");

  const weekDays = document.getElementById("week-days");

  const completeDay = document.getElementById("complete-day");

  let streakData = JSON.parse(localStorage.getItem("streakData")) || {
    streak: 0,
    completedDays: [],
  };

  streakBtn.onclick = () => {
    streakSection.classList.remove("hidden");

    renderStreak();
  };

  closeStreak.onclick = () => {
    streakSection.classList.add("hidden");
  };

  completeDay.onclick = () => {
    let today = new Date().toISOString().split("T")[0];

    if (!streakData.completedDays.includes(today)) {
      streakData.completedDays.push(today);

      streakData.streak++;

      localStorage.setItem("streakData", JSON.stringify(streakData));
    }

    renderStreak();
  };

  function renderStreak() {
    currentStreak.innerHTML = streakData.streak;

    weekDays.innerHTML = "";

    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    days.forEach((day) => {
      weekDays.innerHTML += `

<div
class="size-10 rounded-full bg-slate-200 flex items-center justify-center text-sm font-bold"
>
  ${day[0]}
</div>

`;
    });
  }
}