import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={(event) => {
        event.preventDefault()
        
        if (!newName) return;

        setPersons(prev => [...prev, {name: newName}])
        setNewName('')
      }}>
        <div>
          name: <input value={newName} onChange={event => setNewName(event.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(item => (<p key={item.name}>{item.name}</p>))}
    </div>
  )
}

export default App