import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  id: string;
  image: string;
  title: string;
  category: string;
  price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  title,
  category,
  price,
}) => {
  return (
    <Link to={`/products/${id}`}>
      <div className="bg-[var(--card)] rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow duration-200">
        <img src={image} alt={title} className="w-full h-48 object-cover" />

        <div className="p-6 flex flex-col gap-2">
          <Badge variant="default">{category}</Badge>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {title}
          </h3>
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            &#8377; {price}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
