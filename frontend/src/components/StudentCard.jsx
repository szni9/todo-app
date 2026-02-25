import { useState } from "react"
import AddTodoForm from "./AddTodoForm"

function StudentCard({
  student,
  onToggleTodo,
  onAddTodo,
  onDeleteTodo,
  onDelete
}) {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "0.75rem",
        background: "#fff",
        boxShadow: "0 1px 4px rgba(0,0,0,0.05)"
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "0.5rem"
        }}
      >
        <h3 style={{ fontSize: "1rem", margin: 0 }}>
          {student.name}
        </h3>

        <button onClick={() => setIsEditing(v => !v)}>
          {isEditing ? "Done" : "Edit"}
        </button>
      </div>

      {/* Delete student in edit mode */}
      {isEditing && (
        <button
          onClick={() => onDelete(student.id)}
          style={{ marginBottom: "0.5rem" }}
        >
          Remove Student
        </button>
      )}

      {/* Todos */}
      {student.todos.length === 0 ? (
        <p style={{ opacity: 0.4 }}>No tasks</p>
      ) : (
        <ul style={{ paddingLeft: "0rem", margin: "0.5rem 0" }}>
          {student.todos.map(todo => (
            <li
              key={todo.id}
              style={{
                display: "flex",
                gap: "0.5rem",
                alignItems: "flex-start",
                fontSize: "1rem",
                minWidth: 0
              }}
            >
              <label
                style={{
                  flex: 1,
                  overflowWrap: "anywhere",
                  wordBreak: "break-word",
                  textDecoration: todo.completed
                    ? "line-through"
                    : "none",
                  opacity: todo.completed ? 0.6 : 1,
                  cursor: "pointer"
                }}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() =>
                    onToggleTodo(student.id, todo.id)
                  }
                  style={{ marginRight: "0.25rem" }}
                />
                {todo.content}
              </label>

              {isEditing && (
                <button
                  onClick={() =>
                    onDeleteTodo(student.id, todo.id)
                  }
                >
                  ✕
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Add todo in edit mode */}
      {isEditing && (
        <AddTodoForm
          onAdd={text => onAddTodo(student.id, text)}
        />
      )}
    </div>
  )
}

export default StudentCard
