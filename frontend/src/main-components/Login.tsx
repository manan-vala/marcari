import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginForm } from "@/components/login-form";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    setError(null);
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:3000/api/users/login",
        { email, password },
        { withCredentials: true }
      );
      navigate("/products");
    } catch (err: any) {
      const msg = err?.response?.data?.error || "Login failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full items-center justify-center mt-20">
      <div className="w-full max-w-md">
        <LoginForm
          onLogin={handleLogin}
          BtnText={loading ? "Logging in..." : "Login"}
        />
        {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
      </div>
    </div>
  );
}
