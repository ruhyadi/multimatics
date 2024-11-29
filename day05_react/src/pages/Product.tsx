import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import Spinner from "../components/Spinner";

const Product: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataProduct, setDataProduct] = useState(null);
  const baseUrl = "https://fakestoreapi.com";

  const loadData = () => {
    setIsLoading(true);
    axios
      .get(`${baseUrl}/products`)
      .then((response) => {
        setDataProduct(
          response.data.map((product: any) => (
            <ProductCard
              id={product.id}
              key={product.id}
              name={product.title}
              description={product.description}
              price={product.price}
              imageUri={product.image}
            />
          ))
        );
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadData();
    return () => {};
  }, []);

  return (
    <>
      {isLoading || dataProduct == null ? (
        <Spinner />
      ) : (
        <div className="container mx-auto grid grid-cols-4 gap-4">
          {dataProduct}
        </div>
      )}
    </>
  );
};

export default Product;
