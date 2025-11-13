import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await fetch("//${process.env.REACT_APP_API_URL}/api/auth/logout", {
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
  className="absolute top-10 right-5 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition
    sm:right-8 sm:px-6 sm:py-3
    md:right-12 md:px-10 md:py-5 
    lg:top-3 lg:right-16 lg:px-12 lg:py-6
    xl:top-3 xl:right-20 xl:px-14 xl:py-7"
>

</button>
  );
};

export default LogoutButton;
