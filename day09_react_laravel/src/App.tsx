import { Outlet } from "react-router-dom";
import NavGuest from "./components/NavGuest";

const App = () => {
  return <>
    <NavGuest />
    <main className="container mx-auto p-2">
      <Outlet />
    </main>
  </>
}

export default App;
