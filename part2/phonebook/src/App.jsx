import { useEffect, useState } from 'react'
import axios from 'axios'

import FilterInput from './FilterInput'
import PersonForm from './PersonForm'

const baseURL = `${import.meta.env.VITE_API_URL}/persons`

function getAllPersons() {
  const request = axios.get(baseURL)
  return request.then(response => response.data)
}

function addPerson(newObject) {
  const request = axios.post(baseURL, newObject)
  return request.then(response => response.data)
}

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterValue, setFilterValue] = useState('')

  useEffect(() => {
    getAllPersons().then(data => setPersons(data))
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

    addPerson({
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