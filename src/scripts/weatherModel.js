const BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const API_KEY = "GVULB6J76E8MNFQPU2Z56EW6U";

export async function getWeatherData(location, period = "") {
  const cleanLocation = normalizeStr(location);
  if (cleanLocation === "") {
    console.log("Location is required");
    return null;
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

  return response.json();
}
export function getWeatherToday(data) {
  if (!data || !data.currentConditions) return null;
  const currentWeather = data.currentConditions;

  return {
    location: data.resolvedAddress,
    currentConditions: {
      time: currentWeather.datetime,
      temp: currentWeather.temp,
      feelsLike: currentWeather.feelslike,
      conditions: currentWeather.conditions,
      icon: currentWeather.icon,
    },
    hours: data.days[0].hours.map((hour) => ({
      time: hour.datetime,
      temp: hour.temp,
      conditions: hour.conditions,
      icon: hour.icon,
    })),
  };
}

export function getWeatherHistory(data) {
  if (!data) return null;

  return {
    location: data.resolvedAddress,
    days: data.days.toReversed().map((day) => ({
      time: day.datetime,
      temp: day.temp,
      conditions: day.conditions,
      icon: day.icon,
    })),
  };
}

function normalizeStr(str) {
  if (typeof str !== "string") return "";
  return str.trim();
}
