import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { openDB } from "idb";

const FormIdb = () => {
  const { register, handleSubmit, setValue, watch, reset } = useForm();
  const watchFields = watch();

  const DB_NAME = "formDB";
  const STORE_NAME = "formData";

  // init indexedDB
  const initDB = () => {
    return openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: "id" });
        }
      },
    });
  };

  // save form handle
  const saveFormHandle = async (data: any) => {
    const db = await initDB();
    await db.put(STORE_NAME, { id: 1, ...data });
  };

  // load form handle
  const loadFormHandle = async () => {
    const db = await initDB();
    const data = await db.get(STORE_NAME, 1);
    if (data) {
      Object.keys(data).forEach((key) => {
        if (key !== "id") {
          setValue(key, data[key]);
        }
      });
    }
  };

  const clearFormData = async () => {
    const db = await initDB();
    await db.delete(STORE_NAME, 1);
  };

  const onSubmit = (data: any) => {
    console.log(`Form submitted: ${JSON.stringify(data)}`);
    alert("Form submitted");
    reset();
    clearFormData();
  };

  useEffect(() => {
    loadFormHandle();
  }, []);

  useEffect(() => {
    saveFormHandle(watchFields);
  }, [watchFields]);

  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-5">Form with IndexedDB</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* name */}
        <div>
          <label
            htmlFor="name"
            className="text-left block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {/* email */}
        <div>
          <label
            htmlFor="email"
            className="text-left block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {/* phone number */}
        <div>
          <label
            htmlFor="phone"
            className="text-left block text-sm font-medium text-gray-700"
          >
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            {...register("phone")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {/* photo file */}
        <div>
          <label
            htmlFor="photo"
            className="text-left block text-sm font-medium text-gray-700"
          >
            Photo
          </label>
          <input
            type="file"
            id="photo"
            {...register("photo")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {/* password */}
        <div>
          <label
            htmlFor="password"
            className="text-left block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormIdb;
