// файл для отслеживания действий пользователя
"use strict";
import * as model from "./model.js";
import View from "./view.js";
import * as config from "./config.js";

const searchLocation = async function () {
  try {
    const city = View.searchInput.value;
    const dataCity = await model.getJSONWeatherByName(city);
    const weather = model.createObjectCurrent(dataCity);
    console.log(weather);

    model.currentWeather = weather;
    console.log(model.currentWeather);
    model.showHourly = true;
    View.clearWeather();
    View.renderWeather(weather);
    if (model.showHourly === true) View.renderHourWeather(weather);
    if (model.showHourly !== true) View.renderFutureWeather(weather);
  } catch (err) {
    console.error(err);
    View.renderError(err.message);
  }
};

const findLocation = async function () {
  try {
    const pos = await model.getPosition();
    const { latitude, longitude } = pos.coords;
    const dataCity = await model.getJSONWeatherByCoords(latitude, longitude);
    const weather = model.createObjectCurrent(dataCity);
    console.log(weather);
    model.showHourly = true;
    model.currentWeather = weather;
    console.log(model.currentWeather);

    View.clearWeather();
    View.renderWeather(weather);
    if (model.showHourly === true) View.renderHourWeather(weather);
    if (model.showHourly !== true) View.renderFutureWeather(weather);
  } catch (err) {
    View.renderError(err.message);
    console.error(err);
  }
};

const toggleForecast = function () {
  if (!model.currentWeather) return;

  View.futureContainer.innerHTML = "";

  model.showHourly = !model.showHourly;

  if (model.showHourly) {
    View.renderHourWeather(model.currentWeather);
  } else {
    View.renderFutureWeather(model.currentWeather);
  }

  View.changeForecastButton(model.showHourly);
};

View.geolocationBtn.addEventListener("click", findLocation);
View.searchInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    searchLocation();
  }
});

View.searchBtn.addEventListener("click", searchLocation);
View.addHandlerToggleForecast(toggleForecast);
