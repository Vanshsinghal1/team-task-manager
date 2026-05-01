import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-black to-gray-900 text-white">

      <h1 className="text-4xl font-bold mb-8">🚀 Task Manager</h1>

      <div className="flex gap-6">

        {/* Admin */}
        <button
          onClick={() => navigate("/admin-login")}
          className="bg-red-500 px-6 py-3 rounded-lg hover:bg-red-600 transition"
        >
          👑 Admin Login
        </button>

        {/* User */}
        <button
          onClick={() => navigate("/user-login")}
          className="bg-blue-500 px-6 py-3 rounded-lg hover:bg-blue-600 transition"
        >
          👨‍💻 User Login
        </button>

      </div>

      {/* Signup link */}
      <p className="mt-6 text-gray-400">
        New user?{" "}
        <span
          onClick={() => navigate("/signup")}
          className="text-blue-400 cursor-pointer"
        >
          Register here
        </span>
      </p>

    </div>
  );
}