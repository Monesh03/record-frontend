import React from "react";
import { useForm } from "react-hook-form";
import { useFormStep } from "../hooks/useFormStep";
import LogoutButton from "./LogoutButton";
import { useNavigate } from "react-router-dom";

const Page3 = () => {
  const { data, save, loading } = useFormStep(3);
  const { register, handleSubmit, reset, getValues } = useForm(); // ✅ added getValues
  const navigate = useNavigate();

  // ✅ Prefill form with saved data
  React.useEffect(() => {
    if (Object.keys(data).length > 0) reset(data);
  }, [data, reset]);

  // ✅ Handle Next (save + navigate)
  const onSubmit = async (values) => {
    await save(values);
    navigate("/page4");
  };

  // ✅ Save form before leaving or refreshing
  React.useEffect(() => {
    const handleBeforeUnload = () => {
      const values = getValues();
      if (Object.keys(values).length > 0) save(values);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [getValues, save]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="relative min-h-screen flex flex-col justify-center bg-gray-100">
      <LogoutButton />
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Experience Details
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Company Name</label>
            <input
              type="text"
              {...register("company")}
              placeholder="Enter company name"
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Role / Designation</label>
            <input
              type="text"
              {...register("role")}
              placeholder="Enter your role"
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Duration</label>
            <input
              type="text"
              {...register("duration")}
              placeholder="e.g. Jan 2023 – Jun 2024"
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Description</label>
            <textarea
              {...register("description")}
              placeholder="Briefly describe your responsibilities or projects"
              rows="4"
              className="w-full border rounded p-2"
            />
          </div>

          <div className="flex justify-between pt-2">
            {/* ✅ Save before going back */}
            <button
              type="button"
              onClick={async () => {
                await save(getValues());
                navigate("/page2");
              }}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Back
            </button>

            {/* ✅ Save before moving forward */}
            <button
              type="submit"
              onClick={async () => await save(getValues())}
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-pink-600 transition"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page3;
