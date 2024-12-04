import { Outlet } from "react-router-dom";
import NavGuest from "./components/NavGuest";
import { useEffect, useState } from "react";
import AuthContext from "./context/AuthContext";

const App = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  });

  return (
    <>
      <AuthContext.Provider value={{ token, setToken }}>
        <NavGuest />
        <main className="container mx-auto p-2">
          <Outlet />
        </main>
      </AuthContext.Provider>
    </>
  );
};

export default App;
