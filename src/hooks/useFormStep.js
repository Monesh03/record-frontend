// src/hooks/useFormStep.js
import { useState, useEffect, useRef } from "react";

export function useFormStep(step) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const fetched = useRef(false);

  // ✅ Backend URL (for Create React App)
  const API_BASE_URL = process.env.REACT_APP_API_URL;


  // ✅ Fetch saved data from backend (once per user)
  useEffect(() => {
    const fetchData = async () => {
      if (fetched.current) return; // avoid duplicate fetches
      fetched.current = true;
      try {
        const res = await fetch(`${API_BASE_URL}/api/form`, {
          credentials: "include",
        });
        const result = await res.json();
        if (result && result[`step${step}`]) {
          setData(result[`step${step}`]);
        } else {
          setData({});
        }
      } catch (err) {
        console.error("Error fetching form data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [step, API_BASE_URL]);

  // ✅ Save data instantly on navigation or change
  const save = async (values) => {
    setData(values); // keep locally to avoid clearing form
    try {
      await fetch(`${API_BASE_URL}/api/form/step/${step}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
    } catch (err) {
      console.error("Error saving step data:", err);
    }
  };

  return { data, save, loading };
}
