import * as weatherModel from './weatherModel.js';

const data = await weatherModel.getWeatherData("Europe");
weatherModel.getCurrentWeather(data);