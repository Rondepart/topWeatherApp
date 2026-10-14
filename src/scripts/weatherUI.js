import { getIcon } from "./weatherIcons.js";
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
const headerEnd = document.querySelector(".header-end");
const toggleIndicator = document.querySelector(".toggle-indicator");

export function displayWeatherToday(data) {
  const { currentConditions: current, hours } = data;

  location.textContent = "Current conditions in " + data.location;
  renderTemp(currentTemp, current.temp);
  renderTemp(feelsLike, current.feelsLike, "feels like");
  condition.textContent = current.conditions;
  renderIcon(icon, current.icon);

  hourlyCards.innerHTML = "";
  hours.forEach((hour) => {
    const card = document.createElement("div");
    card.classList.add("hour-weather-card");

    const time = document.createElement("div");
    const temp = document.createElement("div");
    const condition = document.createElement("div");
    const hourIcon = document.createElement("div");

    time.textContent = hour.time;
    renderTemp(temp, hour.temp);
    condition.textContent = hour.conditions;
    renderIcon(hourIcon, hour.icon);
    card.append(time, temp, hourIcon, condition);
    hourlyCards.appendChild(card);
  });
  weatherToday.hidden = false;
  headerEnd.classList.add("visible");
}

export function displayWeatherHistory(data) {
  const { days } = data;

  weatherHistoryCards.innerHTML = "";
  days.forEach((day) => {
    const card = document.createElement("div");
    card.classList.add("day-weather-card");

    const datetime = document.createElement("div");
    const temp = document.createElement("div");
    const condition = document.createElement("div");
    const icon = document.createElement("div");

    datetime.textContent = day.time;
    renderTemp(temp, day.temp);
    condition.textContent = day.conditions;
    renderIcon(icon, day.icon);
    card.append(datetime, temp, icon, condition);
    weatherHistoryCards.appendChild(card);
  });
  weatherHistory.hidden = false;
  headerEnd.classList.add("visible");
}

function formatTemp(celsius) {
  const value = unit === "C" ? celsius : (celsius * 9) / 5 + 32;
  return `${Math.round(value)}°${unit}`;
}

function renderTemp(el, celsius, label = "") {
  el.classList.add("temp-value");
  el.dataset.celsius = celsius;
  el.dataset.label = label;
  const elStr =
    label === ""
      ? `${formatTemp(celsius)}`
      : `${label}: ${formatTemp(celsius)}`;
  el.textContent = elStr;
}

export function toggleUnit() {
  unit = unit === "C" ? "F" : "C";
  document.querySelectorAll(".temp-value").forEach((el) => {
    const elStr =
      el.dataset.label === ""
        ? `${formatTemp(Number(el.dataset.celsius))}`
        : `${el.dataset.label}: ${formatTemp(Number(el.dataset.celsius))}`;
    el.textContent = elStr;
    toggleIndicator.textContent = `Toggle Unit: °${unit}`;
  });
}

export async function renderIcon(div, name) {
  const icon = await getIcon(name);
  div.replaceChildren();
  if (!icon) return;

  const img = document.createElement("img");
  img.src = icon;
  img.alt = name;
  div.appendChild(img);
}
