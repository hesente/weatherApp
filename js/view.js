// файл для отображений на странице
class View {
  constructor() {
    this.container = document.querySelector(".container");
    this.weatherContainer = document.querySelector(".weather-container");
    this.searchInput = document.querySelector(".search-input");
    this.searchBtn = document.querySelector(".search-btn");
    this.geolocationBtn = document.querySelector(".btn-geolocation");
    this.futureContainer = document.querySelector(".future-days");
    this.hourWeatherContainer = document.querySelector(".hour-weather");
    this.buttonHourWeather = document.querySelector(".watch-hour-weather");
  }
  renderWeather(weather) {
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

      <button class="watch-hour-weather btn">смотреть прогноз на 3 дня</button>
  `;
    this.weatherContainer.insertAdjacentHTML("beforeEnd", html);
  }

  renderFutureWeather(weather) {
    weather.futureWeather.slice(1).forEach(
      function (el, i) {
        const dateParts = el.date.split("-");
        let displayDate = el.date;
        if (dateParts.length === 3) {
          const dateObj = new Date(
            Number(dateParts[0]),
            Number(dateParts[1]) - 1,
            Number(dateParts[2]),
          );
          if (!isNaN(dateObj.getTime())) {
            let dayName = dateObj.toLocaleDateString("ru-RU", {
              weekday: "short",
            });
            dayName = dayName.replace(".", "");
            displayDate = dayName.charAt(0).toUpperCase() + dayName.slice(1);
          }
        }

        const html = `
    <div class="next-day-card">
          <p class="day">${displayDate}</p>
          <img src="${el.day.condition.icon}" alt="weather-next" />
          <p class="weather-next-day">${el.day.maxtemp_c}&#176;/${el.day.mintemp_c}&#176;</p>
        </div>
    `;
        this.futureContainer.insertAdjacentHTML("beforeend", html);
      }.bind(this),
    );
  }

  renderHourWeather(weather) {
    const allHours = weather.hourWeather;
    // console.log(allHours);
    const hours3 = [allHours[7], allHours[14], allHours[21]];
    // console.log(hours3);

    hours3.forEach(
      function (hours3) {
        const html = `
      <div class="next-day-card">
          <p class="day">${hours3.time.split(" ")[1]}</p>
          <img src="${hours3.condition.icon}" alt="weather-next" />
          <p class="weather-next-day">${hours3.temp_c}</p>
        </div>
      `;

        this.futureContainer.insertAdjacentHTML("beforeend", html);
      }.bind(this),
    );
  }

  clearWeather() {
    const oldWeather = document.querySelector(".weather-data");
    const oldError = document.querySelector(".city");

    if (oldWeather) oldWeather.remove();
    if (oldError) oldError.remove();
    this.futureContainer.innerHTML = "";
    this.hourWeatherContainer.innerHTML = "";
    this.weatherContainer.innerHTML = "";
  }

  renderError(message) {
    const html = `
    <h4 class="city">${message}</h4>
  `;
    this.container.insertAdjacentHTML("beforeend", html);
  }

  changeForecastButton(showHourly) {
    const btn = document.querySelector(".watch-hour-weather");

    if (!btn) return;

    btn.textContent = showHourly
      ? "Смотреть прогноз на 3 дня"
      : "Смотреть почасовой прогноз";
  }

  addHandlerToggleForecast(handler) {
    this.weatherContainer.addEventListener("click", function (e) {
      const btn = e.target.closest(".watch-hour-weather");

      if (!btn) return;

      handler();
    });
  }
}

export default new View();
