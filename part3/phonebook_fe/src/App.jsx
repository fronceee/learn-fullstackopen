import { useEffect, useState } from 'react'

import personsService from './services/persons'

import FilterInput from './FilterInput'
import PersonForm from './PersonForm'
import Persons from './Persons'
import Notification from './Notification'



const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [notificationText, setNotificationText] = useState(null)
  const [notificationVaraint, setNotificationVariant] = useState(null)

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

  const resetNotification = () => {
    setNotificationText(null)
    setNotificationVariant(null)
  }

  useEffect(() => {
    if (notificationText && notificationVaraint) {
      const reset = setTimeout(resetNotification, 5000)
      return () => { clearTimeout(reset) }
    }
  }, [notificationText, notificationVaraint])

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
          setNotificationText(`Added ${alreadyExistedPerson.name}`)
          setNotificationVariant('success')
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
      setNotificationText(`Added ${data.name}`)
      setNotificationVariant('success')
      resetStates()
    })
  }

  const handleDeleteClick = id => {
    const { name } = persons.find(person => person.id === id)
    if (confirm(`Delete ${name}?`))
      personsService.deletePerson(id).then(() => {
        personsService.getAllPersons().then(data => {setPersons(data)})
      }).catch(error => {
        if (error.status === 404) {
          setNotificationText(`Infomation of ${name} has been removed from server`)
          setNotificationVariant('error')
        }
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationText} variant={notificationVaraint} />
      <FilterInput value={filterValue} onChange={handleFilterInputChange} />
      <h2>add a new</h2>
      <PersonForm nameValue={newName} numberValue={newPhone} onNameChange={handleNewNameChange} onNumberChange={handleNewPhoneChange} onFormSubmit={handleSubmit} />
      <h2>Numbers</h2>
      <Persons filteredPerson={filteredPerson} onDeleteClick={handleDeleteClick} />
    </div>
  )
}

export default App