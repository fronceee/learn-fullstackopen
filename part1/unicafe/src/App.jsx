import { useState } from 'react'

const Statistics = ({ good, neutral, bad, score, totalClicked }) => {
  const average = score / totalClicked
  const positivePercent = (good / totalClicked) * 100

  return (<div>
    <h1>statistics</h1>
    <p>good {good}</p>
    <p>neutral {neutral}</p>
    <p>bad {bad}</p>
    <p>average {average}</p>
    <p>positive {positivePercent} %</p>
  </div>)
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [score, setScore] = useState(0)

  const totalClicked = good + neutral + bad

  const handleGood = () => {
    setScore(prev => prev += 1)
    setGood(prev => prev += 1)
  }

  const handleNeutral = () => {
    setNeutral(prev => prev += 1)
  }

  const handleBad = () => {
    setScore(prev => prev -= 1)
    setBad(prev => prev += 1)
  }


  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <button onClick={handleGood}>good</button>
        <button onClick={handleNeutral}>neutral</button>
        <button onClick={handleBad}>bad</button>
      </div>
      <Statistics good={good} bad={bad} neutral={neutral} score={score} totalClicked={totalClicked} />
    </div>
  )
}

export default App