import React from "react";
import { useForm } from "react-hook-form";
import { useFormStep } from "../hooks/useFormStep";
import LogoutButton from "./LogoutButton";
import { useNavigate } from "react-router-dom";
import ProgressHeader from "./ProgressHeader";

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
    <div className="relative min-h-screen flex flex-col justify-center bg-gray-50 px-4 sm:px-6">
      <ProgressHeader currentStep={2} totalSteps={6} />
      <LogoutButton />

      
         <div className="w-full max-w-[960px] mx-auto pl-8 sm:pl-40 md:pl-60 lg:pl-80">
          <div className="max-w-[720px] mx-auto">
            <div className="mb-6 text-center sm:text-left">
              <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800">
                Hey kji! <span aria-hidden>👋</span>
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                Let us know, how would you like to use Record for:
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
              <h4 className="text-sm font-semibold text-gray-800 mb-2">What's your main goal?</h4>

              <div className="space-y-3">
                {/* Each option is a custom checkbox row for the compact look */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("goal_build_repository")}
                    className="w-4 h-4 mt-1 accent-black rounded-sm"
                  />
                  <span className="text-sm text-gray-700 leading-snug">
                    Build my Skill Repository
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("goal_get_job")}
                    className="w-4 h-4 mt-1 accent-black rounded-sm"
                  />
                  <span className="text-sm text-gray-700 leading-snug">Get a Good Job</span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("goal_upskill")}
                    className="w-4 h-4 mt-1 accent-black rounded-sm"
                  />
                  <span className="text-sm text-gray-700 leading-snug">Upskill for Current Role</span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("goal_explore")}
                    className="w-4 h-4 mt-1 accent-black rounded-sm"
                  />
                  <span className="text-sm text-gray-700 leading-snug">Explore New Skills</span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("goal_habit")}
                    className="w-4 h-4 mt-1 accent-black rounded-sm"
                  />
                  <span className="text-sm text-gray-700 leading-snug">Make Learning a Habit!</span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("goal_other")}
                    className="w-4 h-4 mt-1 accent-black rounded-sm"
                  />
                  <span className="text-sm text-gray-700 leading-snug">Others</span>
                </label>
              </div>
            </form>
          </div>
        </div>
     

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

      {/* responsive tweaks */}
      <style jsx>{`
        @media (max-width: 640px) {
          .max-w-[520px] { max-width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default Page2;
