const main_container = document.getElementById("main-container");
let weather_button = null;
let city_input = null;
let current_city = "Ghent";
let current_weather_data = {};
const current_city_label = document.getElementById("current-city");
const country_label = document.getElementById("country");
const condition_label = document.getElementById("condition");
const humidity_label = document.getElementById("humidity");
const temperature_label = document.getElementById("temperature");
const feelslike_label = document.getElementById("feelslike");
const windspeed_label = document.getElementById("windspeed");
const icon = document.getElementById("icon");
const response_label = document.getElementById("response");
const celsius_button = document.getElementById("celsius");
const fahrenheit_button = document.getElementById("fahrenheit");

let temperature_unit = "celsius";

function initalize_weather_app() {
  if (localStorage.getItem("last_city")) {
    current_city = localStorage.getItem("last_city");
  }

  if (localStorage.getItem("temperature_unit")) {
    temperature_unit = localStorage.getItem("temperature_unit");
    if (temperature_unit === "fahrenheit") {
      fahrenheit_button.checked = true;
      celsius_button.checked = false;
      console.log("f should be selected.");
    } else {
      fahrenheit_button.checked = false;
      celsius_button.checked = true;
    }
  }

  
  weather_button = document.createElement("button");
  weather_button.innerText = "Get Weather!";
  weather_button.id = "weather-button";
  main_container.appendChild(weather_button);
  fetch_weather_data();

  city_input = document.createElement("input");
  city_input.type = "text";
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
    if (current_city.trim() === "") {
      response_label.innerText = "City input must not be empty.";
      return;
    }

    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=56a5732619044108945214503251303&q=${current_city}`, {
      method: "GET"
    });

    if (!response.ok) {
      response_label.innerText = `HTTP error status: ${response.status}`;
      throw new Error(`HTTP error status: ${response.status}`);
    } else {
      response_label.innerText = "";
    }

    const response_data = await response.json();
    update_weather_labels(response_data);
  } catch(err) {
    console.error(err);
    update_weather_labels(null);
  }
}

function update_weather_labels(weather_data) {
  current_weather_data = weather_data;
  if (weather_data) {
    localStorage.setItem("last_city", current_city);
    current_city_label.innerText = `${current_city}'s Weather`
    country_label.innerText = `Country: ${weather_data.location.country}`;
    condition_label.innerText = `Current Condition: ${weather_data.current.condition.text}`;
    humidity_label.innerText = `Humidity: ${weather_data.current.humidity}%`;
    if (temperature_unit === "fahrenheit") {
      feelslike_label.innerText = `Feels Like: ${weather_data.current.feelslike_f} °F`;
      temperature_label.innerText = `Temperature: ${weather_data.current.temp_f} °F`;
    } else {
      temperature_label.innerText = `Temperature: ${weather_data.current.temp_c} °C`;
      feelslike_label.innerText = `Feels Like: ${weather_data.current.feelslike_c} °C`;
    }
    windspeed_label.innerText = `Wind Speed: ${weather_data.current.wind_kph} km/h (${weather_data.current.wind_mph} mph)`;
    icon.setAttribute("src", weather_data.current.condition.icon);
  } else {
    current_city_label.innerText = `Could not retrieve weather data for ${current_city}`;
    country_label.innerText = ``;
    condition_label.innerText = ``;
    humidity_label.innerText = ``;
    temperature_label.innerText = ``;
    feelslike_label.innerText = ``;
    windspeed_label.innerText = ``;
    icon.setAttribute("src", "");
  }
}

initalize_weather_app();
document.addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    current_city = city_input.value;
    fetch_weather_data();
  }
});

if (weather_button) {
  weather_button.onclick = () => {
    current_city = city_input.value;
    fetch_weather_data();
  }
}

celsius_button.addEventListener("change", (_event) => {
  temperature_unit = "celsius";
  localStorage.setItem("temperature_unit", "celsius");
  update_weather_labels(current_weather_data);
});

fahrenheit_button.addEventListener("change", (_event) => {
  temperature_unit = "fahrenheit";
  localStorage.setItem("temperature_unit", "fahrenheit");
  update_weather_labels(current_weather_data);
});