const db = require("../config/db")

exports.addStudent = async (req, res) => {
  const { groupId } = req.params
  const { name, email } = req.body

  const [result] = await db.query(
    `INSERT INTO opiskelijat (name, email, group_id)
     VALUES (?, ?, ?)`,
    [name, email || null, groupId]
  )

  res.status(201).json({
    id: result.insertId,
    name,
    email,
    todos: []
  })
}

exports.removeStudent = async (req, res) => {
  const { studentId } = req.params

  await db.query(
    "DELETE FROM opiskelijat WHERE id = ?",
    [studentId]
  )

  res.status(204).end()
}
