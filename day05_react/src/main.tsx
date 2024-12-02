import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./pages/NotFound.tsx";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import Product from "./pages/Product.tsx";
import ProductData from "./pages/ProductData.tsx";
import Graphs from "./pages/Graph.tsx";
import Details from "./pages/Details.tsx";
import Register from "./pages/Register.tsx";
import Camera from "./pages/Camera.tsx";
import FormIdb from "./pages/FormIdb.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/product",
        element: <Product />,
      },
      {
        path: "/product-data",
        element: <ProductData />,
      },
      {
        path: "/graph",
        element: <Graphs />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/product/:id",
        element: <Details />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/camera",
        element: <Camera />,
      },
      {
        path: "/form-idb",
        element: <FormIdb />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
