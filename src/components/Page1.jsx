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
    <div className="relative min-h-screen flex items-center justify-center bg-white px-6 sm:px-8">
      <ProgressHeader currentStep={1} totalSteps={6} />
  

      {/* central column */}
      <div className="w-full max-w-[440px] mx-auto py-12 sm:py-16">
        {/* header */}
        <div className="mb-10 text-center sm:text-left">
          <h2 className="text-[28px] sm:text-[32px] leading-tight font-semibold mb-2 text-gray-900">
            It's your time!
          </h2>
          <p className="text-[13px] sm:text-[15px] text-gray-400">
            Let us know about yourself first.
          </p>
        </div>

        {/* form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-7" noValidate>
          {/* Name */}
          <div>
            <input
              type="text"
              placeholder="Your Name"
              {...register("name", { required: true })}
              className="w-full rounded-md border border-gray-100 bg-white/0 py-3 px-3 text-[15px] text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 transition-shadow shadow-sm"
              style={{ boxShadow: "inset 0 0 0 1px rgba(229,231,235,0.8)" }}
            />
          </div>

          {/* Username */}
          <div>
            <input
              type="text"
              placeholder="Your Username"
              {...register("username", { required: true })}
              className="w-full rounded-md border border-gray-100 bg-white/0 py-3 px-3 text-[15px] text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 transition-shadow shadow-sm"
              style={{ boxShadow: "inset 0 0 0 1px rgba(229,231,235,0.8)" }}
            />
          </div>

          {/* Description select */}
          <div className="relative">
            <select
              {...register("description")}
              className="w-full appearance-none rounded-md border border-gray-100 bg-white/0 py-3 px-3 pr-10 text-[15px] text-gray-700 placeholder:text-gray-300 focus:outline-none focus:border-gray-300 transition-shadow shadow-sm cursor-pointer"
            >
              <option value="">What best describes you?</option>
              <option value="student">Student</option>
              <option value="professional">Professional</option>
              <option value="entrepreneur">Entrepreneur</option>
              <option value="other">Other</option>
            </select>
            {/* chevron */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Location select */}
          <div className="relative">
            <select
              {...register("location")}
              className="w-full appearance-none rounded-md border border-gray-100 bg-white/0 py-3 px-3 pr-10 text-[15px] text-gray-700 placeholder:text-gray-300 focus:outline-none focus:border-gray-300 transition-shadow shadow-sm cursor-pointer"
            >
              <option value="">Select your location</option>
              <option value="india">India</option>
              <option value="us">United States</option>
              <option value="uk">United Kingdom</option>
              <option value="other">Other</option>
            </select>

            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* How do you know us */}
          <div className="relative">
            <select
              {...register("knowUs")}
              className="w-full appearance-none rounded-md border border-gray-100 bg-white/0 py-3 px-3 pr-10 text-[15px] text-gray-700 placeholder:text-gray-300 focus:outline-none focus:border-gray-300 transition-shadow shadow-sm cursor-pointer"
            >
              <option value="">How do you know us?</option>
              <option value="social">Social Media</option>
              <option value="friend">Friend</option>
              <option value="search">Search Engine</option>
              <option value="other">Other</option>
            </select>

            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* (No inline continue button here — bottom bar handles it) */}
        </form>
      </div>

     {/* bottom persistent bar — aligned right with blue hover */}
<div className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] py-3.5 px-6">
  <div className="flex justify-end items-center pr-6 sm:pr-10 gap-3">
    {/* subtle instruction text */}
    <span className="text-gray-400 text-[13px] italic tracking-wide opacity-85">
      or press Enter
    </span>

    {/* Continue button with blue hover */}
    <button
      type="button"
      onClick={handleSubmit(onSubmit)}
      aria-label="Continue"
      className="text-[14px] font-medium px-5 py-2 rounded-md shadow-sm
                 bg-[#555] hover:bg-[#007BFF] text-white
                 transition-colors duration-200 ease-in-out"
    >
      Continue
    </button>
  </div>
</div>


      {/* small responsive adjustments */}
      <style jsx>{`
        @media (max-width: 640px) {
          /* make inputs slightly taller on small screens and full width spacing */
          input, select {
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Page1;
