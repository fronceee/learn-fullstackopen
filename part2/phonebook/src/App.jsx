import { useEffect, useState } from 'react'

import personsService from './services/persons'

import FilterInput from './FilterInput'
import PersonForm from './PersonForm'



const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterValue, setFilterValue] = useState('')

  useEffect(() => {
    personsService.getAllPersons().then(data => setPersons(data))
  }, [])

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

    personsService.addPerson({
      id: (persons.length + 1).toString(),
      name: newName,
      number: newPhone
    }).then(data => {
      setPersons(prev => [...prev, data])
      setNewName('')
      setNewPhone('')
    })
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