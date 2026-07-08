export function themeToggle() {
  const btn = document.getElementById("theme-btn");
  const icon = btn.querySelector("i");
  const lightBg = document.getElementById("light-bg");
  const darkBg = document.getElementById("dark-bg");
  let theme = localStorage.getItem("theme");

  if (theme === "dark") {
    document.body.classList.add("dark");
    lightBg.classList.add("hidden");
    darkBg.classList.remove("hidden");
    icon.className = "ri-sun-line text-lg";
  }

  btn.onclick = () => {
    document.body.classList.toggle("dark");
    const dark = document.body.classList.contains("dark");

    if (dark) {
      localStorage.setItem("theme", "dark");
      lightBg.classList.add("hidden");
      darkBg.classList.remove("hidden");
      icon.className = "ri-sun-line text-lg";
    } else {
      localStorage.setItem("theme", "light");
      lightBg.classList.remove("hidden");
      darkBg.classList.add("hidden");
      icon.className = "ri-moon-line text-lg";
    }
  };
}