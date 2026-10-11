const weatherToday = document.querySelector(".weather-today");
const location = document.querySelector(".resolved-location");
const currentTemp = document.querySelector(".current-temp");
const feelsLike = document.querySelector(".current-feelslike-temp");
const condition = document.querySelector(".current-condition");
const icon = document.querySelector(".current-weather-icon");
const hourlyCards = document.querySelector(".hourly-weather-cards");
const weatherHistory = document.querySelector(".weather-history");
const weatherHistoryCards = document.querySelector(".weather-history-cards");
let unit = "C";

export function displayWeatherToday(data) {
  const { currentConditions: current, hours } = data;

  location.textContent = "Current conditions in " + data.location;
  renderTemp(currentTemp, current.temp);
  renderTemp(feelsLike, current.feelsLike, "feels like");
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
    renderTemp(temp, hour.temp);
    cond.textContent = "condition: " + hour.conditions;
    hourIcon.textContent = "icon: " + hour.icon;

    card.append(time, temp, cond, hourIcon);
    hourlyCards.appendChild(card);
  });
  weatherToday.hidden = false;
}

export function displayWeatherHistory(data) {
  const {days} = data;

  weatherHistoryCards.innerHTML = "";
  days.forEach((day) => {
    const card = document.createElement("div");
    card.classList.add("day-weather-card");

    const datetime = document.createElement("div");
    const temp = document.createElement("div");
    const condition = document.createElement("div");
    const icon = document.createElement("div");

    datetime.textContent = "date: " + day.time;
    renderTemp(temp, day.temp);
    condition.textContent = "condition: " + day.conditions;
    icon.textContent = "icon: " + day.icon;

    card.append(datetime, temp, condition, icon);
    weatherHistoryCards.appendChild(card);
  });
  weatherHistory.hidden = false;
}


function formatTemp(celsius) {
  const value = unit === "C"? celsius : celsius * 9 / 5 + 32;
  return `${Math.round(value)}°${unit}`;
}

function renderTemp(el, celsius, label = "temp") {
  el.classList.add("temp-value");
  el.dataset.celsius = celsius;
  el.dataset.label = label;
  el.textContent = `${label}: ${formatTemp(celsius)}`;
}

export function toggleUnit() {
  unit = unit === "C" ? "F" : "C";
  document.querySelectorAll(".temp-value").forEach((el) => {
    el.textContent = `${el.dataset.label}: ${formatTemp(Number(el.dataset.celsius))}`;
  });
}