import React from "react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Toast } from "../components/Toast";
import AuthContext from "../context/AuthContext";
import { BookCardProps } from "../components/BookCard";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import BookModal from "../components/BookModal";

const BookList: React.FC = () => {
  const [isLoading, setIsloading] = useState(true);
  const { token } = useContext(AuthContext);
  const [books, setBooks] = useState<BookCardProps[]>([]);
  const [addBook, setAddBook] = useState<BookCardProps>();
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
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
        Toast.fire("Error", error.message, "error");
      })
      .finally(() => setIsloading(false));
  };

  const handleDelete = async (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${BASE_URL}/books/${id}`, {
            headers: {
              Authorization: `${token}`,
            },
          })
          .then(() => {
            Toast.fire("Deleted!", "Your file has been deleted.", "success");
            loadBooks();
          })
          .catch((error) => {
            Toast.fire("Error", error.message, "error");
          });
      }
    });
  };

  // handle add books
  const handleAddBook = () => {
    setIsAddModalVisible(true);
  };

  // handle confirm add books
  const handleConfirmAddBook = (book: BookCardProps) => {
    console.log("Book: ", book);
    setIsAddModalVisible(false);
  };

  useEffect(() => {
    loadBooks();
  }, []);

  return (
    <>
      {isAddModalVisible && (
        <BookModal
          onConfirm={(book) => {
            handleConfirmAddBook(book);
          }}
          onDismiss={() => {
            setIsAddModalVisible(false);
          }}
        />
      )}
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-4 mt-10">
          <h1 className="text-2xl font-bold">Book List</h1>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            onClick={handleAddBook}
          >
            Add Book
          </button>
        </div>
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
                <th className="py-2 border-b"></th>
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
                    <div className="space-x-2">
                      <Link
                        to={`/detail/${book.id}`}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                      >
                        Details
                      </Link>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                        onClick={() => handleDelete(book.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default BookList;
