import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Product = {
  _id: string;
  image_url: { url: string };
  title: string;
  category: string;
  price: number;
  description: string;
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!product) return <p>Loading...</p>;

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${id}`);
      console.log("product deleted");
      navigate(`/products`);
    } catch (err) {
      console.error(err);
      setError("Failed to delete product");
    }
  };

  return (
    <div className="p-10 max-w-5xl mx-auto flex">
      <img
        src={product.image_url.url}
        alt={product.title}
        className="w-1/2 h-128 object-cover rounded-xl mb-4"
      />
      <div className="w-1/2 p-6 pl-12">
        <h1 className="text-4xl font-bold mb-2">{product.title}</h1>
        <span className="inline-block bg-blue-100 text-blue-800 text-base px-4 py-1 rounded-full my-4">
          {product.category}
        </span>
        <p className="text-2xl font-bold mb-4">&#8377; {product.price}</p>
        <p className="text-gray-700 dark:text-white">{product.description}</p>
        <div className="flex gap-3">
          <Link to={`/products/${product._id}/edit`}>
            <Button variant="default" className="mt-4 text-base">
              Edit
            </Button>
          </Link>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="mt-4 text-base">
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently remove the
                  product listing.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
