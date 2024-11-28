import React from "react";

export type ProductCardProps = {
  name: string;
  price: number;
  description: string;
  imageUri: string;
};

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  description,
  imageUri,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 transform transition-transform hover:scale-105 hover:shadow-xl">
      <img
        src={imageUri}
        alt={name}
        className="w-full h-64 object-cover rounded-t-lg"
      />
      <div className="mt-4">
        <div className="font-bold text-xl">{name}</div>
        <div className="text-gray-500">Rp{price.toLocaleString("id-ID")}</div>
        <div className="text-gray-600">{description}</div>
      </div>
    </div>
  );
};

export default ProductCard;
