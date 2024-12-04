import React from "react";
import { BookCardProps } from "./BookCard";
import { useForm } from "react-hook-form";

type BookModalProps = {
  onConfirm: (book: BookCardProps) => void;
  onDismiss: () => void;
};

const BookModal: React.FC<BookModalProps> = ({ onConfirm, onDismiss }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BookCardProps>();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4">Add New Book</h2>
        <form onSubmit={handleSubmit(onConfirm)}>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter book title"
              {...register("title", { required: true })}
            />
            {errors.title && (
              <span className="text-red-500">Title is required</span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Category</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter book category"
              {...register("category", { required: true })}
            />
            {errors.category && (
              <span className="text-red-500">Category is required</span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Stock</label>
            <input
              type="number"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter stock quantity"
              {...register("stock", { required: true })}
            />
            {errors.stock && (
              <span className="text-red-500">Stock is required</span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Borrowed Date</label>
            <input
              type="date"
              className="w-full px-3 py-2 border rounded-lg"
              {...register("borrowedDate", { required: true })}
            />
            {errors.borrowedDate && (
              <span className="text-red-500">Borrowed Date is required</span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Image</label>
            <input
              type="file"
              className="w-full px-3 py-2 border rounded-lg"
              {...register("picture", { required: true })}
            />
            {errors.picture && (
              <span className="text-red-500">Image is required</span>
            )}
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              onClick={onDismiss}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookModal;
