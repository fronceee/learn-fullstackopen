function PersonForm({ nameValue, numberValue, onNameChange, onNumberChange, onFormSubmit }) {
    return (<form onSubmit={(event) => {
        event.preventDefault()
        onFormSubmit()
    }}>
        <div>
            name: <input value={nameValue} onChange={event => onNameChange(event)} />
        </div>
        <div>
            number: <input value={numberValue} onChange={event => onNumberChange(event)} />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>)
}

export default PersonForm