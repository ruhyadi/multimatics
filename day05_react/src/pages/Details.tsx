import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { ProductCardProps } from "../components/ProductCard";

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [detailProduct, setDetailProduct] = useState<ProductCardProps | null>(
    null
  );

  const loadData = () => {
    setIsLoading(true);
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setDetailProduct({
          name: response.data.title,
          description: response.data.description,
          price: response.data.price,
          imageUri: response.data.image,
        });
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
      {isLoading || detailProduct == null ? (
        <Spinner />
      ) : (
        <div className="container mx-auto">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <img src={detailProduct.imageUri} alt={detailProduct.name} />
            </div>
            <div>
              <h1>{detailProduct.name}</h1>
              <p>{detailProduct.description}</p>
              <p>{detailProduct.price}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Details;
