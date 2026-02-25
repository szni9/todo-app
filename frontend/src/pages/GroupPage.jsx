import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"

import {
  getGroups,
  addStudent,
  removeStudent,
  addTodo,
  removeTodo,
  toggleTodo
} from "../api/api"

import StudentCard from "../components/StudentCard"
import AddStudentForm from "../components/AddStudentForm"
import Header from "../components/layout/Header"

function GroupPage() {
  const { groupId } = useParams()
  const [group, setGroup] = useState(null)

  // LOAD GROUP
  useEffect(() => {
    async function load() {
      const groups = await getGroups()

      const found = groups.find(
        g => g.id === Number(groupId)
      )

      setGroup(found || null)
    }

    load()
  }, [groupId])

  // ADD STUDENT
  async function handleAddStudent(name) {
    const newStudent = await addStudent(group.id, name)

    setGroup(prev => ({
      ...prev,
      students: [...prev.students, newStudent]
    }))
  }

  // REMOVE STUDENT
  async function handleRemoveStudent(studentId) {
    await removeStudent(group.id, studentId)

    setGroup(prev => ({
      ...prev,
      students: prev.students.filter(
        s => s.id !== studentId
      )
    }))
  }

  // ADD TODO
  async function handleAddTodo(studentId, text) {
    const newTodo = await addTodo(
      group.id,
      studentId,
      text
    )

    setGroup(prev => ({
      ...prev,
      students: prev.students.map(s =>
        s.id === studentId
          ? { ...s, todos: [...s.todos, newTodo] }
          : s
      )
    }))
  }

  // REMOVE TODO
  async function handleRemoveTodo(studentId, todoId) {
    await removeTodo(group.id, studentId, todoId)

    setGroup(prev => ({
      ...prev,
      students: prev.students.map(s =>
        s.id === studentId
          ? {
              ...s,
              todos: s.todos.filter(
                t => t.id !== todoId
              )
            }
          : s
      )
    }))
  }

  // TOGGLE TODO
  async function handleToggleTodo(studentId, todoId) {
    try {
      setGroup(prev => ({
        ...prev,
        students: prev.students.map(student =>
          student.id === studentId
            ? {
                ...student,
                todos: student.todos.map(todo =>
                  todo.id === todoId
                    ? { ...todo, completed: !todo.completed }
                    : todo
                )
              }
            : student
        )
      }))

      await toggleTodo(Number(groupId), studentId, todoId)

    } catch (err) {
      console.error("Toggle failed:", err)
    }
  }

  // LOADING STATE
  if (!group) {
    return (
      <>
        <Header />
        <main style={{ padding: "2rem" }}>
          <Link to="/">← Back to dashboard</Link>
          <p>Loading group...</p>
        </main>
      </>
    )
  }

  return (
    <>
      <Header />
      <main style={{ padding: "2rem" }}>
        <Link to="/">← Back to dashboard</Link>

        <h2>{group.name}</h2>

        <AddStudentForm onAdd={handleAddStudent} />

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "1rem",
            marginTop: "1rem"
          }}
        >
          {group.students.map(student => (
            <StudentCard
              key={student.id}
              student={student}
              onToggleTodo={handleToggleTodo}
              onAddTodo={handleAddTodo}
              onDeleteTodo={handleRemoveTodo}
              onDelete={handleRemoveStudent}
            />
          ))}
        </div>
      </main>
    </>
  )
}

export default GroupPage
