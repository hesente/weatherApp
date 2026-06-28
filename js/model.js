// файл api и данных
import View from "./view.js";
import { API_KEY, API_KEY_GEO, REQUEST_TIMEOUT } from "./config.js";

let currentWeather = null;
let showHourly = true;

export const fetchJSON = async function (url, errorMessage = "Request failed") {
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

export const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

export const getJSONWeatherByName = async function (query, days = 4) {
  try {
    const data = await fetchJSON(
      `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${query}&days=${days}&aqi=no&alerts=no`,
      "Город не найден",
    );

    console.log(data);
    return data;
  } catch (err) {
    View.renderError(err.message);
    console.error(err);
  }
};

export const getJSONWeatherByCoords = async function (lat, long, days = 4) {
  try {
    const data = await fetchJSON(
      `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${long}&days=${days}&aqi=no&alerts=no`,
      "Город не найден",
    );

    console.log(data);
    return data;
  } catch (err) {
    View.renderError(err.message);
    console.error(err);
  }
};

export const createObjectCurrent = function (data) {
  return {
    city: data.location.name,
    temperature: data.current.temp_c,
    windSpeed: data.current.wind_kph,
    weather: data.current.condition.text,
    weatherIcon: data.current.condition.icon,
    futureWeather: data.forecast.forecastday,
    hourWeather: data.forecast.forecastday[0].hour,
  };
};
