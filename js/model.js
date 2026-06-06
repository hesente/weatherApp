// файл api и данных
import View from "./view.js";
import { API_KEY, API_KEY_GEO, REQUEST_TIMEOUT } from "./config.js";

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

export const getCityByCoords = async function (latitude, longitude) {
  return fetchJSON(
    `https://catalog.api.2gis.com/3.0/items/geocode?lat=${latitude}&lon=${longitude}&fields=items.point&key=${API_KEY_GEO}`,
    "Не удалось получить геоданные",
  );
};

export const getJSONWeather = async function (query, days = 3) {
  try {
    const data = await fetchJSON(
      `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${query}&days=${days}&aqi=no&alerts=no`,
      "Город не найден",
    );

    console.log(data);
    return data;
  } catch (err) {
    View.renderError(err.message);
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
  };
};
