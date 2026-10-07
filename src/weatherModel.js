const BASE_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const API_KEY = "GVULB6J76E8MNFQPU2Z56EW6U";

export async function getWeatherData(location, period = "") {
    const periodPart = period === "" ? "today" : `last${encodeURIComponent(period)}days`;
    const includePart = periodPart === "today" ? "" : "&include=days";

    try {
        const response = await fetch(`${BASE_URL}${encodeURIComponent(location)}/${periodPart}?unitGroup=metric${includePart}&elements=temp,conditions,icon,datetime&key=${encodeURIComponent(API_KEY)}&contentType=json`);
        if(!response.ok) {
            throw Error('Error: ' + response.status);
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
}
export function getCurrentWeather(data) {
    if (!data || !data.currentConditions) return;
    const location = data.address;
    const currentWeather = data.currentConditions;

    console.log(`${location} ${currentWeather.datetime} Current Condition: ${currentWeather.temp} ${currentWeather.conditions} ${currentWeather.icon}`);
}

export function getWeatherHistory(data) {
    if (!data) return;
    const location = data.address;
    console.log(location);

    const weatherData = data.days;
    weatherData.forEach(day => {
        console.log(`${day.datetime}: ${day.temp} ${day.conditions} ${day.icon}`)
    });
}