const weatherToday = document.querySelector(".weather-today");
const location = document.querySelector(".resolved-location");
const currentTemp = document.querySelector(".current-temp");
const feelsLike = document.querySelector(".current-feelslike-temp");
const condition = document.querySelector(".current-condition");
const icon = document.querySelector(".current-weather-icon");
const hourlyCards = document.querySelector(".hourly-weather-cards");

export function displayWeatherToday(data) {
  const { currentConditions: current, hours } = data;

  location.textContent = "Current conditions in " + data.location;
  currentTemp.textContent = "temp: " + current.temp;
  feelsLike.textContent = "feels like: " + current.feelsLike;
  condition.textContent = "condition: " + current.conditions;
  icon.textContent = "icon: " + current.icon;

  hourlyCards.innerHTML = "";
  hours.forEach((hour) => {
    const card = document.createElement("div");
    card.classList.add("hour-weather-card");

    const time = document.createElement("div");
    const temp = document.createElement("div");
    const cond = document.createElement("div");
    const hourIcon = document.createElement("div");

    time.textContent = "hour: " + hour.time;
    temp.textContent = "temp: " + hour.temp;
    cond.textContent = "condition: " + hour.conditions;
    hourIcon.textContent = "icon: " + hour.icon;

    card.append(time, temp, cond, hourIcon);
    hourlyCards.appendChild(card);
  });
  weatherToday.hidden = false;
}