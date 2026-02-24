require("dotenv").config()
const express = require("express")
const cors = require("cors")

const authRoutes = require("./routes/authRoutes")
const groupRoutes = require("./routes/groupRoutes")
const authMiddleware = require("./middleware/authMiddleware")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)

app.use("/api", authMiddleware, groupRoutes)

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`)
})