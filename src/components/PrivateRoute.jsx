// src/components/PrivateRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/verify`, {
          method: "GET",
          credentials: "include", // for JWT in cookies
        });

        const data = await res.json();
        if (res.ok && data.loggedIn) {
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Checking authentication...
      </div>
    );
  }

  return authorized ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
