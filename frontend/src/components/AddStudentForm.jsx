import { useState } from "react"

function AddStudentForm({ onAdd }) {
  const [name, setName] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) return

    onAdd(name)
    setName("")
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Student name"
      />
      <button type="submit" style={{ marginLeft: "0.5rem" }}>
        Add Student
      </button>
    </form>
  )
}

export default AddStudentForm