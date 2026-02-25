import { useState, useEffect } from "react"

import { getGroups } from "../api/api"
import { createGroup } from "../api/api"
import { deleteGroup } from "../api/api"

import { Link } from "react-router-dom"
import CreateGroupForm from "../components/CreateGroupForm"
import Header from "../components/layout/Header"

function DashboardPage() {
  const [groups, setGroups] = useState([])

  useEffect(() => {
    async function load() {
      const data = await getGroups()
      setGroups(data)
    }

      load()
  }, [])

  async function handleCreateGroup(name) {
    const newGroup = await createGroup(name)
    setGroups(prev => [...prev, newGroup])
  }

  async function handleDeleteGroup(id) {
    await deleteGroup(id)
    setGroups(prev => prev.filter(g => g.id !== id))
  }

  return (
    <>
    <Header />
    <main style={{ padding: "2rem", maxWidth: "600px" }}>
      <h3>Ryhmät</h3>

      <CreateGroupForm onCreate={handleCreateGroup} />

      <ul>
        {groups.map(group => (
          <li key={group.id} style={{ marginBottom: "0.5rem" }}>
            <Link to={`/groups/${group.id}`}>{group.name}</Link>
            <button
              onClick={() => handleDeleteGroup(group.id)}
              style={{ marginLeft: "1rem" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
    </>
  )
}

export default DashboardPage
