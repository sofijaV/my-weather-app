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

function showData(response) {
  console.log(response);
  celsiusTemperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let searchedCity = document.querySelector("#searched-city");
  searchedCity.innerHTML = city;
  let searchedTemperature = document.querySelector("#current-temp");
  searchedTemperature.innerHTML = celsiusTemperature;
  let min = Math.round(response.data.main.temp_min);
  let max = Math.round(response.data.main.temp_max);
  let minMax = document.querySelector("#min-max");
  minMax.innerHTML = `High ${max}° | Low ${min}°`;
  let humidity = response.data.main.humidity;
  let searchedHumidity = document.querySelector("#humidity");
  searchedHumidity.innerHTML = `Humidity: ${humidity}%`;
  let description = response.data.weather[0].description;
  let searchedDescription = document.querySelector("#description");
  searchedDescription.innerHTML = description;
  let windSpeed = Math.round(response.data.wind.speed);
  let searchedWind = document.querySelector("#wind");
  searchedWind.innerHTML = `Wind speed: ${windSpeed}m/s`;
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    ` http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
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
  let key = "6c8c6f63dce062a0b5a3b082e9b52d3a";
  let units = "metric";
  let searched = document.querySelector("#typed-city");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searched.value}&appid=${key}&&units=metric`;
  axios.get(apiUrl).then(showData);
}

function showPosition(position) {
  console.log(position);
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
function displayForcast() {
  let forecastHTML = `<div class="row">`;
  let days = ["Thuesday", "Friday", "Saturday"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
                <div class="col-2"><div class="day">${day}</div>
                  <img src="images/sun.png" alt="sun" />
                 <span class="max">29°</span>|<span class="min">15°</span>
                 </div>
                `;
  });
  forecastHTML = forecastHTML + `</div>`;

  let forecastElement = document.querySelector("#forcast");
  forecastElement.innerHTML = forecastHTML;
}
celsiusTemperature = null;

let selectedFahrenheit = document.querySelector("#fahrenheit");
selectedFahrenheit.addEventListener("click", convertFahrenheit);
let selectedCelsius = document.querySelector("#celsius");
selectedCelsius.addEventListener("click", convertCelsius);
currentTime();
let typed = document.querySelector("#searching");
typed.addEventListener("submit", getData);
let here = document.querySelector("#location");
here.addEventListener("click", getPosition);

displayForcast();
