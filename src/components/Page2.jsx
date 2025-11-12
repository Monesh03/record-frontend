import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useFormStep } from "../hooks/useFormStep";
import { useNavigate } from "react-router-dom";
import ProgressHeader from "./ProgressHeader";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const Page2 = () => {
  const { data, save, loading } = useFormStep(2);
  const { register, handleSubmit, reset, getValues } = useForm();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  // Prefill data when page loads or revisited
  useEffect(() => {
    if (Object.keys(data).length > 0) reset(data);
  }, [data, reset]);

  // Fetch current user from backend (verify token)
  useEffect(() => {
    let mounted = true;
    const fetchUser = async () => {
      try {
        setUserLoading(true);
        const res = await fetch(`${API_BASE_URL}/api/auth/verify`, {
          credentials: "include",
        });
        const json = await res.json();
        if (res.ok && json.user && mounted) {
          setUser(json.user);
        } else {
          // not logged in or verify failed — keep user null
          if (mounted) setUser(null);
        }
      } catch (err) {
        console.error("Error fetching current user:", err);
        if (mounted) setUser(null);
      } finally {
        if (mounted) setUserLoading(false);
      }
    };

    fetchUser();
    return () => {
      mounted = false;
    };
  }, []);

  // Save current data & move to next page
  const onSubmit = async (values) => {
    await save(values);
    navigate("/page3");
  };

  // Save form data even if user refreshes or navigates away
  useEffect(() => {
    const handleBeforeUnload = () => {
      try {
        const values = getValues();
        if (values && Object.keys(values).length > 0) save(values);
      } catch (err) {
        // ignore
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [getValues, save]);

  if (loading) return <p className="text-center mt-10">Loading form data…</p>;

  return (
    <div className="relative min-h-screen flex flex-col justify-center bg-gray-50 px-4 sm:px-6">
      <ProgressHeader currentStep={2} totalSteps={6} />
    

      <div className="w-full max-w-[960px] mx-auto pl-8 sm:pl-40 md:pl-60 lg:pl-80">
        <div className="max-w-[720px] mx-auto">
          <div className="mb-6 text-center sm:text-left">
            <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800">
              Hey{" "}
              {userLoading ? (
                <span className="inline-block w-24 h-6 bg-gray-200 rounded animate-pulse" />
              ) : (
                <span>{user?.name || "there"}</span>
              )}{" "}
              <span aria-hidden>👋</span>
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              Let us know, how would you like to use Record for:
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
            <h4 className="text-sm font-semibold text-gray-800 mb-2">What's your main goal?</h4>

            <div className="space-y-3">
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
          <span className="text-gray-400 text-[13px] italic tracking-wide opacity-85">or press Enter</span>

          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            aria-label="Continue"
            className="text-[14px] font-medium px-5 py-2 rounded-md shadow-sm bg-[#555] hover:bg-[#007BFF] text-white transition-colors duration-200 ease-in-out"
          >
            Continue
          </button>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          .max-w-[520px] { max-width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default Page2;
