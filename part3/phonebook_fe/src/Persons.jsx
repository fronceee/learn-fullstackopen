function Persons({ filteredPerson, onDeleteClick }) {
    return <div onClick={event => {
        if (event.target.tagName === 'BUTTON') {
            onDeleteClick(event.target.id)
        }
    }}>{filteredPerson.map(item => (<p key={`${item.id}-${item.name}`}>{item.name} {item.number} <button id={item.id}>delete</button></p>))}</div>
}

export default Persons