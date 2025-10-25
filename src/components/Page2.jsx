import React from "react";
import { useForm } from "react-hook-form";
import { useFormStep } from "../hooks/useFormStep";
import LogoutButton from "./LogoutButton";
import { useNavigate } from "react-router-dom";

const Page2 = () => {
  const { data, save, loading } = useFormStep(2);
  const { register, handleSubmit, reset, getValues } = useForm(); // ✅ added getValues
  const navigate = useNavigate();

  // ✅ Prefill data when page loads or revisited
  React.useEffect(() => {
    if (Object.keys(data).length > 0) reset(data);
  }, [data, reset]);

  // ✅ Save current data & move to next page
  const onSubmit = async (values) => {
    await save(values);
    navigate("/page3");
  };

  // ✅ Save form data even if user refreshes or navigates away
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
          Education Details
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Degree"
            {...register("degree")}
            className="w-full border rounded p-2"
          />
          <input
            type="text"
            placeholder="University"
            {...register("university")}
            className="w-full border rounded p-2"
          />
          <input
            type="number"
            placeholder="Year of Passing"
            {...register("year")}
            className="w-full border rounded p-2"
          />
          <input
            type="text"
            placeholder="Grade / CGPA"
            {...register("grade")}
            className="w-full border rounded p-2"
          />

          <div className="flex justify-between">
            <button
              type="button"
              onClick={async () => {
                await save(getValues()); // ✅ save before going back
                navigate("/page1");
              }}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Back
            </button>

            <button
              type="submit"
              onClick={async () => await save(getValues())} // ✅ ensure save on Next
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

export default Page2;
