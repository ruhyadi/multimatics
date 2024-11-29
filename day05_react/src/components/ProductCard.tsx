import React from "react";
import { Link } from "react-router-dom";

export type ProductCardProps = {
  id?: string;
  name: string;
  price: number;
  description: string;
  imageUri: string;
};

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  description,
  imageUri,
}) => {
  return (
    <Link to={`/product/${id}`}>
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
            <p className="mt-1 text-sm text-gray-500 text-left">
              {description.length > 100
                ? description.slice(0, 100) + "..."
                : description}
            </p>
          </div>
          <p className="text-sm font-medium text-gray-900 text-left">
            ${price.toLocaleString("id-ID")}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
