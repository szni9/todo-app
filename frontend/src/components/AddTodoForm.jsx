import { useState } from "react"

function AddTodoForm({ onAdd }) {
  const [text, setText] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    if (!text.trim()) return

    onAdd(text)
    setText("")
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "0.5rem" }}>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="New task"
      />
      <button type="submit" style={{ marginLeft: "0.5rem" }}>
        Add
      </button>
    </form>
  )
}

export default AddTodoForm