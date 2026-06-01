"use strict";

import View from "./view.js";
import { API_KEY, API_KEY_GEO, REQUEST_TIMEOUT } from "./config.js";

const API_KEY = "fdcf37dd48aa42d3a02144556262805";
const API_KEY_GEO = "9d12bb45-7f4f-4eea-a5b2-6a931e02dcaf";
const REQUEST_TIMEOUT = 5000;

// const container = document.querySelector(".container");
// const weatherContainer = document.querySelector(".weather-container");
// const searchInput = document.querySelector(".search-input");
// const searchBtn = document.querySelector(".search-btn");
// const geolocationBtn = document.querySelector(".btn-geolocation");

const renderWeather = function (weather) {
  const html = `
    <div class="weather-data">
        <h4 class="city text-center">${weather.city}</h4>
         <img src="${weather.weatherIcon}" alt="weather_icon" />
        <p class="temperature">
          <span
            ><img
              src="images/temperature-svgrepo-com.svg"
              class="temperature-icon"
          /></span>
          ${weather.temperature}&deg;C <span class="weather">${weather.weather}</span>
        </p>
        <p class="wind">
          <span
            ><img src="images/wind-svgrepo-com.svg" class="wind-icon" /></span
          >${weather.windSpeed}
        </p>
      </div>
  `;
  View.container.insertAdjacentHTML("beforeend", html);
};

const clearWeather = function () {
  const oldWeather = document.querySelector(".weather-data");
  const oldError = document.querySelector(".city");

  if (oldWeather) oldWeather.remove();
  if (oldError) oldError.remove();
};

const renderError = function (message) {
  const html = `
    <h4 class="city">${message}</h4>
  `;
  View.container.insertAdjacentHTML("beforeend", html);
};

const fetchJSON = async function (url, errorMessage = "Request failed") {
  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, REQUEST_TIMEOUT);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || errorMessage);
    }

    return data;
  } catch (err) {
    if (err.name === "AbortError") {
      throw new Error(`API не ответил за ${REQUEST_TIMEOUT / 1000} секунд`);
    }

    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
};

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const getCityByCoords = async function (latitude, longitude) {
  return fetchJSON(
    `https://catalog.api.2gis.com/3.0/items/geocode?lat=${latitude}&lon=${longitude}&fields=items.point&key=${API_KEY_GEO}`,
    "Не удалось получить геоданные",
  );
};

const getJSONWeather = async function (query) {
  const data = await fetchJSON(
    `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${query}&aqi=no`,
    "Город не найден",
  );

  console.log(data);
  return data;
};

// getJSONWeather("moscow");

const createObject = function (data) {
  return {
    city: data.location.name,
    temperature: data.current.temp_c,
    windSpeed: data.current.wind_kph,
    weather: data.current.condition.text,
    weatherIcon: data.current.condition.icon,
  };
};

const searchLocation = async function () {
  try {
    const city = View.searchInput.value;
    const dataCity = await getJSONWeather(city);
    const weather = createObject(dataCity);

    clearWeather();
    renderWeather(weather);
  } catch (err) {
    renderError(err.message);
  }
};

const findLocation = async function () {
  try {
    const pos = await getPosition();
    const { latitude, longitude } = pos.coords;
    const response = await getCityByCoords(latitude, longitude);
    const city = response.result.items[3].full_name;
    const dataCity = await getJSONWeather(city);
    const weather = createObject(dataCity);

    clearWeather();
    renderWeather(weather);
  } catch (err) {
    renderError(err.message);
  }
};

View.searchBtn.addEventListener("click", searchLocation);
View.geolocationBtn.addEventListener("click", findLocation);
View.searchInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    searchLocation();
  }
});

const future = async function (city, date) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/future.json?key=${API_KEY}&q=${city}&dt=${date}`,
  );
  const data = await response.json();
  console.log(response);
  console.log(data);
};
future("voronezh", "2026-06-15"); // конечная дата, на 14 дней.

View.showButton();
