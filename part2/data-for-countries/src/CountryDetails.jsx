import { useEffect } from "react";
import { getWeatherDetails } from "./services/weather";
import { useState } from "react";

function CountryDetails({ detail }) {
	const {
		name: { common: countryName },
		capital,
		area,
		languages,
		flags,
		capitalInfo: { latlng },
	} = detail;

	const allLanguages = Object.values(languages);

	const [weatherInfo, setWeatherInfo] = useState(null);

	useEffect(() => {
		getWeatherDetails({ lat: latlng[0], lon: latlng[1] }).then((response) =>
			setWeatherInfo(response.data),
		);
	}, []);

	return (
		<div>
			<h1>{countryName}</h1>
			<p>Capital {capital[0]}</p>
			<p>Area {area}</p>
			<h2>Languages</h2>
			<ul>
				{allLanguages.map((language) => (
					<li key={language}>{language}</li>
				))}
			</ul>
			<img src={flags.svg} width="240px" />
			{weatherInfo ? (
				<>
					<h2>Weather in {capital}</h2>
					<p>Temperature {weatherInfo.main.temp} Celsius</p>
					<img
						src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`}
					/>
					<p>Wind {weatherInfo.wind.speed} m/s</p>
				</>
			) : null}
		</div>
	);
}

export default CountryDetails;
