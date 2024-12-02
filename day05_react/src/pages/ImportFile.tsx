import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Spinner from "../components/Spinner";

const ImportFile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto p-4 bg-white shadow-md rounded"
    >
      <h2 className="text-2xl font-bold mb-4">Import Data</h2>
      {/* photo */}
      <div className="mb-4">
        <label className="text-left block text-gray-700">File</label>
        <input
          type="file"
          {...register("file", { required: true })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.file && (
          <span className="text-left text-red-500 text-sm">
            This field is required
          </span>
        )}
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Submit
        </button>
      )}
    </form>
  );
};

export default ImportFile;
