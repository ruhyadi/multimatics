import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar
        title="Toko"
        links={[
          { name: "Home", url: "/" },
          { name: "Product", url: "/product" },
          { name: "About", url: "/about" },
        ]}
      />
      <div className="mt-20">
        <Outlet />
      </div>
    </>
  );
}

export default App;
