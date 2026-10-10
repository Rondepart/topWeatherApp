import * as weatherModel from "./weatherModel.js";
import * as weatherUI from "./weatherUI.js";

const weatherForm = document.querySelector("#weather-form");
const locationInput = document.querySelector(".location");
const locationError = document.querySelector(".location-error");

weatherForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const location = locationInput.value.trim();
  if (!location) {
    locationInput.value = "";
    locationError.textContent = "Please enter a location.";
    return;
  }

  locationError.textContent = "";

  try {
    const weatherData = await weatherModel.getWeatherData(location);
    const weatherToday = weatherModel.getWeatherToday(weatherData);
    console.log(weatherToday);
    weatherUI.displayWeatherToday(weatherToday);
  } catch (error) {
    if (error.status === 400) {
      locationError.textContent = "Could not find the country, try a city.";
    } else {
      locationError.textContent = `Something went wrong please try again later. ${error.message}`;
    }
  }
});
