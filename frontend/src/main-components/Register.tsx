import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginForm } from "@/components/login-form";

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (email: string, password: string) => {
    setError(null);
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:3000/api/users/register",
        { email, password },
        { withCredentials: true }
      );
      navigate("/products");
    } catch (err: any) {
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Signup failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full items-center justify-center mt-20">
      <LoginForm
        className="w-full max-w-md"
        title="Create a new account"
        // BtnText="Sign Up"
        linkHead="Already have an account ?"
        linkText="Log in"
        description="Enter your email below to create your account"
        link="#"
        onLogin={handleRegister}
        BtnText={loading ? "Signing up..." : "Sign Up"}
      />
      {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
    </div>
  );
}
