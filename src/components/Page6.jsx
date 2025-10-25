import React, { useEffect, useState } from "react";
import LogoutButton from "./LogoutButton";
import { useNavigate } from "react-router-dom";

const Page6 = () => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  // 🟢 Fetch all step data + profile pic
 useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/form", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setFormData(data);

        // ✅ Always reset preview if image exists
        if (data?.profilePic) {
          const fullUrl = data.profilePic.startsWith("http")
            ? data.profilePic
            : `http://localhost:5000${data.profilePic}`;
          setPreview(fullUrl);
        } else {
          setPreview(null);
        }
      } else {
        setFormData(null);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);

  // 🟢 Upload profile picture
  const handleUpload = async () => {
    if (!file) return alert("Please select an image first.");
    const formDataObj = new FormData();
    formDataObj.append("profilePic", file);

    try {
      const res = await fetch("http://localhost:5000/api/form/upload-profile", {
        method: "POST",
        credentials: "include",
        body: formDataObj,
      });
      const data = await res.json();
      if (res.ok) {
        setPreview(`http://localhost:5000${data.imagePath}`);
        alert("Profile picture uploaded successfully!");
      } else {
        alert(data.message || "Upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Network error during upload");
    }
  };

  // 🟢 Final submission
  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/form/submit", {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) navigate("/page7");
      else alert("Error submitting form. Please try again.");
    } catch {
      alert("Network error while submitting form.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading review data...</p>;

  return (
    <div className="relative min-h-screen flex flex-col justify-center bg-gray-100">
      <LogoutButton />
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Review & Submit
        </h2>

        {/* 🖼 PROFILE PICTURE */}
        <div className="mb-6 text-center">
          <h3 className="font-semibold text-gray-700 mb-2">Profile Picture</h3>
          {preview ? (
  <img
    src={preview}
    alt="Profile"
    className="w-32 h-32 rounded-full mx-auto mb-3 object-cover border-2 border-gray-300"
  />
) : (
  <img
    src="/default-avatar.png" // your placeholder image
    alt="No profile"
    className="w-32 h-32 rounded-full mx-auto mb-3 object-cover border-2 border-gray-200 opacity-70"
  />
)}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="block mx-auto mb-2"
          />
          <button
            type="button"
            onClick={handleUpload}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Upload
          </button>
        </div>

        {/* 🧾 PERSONAL DETAILS */}
        <section className="mb-6 border-b pb-3">
          <h3 className="font-semibold text-gray-700 mb-2">Personal Details</h3>
          <p><strong>Name:</strong> {formData?.step1?.name || "—"}</p>
          <p><strong>DOB:</strong> {formData?.step1?.dob || "—"}</p>
          <p><strong>Gender:</strong> {formData?.step1?.gender || "—"}</p>
          <p><strong>Contact:</strong> {formData?.step1?.contact || "—"}</p>
          <p><strong>Address:</strong> {formData?.step1?.address || "—"}</p>
        </section>

        {/* 🎓 EDUCATION DETAILS */}
        <section className="mb-6 border-b pb-3">
          <h3 className="font-semibold text-gray-700 mb-2">Education Details</h3>
          <p><strong>Degree:</strong> {formData?.step2?.degree || "—"}</p>
          <p><strong>University:</strong> {formData?.step2?.university || "—"}</p>
          <p><strong>Year of Passing:</strong> {formData?.step2?.year || "—"}</p>
          <p><strong>Grade / CGPA:</strong> {formData?.step2?.grade || "—"}</p>
        </section>

        {/* 💼 EXPERIENCE DETAILS */}
        <section className="mb-6 border-b pb-3">
          <h3 className="font-semibold text-gray-700 mb-2">Experience Details</h3>
          <p><strong>Company:</strong> {formData?.step3?.company || "—"}</p>
          <p><strong>Role:</strong> {formData?.step3?.role || "—"}</p>
          <p><strong>Duration:</strong> {formData?.step3?.duration || "—"}</p>
          <p><strong>Description:</strong> {formData?.step3?.description || "—"}</p>
        </section>

        {/* 🧠 SKILLS */}
        <section className="mb-6 border-b pb-3">
          <h3 className="font-semibold text-gray-700 mb-2">Skills</h3>
          <p>{formData?.step4?.skills?.join(", ") || "—"}</p>
        </section>

        {/* 🧩 PROJECT DETAILS */}
        <section className="mb-6 border-b pb-3">
          <h3 className="font-semibold text-gray-700 mb-2">Project / Portfolio</h3>
          <p><strong>Title:</strong> {formData?.step5?.projectTitle || "—"}</p>
          <p><strong>Description:</strong> {formData?.step5?.projectDescription || "—"}</p>
          <p><strong>GitHub:</strong> {formData?.step5?.githubLink || "—"}</p>
          <p><strong>Demo:</strong> {formData?.step5?.demoLink || "—"}</p>
        </section>

        {/* ✅ ACTION BUTTONS */}
        <div className="flex justify-between pt-4">
          <button
            onClick={() => navigate("/page5")}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page6;
