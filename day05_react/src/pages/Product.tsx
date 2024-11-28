import React from "react";
import ProductCard from "../components/ProductCard";
import products from "../mocks/products";

const Product: React.FC = () => {
  return (
    <div className="container mx-auto grid grid-cols-4 gap-4">
      {products.map((product, index) => (
        <ProductCard key={index} {...product} />
      ))}
    </div>
  );
};

export default Product;
