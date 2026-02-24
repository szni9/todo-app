const db = require("../config/db")

/* ===============================
   ADD TODO
================================= */
exports.addTodo = async (req, res) => {
  const { studentId } = req.params
  const { content } = req.body
  const userId = req.user.id

  const [result] = await db.query(
    `INSERT INTO muistiinpanot
     (student_id, user_id, content)
     VALUES (?, ?, ?)`,
    [studentId, userId, content]
  )

  res.status(201).json({
    id: result.insertId,
    text: content,
    completed: false
  })
}

/* ===============================
   DELETE TODO
================================= */
exports.removeTodo = async (req, res) => {
  const { todoId } = req.params
  const userId = req.user.id

  await db.query(
    `DELETE FROM muistiinpanot
     WHERE id = ? AND user_id = ?`,
    [todoId, userId]
  )

  res.status(204).end()
}

/* ===============================
   TOGGLE TODO
================================= */
exports.toggleTodo = async (req, res) => {
  const { todoId } = req.params
  const userId = req.user.id

  await db.query(
    `UPDATE muistiinpanot
     SET is_completed = NOT is_completed
     WHERE id = ? AND user_id = ?`,
    [todoId, userId]
  )

  res.status(204).end()
}
