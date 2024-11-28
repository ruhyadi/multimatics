import React from "react";
import products from "../mocks/products";
import ProductTable from "../components/ProductTable";

const ProductData: React.FC = () => {
  return <ProductTable products={products} />;
};

export default ProductData;
