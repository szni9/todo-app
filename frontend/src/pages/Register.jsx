import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { register } from "../api/api"
import AuthForm from "../components/AuthForm"

export default function Register() {
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleRegister = async ({ name, email, password }) => {
    try {
      setError("")
      await register(name, email, password)

      // Rekisteröinnin jälkeen siirrytään login-sivulle
      navigate("/login")
    } catch (err) {
      setError(err.message || "Registration failed")
    }
  }

  return (
    <>
      <AuthForm
        title="Register"
        buttonText="Create account"
        onSubmit={handleRegister}
        error={error}
        isRegister
      />

      <p style={{ textAlign: "center", marginTop: "1rem" }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </>
  )
}