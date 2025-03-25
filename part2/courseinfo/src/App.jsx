const Header = ({ course }) => (<h1>{course}</h1>)

const Part = ({ part, exercises }) => (<p>{part} {exercises}</p>)

const Content = ({ parts }) => {
  const renderedParts = parts.map(part => <Part key={'part' + part.id} part={part.name} exercises={part.exercises} />)
  return  renderedParts
}

const Total = ({ parts }) => {
  const totalParts = parts.reduce((acc, current) => current.exercises += acc, 0)
  return <p>total of {totalParts} exercise{totalParts > 1 ? 's' : ''}</p>
}

const Course = ({ course }) => (<div>
  <Header course={course.name} />
  <Content parts={course.parts} />
  <Total parts={course.parts} />
</div>)

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

return (<div> {courses.map(course => <Course course={course} key={course.id} />)}</div>)
}

export default App