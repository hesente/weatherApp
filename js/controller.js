// файл для отслеживания действий пользователя
"use strict";
import * as model from "./model.js";
import View from "./view.js";
import * as config from "./config.js";

const searchLocation = async function () {
  try {
    const city = View.searchInput.value;
    const dataCity = await model.getJSONWeather(city);
    const weather = model.createObjectCurrent(dataCity);
    console.log(weather);
    View.clearWeather();
    View.renderWeather(weather);
    View.renderFutureWeather(weather);
  } catch (err) {
    console.error(err);
    View.renderError(err.message);
  }
};

const findLocation = async function () {
  try {
    const pos = await model.getPosition();
    const { latitude, longitude } = pos.coords;
    const response = await model.getCityByCoords(latitude, longitude);
    const city = response.result.items[3].full_name;
    const dataCity = await model.getJSONWeather(city);
    const weather = model.createObjectCurrent(dataCity);

    View.clearWeather();
    View.renderWeather(weather);
    View.renderFutureWeather(weather);
  } catch (err) {
    renderError(err.message);
  }
};

View.geolocationBtn.addEventListener("click", findLocation);
View.searchInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    searchLocation();
  }
});

View.searchBtn.addEventListener("click", searchLocation);
