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
    <div className="group relative">
      <img
        src={imageUri}
        alt={name}
        className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
      />
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700 text-left">
            <a href="#">
              <span aria-hidden="true" className="absolute inset-0" />
              {name}
            </a>
          </h3>
          <p className="mt-1 text-sm text-gray-500 text-left">{description}</p>
        </div>
        <p className="text-sm font-medium text-gray-900 text-left">
          Rp{price.toLocaleString("id-ID")}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
