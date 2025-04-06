import axios from "axios";

const baseURL = "https://api.openweathermap.org/data/2.5/weather";

const appId = import.meta.env.VITE_WEATHER_API_KEY;

function getWeatherDetails({ lat, lon }) {
	const requestURL = `${baseURL}?lat=${lat}&lon=${lon}&units=metric&appid=${appId}`;
	const request = axios.get(requestURL);
	return request.then((response) => response);
}

export { getWeatherDetails };
