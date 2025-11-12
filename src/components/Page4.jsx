import React, { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useFormStep } from "../hooks/useFormStep";
import LogoutButton from "./LogoutButton";
import { useNavigate } from "react-router-dom";
import ProgressHeader from "./ProgressHeader";

/* Master lists */
const businessMore = [
  "DaVinci Resolve","Microsoft SharePoint","IIBA Entry Certificate in Business Analysis","Microsoft Project",
  "Operations Management","Microsoft Access","Management Skills","Lean","Sony Vegas","Quality Checking",
  "Business Model Canvas","Technical Writing","HR Analytics","Online Course Creation","Microsoft PowerPoint",
  "Customer Success","Product Management","Stakeholder Management","Data Analysis","SQL","Excel Advanced",
  "Agile","Scrum","Kanban","Leadership","Presentation Skills","Product Strategy","Marketing Basics"
];

const designMore = [
  "Cinematic Editing","Wix","Adobe Premiere Pro","User Experience (UX) design","Fashion","Game Design","Canva",
  "Character Design","Sewing","Building Information Modelling (BIM)","Mobile App design","Textiles","Illustration",
  "Virtual Reality","UI/UX","Figma","Sketch","Adobe XD","Interaction Design","Prototyping","Icon Design","Typography",
  "Color Theory","Motion Graphics","3D Modeling","Branding","Wireframing"
];

const INITIAL_VISIBLE = 14; // items shown before "See more"

const Page4 = () => {
  const { data, save, loading } = useFormStep(4);
  const { register, handleSubmit, reset, setValue, getValues, watch } = useForm();
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [customSkills, setCustomSkills] = useState([]);
  const [showMoreBusiness, setShowMoreBusiness] = useState(false);
  const [showMoreDesign, setShowMoreDesign] = useState(false);
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(4);

  // Prefill
  useEffect(() => {
    if (Object.keys(data).length > 0) {
      reset(data);
      if (data.skills) setSelectedSkills(data.skills);
      if (data.customSkills) setCustomSkills(data.customSkills);
    }
  }, [data, reset]);

  // Save on unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      const values = getValues();
      if (Object.keys(values).length > 0) save(values);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [getValues, save]);

  // Search input (watch must be called unconditionally)
  const search = (watch("skillSearch") || "").trim().toLowerCase();
  const hasSearch = search.length > 0;

  // Prepare filtered arrays using useMemo (unconditional)
  const filteredBusiness = useMemo(() => {
    const source = [...businessMore];
    customSkills.forEach((s) => {
      if (!source.includes(s)) source.push(s);
    });
    if (!search) return source;
    return source.filter((s) => s.toLowerCase().includes(search));
  }, [search, customSkills]);

  const filteredDesign = useMemo(() => {
    const source = [...designMore];
    customSkills.forEach((s) => {
      if (!source.includes(s)) source.push(s);
    });
    if (!search) return source;
    return source.filter((s) => s.toLowerCase().includes(search));
  }, [search, customSkills]);

  // Toggle skill
  const toggleSkill = (skill) => {
    setSelectedSkills((prev) => {
      const next = prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill];
      return next;
    });
  };

  // Add custom skill (preserve behavior + immediate save)
  const handleAddSkill = () => {
    const newSkill = (getValues("customSkill") || "").trim();
    if (!newSkill) {
      setValue("customSkill", "");
      return;
    }

    const existsInBusiness = businessMore.includes(newSkill);
    const existsInDesign = designMore.includes(newSkill);
    const alreadyCustom = customSkills.includes(newSkill);

    if (!existsInBusiness && !existsInDesign && !alreadyCustom) {
      const updatedCustom = [...customSkills, newSkill];
      setCustomSkills(updatedCustom);
      setSelectedSkills((s) => [...s, newSkill]);
      setValue("customSkill", "");
      save({ skills: [...selectedSkills, newSkill], customSkills: updatedCustom });
    } else if (!selectedSkills.includes(newSkill)) {
      setSelectedSkills((s) => [...s, newSkill]);
      save({ skills: [...selectedSkills, newSkill], customSkills });
      setValue("customSkill", "");
    } else {
      setValue("customSkill", "");
    }
  };

  const onSubmit = async (values) => {
    const payload = { ...values, skills: selectedSkills, customSkills };
    await save(payload);
    navigate("/page5");
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="relative min-h-screen flex flex-col justify-center bg-gray-100 px-4 sm:px-6 pb-24 pt-20 overflow-y-auto ">
      <ProgressHeader
  currentStep={currentStep}
  setCurrentStep={setCurrentStep}
  onBack={(newStep) => navigate(`/page${newStep}`)} // parent decides navigation
/>
      <div className="w-full max-w-[960px] mx-auto ">
        <br></br>
        <h2 className="text-2xl font-semibold mb-2 text-gray-800 text-center">
          What's your Interest?
        </h2>
        <p className="text-sm text-gray-500 text-center mb-8">
          Let us know what you are most curious about.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Search row */}
          <div className="flex flex-col gap-2 mb-6">
            <input
              type="text"
              placeholder="Search Skills i.e figma, front end"
              {...register("skillSearch")}
              className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-blue-400"
            />
            <div className="text-xs text-gray-400 text-center">
              ({selectedSkills.length}/5 skills selected — you can edit later)
            </div>
          </div>

          {/* Selected Skills strip */}
          {selectedSkills.length > 0 && (
            <div className="mb-6">
              <div className="text-sm font-semibold text-gray-700 mb-3">Selected Skills</div>
              <div className="flex flex-wrap gap-2">
                {selectedSkills.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleSkill(s)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm bg-orange-500 text-white hover:bg-orange-600 transition-colors"
                  >
                    <span>{s}</span>
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Skills container */}
          <div>
            {/* Business Section */}
            <div className="mb-8">
              <div className="flex items-center justify-center mb-4 relative">
                <h3 className="text-base font-semibold text-gray-800">Business</h3>
                <button
                  type="button"
                  onClick={() => setShowMoreBusiness((v) => !v)}
                  className="text-sm text-blue-500 hover:text-blue-600 absolute right-0"
                >
                  {showMoreBusiness ? "Show less" : "See more"}
                </button>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {(hasSearch ? filteredBusiness : (showMoreBusiness ? businessMore : businessMore.slice(0, INITIAL_VISIBLE)))
                  .map((skill) => {
                    const active = selectedSkills.includes(skill);
                    return (
                      <button
                        key={`biz-${skill}`}
                        type="button"
                        onClick={() => toggleSkill(skill)}
                        className={`px-3 py-1.5 rounded text-sm transition-colors ${
                          active
                            ? "bg-orange-500 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {skill}
                      </button>
                    );
                  })}
                {customSkills.filter(s => !businessMore.includes(s)).map(skill => {
                  if (hasSearch && !skill.toLowerCase().includes(search)) return null;
                  const active = selectedSkills.includes(skill);
                  return (
                    <button
                      key={`biz-custom-${skill}`}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`px-3 py-1.5 rounded text-sm transition-colors ${
                        active ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Design Section */}
            <div>
              <div className="flex items-center justify-center mb-4 relative">
                <h3 className="text-base font-semibold text-gray-800">Design</h3>
                <button
                  type="button"
                  onClick={() => setShowMoreDesign((v) => !v)}
                  className="text-sm text-blue-500 hover:text-blue-600 absolute right-0"
                >
                  {showMoreDesign ? "Show less" : "See more"}
                </button>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {(hasSearch ? filteredDesign : (showMoreDesign ? designMore : designMore.slice(0, INITIAL_VISIBLE)))
                  .map((skill) => {
                    const active = selectedSkills.includes(skill);
                    return (
                      <button
                        key={`des-${skill}`}
                        type="button"
                        onClick={() => toggleSkill(skill)}
                        className={`px-3 py-1.5 rounded text-sm transition-colors ${
                          active
                            ? "bg-orange-500 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {skill}
                      </button>
                    );
                  })}
                {customSkills.filter(s => !designMore.includes(s)).map(skill => {
                  if (hasSearch && !skill.toLowerCase().includes(search)) return null;
                  const active = selectedSkills.includes(skill);
                  return (
                    <button
                      key={`des-custom-${skill}`}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`px-3 py-1.5 rounded text-sm transition-colors ${
                        active ? "bg-red-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Bottom persistent bar */}
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
    </div>
  );
};

export default Page4;