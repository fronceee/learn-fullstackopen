import { useEffect, useState } from 'react'

import personsService from './services/persons'

import FilterInput from './FilterInput'
import PersonForm from './PersonForm'
import Persons from './Persons'



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

  const resetStates = () => {
    setNewName('')
    setNewPhone('')
  }

  const handleSubmit = () => {
    if (!newName) return;

    const alreadyExistedPerson = persons.find(item => item.name === newName)

    if (alreadyExistedPerson) {
      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personsService.updatePerson(alreadyExistedPerson.id, { ...alreadyExistedPerson, number: newPhone }).then(data => {
          setPersons(prev => [...prev].map(person => {
            if (person.id === data.id) {
              return data
            }
            return person
          }))
          resetStates()
        })
      }
      return
    }

    personsService.addPerson({
      id: (persons.length + 1).toString(),
      name: newName,
      number: newPhone
    }).then(data => {
      setPersons(prev => [...prev, data])
      resetStates()
    })
  }

  const handleDeleteClick = id => {
    const { name } = persons.find(person => person.id === id)
    if (confirm(`Delete ${name}?`))
      personsService.deletePerson(id).then(data => {
        setPersons(prev => [...prev].filter(person => person.id != data.id))
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterInput value={filterValue} onChange={handleFilterInputChange} />
      <h2>add a new</h2>
      <PersonForm nameValue={newName} numberValue={newPhone} onNameChange={handleNewNameChange} onNumberChange={handleNewPhoneChange} onFormSubmit={handleSubmit} />
      <h2>Numbers</h2>
      <Persons filteredPerson={filteredPerson} onDeleteClick={handleDeleteClick} />
    </div>
  )
}

export default App