import React from "react";
import { ProductCardProps } from "./ProductCard";

type ProductTableProps = {
  products: ProductCardProps[];
};

const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2 px-4 w-16"></th>
          <th className="py-2">Name</th>
          <th className="py-2">Price</th>
          <th className="py-2">Description</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={index} className="border-t hover:bg-gray-100">
            <td className="py-2 px-4">
              <img
                src={product.imageUri}
                alt={product.name}
                className="w-full h-16 object-contain"
              />
            </td>
            <td className="py-2 px-4">{product.name}</td>
            <td className="py-2 px-4">
              Rp{product.price.toLocaleString("id-ID")}
            </td>
            <td className="py-2 px-4">{product.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
