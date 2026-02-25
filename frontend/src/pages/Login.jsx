import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { login } from "../api/api"
import { useAuth } from "../context/AuthContext"
import AuthForm from "../components/AuthForm"

export default function Login() {
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const { login: setAuth } = useAuth()

  const handleLogin = async ({ email, password }) => {
    try {
      setError("")
      const data = await login(email, password)

      // Talletetaan token + user contextiin
      setAuth(data.token, data.user)

      navigate("/")
    } catch (err) {
      setError(err.message || "Login failed")
    }
  }

  return (
    <>
      <AuthForm
        title="Login"
        buttonText="Login"
        onSubmit={handleLogin}
        error={error}
      />

      <p style={{ textAlign: "center", marginTop: "1rem" }}>
        No account? <Link to="/register">Register</Link>
      </p>
    </>
  )
}