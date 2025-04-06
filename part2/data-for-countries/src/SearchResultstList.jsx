function SearchResultstList({ results, onSearchResultSelect }) {
	if (!results.length) {
		return null;
	}

	if (results.length > 10) {
		return <p>Too many matches, specify another filter</p>;
	}

	const renderedList = results.map((result) => (
		<div>
			<p style={{ display: "inline", marginRight: 4 }} key={result.name.common}>
				{result.name.common}
			</p>
			<button name={result.name.common}>Show</button>
		</div>
	));

	const handleDivClick = (event) => {
		if (event.target.tagName === "BUTTON") {
			onSearchResultSelect(event.target.name);
		}
	};

	return <div onClick={handleDivClick}>{renderedList}</div>;
}

export default SearchResultstList;
