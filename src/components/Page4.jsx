import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFormStep } from "../hooks/useFormStep";
import LogoutButton from "./LogoutButton";
import { useNavigate } from "react-router-dom";

const baseSkills = [
  "HTML", "CSS", "JavaScript", "React", "Node.js",
  "Express", "MongoDB", "Tailwind", "Git", "Python",
];

const Page4 = () => {
  const { data, save, loading } = useFormStep(4);
  const { register, handleSubmit, reset, setValue, getValues } = useForm();
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [customSkills, setCustomSkills] = useState([]); // ✅ user-added skills
  const navigate = useNavigate();

  // Prefill form on mount
  useEffect(() => {
    if (Object.keys(data).length > 0) {
      reset(data);
      if (data.skills) setSelectedSkills(data.skills);
      if (data.customSkills) setCustomSkills(data.customSkills);
    }
  }, [data, reset]);

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  // ✅ Add new skill to the selectable list
  const handleAddSkill = () => {
    const newSkill = getValues("customSkill")?.trim();
    if (newSkill && !baseSkills.includes(newSkill) && !customSkills.includes(newSkill)) {
      const updatedCustomSkills = [...customSkills, newSkill];
      setCustomSkills(updatedCustomSkills);
      setSelectedSkills([...selectedSkills, newSkill]);
      setValue("customSkill", ""); // clear input

      // Save immediately for persistence
      const payload = { skills: [...selectedSkills, newSkill], customSkills: updatedCustomSkills };
      save(payload);
    }
  };

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      skills: selectedSkills,
      customSkills,
    };
    await save(payload);
    navigate("/page5");
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  // ✅ Combine both base and custom skills for display
  const allSkills = [...baseSkills, ...customSkills];

  return (
    <div className="relative min-h-screen flex flex-col justify-center bg-gray-100">
      <LogoutButton />
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Technical Skills
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Skill chips */}
          <div className="flex flex-wrap gap-2">
            {allSkills.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => toggleSkill(skill)}
                className={`px-3 py-1 rounded-full border transition ${
                  selectedSkills.includes(skill)
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                }`}
              >
                {skill}
              </button>
            ))}
          </div>

          {/* Add custom skill input */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Enter custom skill"
              {...register("customSkill")}
              className="flex-1 border rounded p-2"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Add
            </button>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={async () => {
                await save({ skills: selectedSkills, customSkills });
                navigate("/page3");
              }}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Back
            </button>
            <button
              type="submit"
              onClick={async () => await save({ skills: selectedSkills, customSkills })}
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

export default Page4;
