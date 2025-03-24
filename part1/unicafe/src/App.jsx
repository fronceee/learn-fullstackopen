import { useState } from 'react'

const Button = ({ onClick, label }) => <button onClick={onClick}>{label}</button>

const StatisticLine = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({ good, neutral, bad, score, totalClicked }) => {
  const average = score / totalClicked
  const positivePercent = (good / totalClicked) * 100

  return (<div>
    <h1>statistics</h1>
    {totalClicked === 0 ? <p>No feedback Given</p> :
      (
        <table>
          <StatisticLine text='good' value={good} />
          <StatisticLine text='neutral' value={neutral} />
          <StatisticLine text='bad' value={bad} />
          <StatisticLine text='average' value={average} />
          <StatisticLine text='positive' value={`${positivePercent} %`} />
        </table>
      )
    }

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
        <Button onClick={handleGood} label='good' />
        <Button onClick={handleNeutral} label='neutral' />
        <Button onClick={handleBad} label='bad' />
      </div>
      <Statistics good={good} bad={bad} neutral={neutral} score={score} totalClicked={totalClicked} />
    </div>
  )
}

export default App