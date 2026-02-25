import { useState } from "react"

export default function AuthForm({
  title,
  buttonText,
  onSubmit,
  error,
  isRegister = false
}) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (loading) return

    setLoading(true)
    try {
      await onSubmit({ name, email, password })
      setName("")
      setEmail("")
      setPassword("")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>{title}</h2>

        {isRegister && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Loading..." : buttonText}
        </button>
      </form>
    </div>
  )
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f3f4f6"
  },
  form: {
    background: "white",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    width: "320px",
    display: "flex",
    flexDirection: "column",
    gap: "1rem"
  },
  input: {
    padding: "0.7rem",
    fontSize: "1rem",
    borderRadius: "6px",
    border: "1px solid #ddd"
  },
  button: {
    padding: "0.8rem",
    fontSize: "1rem",
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  error: {
    color: "#dc2626",
    fontSize: "0.9rem"
  }
}