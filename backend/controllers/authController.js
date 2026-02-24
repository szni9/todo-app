const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const db = require("../config/db")

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET not defined")
}

/* ===============================
   REGISTER
================================= */
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" })
    }

    const [existing] = await db.query(
      "SELECT id FROM omavalmentajat WHERE email = ?",
      [email]
    )

    if (existing.length > 0) {
      return res.status(400).json({ message: "Email already in use" })
    }

    const password_hash = await bcrypt.hash(password, 10)

    const [result] = await db.query(
      `INSERT INTO omavalmentajat (name, email, password_hash)
       VALUES (?, ?, ?)`,
      [name, email, password_hash]
    )

    const token = jwt.sign(
      { id: result.insertId, email },
      JWT_SECRET,
      { expiresIn: "7d" }
    )

    res.status(201).json({ token })

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

/* ===============================
   LOGIN
================================= */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    const [rows] = await db.query(
      "SELECT * FROM omavalmentajat WHERE email = ?",
      [email]
    )

    if (rows.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    const user = rows[0]

    const valid = await bcrypt.compare(
      password,
      user.password_hash
    )

    if (!valid) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: "7d" }
    )

    res.json({ token })

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}
