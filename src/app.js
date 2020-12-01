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

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let farenheitTemputure = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = Math.round(farenheitTemputure);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let input = document.querySelector("form");
input.addEventListener("submit", currentCity);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

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
  let iconElement = document.querySelector("#icon");
  let descriptionElement = document.querySelector(".description");
  descriptionElement.innerHTML = `${response.data.weather[0].description}`;

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  celsiusTemperature = response.data.main.temp;
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
