import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Product {
  title: string;
  description: string;
  price: number;
  category: string;
  image_url: {
    url: string;
  };
}

const CreateForm = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product>({
    title: "",
    description: "",
    price: 0,
    category: "",
    image_url: { url: "" },
  });
  //   const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  if (error) return <p>{error}</p>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setProduct((prev) => ({ ...prev, description: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3000/api/products`, product);
      navigate(`/products`);
    } catch (err) {
      console.error(err);
      setError("Failed to create product");
    }
  };

  return (
    <div className="max-w-2xl m-auto p-6 bg-[var(--card)] rounded-xl shadow h-full mt-10">
      <h1 className="text-2xl font-bold mb-4">New Product</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Title */}
        <input
          name="title"
          type="text"
          value={product.title}
          onChange={handleChange}
          placeholder="Title"
          className="p-2 border rounded"
          required
        />

        <textarea
          name="description"
          value={product.description}
          onChange={handleTextAreaChange}
          placeholder="Description"
          className="p-2 border rounded"
          required
        />

        {/* Price */}
        <input
          name="price"
          type="number"
          value={product.price}
          onChange={(e) =>
            setProduct((prev) => ({
              ...prev,
              price: parseFloat(e.target.value),
            }))
          }
          placeholder="Price"
          className="p-2 border rounded"
          required
        />

        {/* Category */}
        <input
          name="category"
          type="text"
          value={product.category}
          onChange={handleChange}
          placeholder="Category"
          className="p-2 border rounded"
          required
        />

        {/* Image URL */}
        <input
          name="imageUrl"
          type="text"
          value={product.image_url.url}
          onChange={(e) =>
            setProduct((prev) => ({
              ...prev,
              image_url: { url: e.target.value },
            }))
          }
          placeholder="Image URL"
          className="p-2 border rounded"
        />

        {/* Submit */}
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded hover:bg-green-700 transition"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateForm;
