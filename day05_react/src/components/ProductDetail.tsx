import React from "react";
import { ProductCardProps } from "./ProductCard";

const ProductDetail: React.FC<ProductCardProps> = ({
  name,
  description,
  price,
  imageUri,
}) => {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <image src={imageUri} alt={name} className="w-full" />
        </div>
        <div>
          <h1>{name}</h1>
          <p>{description}</p>
          <p>{price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
