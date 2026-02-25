import { createBrowserRouter } from "react-router-dom"
import DashboardPage from "./pages/DashboardPage"
import GroupPage from "./pages/GroupPage"
import ProtectedRoute from "./components/layout/ProtectedRoute"
import Login from "./pages/Login"
import Register from "./pages/Register"

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/groups/:groupId",
    element: (
      <ProtectedRoute>
        <GroupPage />
      </ProtectedRoute>
    )
  }
])
