const API_URL = "http://localhost:5000/api"

/* ===============================
   Helper: get token
================================= */
function getToken() {
  return localStorage.getItem("token")
}

/* ===============================
   Central API wrapper
================================= */
async function apiFetch(endpoint, options = {}) {
  const token = getToken()

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers
    }
  })

  if (res.status === 401) {
    localStorage.removeItem("token")
    window.location.href = "/login"
    return
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(error.message || "API request failed")
  }

  return res.status !== 204 ? res.json() : null
}

/* ===============================
   Auth (omavalmentajat)
================================= */

export async function register(name, email, password) {
  return apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      password
    })
  })
}

export async function login(email, password) {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password
    })
  })
}

export function logout() {
  localStorage.removeItem("token")
}

/* ===============================
   Ryhmät (groups)
================================= */

export function getGroups() {
  return apiFetch("/groups")
}

export function createGroup(name) {
  return apiFetch("/groups", {
    method: "POST",
    body: JSON.stringify({ name })
  })
}

export function deleteGroup(groupId) {
  return apiFetch(`/groups/${groupId}`, {
    method: "DELETE"
  })
}

/* ===============================
   Opiskelijat (students)
================================= */

export function addStudent(groupId, name, email = null) {
  return apiFetch(`/groups/${groupId}/students`, {
    method: "POST",
    body: JSON.stringify({
      name,
      email
    })
  })
}

export function removeStudent(groupId, studentId) {
  return apiFetch(
    `/groups/${groupId}/students/${studentId}`,
    { method: "DELETE" }
  )
}

/* ===============================
   Muistiinpanot (todos)
================================= */

export function addTodo(groupId, studentId, text) {
  return apiFetch(
    `/groups/${groupId}/students/${studentId}/todos`,
    {
      method: "POST",
      body: JSON.stringify({
        content: text
      })
    }
  )
}

export function removeTodo(groupId, studentId, todoId) {
  return apiFetch(
    `/groups/${groupId}/students/${studentId}/todos/${todoId}`,
    { method: "DELETE" }
  )
}

export function toggleTodo(groupId, studentId, todoId) {
  return apiFetch(
    `/groups/${groupId}/students/${studentId}/todos/${todoId}`,
    { method: "PATCH" }
  )
}