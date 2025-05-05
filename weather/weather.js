const apiKey = "f13eea54ca8df62b27f89426a94c9d90";
function getHourlyWeather(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const location = data.city.name;
      document.getElementById("location").textContent = `📍 ${location}`;
      const forecastContainer = document.getElementById("forecast");

      for (let i = 0; i < 8; i++) {
        const item = data.list[i];
        const time = new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const temp = `${Math.round(item.main.temp)}°C`;
        const description = item.weather[0].main.toLowerCase();
        let emoji = "❓";

        if (description.includes("cloud")) emoji = "☁️";
        else if (description.includes("rain")) emoji = "🌧️";
        else if (description.includes("clear")) emoji = "☀️";
        else if (description.includes("snow")) emoji = "❄️";
        else if (description.includes("storm")) emoji = "🌩️";
        else if (description.includes("fog") || description.includes("mist")) emoji = "🌫️";

        const forecastItem = document.createElement("div");
        forecastItem.className = "forecast-item";
        forecastItem.innerHTML = `
          <p>${time}</p>
          <p style="font-size: 28px">${emoji}</p>
          <p>${temp}</p>
        `;
        forecastContainer.appendChild(forecastItem);
      }
    })
    .catch(() => {
      document.getElementById("error").textContent = "Couldn't load forecast ";
    });
}
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        getHourlyWeather(position.coords.latitude, position.coords.longitude);
      },
      () => {
        document.getElementById("error").textContent = "Location permission denied ";
      }
    );
  } else {
    document.getElementById("error").textContent = "Geolocation not supported ";
  }
}
getLocation();
