import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '554-5556545' }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={(event) => {
        event.preventDefault()

        if (!newName) return;

        if (persons.find(item => item.name === newName)) {
          alert(`${newName} is already added to phonebook`)
          return
        }

        setPersons(prev => [...prev, {name: newName, phone: newPhone}])
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
      {persons.map(item => (<p key={item.name}>{item.name} {item.phone}</p>))}
    </div>
  )
}

export default App