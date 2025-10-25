import React, { useState } from "react";
import DOMPurify from "dompurify";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const clean = (val) => DOMPurify.sanitize(val);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: clean(e.target.value) });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    // Validation
    if (!form.name.trim() || !form.email.trim() || !form.password.trim())
      return setMessage("⚠️ All fields are required.");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email))
      return setMessage("⚠️ Please enter a valid email.");

    if (form.password.length < 8)
      return setMessage("⚠️ Password must be at least 8 characters.");

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(form),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Registered successfully!");
        setForm({ name: "", email: "", password: "" });
      } else {
        setMessage(`⚠️ ${data.message || "Something went wrong"}`);
      }
    } catch {
      setMessage("❌ Network error, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Register</h2>
        {message && <p className="text-center mb-4 text-sm text-red-500">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400"
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-2 rounded-lg transition ${loading ? "bg-gray-400" : "bg-orange-500 hover:bg-pink-600"}`}
          >
            {loading ? "Processing..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
