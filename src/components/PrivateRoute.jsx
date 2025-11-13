// src/components/PrivateRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const API = (process.env.REACT_APP_API_URL || "").replace(/\/$/, "");

        // Fallback token stored by login (server should return token in body as fallback)
        const fallbackToken = localStorage.getItem("jwt");

        const headers = {};
        if (fallbackToken) headers["Authorization"] = `Bearer ${fallbackToken}`;

        const res = await fetch(`${API}/api/auth/verify`, {
          method: "GET",
          credentials: "include", // still include cookies if available
          headers,
        });

        // Debugging: log status + headers (remove in production)
        console.debug("[verify] status:", res.status);

        // Try to parse JSON safely
        let data = null;
        try {
          data = await res.json();
        } catch (err) {
          console.warn("[verify] invalid JSON response", err);
        }

        console.debug("[verify] body:", data);

        // If backend explicitly reports loggedIn true, accept it.
        if (res.ok && data && data.loggedIn) {
          setAuthorized(true);
        } else {
          // If backend returns 401 or loggedIn false, try another check:
          // If we have a fallback token in localStorage, treat that as auth (optional)
          if (fallbackToken) {
            // basic optimistic behavior: consider authorized if token exists locally;
            // you can instead call a token-verify endpoint or decode/verify client-side if desired.
            setAuthorized(true);
          } else {
            setAuthorized(false);
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        // if fallback token exists, allow it (avoids being logged out on flaky mobile)
        const fallbackToken = localStorage.getItem("jwt");
        if (fallbackToken) setAuthorized(true);
        else setAuthorized(false);
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
