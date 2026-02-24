const db = require("../config/db")

/* ===============================
   GET GROUPS
================================= */
exports.getGroups = async (req, res) => {
  const userId = req.user.id

  const [groups] = await db.query(
    "SELECT * FROM ryhmat WHERE created_by = ?",
    [userId]
  )

  res.json(groups)
}

/* ===============================
   CREATE GROUP
================================= */
exports.createGroup = async (req, res) => {
  const userId = req.user.id
  const { name } = req.body

  const [result] = await db.query(
    "INSERT INTO ryhmat (name, created_by) VALUES (?, ?)",
    [name, userId]
  )

  res.status(201).json({
    id: result.insertId,
    name
  })
}

/* ===============================
   DELETE GROUP
================================= */
exports.deleteGroup = async (req, res) => {
  const userId = req.user.id
  const { id } = req.params

  await db.query(
    "DELETE FROM ryhmat WHERE id = ? AND created_by = ?",
    [id, userId]
  )

  res.status(204).end()
}
