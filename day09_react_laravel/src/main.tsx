import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorScreen from "./pages/Error.tsx";
import HomeScreen from "./pages/Home.tsx";
import LoginScreen from "./pages/Login.tsx";
import RegisterScreen from "./pages/Register.tsx";
import BookDetails from "./pages/BookDetails.tsx";
import BookList from "./pages/BookList.tsx";
import AuthMiddleware from "./middleware/AuthMiddleware.tsx";
import AuthContext from "./context/AuthContext.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorScreen />,
    children: [
      {
        path: "/",
        element: (
          <AuthMiddleware>
            <HomeScreen />
          </AuthMiddleware>
        ),
      },
      {
        path: "/login",
        element: <LoginScreen />,
      },
      {
        path: "/register",
        element: <RegisterScreen />,
      },
      {
        path: "/detail/:id",
        element: (
          <AuthMiddleware>
            <BookDetails />
          </AuthMiddleware>
        ),
      },
      {
        path: "/admin",
        element: (
          <AuthMiddleware>
            <BookList />
          </AuthMiddleware>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <AuthContext.Provider value={{ token: null, setToken: () => {} }}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </AuthContext.Provider>
);
