// файл api и данных
import View from "./view.js";
import { API_KEY, API_KEY_GEO, REQUEST_TIMEOUT } from "./config.js";

export let state = {
  currentWeather: null,
  showHourly: true,
};

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

const getFutureDate = function (days) {
  const date = new Date();

  date.setDate(date.getDate() + days);

  return date.toISOString().split("T")[0];
};

export const getJSONWeatherByName = async function (query, days = 4) {
  try {
    const data = await fetchJSON(
      `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${query}&days=${days}&aqi=no&alerts=yes`,
      "Город не найден",
    );

    console.log("Это ответ API погоды", data);
    return data;
  } catch (err) {
    View.renderError(err.message);
    console.error(err);
  }
};

export const getWeatherByDate = async function (query, date) {
  try {
    const data = await fetchJSON(
      `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${query}&dt=${date}&aqi=no&alerts=yes`,
      "Не удалось получить прогноз",
    );

    return data;
  } catch (err) {
    View.renderError(err.message);
    console.error(err);
  }
};

export const getJSONWeatherByCoords = async function (lat, long, days = 4) {
  try {
    const data = await fetchJSON(
      `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${long}&days=${days}&aqi=no&alerts=yes`,
      "Город не найден",
    );

    console.log("Это ответ от API погоды", data);
    return data;
  } catch (err) {
    View.renderError(err.message);
    console.error(err);
  }
};

export const getWeatherByDateCoords = async function (lat, long, date) {
  try {
    const data = await fetchJSON(
      `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${long}&dt=${date}&aqi=no&alerts=yes`,
      "Не удалось получить прогноз",
    );

    return data;
  } catch (err) {
    View.renderError(err.message);
    console.error(err);
  }
};

export const getExtendedWeatherByCoords = async function (lat, long) {
  const date4 = getFutureDate(3);
  const date5 = getFutureDate(4);

  const [firstForecast, forecast4, forecast5] = await Promise.all([
    getJSONWeatherByCoords(lat, long, 3),
    getWeatherByDateCoords(lat, long, date4),
    getWeatherByDateCoords(lat, long, date5),
  ]);

  return {
    ...firstForecast,
    forecast: {
      ...firstForecast.forecast,
      forecastday: [
        ...firstForecast.forecast.forecastday,
        ...forecast4.forecast.forecastday,
        ...forecast5.forecast.forecastday,
      ],
    },
  };
};

export const getExtendedWeatherByName = async function (query) {
  const firstForecast = await getJSONWeatherByName(query, 3);

  const date4 = getFutureDate(3);
  const date5 = getFutureDate(4);

  const [forecast4, forecast5] = await Promise.all([
    getWeatherByDate(query, date4),
    getWeatherByDate(query, date5),
  ]);

  return {
    ...firstForecast,
    forecast: {
      ...firstForecast.forecast,
      forecastday: [
        ...firstForecast.forecast.forecastday,
        ...forecast4.forecast.forecastday,
        ...forecast5.forecast.forecastday,
      ],
    },
  };
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
    feelsLike: data.current.feelslike_c,
    willItRain: data.current.will_it_rain,
    willItSnow: data.current.will_it_snow,
  };
};
