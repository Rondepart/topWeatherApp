import * as weatherModel from "./weatherModel.js";

const weatherForm = document.querySelector("#weather-form");
const locationInput = document.querySelector(".location");

weatherForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const location = locationInput.value.trim();
  if (!location) {
    locationInput.setCustomValidity("Please enter a location.");
    locationInput.reportValidity();
    return;
  }

  locationInput.setCustomValidity("");

  try {
    const weatherData = await weatherModel.getWeatherData(location);
    weatherModel.getWeatherToday(weatherData);
  } catch (error) {
    if (error.status === 400) {
      console.log("Could not find the country, try a city.");
    } else {
      console.log(
        `Something went wrong please try again later. ${error.message}`,
      );
    }
  }
});
