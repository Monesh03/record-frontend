import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) navigate("/login");
      else alert("Logout failed, please try again.");
    } catch {
      alert("Network error while logging out.");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="absolute top-4 right-6 bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
