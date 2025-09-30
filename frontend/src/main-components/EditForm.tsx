import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image_url: {
    url: string;
  };
}

const EditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch product details
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load product");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found</p>;

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/products/${id}`, product);
      navigate(`/products/${id}`);
    } catch (err) {
      console.error(err);
      setError("Failed to update product");
    }
  };

  return (
    <div className="max-w-2xl m-auto p-6 bg-[var(--card)] rounded-xl shadow h-full mt-10">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Title */}
        <input
          type="text"
          value={product.title}
          onChange={(e) => setProduct({ ...product, title: e.target.value })}
          placeholder="Title"
          className="p-2 border rounded"
        />

        {/* Description */}
        <textarea
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
          placeholder="Description"
          className="p-2 border rounded"
        />

        {/* Price */}
        <input
          type="number"
          value={product.price}
          onChange={(e) =>
            setProduct({ ...product, price: parseFloat(e.target.value) })
          }
          placeholder="Price"
          className="p-2 border rounded"
        />

        {/* Category */}
        <input
          type="text"
          value={product.category}
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
          placeholder="Category"
          className="p-2 border rounded"
        />

        {/* Image URL */}
        <input
          type="text"
          value={product.image_url.url}
          onChange={(e) =>
            setProduct({ ...product, image_url: { url: e.target.value } })
          }
          placeholder="Image URL"
          className="p-2 border rounded"
        />

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditForm;
