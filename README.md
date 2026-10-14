# Bophytus
Weather app project made as part of odin project's curriculum

## Live Demo
[Click here](https://rondepart.github.io/topWeatherApp/) to view weather app

## Features
- **Global location search**: look up weather for any city or country, powered by the Visual Crossing Timeline API
- **Current conditions**: temperature, "feels like" temperature, weather description, and a matching icon
- **Hourly forecast for today**: scrollable cards showing temperature, conditions, and an icon for each hour
- **7-day weather history**: a card for each of the last 7 days with average temperature and conditions
- **°C / °F toggle**: switch units instantly without re-fetching data (temperatures are stored in Celsius and converted client-side)
- **Input validation and error handling**: empty input is caught, and a failed lookup shows a friendly "try a nearby city" message instead of crashing

## Built with
- Vanilla JavaScript (ES modules)
- HTML & CSS
- Webpack
- [Visual Crossing Timeline Weather API](https://www.visualcrossing.com/weather-api)

## Project structure
- `weatherModel.js`: fetches and shapes data from the API
- `weatherController.js`: handles form submission, errors, and ties the model to the UI
- `weatherUI.js`: renders the DOM and handles unit conversion
- `weatherIcons.js`: dynamically imports weather icons

## Acknowledgement 
- [The Odin Project](https://www.theodinproject.com/) - curriculum
- [Visual Crossing](https://www.visualcrossing.com/) - API & weather Icons
- [Pictogrammers](https://pictogrammers.com/library/mdi/) - SVG Icons
