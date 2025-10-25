import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Page1 from "./components/Page1";
import Page2 from "./components/Page2";
import Page3 from "./components/Page3";
import Page4 from "./components/Page4";
import Page5 from "./components/Page5";
import Page6 from "./components/Page6";
import Page7 from "./components/Page7";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/page1" element={<PrivateRoute><Page1 /></PrivateRoute>} />
        <Route path="/page2" element={<PrivateRoute><Page2 /></PrivateRoute>} />
        <Route path="/page3" element={<PrivateRoute><Page3 /></PrivateRoute>} />
        <Route path="/page4" element={<PrivateRoute><Page4 /></PrivateRoute>} />
        <Route path="/page5" element={<PrivateRoute><Page5 /></PrivateRoute>} />
        <Route path="/page6" element={<PrivateRoute><Page6 /></PrivateRoute>} />
        <Route path="/page7" element={<PrivateRoute><Page7 /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

// ✅ Dynamic Navbar component
function Navbar() {
  const location = useLocation();

  // Define which routes are "public"
  const isPublicPage =
    location.pathname === "/" || location.pathname === "/login";

  return (
    <nav className="bg-orange-500 text-white p-4 flex justify-between">
      <h1 className="font-bold text-xl">RECORD</h1>
      {isPublicPage && (
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Register</Link>
          <Link to="/login" className="hover:underline">Login</Link>
        </div>
      )}
    </nav>
  );
}

export default App;
