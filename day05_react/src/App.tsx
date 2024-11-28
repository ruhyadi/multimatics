import { Link, Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>

      <Outlet />
    </>
  );
}

export default App;
