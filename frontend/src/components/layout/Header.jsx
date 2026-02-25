import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

export default function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <header style={styles.header}>
      <div style={styles.left}>
        <h1 style={styles.title}>Todo-app</h1>
        {user && user.username && (
          <span style={styles.username}>({user.username})</span>
        )}
      </div>

      <button onClick={handleLogout} style={styles.button}>
        Logout
      </button>
    </header>
  )
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    backgroundColor: "#4f46e5",
    color: "white"
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem"
  },
  title: {
    margin: 0,
    fontSize: "1.5rem"
  },
  username: {
    fontSize: "1rem",
    fontStyle: "italic",
    opacity: 0.8
  },
  button: {
    background: "white",
    color: "#4f46e5",
    border: "none",
    padding: "0.5rem 1rem",
    cursor: "pointer",
    fontWeight: "bold",
    borderRadius: "4px"
  }
}