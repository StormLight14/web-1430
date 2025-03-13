const main_container = document.getElementById("main-container");
let weather_button = null;
let city_input = null;
let current_city = "Ghent";
const country_label = document.getElementById("country");
const condition_label = document.getElementById("country");
const humidity_label = document.getElementById("country");
const icon = document.getElementById("icon");

function initalize_weather_app() {
  let h1 = document.createElement("h1");
  h1.innerText = "Wacky Weather App";
  main_container.appendChild(h1);

  city_input = document.createElement("input");
  city_input.value = current_city;
  city_input.placeholder = "Enter a city name...";
  city_input.id = "city-input";
  main_container.appendChild(city_input);

  weather_button = document.createElement("button");
  weather_button.innerText = "Get Weather!";
  weather_button.id = "weather-button";
  main_container.appendChild(weather_button);
}

async function fetch_weather_data() {
  fetch(`https://api.weatherapi.com/v1/current.json?key=56a5732619044108945214503251303&q=${current_city}`, {
    method: "GET"
  }).then((response_data) => {
    update_weather_labels(response_data.body);
  });
}

function update_weather_labels(weather_data) {
  console.log(weather_data);
  country_label = weather_data.location.country;
}

initalize_weather_app();
if (weather_button) {
  weather_button.onclick = fetch_weather_data;
}

if (city_input) {
  city_input.addEventListener("change", (_event) => {
    current_city = city_input.value;
  });
}