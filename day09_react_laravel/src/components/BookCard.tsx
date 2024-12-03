import React from "react";
import { Link } from "react-router-dom";

export type BookCardProps = {
  id: number;
  title: string;
  category: string;
  stock: number;
  borrowedDate: string;
  picture: string;
};

const BookCard: React.FC<BookCardProps> = ({
  id,
  title,
  category,
  stock,
  borrowedDate,
  picture,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:border-blue-500 border-2">
      <img
        src={picture}
        alt={title}
        className="w-full h-64 object-cover object-center"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-sm text-gray-600">{category}</p>
        <p className="text-sm text-gray-600">Stock: {stock}</p>
        <p className="text-sm text-gray-600">Borrowed Date: {borrowedDate}</p>
      </div>
      <div className="p-4">
        <Link
          to={`/detail/${id}`}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-10"
        >
          Details
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
