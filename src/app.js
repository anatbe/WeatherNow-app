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

  let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(forecastUrl).then(showForecast);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let farenheitTemputure = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector(".temperature");
  let temperature = Math.round(farenheitTemputure);
  temperatureElement.innerHTML = `${temperature}°F`;

  let farenheitFellsLikeTemp = (celsiusFeelsLikeTemp * 9) / 5 + 32;
  let farenheitFellsLikeRounded = Math.round(farenheitFellsLikeTemp);
  let feelsElement = document.querySelector("#feels");
  feelsElement.innerHTML = `${farenheitFellsLikeRounded}°F`;
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector(".temperature");
  let temperature = Math.round(celsiusTemperature);
  temperatureElement.innerHTML = `${temperature}°C`;

  let feelsElement = document.querySelector("#feels");
  let celsiusFeelsLikeRounded = Math.round(celsiusFeelsLikeTemp);
  feelsElement.innerHTML = `${celsiusFeelsLikeRounded}°C`;
}

let celsiusTemperature = null;
let celsiusFeelsLikeTemp = null;

let input = document.querySelector("form");
input.addEventListener("submit", currentCity);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

function showTemperature(response) {
  console.log(response);
  let city = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city}`;

  let temperature = Math.round(response.data.main.temp);
  document.querySelector(".temperature").innerHTML = `${temperature}°C`;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  let feelsLike = Math.round(response.data.main.feels_like);
  document.querySelector("#feels").innerHTML = `${feelsLike}°C`;

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
  celsiusFeelsLikeTemp = response.data.main.feels_like;
}

function displayforcast(response) {
  console.log(response.data);
}

function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=london&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showForecast);
}

function showForecast(response) {
  let first = response.data.list[0];
  let second = response.data.list[1];
  let third = response.data.list[2];
  let fourth = response.data.list[3];
  let fifth = response.data.list[4];
  console.log(first);
  let forecast = document.querySelector(".forecast");
  forecast.innerHTML = `
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-5">
            <div class="col"><p id="hour">${getTime(first.dt)}</p>
              <p>${Math.round(first.main.temp_max)}° | ${Math.round(first.main.temp_min)}°</p>
              <p class="weather-icon">
                        <img src="http://openweathermap.org/img/wn/${
                          first.weather[0].icon
                        }@2x.png" alt="" id="icon">
              </p>
            </div>
            
            <div class="col"><p id="hour">${getTime(second.dt)}</p>
              <p>${Math.round(second.main.temp_max)}° | ${Math.round(second.main.temp_min)}°</p>
              <p class="weather-icon">
                        <img src="http://openweathermap.org/img/wn/${
                        second.weather[0].icon
                        }@2x.png" alt="" id="icon">
              </p>
            </div>


                                    <div class="col"><p id="hour">${getTime(third.dt)}</p>
              <p>${Math.round(third.main.temp_max)}° | ${Math.round(third.main.temp_min)}°</p>
              <p class="weather-icon">
                        <img src="http://openweathermap.org/img/wn/${
    third.weather[0].icon
                        }@2x.png" alt="" id="icon">
              </p>
            </div>
                                    <div class="col"><p id="hour">${getTime(fourth.dt)}</p>
              <p>${Math.round(fourth.main.temp_max)}° | ${Math.round(fourth.main.temp_min)}°</p>
              <p class="weather-icon">
                        <img src="http://openweathermap.org/img/wn/${
    fourth.weather[0].icon
                        }@2x.png" alt="" id="icon">
              </p>
            </div>
                                    <div class="col"><p id="hour">${getTime(fifth.dt)}</p>
              <p>${Math.round(fifth.main.temp_max)}° | ${Math.round(fifth.main.temp_min)}°</p>
              <p class="weather-icon">
                        <img src="http://openweathermap.org/img/wn/${
    fifth.weather[0].icon
                        }@2x.png" alt="" id="icon">
              </p>
            </div>
          </div>`;

}

function getTime(timestamp) {
  let time = new Date(timestamp * 1000);
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

let locationButton = document.querySelector("button");
locationButton.addEventListener("click", getLocation);
function getLocation(event) {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
navigator.geolocation.getCurrentPosition(retrievePosition);
