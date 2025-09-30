import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProdcutCard";

export default function Products() {
  const [product, setProduct] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/products")
      .then((res) => {
        setProduct(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {product.map((p) => (
          <ProductCard
            key={p._id}
            id={p._id}
            title={p.title}
            image={p.image_url.url}
            category={p.category}
            price={p.price}
          />
        ))}
      </div>
    </div>
  );
}
