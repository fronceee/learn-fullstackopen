import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterValue, setFilterValue] = useState('')

  const filteredPerson = filterValue ? persons.filter(item => item.name.toLowerCase().includes(filterValue.toLowerCase())) : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter shown with <input value={filterValue} onChange={event => setFilterValue(event.target.value)} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={(event) => {
        event.preventDefault()

        if (!newName) return;

        if (persons.find(item => item.name === newName)) {
          alert(`${newName} is already added to phonebook`)
          return
        }

        setPersons(prev => [...prev, { name: newName, number: newPhone }])
        setNewName('')
        setNewPhone('')
      }}>
        <div>
          name: <input value={newName} onChange={event => setNewName(event.target.value)} />
        </div>
        <div>
          number: <input value={newPhone} onChange={event => setNewPhone(event.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPerson.map(item => (<p key={`${item.id}-${item.name}`}>{item.name} {item.number}</p>))}
    </div>
  )
}

export default App