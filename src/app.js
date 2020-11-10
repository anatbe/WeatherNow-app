let now = new Date();

let h2 = document.querySelector("h2");
h2.innerHTML = formatDate(now);

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let day = days[now.getDay()];
  let month = months[date.getMonth()];
  let daynum = date.getDate();
  let hours = now.getHours();
  let minutes = now.getMinutes();

  return ` ${day} ${daynum} ${month} ${hours}:${minutes} `;
}
function currentCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#City-search");

  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function convertoCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = "12°C";
}

function convertoF(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = "53°F";
}
let input = document.querySelector("form");
input.addEventListener("submit", currentCity);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertoF);

let Celsius = document.querySelector("#celsius");
Celsius.addEventListener("click", convertoCelsius);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  console.log(response);
  let city = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city}`;
  let temperatureSelector = document.querySelector(".temperature");
  temperatureSelector.innerHTML = `${temperature}°C`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#feels").innerHTML = Math.round(
    response.data.main.feels_like
  );

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemperature);
}
let locationButton = document.querySelector("button");
locationButton.addEventListener("click", getLocation);
function getLocation(event) {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
navigator.geolocation.getCurrentPosition(retrievePosition);
