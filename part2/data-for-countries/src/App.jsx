import { useState } from "react";
import { useEffect } from "react";
import { getAllCountries } from "./services/rest_countries";
import SearchCountryInput from "./SearchCountryInput";
import { useMemo } from "react";
import SearchResultstList from "./SearchResultstList";
import CountryDetails from "./CountryDetails";

function App() {
	const [countries, setCountries] = useState([]);
	const [searchField, setSearchField] = useState("");

	useEffect(() => {
		getAllCountries().then((response) => {
			console.log(response.data);
			setCountries(response.data);
		});
	}, []);

	const handleInputChange = (event) => {
		setSearchField(event.target.value);
	};

	const handleSearchResultSelect = (value) => {
		setSearchField(value);
	};

	const filteredCountries = useMemo(() => {
		if (searchField) {
			return countries.filter((country) =>
				country.name.common.toLowerCase().includes(searchField.toLowerCase()),
			);
		}
		return [];
	}, [searchField]);

	return (
		<div>
			<SearchCountryInput
				inputValue={searchField}
				onValueChange={handleInputChange}
			/>
			{filteredCountries.length > 1 ? (
				<SearchResultstList
					results={filteredCountries}
					onSearchResultSelect={handleSearchResultSelect}
				/>
			) : filteredCountries.length == 1 ? (
				<CountryDetails detail={filteredCountries[0]} />
			) : null}
		</div>
	);
}

export default App;
