// файл для отслеживания действий пользователя
"use strict";
import * as model from "./model.js";
import View from "./view.js";
import * as config from "./config.js";

const searchLocation = async function () {
  try {
    const city = View.searchInput.value;
    const dataCity = await model.getExtendedWeatherByName(city);
    const weather = model.createObjectCurrent(dataCity);
    // console.log(weather);

    model.state.currentWeather = weather;
    console.log("Это state", model.state);
    model.state.showHourly = true;
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
    const dataCity = await model.getExtendedWeatherByCoords(
      latitude,
      longitude,
    );
    const weather = model.createObjectCurrent(dataCity);
    // console.log(weather);
    // model.showHourly = true;
    model.state.currentWeather = weather;
    console.log("Это state", model.state);

    View.clearWeather();
    View.renderWeather(model.state.currentWeather);
    if (model.state.showHourly === true)
      View.renderHourWeather(model.state.currentWeather);
    if (model.state.showHourly !== true)
      View.renderFutureWeather(model.state.currentWeather);
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

/*
const testFuncton = async function () {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=45.2113&longitude=39.5671&daily=temperature_2m_max,temperature_2m_min&hourly=temperature_2m,apparent_temperature,precipitation,wind_speed_10m&models=dwd_icon_seamless&current=precipitation&timezone=Europe%2FMoscow&forecast_days=7`,
  );
  const data = await res.json();
  console.log(`test function`, data);
};

testFuncton();
*/
