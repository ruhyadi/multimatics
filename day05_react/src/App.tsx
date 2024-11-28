import "./App.css";
import Person, { PersonProps } from "./components/Person";

function App() {
  const visible = true;

  const persons: PersonProps[] = [
    { name: "Alice", address: "123 Main St" },
    { name: "Bob", address: "456 Elm St" },
  ];

  return (
    <>
      <div className="text-red-500 font-bold text-4xl">1</div>
      <div>2</div>
      <div>3</div>
      <Person name="Alice" address="123 Main St" />
      {visible && <Person name="Bob" address="456 Elm St" />}
      <hr />
      {persons.map((person, index) => {
        return (
          <Person key={index} name={person.name} address={person.address} />
        );
      })}
    </>
  );
}

export default App;
