function currentTime() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let current = document.querySelector("#current");
  current.innerHTML = `${day} 
${hour}:${minute}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function displayForecast(response) {
  let forecastHTML = `<div class="row">
  <div class="col-1"></div>`;
  let forecast = response.data.daily;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6 && index !== 0) {
      forecastHTML =
        forecastHTML +
        `
                <div class="col-2">
                <div class="day">${formatDay(forecastDay.dt)}</div>
                  <img src="images/${forecastDay.weather[0].icon}.png" />
                 <span class="max">${Math.round(
                   forecastDay.temp.max
                 )}°</span>|<span class="min">${Math.round(
          forecastDay.temp.min
        )}°</span>
                 </div>
                `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let lon = coordinates.lon;
  let lat = coordinates.lat;
  apiKey = "6c8c6f63dce062a0b5a3b082e9b52d3a";
  url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&&units=metric`;
  axios.get(url).then(displayForecast);
}

function showData(response) {
  celsiusTemperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let searchedCity = document.querySelector("#searched-city");
  searchedCity.innerHTML = city;
  let searchedTemperature = document.querySelector("#current-temp");
  searchedTemperature.innerHTML = celsiusTemperature;
  let min = Math.round(response.data.main.temp_min);
  let max = Math.round(response.data.main.temp_max);
  let minMax = document.querySelector("#min-max");
  minMax.innerHTML = `High <span class="max">${max}° </span> | Low <span class="min">${min}°</span>`;
  let humidity = response.data.main.humidity;
  let searchedHumidity = document.querySelector("#humidity");
  searchedHumidity.innerHTML = `Humidity:<span class="value"> ${humidity}%</span>`;
  let description = response.data.weather[0].description;
  let searchedDescription = document.querySelector("#description");
  searchedDescription.innerHTML = description;
  let windSpeed = Math.round(response.data.wind.speed);
  let searchedWind = document.querySelector("#wind");
  searchedWind.innerHTML = `Wind speed: <span class="value">${windSpeed}m/s</span>`;
  let icon = document.querySelector("#icon");
  icon.setAttribute("src", ` images/${response.data.weather[0].icon}.png`);
  icon.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function convertFahrenheit(event) {
  event.preventDefault();
  let sign = document.querySelector("#fahrenheit");
  sign.setAttribute("class", "active");
  let celsius = document.querySelector("#celsius");
  celsius.setAttribute("class", null);
  let temperature = document.querySelector("#current-temp");
  let fahrenheitTemp = Math.round((celsiusTemperature * 9) / 5 + 32);
  temperature.innerHTML = fahrenheitTemp;
}
function convertCelsius(event) {
  event.preventDefault();
  let sign = document.querySelector("#fahrenheit");
  sign.setAttribute("class", null);
  let celsius = document.querySelector("#celsius");
  celsius.setAttribute("class", "active");
  let temperature = document.querySelector("#current-temp");
  temperature.innerHTML = celsiusTemperature;
}
function getData(event) {
  event.preventDefault();
  let searched = document.querySelector("#typed-city");
  search(searched.value);
}
function search(city) {
  let key = "6c8c6f63dce062a0b5a3b082e9b52d3a";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&&units=metric`;
  axios.get(apiUrl).then(showData);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let key = "6c8c6f63dce062a0b5a3b082e9b52d3a";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&&units=metric`;
  axios.get(url).then(showData);
}
function getPosition(event) {
  navigator.geolocation.getCurrentPosition(showPosition);
}

celsiusTemperature = null;

let selectedFahrenheit = document.querySelector("#fahrenheit");
selectedFahrenheit.addEventListener("click", convertFahrenheit);
let selectedCelsius = document.querySelector("#celsius");
selectedCelsius.addEventListener("click", convertCelsius);
currentTime();
search("Belgrade");
let typed = document.querySelector("#searching");
typed.addEventListener("submit", getData);
let here = document.querySelector("#location");
here.addEventListener("click", getPosition);
