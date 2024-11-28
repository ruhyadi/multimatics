import "./App.css";
import Person from "./components/Person";

function App() {
  let visible = true;

  return (
    <>
      <div className="text-red-500 font-bold text-4xl">1</div>
      <div>2</div>
      <div>3</div>
      <Person />
      {visible && <Person />}
    </>
  );
}

export default App;
