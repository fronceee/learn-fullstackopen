function SearchResultstList({ results }) {
	if (!results.length) {
		return null;
	}

	if (results.length > 10) {
		return <p>Too many matches, specify another filter</p>;
	}

	return results.map((result) => (
		<p key={result.name.common}>{result.name.common}</p>
	));
}

export default SearchResultstList;
