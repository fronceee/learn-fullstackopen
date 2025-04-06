function SearchCountryInput({ inputValue, onValueChange }) {
	return (
		<div>
			<span style={{ marginRight: 4 }}>find contries</span>
			<input value={inputValue} onChange={onValueChange} />
		</div>
	);
}

export default SearchCountryInput;
