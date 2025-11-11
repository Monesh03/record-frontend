import React from "react";
import { useForm } from "react-hook-form";
import { useFormStep } from "../hooks/useFormStep";
import LogoutButton from "./LogoutButton";
import { useNavigate } from "react-router-dom";
import ProgressHeader from "./ProgressHeader";

const Page1 = () => {
  const { data, save, loading } = useFormStep(1);
  const { register, handleSubmit, reset, getValues } = useForm(); // ✅ added getValues
  const navigate = useNavigate();

  // ✅ Prefill form when revisiting
  React.useEffect(() => {
    if (Object.keys(data).length > 0) reset(data);
  }, [data, reset]);

  // ✅ Save before moving forward
  const onSubmit = async (values) => {
    await save(values);
    navigate("/page2");
  };

  // ✅ Save progress even if user leaves or refreshes page
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
      <ProgressHeader currentStep={1} totalSteps={6} />
      <LogoutButton />
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Personal Details
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            {...register("name", { required: true })}
            className="w-full border rounded p-2"
          />
          <input
            type="date"
            placeholder="Date of Birth"
            {...register("dob", { required: true })}
            className="w-full border rounded p-2"
          />
          <select {...register("gender")} className="w-full border rounded p-2">
            <option value="">Select Gender</option>
            <option>Female</option>
            <option>Male</option>
            <option>Other</option>
          </select>
          <input
            type="text"
            placeholder="Contact No"
            {...register("contact")}
            className="w-full border rounded p-2"
          />
          <input
            type="text"
            placeholder="Address"
            {...register("address")}
            className="w-full border rounded p-2"
          />

          <div className="flex justify-end">
            <button
              type="submit"
              onClick={async () => await save(getValues())} // ✅ ensures save on click
              className="w-full bg-orange-500 text-white py-2 rounded hover:bg-pink-600 transition"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page1;
