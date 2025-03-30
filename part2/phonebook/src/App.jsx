import { useState } from 'react'
import FilterInput from './FilterInput'
import PersonForm from './PersonForm'

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

  const handleFilterInputChange = (event) => {
    setFilterValue(event.target.value)
  }

  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNewPhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleSubmit = () => {
    if (!newName) return;

    if (persons.find(item => item.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    setPersons(prev => [...prev, { name: newName, number: newPhone }])
    setNewName('')
    setNewPhone('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterInput value={filterValue} onChange={handleFilterInputChange} />
      <h2>add a new</h2>
      <PersonForm nameValue={newName} numberValue={newPhone} onNameChange={handleNewNameChange} onNumberChange={handleNewPhoneChange} onFormSubmit={handleSubmit} />
      <h2>Numbers</h2>
      {filteredPerson.map(item => (<p key={`${item.id}-${item.name}`}>{item.name} {item.number}</p>))}
    </div>
  )
}

export default App