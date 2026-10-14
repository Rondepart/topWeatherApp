import * as weatherModel from "./weatherModel.js";
import * as weatherUI from "./weatherUI.js";

const weatherForm = document.querySelector("#weather-form");
const locationInput = document.querySelector(".location-field");
const locationError = document.querySelector(".location-error");
const toggleUnit = document.querySelector(".toggle-unit");

weatherForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const location = locationInput.value.trim();
  if (!location) {
    locationInput.value = "";
    locationError.textContent = "Please enter a location.";
    return;
  }

  locationError.textContent = "";

  await Promise.allSettled([
    loadToday(location),
    loadHistory(location),
  ]);
});

async function loadToday(location) {
  try {
    const weatherData = await weatherModel.getWeatherData(location);
    weatherUI.displayWeatherToday(weatherModel.getWeatherToday(weatherData)); 
  } catch (error) {
    handleWeatherError(error);
  }
}

async function loadHistory(location, days = 7) {
  try {
    const weatherData = await weatherModel.getWeatherData(location, days);
    weatherUI.displayWeatherHistory(weatherModel.getWeatherHistory(weatherData));
  } catch (error) {
    handleWeatherError(error);
  }
}

async function handleWeatherError(error) {
  if (error.status === 400) {
    locationError.textContent = "Could not find the location, try a nearby city.";
  } else {
    locationError.textContent = `Something went wrong please try again later. ${error.message}`;
  }
}

toggleUnit.addEventListener("click", weatherUI.toggleUnit);