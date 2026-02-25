import { useState } from "react"

function CreateGroupForm({ onCreate }) {
  const [name, setName] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) return

    onCreate(name)
    setName("")
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1.5rem" }}>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="New group name"
      />
      <button type="submit" style={{ marginLeft: "0.5rem" }}>
        Add Group
      </button>
    </form>
  )
}

export default CreateGroupForm