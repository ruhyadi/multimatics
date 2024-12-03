import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorScreen from './pages/Error.tsx'
import HomeScreen from './pages/Home.tsx'
import LoginScreen from './pages/Login.tsx'
import RegisterScreen from './pages/Register.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorScreen />,
    children: [
      {
        path: "/",
        element: <HomeScreen />
      },
      {
        path: "/login",
        element: <LoginScreen />
      },
      {
        path: "/register",
        element: <RegisterScreen />
      },
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
