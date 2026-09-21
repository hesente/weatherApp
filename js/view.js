// файл для отображений на странице
class View {
  constructor() {
    this.container = document.querySelector(".container");
    this.weatherContainer = document.querySelector(".weather-data");
    this.currentWeatherGrid = document.querySelector(".current-weather-grid");
    this.searchInput = document.querySelector(".search-input");
    this.searchBtn = document.querySelector(".btn-search");
    this.geolocationBtn = document.querySelector(".btn-geolocation");
    this.futureContainer = document.querySelector(".future-days");
    this.buttonHourWeather = document.querySelector(".watch-hour-weather");
    this.futureDaysWeatherContainer = document.querySelector(
      ".future-days-weather",
    );
  }

  renderWeather(weather) {
    const html = `
      <div class="current-weather-top">
            <img src="${weather.currentWeather.weatherIcon}" alt="weather_icon" class="weather-icon" />
            <div>
              <h4 class="city">${weather.currentWeather.city}</h4>
              <p class="will-it-rain">В ближайшее время осадков не ожидается</p>
            </div>
            <div class="temperature-container">
              <p class="temperature">${weather.currentWeather.temperature}<span class="gradus">&deg;</span></p>
              <p class="weather">${weather.currentWeather.weather}</p>
            </div>
          
  `;
    this.weatherContainer.insertAdjacentHTML("afterbegin", html);
  }

  renderCurrentHourslyWeather(weather) {
    const html = `
    <div class="feels-wind-container">
              <p class="feels-like">
                <span class="feels-like-icon"
                  ><svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 15H11C10.735 14.9992 10.4811 14.8936 10.2938 14.7062C10.1064 14.5189 10.0008 14.265 10 14V10.5C9.73503 10.4992 9.48114 10.3936 9.29377 10.2062C9.10641 10.0189 9.00079 9.76497 9 9.5V6.5C8.99641 6.30203 9.03275 6.10536 9.10686 5.92175C9.18097 5.73814 9.29133 5.57135 9.43134 5.43134C9.57135 5.29133 9.73814 5.18097 9.92175 5.10686C10.1054 5.03275 10.302 4.99641 10.5 5H13.5C13.698 4.99641 13.8946 5.03275 14.0783 5.10686C14.2619 5.18097 14.4287 5.29133 14.5687 5.43134C14.7087 5.57135 14.819 5.73814 14.8931 5.92175C14.9673 6.10536 15.0036 6.30203 15 6.5V9.5C14.9992 9.76497 14.8936 10.0189 14.7062 10.2062C14.5189 10.3936 14.265 10.4992 14 10.5V14C13.9992 14.265 13.8936 14.5189 13.7062 14.7062C13.5189 14.8936 13.265 14.9992 13 15ZM10.5 6C10.4333 5.99599 10.3665 6.00618 10.304 6.02989C10.2415 6.05359 10.1848 6.09029 10.1375 6.13754C10.0903 6.1848 10.0536 6.24154 10.0299 6.30402C10.0062 6.3665 9.99599 6.43329 10 6.5V9.5H11V14H13V9.5H14V6.5C14.004 6.43329 13.9938 6.3665 13.9701 6.30402C13.9464 6.24154 13.9097 6.1848 13.8625 6.13754C13.8152 6.09029 13.7585 6.05359 13.696 6.02989C13.6335 6.00618 13.5667 5.99599 13.5 6H10.5ZM12 4.5C11.6044 4.5 11.2178 4.3827 10.8889 4.16294C10.56 3.94318 10.3036 3.63082 10.1522 3.26537C10.0009 2.89992 9.96126 2.49778 10.0384 2.10982C10.1156 1.72186 10.3061 1.36549 10.5858 1.08579C10.8655 0.806082 11.2219 0.615601 11.6098 0.53843C11.9978 0.46126 12.3999 0.500867 12.7654 0.652242C13.1308 0.803617 13.4432 1.05996 13.6629 1.38886C13.8827 1.71776 14 2.10444 14 2.5C13.9987 3.03003 13.7875 3.53797 13.4128 3.91276C13.038 4.28754 12.53 4.49868 12 4.5ZM12 1.5C11.8022 1.5 11.6089 1.55865 11.4444 1.66853C11.28 1.77841 11.1518 1.93459 11.0761 2.11732C11.0004 2.30004 10.9806 2.50111 11.0192 2.69509C11.0578 2.88907 11.153 3.06726 11.2929 3.20711C11.4327 3.34696 11.6109 3.4422 11.8049 3.48079C11.9989 3.51937 12.2 3.49957 12.3827 3.42388C12.5654 3.34819 12.7216 3.22002 12.8315 3.05557C12.9414 2.89112 13 2.69778 13 2.5C12.9992 2.23503 12.8936 1.98113 12.7062 1.79377C12.5189 1.6064 12.265 1.50079 12 1.5ZM5 10.092V6H4V10.092C3.6664 10.2099 3.38523 10.442 3.20619 10.7472C3.02715 11.0524 2.96177 11.4111 3.02161 11.7599C3.08144 12.1086 3.26264 12.425 3.53317 12.6531C3.80371 12.8811 4.14616 13.0062 4.5 13.0062C4.85385 13.0062 5.1963 12.8811 5.46683 12.6531C5.73737 12.425 5.91857 12.1086 5.9784 11.7599C6.03824 11.4111 5.97286 11.0524 5.79382 10.7472C5.61478 10.442 5.33361 10.2099 5 10.092Z"
                      fill="#000000"
                    />
                    <path
                      d="M4.50001 15C3.811 15.0008 3.13711 14.798 2.56298 14.417C1.98884 14.0361 1.54005 13.494 1.27296 12.8589C1.00587 12.2238 0.932391 11.5239 1.06174 10.8471C1.19109 10.1703 1.51751 9.54687 2.00001 9.055V3.5C2.00001 2.83696 2.2634 2.20107 2.73224 1.73223C3.20108 1.26339 3.83697 1 4.50001 1C5.16305 1 5.79893 1.26339 6.26777 1.73223C6.73662 2.20107 7.00001 2.83696 7.00001 3.5V9.055C7.4825 9.54687 7.80892 10.1703 7.93827 10.8471C8.06762 11.5239 7.99414 12.2238 7.72705 12.8589C7.45996 13.494 7.01117 14.0361 6.43704 14.417C5.8629 14.798 5.18902 15.0008 4.50001 15ZM4.50001 2C4.1023 2.0004 3.721 2.15856 3.43979 2.43978C3.15857 2.721 3.0004 3.1023 3.00001 3.5V9.4915L2.83401 9.641C2.45645 9.97846 2.19027 10.4226 2.0707 10.9147C1.95113 11.4068 1.98381 11.9235 2.16442 12.3966C2.34502 12.8697 2.66504 13.2768 3.0821 13.564C3.49917 13.8512 3.99362 14.005 4.50001 14.005C5.0064 14.005 5.50085 13.8512 5.91791 13.564C6.33498 13.2768 6.65499 12.8697 6.8356 12.3966C7.0162 11.9235 7.04889 11.4068 6.92932 10.9147C6.80975 10.4226 6.54357 9.97846 6.16601 9.641L6.00001 9.4915V3.5C5.99961 3.1023 5.84145 2.721 5.56023 2.43978C5.27901 2.15856 4.89771 2.0004 4.50001 2Z"
                      fill="#000000"
                    />
                  </svg> </span
                >Ощущается как ${weather.currentWeather.feelsLike}&deg;
              </p>
              <div class="wind-container-flex">
                <svg
                  width="23"
                  height="23"
                  viewBox="0 0 23 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.18752 7.52392C7.26754 5.46589 8.95996 3.83337 11.0209 3.83337C12.027 3.84928 12.9866 4.26015 13.6925 4.97731C14.3984 5.69447 14.7941 6.66042 14.7941 7.66671C14.7941 8.673 14.3984 9.63895 13.6925 10.3561C12.9866 11.0733 12.027 11.4841 11.0209 11.5H2.51565C2.35679 11.5 2.20444 11.4369 2.09212 11.3246C1.97979 11.2123 1.91669 11.0599 1.91669 10.9011C1.91669 10.7422 1.97979 10.5899 2.09212 10.4776C2.20444 10.3652 2.35679 10.3021 2.51565 10.3021H11.0209C11.7198 10.3021 12.3901 10.0243 12.8843 9.53006C13.3785 9.03578 13.6561 8.36542 13.656 7.66647C13.656 6.96751 13.3782 6.29721 12.884 5.80302C12.3897 5.30883 11.7193 5.03123 11.0204 5.03129C10.3382 5.03202 9.68284 5.29675 9.19155 5.77C8.70026 6.24324 8.4112 6.88827 8.38496 7.56992C8.37714 7.72742 8.30753 7.87548 8.19123 7.98198C8.07492 8.08847 7.92131 8.1448 7.76373 8.13875C7.60616 8.13269 7.45732 8.06474 7.34954 7.94963C7.24175 7.83452 7.1837 7.68155 7.188 7.52392M15.3976 11.5297C15.5548 10.905 15.9162 10.3506 16.4243 9.95462C16.9325 9.55861 17.5584 9.34363 18.2026 9.34379C19.7886 9.34379 21.0838 10.6289 21.0838 12.2188C21.0838 12.9813 20.7809 13.7126 20.2418 14.2517C19.7026 14.7909 18.9713 15.0938 18.2088 15.0938H16.5758C16.8514 15.514 17.0109 16.0157 17.0109 16.5505C17.0109 17.9779 15.8552 19.1667 14.4129 19.1667C13.9303 19.1669 13.4573 19.0326 13.0468 18.7789C12.6363 18.5253 12.3046 18.1623 12.0889 17.7306L12.0429 17.6377C12.007 17.5673 11.9854 17.4904 11.9793 17.4116C11.9733 17.3328 11.9829 17.2536 12.0076 17.1785C12.0323 17.1034 12.0716 17.0339 12.1233 16.9741C12.175 16.9143 12.238 16.8653 12.3087 16.8299C12.3794 16.7946 12.4564 16.7736 12.5352 16.7681C12.6141 16.7627 12.6933 16.7729 12.7682 16.7982C12.8431 16.8235 12.9122 16.8633 12.9716 16.9155C13.031 16.9676 13.0795 17.031 13.1143 17.102L13.1608 17.1949C13.277 17.4275 13.4557 17.6231 13.6769 17.7598C13.898 17.8965 14.1529 17.9689 14.4129 17.9688C15.1791 17.9688 15.813 17.3305 15.813 16.5505C15.813 15.7493 15.1623 15.0938 14.3755 15.0938H2.51565C2.35679 15.0938 2.20444 15.0307 2.09212 14.9184C1.97979 14.806 1.91669 14.6537 1.91669 14.4948C1.91669 14.336 1.97979 14.1836 2.09212 14.0713C2.20444 13.959 2.35679 13.8959 2.51565 13.8959H18.2084C18.6531 13.8959 19.0797 13.7192 19.3942 13.4047C19.7087 13.0902 19.8854 12.6636 19.8854 12.2188C19.8854 11.2945 19.1303 10.5417 18.2021 10.5417C17.825 10.5416 17.4587 10.6674 17.1612 10.899C16.8636 11.1307 16.6519 11.455 16.5595 11.8206L16.5135 12.0046C16.475 12.1588 16.3769 12.2913 16.2406 12.3731C16.1044 12.4548 15.9413 12.4792 15.7871 12.4406C15.633 12.4021 15.5004 12.304 15.4187 12.1677C15.3369 12.0315 15.3126 11.8684 15.3511 11.7142L15.3976 11.5297Z"
                    fill="#000000"
                  />
                </svg>

                <p class="wind">${weather.currentWeather.windSpeed} м/с</p>
              </div>
            </div>

            <div class="hours-weather-container">
              <div class="hours-weather-card">
                <p class="day">07:00</p>
                <img
                  src="${weather.currentWeather.hourWeather[7].condition.icon}"
                  alt="weather-next"
                  class="weather-img"
                />
                <p class="weather-next-day">${weather.currentWeather.hourWeather[7].temp_c}&#176;</p>
              </div>

              <div class="hours-weather-card">
                <p class="day">14:00</p>
                <img
                  src="${weather.currentWeather.hourWeather[14].condition.icon}"
                  alt="weather-next"
                  class="weather-img"
                />
                <p class="weather-next-day">${weather.currentWeather.hourWeather[14].temp_c}&#176;</p>
              </div>

              <div class="hours-weather-card">
                <p class="day">21:00</p>
                <img
                  src="${weather.currentWeather.hourWeather[21].condition.icon}"
                  alt="weather-next"
                  class="weather-img"
                />
                <p class="weather-next-day">${weather.currentWeather.hourWeather[21].temp_c}&#176;</p>
              </div>
            </div>
    `;

    this.currentWeatherGrid.insertAdjacentHTML("beforeend", html);
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

  renderFutureWeatherCrutch(weather) {
    const html = `
     <div class="future-days-card">
          <div class="day-weather">
            <p class="day-of-week">Пн</p>
            <img
              src="${weather.currentWeather.futureWeather[1].hour[14].condition.icon}"
              alt="weather-next"
              class="future-weather-img"
            />
          </div>
          <div class="future-hoursly-row">
            <p>7:00</p>
            <p>${weather.currentWeather.futureWeather[1].hour[7].temp_c}&#176;</p>
            <img
              src="${weather.currentWeather.futureWeather[1].hour[7].condition.icon}"
              alt="weather-next"
              class="future-weather-img"
            />
          </div>
          <div class="future-hoursly-row">
            <p>14:00</p>
            <p>${weather.currentWeather.futureWeather[1].hour[14].temp_c}&#176;</p>
            <img
              src="${weather.currentWeather.futureWeather[1].hour[14].condition.icon}"
              alt="weather-next"
              class="future-weather-img"
            />
          </div>
          <div class="future-hoursly-row">
            <p>21:00</p>
            <p>${weather.currentWeather.futureWeather[1].hour[21].temp_c}&#176;</p>
            <img
              src="${weather.currentWeather.futureWeather[1].hour[21].condition.icon}"
              alt="weather-next"
              class="future-weather-img"
            />
          </div>
        </div>
        <div class="future-days-card">
          <div class="day-weather">
            <p class="day-of-week">Пн</p>
            <img
              src="${weather.currentWeather.futureWeather[2].hour[14].condition.icon}"
              alt="weather-next"
              class="future-weather-img"
            />
          </div>
          <div class="future-hoursly-row">
            <p>7:00</p>
            <p>${weather.currentWeather.futureWeather[2].hour[7].temp_c}&#176;</p>
            <img
              src="${weather.currentWeather.futureWeather[2].hour[7].condition.icon}"
              alt="weather-next"
              class="future-weather-img"
            />
          </div>
          <div class="future-hoursly-row">
            <p>14:00</p>
            <p>${weather.currentWeather.futureWeather[2].hour[14].temp_c}&#176;</p>
            <img
              src="${weather.currentWeather.futureWeather[2].hour[14].condition.icon}"
              alt="weather-next"
              class="future-weather-img"
            />
          </div>
          <div class="future-hoursly-row">
            <p>21:00</p>
            <p>${weather.currentWeather.futureWeather[2].hour[21].temp_c}&#176;</p>
            <img
              src="${weather.currentWeather.futureWeather[2].hour[21].condition.icon}"
              alt="weather-next"
              class="future-weather-img"
            />
          </div>
        </div>
        <div class="future-days-card">
          <div class="day-weather">
            <p class="day-of-week">Пн</p>
            <img
              src="${weather.currentWeather.futureWeather[3].hour[14].condition.icon}"
              alt="weather-next"
              class="future-weather-img"
            />
          </div>
          <div class="future-hoursly-row">
            <p>7:00</p>
            <p>${weather.currentWeather.futureWeather[3].hour[7].temp_c}&#176;</p>
            <img
              src="${weather.currentWeather.futureWeather[3].hour[7].condition.icon}"
              alt="weather-next"
              class="future-weather-img"
            />
          </div>
          <div class="future-hoursly-row">
            <p>14:00</p>
            <p>${weather.currentWeather.futureWeather[3].hour[14].temp_c}&#176;</p>
            <img
              src="${weather.currentWeather.futureWeather[3].hour[14].condition.icon}"
              alt="weather-next"
              class="future-weather-img"
            />
          </div>
          <div class="future-hoursly-row">
            <p>21:00</p>
            <p>${weather.currentWeather.futureWeather[3].hour[21].temp_c}&#176;</p>
            <img
              src="${weather.currentWeather.futureWeather[3].hour[21].condition.icon}"
              alt="weather-next"
              class="future-weather-img"
            />
          </div>
        </div>
        <div class="future-days-card">
          <div class="day-weather">
            <p class="day-of-week">Пн</p>
            <img
              src="${weather.currentWeather.futureWeather[4].hour[14].condition.icon}"
              alt="weather-next"
              class="future-weather-img"
            />
          </div>
          <div class="future-hoursly-row">
            <p>7:00</p>
            <p>${weather.currentWeather.futureWeather[4].hour[7].temp_c}&#176;</p>
            <img
              src="${weather.currentWeather.futureWeather[4].hour[7].condition.icon}"
              alt="weather-next"
              class="future-weather-img"
            />
          </div>
          <div class="future-hoursly-row">
            <p>14:00</p>
            <p>${weather.currentWeather.futureWeather[4].hour[14].temp_c}&#176;</p>
            <img
              src="${weather.currentWeather.futureWeather[4].hour[14].condition.icon}"
              alt="weather-next"
              class="future-weather-img"
            />
          </div>
          <div class="future-hoursly-row">
            <p>21:00</p>
            <p>${weather.currentWeather.futureWeather[4].hour[21].temp_c}&#176;</p>
            <img
              src="${weather.currentWeather.futureWeather[4].hour[21].condition.icon}"
              alt="weather-next"
              class="future-weather-img"
            />
          </div>
        </div>
    `;

    this.futureDaysWeatherContainer.insertAdjacentHTML("beforeend", html);
  }

  /*
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
*/

  clearWeather() {
    const oldWeather = document.querySelector(".weather-data");
    const oldError = document.querySelector(".city");

    if (oldWeather) oldWeather.remove();
    if (oldError) oldError.remove();
    // this.futureContainer.innerHTML = "";
    // this.hourWeatherContainer.innerHTML = "";
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
