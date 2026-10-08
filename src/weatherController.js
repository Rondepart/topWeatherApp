import * as weatherModel from "./weatherModel.js";

const weatherForm = document.querySelector("#weather-form");
const locationInput = document.querySelector(".location");

weatherForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const location = locationInput.value.trim();
    if(!location) {
        locationInput.setCustomValidity("Please enter a location.");
        locationInput.reportValidity();
        return;
    }

    locationInput.setCustomValidity("");

    const weatherData = await weatherModel.getWeatherData(location);
    weatherModel.getWeatherToday(weatherData);
});