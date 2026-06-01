"use strict";

const API_KEY = "fdcf37dd48aa42d3a02144556262805";
const API_KEY_GEO = "9d12bb45-7f4f-4eea-a5b2-6a931e02dcaf";

const elements = {
  container: document.querySelector(".container"),
  weatherData: document.querySelector(".weather-data"),
  searchInput: document.querySelector(".search-input"),
  searchBtn: document.querySelector(".search-btn"),
  geolocationBtn: document.querySelector(".btn-geolocation"),
};

const getWeatherUrl = function (query) {
  return `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${query}&aqi=no`;
};

const getGeocodeUrl = function (latitude, longitude) {
  return `https://catalog.api.2gis.com/3.0/items/geocode?lat=${latitude}&lon=${longitude}&fields=items.point&key=${API_KEY_GEO}`;
};

// One function for all fetch requests: it returns parsed JSON or throws an error.
const fetchJson = async function (url) {
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.error?.message || "Request failed");
  }

  return data;
};

// Convert API response into the object format that renderWeather expects.
const createWeatherModel = function (data) {
  return {
    city: data.location.name,
    temperature: data.current.temp_c,
    windSpeed: data.current.wind_kph,
    weather: data.current.condition.text,
  };
};

const renderWeather = function (weather) {
  const html = `
    <h4 class="city">${weather.city}</h4>
    <p class="temperature">
      <span>
        <img
          src="images/temperature-svgrepo-com.svg"
          class="temperature-icon"
          alt=""
        />
      </span>
      ${weather.temperature}&deg;C <span class="weather">${weather.weather}</span>
    </p>
    <p class="wind">
      <span>
        <img src="images/wind-svgrepo-com.svg" class="wind-icon" alt="" />
      </span>
      ${weather.windSpeed} km/h
    </p>
  `;

  elements.weatherData.innerHTML = html;
  elements.weatherData.style.display = "block";
};

const renderError = function (message) {
  elements.weatherData.innerHTML = `<p>${message}</p>`;
  elements.weatherData.style.display = "block";
};

const getWeatherByCity = async function (city) {
  const data = await fetchJson(getWeatherUrl(city));
  return createWeatherModel(data);
};

const getCurrentPosition = function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const getCityByCoords = async function (latitude, longitude) {
  const data = await fetchJson(getGeocodeUrl(latitude, longitude));
  const firstResult = data.result?.items?.[0];

  if (!firstResult) {
    throw new Error("City was not found by your coordinates");
  }

  return firstResult.name;
};

const searchLocation = async function () {
  try {
    const city = elements.searchInput.value.trim();

    if (!city) {
      renderError("Enter city name");
      return;
    }

    const weather = await getWeatherByCity(city);

    renderWeather(weather);
    elements.searchInput.value = "";
  } catch (err) {
    renderError(err.message);
  }
};

const findLocation = async function () {
  try {
    if (!navigator.geolocation) {
      throw new Error("Geolocation is not supported in this browser");
    }

    const position = await getCurrentPosition();
    const { latitude, longitude } = position.coords;
    const city = await getCityByCoords(latitude, longitude);
    const weather = await getWeatherByCity(city);

    renderWeather(weather);
  } catch (err) {
    renderError(err.message);
  }
};

elements.searchBtn.addEventListener("click", searchLocation);
elements.geolocationBtn.addEventListener("click", findLocation);
