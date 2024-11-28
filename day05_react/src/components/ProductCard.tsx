import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <img src={imageUri} alt={name} className="w-full" />
      </CardContent>
      <CardFooter>
        <div className="flex-1 text-xl font-bold">${price}</div>
        <button className="btn btn-primary">Add to Cart</button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
