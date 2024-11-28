import React, { useState } from "react";

const About: React.FC = () => {
  let angkaVar = 10;
  const [angkaState, setAngkaState] = useState(0);
  const [name, setName] = useState("");

  const handleBilangHalo = (): void => {
    alert("Hallo");
  };

  const handleBilangHaloParam = (name: string): void => {
    alert("Hallo " + name);
  };

  const handlePlus = (): void => {
    angkaVar = angkaVar + 1;
    const angkaBaru = angkaState + 1;
    setAngkaState(angkaBaru);
  };

  const handleMinus = (): void => {
    angkaVar = angkaVar - 1;
    const angkaBaru = angkaState - 1;
    setAngkaState(angkaBaru);
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  return (
    <div>
      <h1>About</h1>
      <button className="btn btn-primary" onClick={handleBilangHalo}>
        Bilang Halo
      </button>
      <button
        className="btn btn-secondary"
        onClick={() => handleBilangHaloParam("Budi")}
      >
        Bilang Halo Budi
      </button>

      <hr />
      <h4>Angka var: {angkaVar}</h4>
      <h4>Angka state: {angkaState}</h4>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handlePlus}
      >
        +
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleMinus}
      >
        -
      </button>

      <hr />
      <input
        type="text"
        value={name}
        onChange={(e) => handleChangeName(e)}
        className="border border-gray-400 p-2"
      />
      <text className="text-lg">Nama: {name}</text>
    </div>
  );
};

export default About;
