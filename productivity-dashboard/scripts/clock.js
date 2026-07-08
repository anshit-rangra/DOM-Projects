export function clock() {
  function updateClockAndDate() {
    const now = new Date();

    document.getElementById("widget-time").textContent = now.toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      },
    );

    document.getElementById("widget-date").textContent = now.toLocaleDateString(
      [],
      {
        weekday: "long",
        month: "short",
        day: "numeric",
      },
    );

    const hour = now.getHours();
    let greet = "Good Evening";
    if (hour < 12) greet = "Good Morning";
    else if (hour < 17) greet = "Good Afternoon";
    const el = document.getElementById("greeting");
    if (el) el.textContent = greet;
  }

  updateClockAndDate();
  setInterval(updateClockAndDate, 1000);

  async function fetchWeatherData() {
    const API_KEY = "9ad98d54a0db9a8e14584135e45b2a86";

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
          );

          if (!response.ok) {
            throw new Error("Weather fetch failed");
          }

          const data = await response.json();

          const city = data.name;
          const country = data.sys.country;
          const temp = Math.round(data.main.temp);
          const description = data.weather[0].description;

          document.getElementById("widget-location").textContent =
            `${city}, ${country}`;

          document.getElementById("widget-temp").textContent = `${temp}°C`;

          document.getElementById("widget-condition").textContent = description;

          const weather = description.toLowerCase();

          if (weather.includes("rain")) {
            document.getElementById("widget-icon").textContent = "🌧️";
          } else if (weather.includes("cloud")) {
            document.getElementById("widget-icon").textContent = "☁️";
          } else if (weather.includes("snow")) {
            document.getElementById("widget-icon").textContent = "❄️";
          } else {
            document.getElementById("widget-icon").textContent = "☀️";
          }
        } catch (error) {
          console.error(error);

          document.getElementById("widget-location").textContent =
            "Weather unavailable";
          document.getElementById("widget-temp").textContent = "--°C";
          document.getElementById("widget-condition").textContent =
            "Offline Mode";
        }
      },
      (error) => {
        console.error(error);

        document.getElementById("widget-location").textContent =
          "Location permission denied";
        document.getElementById("widget-temp").textContent = "--°C";
        document.getElementById("widget-condition").textContent =
          "Enable location";
      },
    );
  }

  fetchWeatherData();
}