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