import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useFormStep } from "../hooks/useFormStep";
import ProgressHeader from "./ProgressHeader";

const Page6 = () => {
  // use the project-wide save/data/loading for step 6
  const { data: stepData = {}, save, loading } = useFormStep(6);
  const [formData, setFormData] = useState({
    lookingForJob: "", // "yes" | "no"
    profilePic: null,
  });
  const [preview, setPreview] = useState(null); // server preview URL
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(5);

  // Prefill local state from useFormStep data whenever it becomes available
  useEffect(() => {
    if (!stepData) return;
    setFormData({
      lookingForJob: stepData.lookingForJob || "",
      profilePic: stepData.profilePic || stepData.profilePicPath || null,
    });

    if (stepData.profilePic) {
      const full = stepData.profilePic.startsWith("http")
        ? stepData.profilePic
        : `${process.env.REACT_APP_API_URL}${stepData.profilePic}`;
      setPreview(full);
    } else {
      setPreview(null);
    }
  }, [stepData]);

  // file input handler: set file then immediate upload (auto-upload behavior)
  const handleFileChange = async (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    setFile(f);

    // Upload to server (endpoint preserved)
    const fd = new FormData();
    fd.append("profilePic", f);

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/form/upload-profile`, {
        method: "POST",
        credentials: "include",
        body: fd,
      });
      const resp = await res.json().catch(() => ({}));

      if (res.ok) {
        const path = resp.imagePath || resp.profilePic || resp.path || "";
        const full = path && path.startsWith("http") ? path : `${process.env.REACT_APP_API_URL}${path}`;
        setPreview(full);

        // Persist using useFormStep.save(...) so everything is stored via your app flow
        const newPayload = {
          ...stepData,
          ...formData,
          profilePic: path || full,
        };

        // update local and persist via save()
        setFormData((prev) => ({ ...prev, profilePic: path || full }));
        await save(newPayload);
      } else {
        alert(resp.message || "Upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Network error during upload");
    } finally {
      // clear file input so the same file can be picked again if needed
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // click handler for Upload Photo button
  const onUploadButtonClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  // radio change -> persist immediately using save()
  const onLookingChange = async (value) => {
    const newLocal = { ...formData, lookingForJob: value };
    setFormData(newLocal);
    try {
      setSaving(true);
      const payload = { ...stepData, ...newLocal };
      await save(payload);
    } catch (err) {
      console.error("Error saving radio:", err);
    } finally {
      setSaving(false);
    }
  };

  // Final submit: ensure draft saved via save(...) then call submit endpoint
  const handleSubmit = async () => {
    try {
      // persist latest
      setSaving(true);
      const payload = { ...stepData, ...formData };
      await save(payload);

      // final submit
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/form/submit`, {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        navigate("/page6");
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data.message || "Error submitting form. Please try again.");
      }
    } catch (err) {
      console.error("Final submit error:", err);
      alert("Network error while submitting form.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading review data...</p>;

  return (
    <div className="relative min-h-screen bg-white">
       <ProgressHeader
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        onBack={(newStep) => navigate(`/page${newStep}`)} // parent decides navigation
      />
      <div className="w-full max-w-[720px] mx-auto pt-24 pb-32 px-4 ">
        <div className="max-w-[520px] mx-auto text-center pt-8">
          <h2 className="text-[20px] sm:text-[22px] font-semibold text-gray-800 mb-1">Set your profile</h2>
          <p className="text-xs text-gray-400 mb-6">This is important!</p>
        </div>

        <div className="max-w-[420px] mx-auto flex flex-col items-center gap-4">
          {/* Avatar placeholder or server preview */}
          <div className="flex flex-col items-center">
            {preview ? (
              <img
                src={preview}
                alt="Profile"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-gray-200"
              />
            ) : (
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gray-100 border-2 border-gray-200 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 20c0-2.21 3.582-4 6-4s6 1.79 6 4" />
                </svg>
              </div>
            )}
            <div className="mt-3 text-xs text-gray-500">Your Profile Preview</div>
          </div>

          {/* Single Upload Photo button (auto upload on select) */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onUploadButtonClick}
              className="inline-flex items-center gap-2 px-3 py-1.5 border rounded text-sm bg-white hover:bg-gray-50"
            >
              <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v16m6-6l-6 6-6-6" />
              </svg>
              <span className="text-xs text-gray-700">Upload Photo</span>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* radio options saved instantly via useFormStep.save */}
          <div className="w-full mt-6 flex flex-col items-center">
            <div className="w-full max-w-[420px]">
              <div className="mt-5">
                <div className="text-sm font-medium text-gray-700 mb-2">Are you actively looking for a job?</div>
                <div className="flex flex-col gap-2 text-sm text-gray-700">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="looking"
                      value="yes"
                      checked={formData.lookingForJob === "yes"}
                      onChange={() => onLookingChange("yes")}
                      className="accent-black"
                    />
                    Yes, actively seeking
                  </label>

                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="looking"
                      value="no"
                      checked={formData.lookingForJob === "no"}
                      onChange={() => onLookingChange("no")}
                      className="accent-black"
                    />
                    No, I'm not looking
                  </label>
                </div>
              </div>

              <div className="mt-6 text-xs text-gray-400">This info helps us show the right opportunities — you can always edit later.</div>
            </div>
          </div>
        </div>
      </div>

      {/* bottom persistent bar — right-aligned Continue + 'or press Enter' */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] py-3.5 px-6">
        <div className="flex justify-end items-center pr-6 sm:pr-10 gap-3">
          <span className="text-gray-400 text-[13px] italic tracking-wide opacity-85">or press Enter</span>

          <button
            type="button"
            onClick={handleSubmit}
            aria-label="Continue"
            className="text-[14px] font-medium px-5 py-2 rounded-md shadow-sm bg-[#555] hover:bg-[#007BFF] text-white transition-colors duration-200 ease-in-out"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page6;
