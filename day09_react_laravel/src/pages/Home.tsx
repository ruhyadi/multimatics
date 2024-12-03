import axios from "axios";
import { useEffect, useState } from "react";
import { BookCardProps } from "../components/BookCard";
import Swal from "sweetalert2";
import BookCard from "../components/BookCard";

const HomeScreen = () => {
  const [isLoading, setIsloading] = useState(true);
  const [books, setBooks] = useState<BookCardProps[]>([]);
  const BASE_URL = "http://localhost:8000/api";
  const TOKEN = "45|QH8y8IUteop2lQhCcbO8L6DHRTrwZ2KDjIG7FNIjc50285d8";

  const loadBooks = async () => {
    setIsloading(true);
    axios
      .get(`${BASE_URL}/books`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((response) => {
        const data = response.data.data;
        setBooks(
          data.map((book: any) => ({
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
            key={index}
            title={book.title}
            category={book.category}
            stock={book.stock}
            borrowedDate={book.borrowedDate}
            picture={book.picture}
          />
        ))
      )}
    </div>
  );
};

export default HomeScreen;
