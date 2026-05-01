import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const isAdminRoute = location.pathname === "/admin-login";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      
      if (isAdminRoute && res.data.user.role !== "admin") {
        alert("❌ Not an admin account");
        setLoading(false);
        return;
      }

      if (!isAdminRoute && res.data.user.role === "admin") {
        alert("❌ Please use admin login");
        setLoading(false);
        return;
      }

     
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("userId", res.data.user.id);

            if (res.data.user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }

    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-gray-900 text-white">

      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-8 rounded-xl shadow-lg w-80"
      >
        
        <h2 className="text-2xl mb-6 text-center font-bold">
          {isAdminRoute ? "👑 Admin Login" : "👨‍💻 User Login"}
        </h2>

        
        <input
          placeholder="Email"
          required
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          className="w-full mb-3 p-2 rounded bg-gray-700 outline-none"
        />

       
        <input
          placeholder="Password"
          type="password"
          required
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          className="w-full mb-4 p-2 rounded bg-gray-700 outline-none"
        />

       
        <button
          className="w-full bg-green-500 py-2 rounded hover:bg-green-600"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        
        {!isAdminRoute && (
          <p className="text-sm mt-4 text-center text-gray-400">
            New user?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-blue-400 cursor-pointer"
            >
              Register here
            </span>
          </p>
        )}

       
        <p
          onClick={() => navigate("/")}
          className="text-center mt-4 text-gray-500 cursor-pointer text-sm"
        >
          ← Back to Home
        </p>

      </form>
    </div>
  );
}