import React from "react";
import { useForm } from "react-hook-form";
import { useFormStep } from "../hooks/useFormStep";
import LogoutButton from "./LogoutButton";
import { useNavigate } from "react-router-dom";

const Page5 = () => {
  const { data, save, loading } = useFormStep(5);
  const { register, handleSubmit, reset, getValues } = useForm(); // ✅ added getValues
  const navigate = useNavigate();

  // ✅ Prefill data when revisiting the page
  React.useEffect(() => {
    if (Object.keys(data).length > 0) reset(data);
  }, [data, reset]);

  // ✅ Save & go to next page
  const onSubmit = async (values) => {
    await save(values);
    navigate("/page6");
  };

  // ✅ Autosave before page refresh or navigation
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
          Project / Portfolio Details
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Project Title */}
          <div>
            <label className="block text-gray-700 mb-1">Project Title</label>
            <input
              type="text"
              placeholder="Enter your project title"
              {...register("projectTitle", { required: true })}
              className="w-full border rounded p-2"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 mb-1">Project Description</label>
            <textarea
              placeholder="Briefly describe your project"
              rows="4"
              {...register("projectDescription", { required: true })}
              className="w-full border rounded p-2"
            />
          </div>

          {/* GitHub URL */}
          <div>
            <label className="block text-gray-700 mb-1">GitHub Link</label>
            <input
              type="url"
              placeholder="https://github.com/username/project"
              {...register("githubLink")}
              className="w-full border rounded p-2"
            />
          </div>

          {/* Live Demo URL */}
          <div>
            <label className="block text-gray-700 mb-1">
              Live Demo / Portfolio Link
            </label>
            <input
              type="url"
              placeholder="https://yourprojectdemo.com"
              {...register("demoLink")}
              className="w-full border rounded p-2"
            />
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-2">
            {/* ✅ Save before going back */}
            <button
              type="button"
              onClick={async () => {
                await save(getValues());
                navigate("/page4");
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

export default Page5;
