// файл для отображений на странице

class View {
  constructor() {
    this.container = document.querySelector(".container");
    this.weatherContainer = document.querySelector(".weather-container");
    this.searchInput = document.querySelector(".search-input");
    this.searchBtn = document.querySelector(".search-btn");
    this.geolocationBtn = document.querySelector(".btn-geolocation");
  }

  showButton() {
    console.log(this.container);
  }
}

export default new View();
