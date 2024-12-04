import React from "react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import AuthContext from "../context/AuthContext";
import { BookCardProps } from "../components/BookCard";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";

const BookList: React.FC = () => {
  const [isLoading, setIsloading] = useState(true);
  const { token } = useContext(AuthContext);
  const [books, setBooks] = useState<BookCardProps[]>([]);
  const BASE_URL = "http://localhost:8000/api";
  const PIC_URL = "http://localhost:8000/book_images";

  const loadBooks = async () => {
    setIsloading(true);
    axios
      .get(`${BASE_URL}/books`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        const data = response.data.data;
        setBooks(
          data.map((book: any) => ({
            id: book.id,
            title: book.title,
            category: book.category.name,
            stock: book.stock,
            borrowedDate: book.borrow_date,
            picture: book.image,
          }))
        );
      })
      .catch((error) => {
        Swal.fire("Error", error.message, "error");
      })
      .finally(() => setIsloading(false));
  };

  useEffect(() => {
    loadBooks();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Book List</h1>
      {isLoading ? (
        <Spinner />
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 border-b">Image</th>
              <th className="py-2 border-b">Title</th>
              <th className="py-2 border-b">Category</th>
              <th className="py-2 border-b">Stock</th>
              <th className="py-2 border-b">Borrowed Date</th>
              <th className="py-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr
                key={index}
                className="text-center border-b hover:bg-gray-100"
              >
                <td className="py-2">
                  <img
                    src={`${PIC_URL}/${book.picture}`}
                    alt={book.title}
                    className="w-12 h-12 object-cover mx-auto"
                  />
                </td>
                <td className="py-2">{book.title}</td>
                <td className="py-2">{book.category}</td>
                <td className="py-2">{book.stock}</td>
                <td className="py-2">{book.borrowedDate}</td>
                <td className="py-2">
                  <Link
                    to={`/detail/${book.id}`}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookList;
