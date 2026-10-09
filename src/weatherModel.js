const BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const API_KEY = "GVULB6J76E8MNFQPU2Z56EW6U";

export async function getWeatherData(location, period = "") {
  const cleanLocation = normalizeStr(location);
  if (cleanLocation === "") {
    console.log("Location is required");
    return;
  }
  const periodPart =
    period === "" ? "today" : `last${encodeURIComponent(period)}days`;
  const includePart =
    periodPart === "today" ? "&include=hours,current" : "&include=days";

  const response = await fetch(
    `${BASE_URL}${encodeURIComponent(cleanLocation)}/${periodPart}?unitGroup=metric${includePart}&elements=temp,conditions,icon,datetime,feelslike&key=${encodeURIComponent(API_KEY)}&contentType=json`,
  );
  if (!response.ok) {
    const error = new Error("Error: " + response.status);
    error.status = response.status;
    throw error;
  }

  console.log(response);
  return response.json();
}
export function getWeatherToday(data) {
  if (!data || !data.currentConditions) return;
  const location = data.address;
  const currentWeather = data.currentConditions;
  const weatherData = data.days[0].hours;

  console.log(
    `${location} ${currentWeather.datetime} Current Temp: ${currentWeather.temp} Feels like: ${currentWeather.feelslike} Condition: ${currentWeather.conditions} Icon: ${currentWeather.icon}`,
  );

  weatherData.forEach((hour) => {
    console.log(
      `DateTime: ${hour.datetime} temp: ${hour.temp} condition: ${hour.conditions} Icon: ${hour.icon}`,
    );
  });
}

export function getWeatherHistory(data) {
  if (!data) return;
  const location = data.address;
  console.log(location);

  const weatherData = data.days;
  weatherData.forEach((day) => {
    console.log(`${day.datetime}: ${day.temp} ${day.conditions} ${day.icon}`);
  });
}

function normalizeStr(str) {
  if (typeof str !== "string") return "";
  return str.trim();
}
