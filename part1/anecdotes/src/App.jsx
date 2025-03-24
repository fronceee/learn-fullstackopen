import { useEffect } from 'react'
import { useState } from 'react'

const Anecdote = ({ text, votes }) => <>
  <p>{text}</p>
  <p>has {votes} vote{votes > 1 ? 's' : null}</p></>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [scores, setScores] = useState(new Uint8Array(anecdotes.length))
  const [mostVotedAnecdoteIndex,setMostVotedAnecdoteIndex] = useState(null)

  const handleNextAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex)
  }

  const setMostVoted = () => {
    const maxVotes = Math.max(...scores)
    setMostVotedAnecdoteIndex(scores.indexOf(maxVotes))
  }

  useEffect(() => {
    setMostVoted()
  },[scores])

  const handleSetScores = () => {
    setScores(prev => {
      const copyArray = [...prev]
      copyArray[selected] += 1
      return copyArray
    })
  }

  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        <Anecdote text={anecdotes[selected]} votes={scores[selected]} />
        <button onClick={handleSetScores}>vote</button>
        <button onClick={handleNextAnecdote}>next anecdote</button>
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        <Anecdote text={anecdotes[mostVotedAnecdoteIndex]} votes={scores[mostVotedAnecdoteIndex]} />
      </div>
    </div>
  )
}

export default App