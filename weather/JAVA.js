const apiKey = "951b0f0efb60bddc6f4efbd7b0a729ad"; // Replace with your OpenWeatherMap key

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const pin = document.getElementById("pinInput").value.trim();
  let url = "";

  if (city) {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  } else if (pin) {
    // Default to India if no country code is provided (you can customize this)
    url = `https://api.openweathermap.org/data/2.5/weather?zip=${pin},IN&appid=${apiKey}&units=metric`;
  } else {
    alert("Please enter a city or pin code");
    return;
  }

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Location not found");

    const data = await res.json();
    renderFeatured(data);
  } catch (err) {
    alert(err.message);
  }
}

function renderFeatured(data) {
  const weatherDiv = document.getElementById("weatherFeatured");
  weatherDiv.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p class="temp">${Math.round(data.main.temp)}°C</p>
    <p>${data.weather[0].description}</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind: ${data.wind.speed} m/s</p>
  `;
}
