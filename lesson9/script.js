const main_container = document.getElementById("main-container");
let weather_button = null;
let city_input = null;
let current_city = "Ghent";
const current_city_label = document.getElementById("current-city");
const country_label = document.getElementById("country");
const condition_label = document.getElementById("condition");
const humidity_label = document.getElementById("humidity");
const temperature_label = document.getElementById("temperature");
const feelslike_label = document.getElementById("feelslike")
const icon = document.getElementById("icon");

function initalize_weather_app() {
  weather_button = document.createElement("button");
  weather_button.innerText = "Get Weather!";
  weather_button.id = "weather-button";
  main_container.appendChild(weather_button);
  fetch_weather_data();

  city_input = document.createElement("input");
  city_input.value = current_city;
  city_input.placeholder = "Enter a city name...";
  city_input.id = "city-input";
  main_container.appendChild(city_input);

  let input_label = document.createElement("label");
  input_label.setAttribute("for", "city-input");
  input_label.innerText = "City or ZIP code:";
  main_container.appendChild(input_label);

  let h1 = document.createElement("h1");
  h1.innerText = "Wacky Weather App";
  main_container.appendChild(h1);
}

async function fetch_weather_data() {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=56a5732619044108945214503251303&q=${current_city}`, {
      method: "GET"
    });
    const response_data = await response.json();
    update_weather_labels(response_data);
  } catch(err) {
    console.error(err);
  }
}

function update_weather_labels(weather_data) {
  current_city_label.innerText = `${current_city}'s Weather`
  country_label.innerText = `Country: ${weather_data.location.country}`;
  condition_label.innerText = `Current Condition: ${weather_data.current.condition.text}`;
  humidity_label.innerText = `Humidity: ${weather_data.current.humidity}%`
  temperature_label.innerText = `Temperature: ${weather_data.current.temp_c} °C (${weather_data.current.temp_f} °F)`;
  feelslike_label.innerText = `Feels Like: ${weather_data.current.feelslike_c} °C (${weather_data.current.feelslike_f} °F)`;
  icon.setAttribute("src", weather_data.current.condition.icon);
}

initalize_weather_app();
if (weather_button) {
  weather_button.onclick = fetch_weather_data;
}

document.addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    fetch_weather_data();
  }
});

if (city_input) {
  city_input.addEventListener("change", (_event) => {
    current_city = city_input.value;
  });
}