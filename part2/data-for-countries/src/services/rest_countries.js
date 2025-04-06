import axious from "axios";

const baseURL = "https://studies.cs.helsinki.fi/restcountries/api";

function getAllCountries() {
	const request = axious.get(`${baseURL}/all`);
	return request.then((response) => response);
}

function getCountryDetails(country) {
	const request = axious.get(`${baseURL}/name/${country}`);
	return request.then((response) => response);
}

export { getAllCountries, getCountryDetails };
