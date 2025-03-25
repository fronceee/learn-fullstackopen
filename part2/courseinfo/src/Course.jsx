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

export default Course