function CountryDetails({ detail }) {
	const {
		name: { common: countryName },
		capital,
		area,
		languages,
		flags,
	} = detail;

	const allLanguages = Object.values(languages);

	return (
		<div>
			<h1>{countryName}</h1>
			<p>Capital {capital[0]}</p>
			<p>Area {area}</p>
			<h2>Languages</h2>
			<ul>
				{allLanguages.map((language) => (
					<li>{language}</li>
				))}
			</ul>
			<img src={flags.svg} width="240px" />
		</div>
	);
}

export default CountryDetails;
