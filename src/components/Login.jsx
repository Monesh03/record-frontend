import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Clean user input
  const clean = (val) => DOMPurify.sanitize(val);

  // Handle input change
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: clean(e.target.value) });

  // Handle login form submit
 const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage("");

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (res.ok) {
      // ✅ Check submission status from backend
      if (data.isSubmitted) {
        navigate("/page7", { state: { username: data.user.name } });
      } else {
        navigate("/page1", { state: { username: data.user.name } });
      }
    } else {
      setMessage(`⚠️ ${data.message}`);
    }
  } catch (error) {
    setMessage("❌ Something went wrong");
  }
};


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login
        </h2>

        {message && (
          <p className="text-center mb-4 text-sm text-red-500">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-2 rounded-lg transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-pink-600"
            }`}
          >
            {loading ? "Verifying..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
