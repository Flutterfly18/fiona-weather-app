// Display current date and time

setInterval(displayTimeAndDate, 1000);

function displayTimeAndDate() {
  let now = new Date();
  let date = now.getDate();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let year = now.getFullYear();
  let seconds = now.getSeconds();

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

  let month = months[now.getMonth()];

  let weatherAppDate = document.querySelector("#weather-app-date");

  let formattedSeconds;
  let formattedHours;
  let formattedMinutes;
  let timeOfDay;

  if (seconds < 10) {
    formattedSeconds = `0${seconds}`;
  } else {
    formattedSeconds = seconds;
  }

  if (hours < 10) {
    formattedHours = `0${hours}`;
  } else {
    formattedHours = hours;
  }

  if (minutes < 10) {
    formattedMinutes = `0${minutes}`;
  } else {
    formattedMinutes = minutes;
  }

  if (hours >= 12) {
    timeOfDay = `PM`;
  } else {
    timeOfDay = `AM`;
  }
  weatherAppDate.innerHTML = `${day} ${month} ${date} ${year} | ${formattedHours}:${formattedMinutes}:${formattedSeconds} ${timeOfDay}`;
}

// Get "Check any city" API

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = document.querySelector("#city");
  city.innerHTML = `${cityInput.value}`;
  let apiKey = "296bbd25cf751626773497b46903a318";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let h1 = document.querySelector("#temperature");
  let cityTemp = document.querySelector("#city-temp");
  cityTemp.innerHTML = temperature;
  emojiTempCelsius(temperature);

  // Convert displayed temperature to Fahrenheit

  function displayFahrenheitTemp(event) {
    event.preventDefault();

    let tempFahrenheit = document.querySelector("#city-temp");
    let fahrenheit = Math.round((temperature * 9) / 5 + 32);
    tempFahrenheit.innerHTML = fahrenheit;
    emojiTempFahrenheit(fahrenheit);
  }

  let displayFahrenheit = document.querySelector("#fahrenheit");
  displayFahrenheit.addEventListener("click", displayFahrenheitTemp);

  // Convert displayed temperature to Celsius

  function displayCelsiusTemp(event) {
    event.preventDefault();
    let tempCelsius = document.querySelector("#city-temp");
    tempCelsius.innerHTML = temperature;
    emojiTempCelsius(temperature);
  }

  let displayCelsius = document.querySelector("#celsius");
  displayCelsius.addEventListener("click", displayCelsiusTemp);
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", search);

// Get "Check current city" API

function checkCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "296bbd25cf751626773497b46903a318";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentTemperature);
}

let cityCurrentForm = document.querySelector("#button-addon2");
cityCurrentForm.addEventListener("click", checkCurrentLocation);

function showCurrentTemperature(response) {
  let currentCityTemperature = Math.round(response.data.main.temp);
  let currentCity = response.data.name;
  let city = document.querySelector("#city");
  city.innerHTML = `${currentCity}`;
  let cityTemp = document.querySelector("#city-temp");
  cityTemp.innerHTML = `${currentCityTemperature}`;
  emojiTempCelsius(currentCityTemperature);

  // Convert displayed current location temperature to Fahrenheit (inside showCurrentTemperature function)

  function displayFahrenheitTemp(event) {
    event.preventDefault();
    let tempFahrenheit = document.querySelector("#city-temp");
    let fahrenheit = Math.round((currentCityTemperature * 9) / 5 + 32);
    tempFahrenheit.innerHTML = fahrenheit;
    emojiTemp(fahrenheit);
  }

  let changeFahrenheit = document.querySelector("#fahrenheit");
  changeFahrenheit.addEventListener("click", displayFahrenheitTemp);

  function displayCelsiusTemp(event) {
    event.preventDefault();
    let tempCelsius = document.querySelector("#city-temp");
    tempCelsius.innerHTML = currentCityTemperature;
    emojiTempCelsius(currentCityTemperature);
  }

  // Convert displayed current location temperature to Celsius (inside showCurrentTemperature function)

  let displayCelsius = document.querySelector("#celsius");
  displayCelsius.addEventListener("click", displayCelsiusTemp);
}
// If Else statement (celsius and fahrenheit)

function emojiTempCelsius(temperature) {
  let displayEmoji = document.querySelector("#city-temp-emoji");
  if (temperature < 10) {
    displayEmoji.innerHTML = `🥶`;
  } else if (temperature < 13) {
    displayEmoji.innerHTML = `🤔`;
  } else {
    displayEmoji.innerHTML = `😎`;
  }
}

function emojiTempFahrenheit(temperature) {
  let displayEmoji = document.querySelector("#city-temp-emoji");
  if (temperature < 51) {
    displayEmoji.innerHTML = `🥶`;
  } else if (temperature < 55.4) {
    displayEmoji.innerHTML = `🤔`;
  } else {
    displayEmoji.innerHTML = `😎`;
  }
}

// Automatic function calls

navigator.geolocation.getCurrentPosition(showPosition);
