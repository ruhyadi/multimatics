import React from "react";

type BookCardProps = {
    title: string;
    category: string;
    stock: number;
    borrowedDate: string;
    picture: string;
}

const BookCard: React.FC<BookCardProps> = ({ title, category, stock, borrowedDate, picture }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src={picture} alt={title} className="w-full h-64 object-cover object-center" />
            <div className="p-4">
                <h2 className="text-lg font-bold">{title}</h2>
                <p className="text-sm text-gray-600">{category}</p>
                <p className="text-sm text-gray-600">Stock: {stock}</p>
                <p className="text-sm text-gray-600">Borrowed Date: {borrowedDate}</p>
            </div>
        </div>
    );
};

export default BookCard;