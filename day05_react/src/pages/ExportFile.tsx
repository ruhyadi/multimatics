import axios from "axios";
import Spinner from "../components/Spinner";
import { useState } from "react";

const ExportFile = () => {
  const [isLoading, setIsLoading] = useState(false);

  const BASE_URL = "http://localhost:8080";
  const ASSETS_URL = `${BASE_URL}/assets`;

  const handleDownloadFile = async (ext: string) => {
    setIsLoading(true);
    axios
      .get(`${BASE_URL}/export`)
      .then((response) => {
        window.open(`${ASSETS_URL}/transactions.${ext}`, "_blank")?.focus();
        alert("File downloaded successfully");
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Export Data</h2>
      <div className="flex space-x-4">
        <button
          onClick={() => handleDownloadFile("txt")}
          className="flex-1 py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Export TXT
        </button>
        <button
          onClick={() => handleDownloadFile("xlsx")}
          className="flex-1 py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Export Excel
        </button>
      </div>
      {isLoading && <Spinner />}
    </div>
  );
};

export default ExportFile;
