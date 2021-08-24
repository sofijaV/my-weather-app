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
  let city = response.data.name;
  let searchedCity = document.querySelector("#searched-city");
  searchedCity.innerHTML = city;
  let temperature = Math.round(response.data.main.temp);
  let searchedTemperature = document.querySelector("#current-temp");
  searchedTemperature.innerHTML = temperature;
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

currentTime();
let typed = document.querySelector("#searching");
typed.addEventListener("submit", getData);
let here = document.querySelector("#location");
here.addEventListener("click", getPosition);
