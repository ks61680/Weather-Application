let now = new Date();

let dateAndTime = document.querySelector("h3.date");

let hours = now.getHours();
let minutes = now.getMinutes();
let date = now.getDate();
let year = now.getFullYear();

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
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let day = days[now.getDay()];
let month = months[now.getMonth()];
dateAndTime.innerHTML = `${hours}:${minutes}, ${day}, ${month} ${date}, ${year} `;

function currentTemp(response) {
  let h1 = document.querySelector("h1");
  let dayCurrent = document.querySelector("#degree-one");
  let dayHigh = document.querySelector("#degree-two");
  let dayLow = document.querySelector("#degree-three");
  let conditions = document.querySelector("#conditions");
  let dayTemp = Math.round(response.data.main.temp);
  let nowHigh = Math.round(response.data.main.temp_max);
  let nowLow = Math.round(response.data.main.temp_min);
  let humidity = response.data.main.humidity;
  let feelsLike = Math.round(response.data.main.feels_like);
  dayCurrent.innerHTML = `   ${dayTemp}°`;
  dayHigh.innerHTML = `${nowHigh}°`;
  dayLow.innerHTML = `${nowLow}°`;
  h1.innerHTML = response.data.name;
  conditions.innerHTML = `Humidity:${humidity}, Feels Like:${feelsLike}°`;
}

function getCity() {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text");
  let apiKey = `6cbb4d27cc97b6552f879a3445ccd1f5`;
  let city = searchInput.value;
  let units = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(currentTemp);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", getCity);

function retrievePosition(position) {
  let apiKey = `6cbb4d27cc97b6552f879a3445ccd1f5`;
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(currentTemp);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", getCurrentLocation);
