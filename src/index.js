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
  `;
  let forecast = response.data.daily;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5 && index !== 0) {
      forecastHTML =
        forecastHTML +
        `
                <div class="col-sm-3">
                <div class="day">${formatDay(forecastDay.dt)}</div>
                  <img src="images/${forecastDay.weather[0].icon}.png
         " />
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

currentTime();
search("Belgrade");
let typed = document.querySelector("#searching");
typed.addEventListener("submit", getData);
let here = document.querySelector("#location");
here.addEventListener("click", getPosition);
