import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await fetch("//http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) navigate("/login");
      else ;
    } catch {
      
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="absolute top-5 right-20 bg-orange-500 text-white px-14 py-7 -md hover:bg-orange-600 transition"
    >
    </button>
  );
};

export default LogoutButton;
