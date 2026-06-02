"use strict";

const API_KEY = "fdcf37dd48aa42d3a02144556262805";
const API_KEY_GEO = "9d12bb45-7f4f-4eea-a5b2-6a931e02dcaf";
const REQUEST_TIMEOUT = 5000;

const container = document.querySelector(".container");
const weatherContainer = document.querySelector(".weather-container");
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const geolocationBtn = document.querySelector(".btn-geolocation");
const futureContainer = document.querySelector(".future-days");

const renderWeather = function (weather) {
  const html = `
    <div class="weather-data">
        <h4 class="city">${weather.city}</h4>
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
  weatherContainer.insertAdjacentHTML("beforeEnd", html);
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
  container.insertAdjacentHTML("beforeend", html);
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
  try {
    const data = await fetchJSON(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${query}&aqi=no`,
      "Город не найден",
    );

    console.log(data);
    return data;
  } catch (err) {
    renderError(err.message);
  }
};

// getJSONWeather("moscow");

const createObjectCurrent = function (data) {
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
    const city = searchInput.value;
    const dataCity = await getJSONWeather(city);
    const weather = createObjectCurrent(dataCity);

    clearWeather();
    renderWeather(weather);
  } catch (err) {
    console.error(err);
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
    const weather = createObjectCurrent(dataCity);

    clearWeather();
    renderWeather(weather);
  } catch (err) {
    renderError(err.message);
  }
};

searchBtn.addEventListener("click", searchLocation);
geolocationBtn.addEventListener("click", findLocation);
searchInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    searchLocation();
  }
});

const futureData = async function (city, days) {
  const response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=${days}&aqi=no&alerts=no
`,
  );
  const data = await response.json();
  return data;
};

const pos = await futureData("Voronezh", 3);
console.log(pos);

const createObjectFuture = function (data) {
  const objArr = [];
  for (let i = 0; i < data.forecast.forecastday.length; i++) {
    objArr.push({
      date: data.forecast.forecastday[i].date,
      maxTemp: data.forecast.forecastday[i].day.maxtemp_c,
      minTemp: data.forecast.forecastday[i].day.mintemp_c,
    });
  }
  return objArr;
};

console.log(createObjectFuture(pos));
