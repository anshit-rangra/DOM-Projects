export function timer() {
  const timerBtn = document.getElementById("timer-btn");
  const timerSection = document.getElementById("timer-section");
  const closeTimer = document.getElementById("close-timer");

  const display = document.getElementById("display");

  const startBtn = document.getElementById("start");
  const pauseBtn = document.getElementById("pause");
  const resetBtn = document.getElementById("reset");

  const stopwatchMode = document.getElementById("stopwatch-mode");
  const timerMode = document.getElementById("timer-mode");

  const inputBox = document.getElementById("timer-input-box");
  const minutesInput = document.getElementById("minutes");

  timerBtn.onclick = () => {
    timerSection.classList.remove("hidden");
  };

  closeTimer.onclick = () => {
    timerSection.classList.add("hidden");
  };

  let mode = "stopwatch";

  let seconds = 0;
  let interval = null;

  function updateDisplay() {
    let hrs = Math.floor(seconds / 3600);

    let mins = Math.floor((seconds % 3600) / 60);

    let secs = seconds % 60;

    display.innerHTML = `${hrs.toString().padStart(2, "0")}:
    ${mins.toString().padStart(2, "0")}:
    ${secs.toString().padStart(2, "0")}`;
  }

  stopwatchMode.onclick = () => {
    mode = "stopwatch";

    inputBox.classList.add("hidden");

    resetTimer();
  };

  timerMode.onclick = () => {
    mode = "timer";

    inputBox.classList.remove("hidden");

    resetTimer();
  };

  startBtn.onclick = () => {
    if (interval) return;

    if (mode === "timer" && seconds === 0) {
      seconds = Number(minutesInput.value) * 60;
    }

    interval = setInterval(() => {
      if (mode === "stopwatch") {
        seconds++;
      } else {
        seconds--;

        if (seconds <= 0) {
          clearInterval(interval);

          interval = null;

          alert("Time Finished!");
        }
      }

      updateDisplay();
    }, 1000);
  };

  pauseBtn.onclick = () => {
    clearInterval(interval);

    interval = null;
  };

  resetBtn.onclick = () => {
    resetTimer();
  };

  function resetTimer() {
    clearInterval(interval);

    interval = null;

    seconds = 0;

    updateDisplay();
  }
}