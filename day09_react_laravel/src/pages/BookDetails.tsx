import React, { useState } from "react";
import { BookCardProps } from "../components/BookCard";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<BookCardProps | null>(null);
  const BASE_URL = "http://localhost:8000/api";
  const PICS_URL = "http://localhost:8000/book_images";
  const TOKEN = "45|QH8y8IUteop2lQhCcbO8L6DHRTrwZ2KDjIG7FNIjc50285d8";

  const loadBook = async () => {
    axios
      .get(`${BASE_URL}/books/${id}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((response) => {
        const data = response.data.data;
        setBook({
          title: data.title,
          category: data.category.name,
          stock: data.stock,
          borrowedDate: data.borrow_date,
          picture: data.image,
        });
      })
      .catch((error) => {
        Swal.fire("Error", error.message, "error");
      });
  };

  React.useEffect(() => {
    loadBook();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center">
        <img
          src={`${PICS_URL}/${book?.picture}`}
          alt={book?.title}
          className="w-1/2 h-64 object-cover object-center"
        />
        <h2 className="text-2xl font-bold">{book?.title}</h2>
        <p className="text-lg text-gray-600">{book?.category}</p>
        <p className="text-lg text-gray-600">Stock: {book?.stock}</p>
        <p className="text-lg text-gray-600">
          Borrowed Date: {book?.borrowedDate}
        </p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">
          Borrow
        </button>
      </div>
    </div>
  );
};

export default BookDetails;

// const BookDetails: React.FC<BookCardProps> = ({
//   title,
//   category,
//   stock,
//   borrowedDate,
//   picture,
// }) => {
//   const [isBorrowed, setIsBorrowed] = useState(false);

//   const handleBorrow = () => {
//     setIsBorrowed(true);
//   };

//   return (
//     <div className="container mx-auto">
//       <div className="flex flex-col items-center">
//         <img
//           src={picture}
//           alt={title}
//           className="w-1/2 h-64 object-cover object-center"
//         />
//         <h2 className="text-2xl font-bold">{title}</h2>
//         <p className="text-lg text-gray-600">{category}</p>
//         <p className="text-lg text-gray-600">Stock: {stock}</p>
//         <p className="text-lg text-gray-600">Borrowed Date: {borrowedDate}</p>
//         <button
//           onClick={handleBorrow}
//           className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
//         >
//           {isBorrowed ? "Borrowed" : "Borrow"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BookDetails;
