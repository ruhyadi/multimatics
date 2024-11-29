import React, { useEffect, useState } from "react";
import ProductTable from "../components/ProductTable";
import axios from "axios";
import { ProductCardProps } from "../components/ProductCard";
import Spinner from "../components/Spinner";

const ProductData: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataProduct, setDataProduct] = useState<ProductCardProps[]>([]);
  const baseUrl = "https://fakestoreapi.com";

  const loadData = () => {
    setIsLoading(true);
    axios
      .get(`${baseUrl}/products`)
      .then((response) => {
        setDataProduct(
          response.data.map((product: any) =>
            console.log(product),
            dataProduct.push({
              name: product.title,
              description: product.description,
              price: product.price,
              imageUri: product.image,
            })
          )
        );
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadData();
    return () => {};
  }, []);

  console.log(dataProduct);

  return (
    <>
      {isLoading || dataProduct.length === 0 ? (
        <Spinner />
      ) : (
        <ProductTable products={dataProduct} />
      )}
    </>
  );
};

export default ProductData;
