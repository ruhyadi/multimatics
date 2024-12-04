import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BookCardProps } from "../components/BookCard";
import Swal from "sweetalert2";
import BookCard from "../components/BookCard";
import AuthContext from "../context/AuthContext";

const HomeScreen = () => {
  const [isLoading, setIsloading] = useState(true);
  const { token, setToken } = useContext(AuthContext);
  const [books, setBooks] = useState<BookCardProps[]>([]);
  const BASE_URL = "http://localhost:8000/api";
  const PICS_URL = "http://localhost:8000/book_images";
  // const TOKEN = localStorage.getItem("token");

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
    <div className="container mx-auto grid grid-cols-4 gap-4">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        books.map((book, index) => (
          <BookCard
            id={book.id}
            key={index}
            title={book.title}
            category={book.category}
            stock={book.stock}
            borrowedDate={book.borrowedDate}
            picture={`${PICS_URL}/${book.picture}`}
          />
        ))
      )}
    </div>
  );
};

export default HomeScreen;
