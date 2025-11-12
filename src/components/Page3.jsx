import React, { useEffect,useState } from "react";
import ProgressHeader from "./ProgressHeader";
import { useNavigate } from "react-router-dom";

export default function RecordLanding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(3);
  const handleContinue = () => {
    navigate("/page4");
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Enter") handleContinue();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7fbff] via-white to-[#fff5f6] flex flex-col overflow-hidden">
       <ProgressHeader
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        onBack={(newStep) => navigate(`/page${newStep}`)} // parent decides navigation
      />

      {/* Main scrollable content */}
      <div className="flex-1 overflow-y-auto pb-20 mt-20">
        <div className="min-h-full flex items-center justify-center px-6 sm:px-8 md:px-10 py-8 sm:py-10 md:py-12 lg:py-10 mt-8 sm:mt-10 md:mt-12">
          <div className="w-full max-w-5xl mx-auto">
            {/* Combined Section */}
            <div className="bg-white/0 rounded-2xl overflow-hidden">
              {/* Grid layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-10 items-stretch">
                {/* LEFT COLUMN */}
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <h1 className="font-extrabold text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] text-[#071033] leading-snug">
                      You bring the curiosity.
                    </h1>
                    <h2 className="font-extrabold text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] text-[#ff5a55] leading-snug -mt-1">
                      We'll back it up with proof.
                    </h2>

                    <p className="text-gray-600 text-[15px] sm:text-base md:text-[15px] max-w-md mt-5 sm:mt-6 md:mt-4 leading-relaxed">
                      Record is built for learners, job-seekers, and builders. Earn verified skill
                      badges and turn your efforts into outcomes.
                    </p>

                    <div className="mt-6 sm:mt-7 md:mt-5 space-y-5 sm:space-y-5 md:space-y-4">
                      {[
                        "Earn verified skill badges from projects, courses & YouTube",
                        "Take AI-powered assessments to showcase your skills",
                        "Share your profile & badges publicly, like a mini portfolio",
                        "Be visible to 200+ recruiters hiring via Record",
                      ].map((t, i) => (
                        <div key={i} className="flex items-start gap-3 sm:gap-4 md:gap-3">
                          <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 md:w-7 md:h-7 rounded-md bg-[#fff3f3] flex items-center justify-center mt-[2px]">
                            <svg
                              className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4 text-[#ff6b67]"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          <p className="text-gray-700 text-[15px] sm:text-base md:text-sm font-medium leading-snug">
                            {t}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="flex flex-col justify-between h-full mt-2">
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 sm:p-10 md:p-8 text-white shadow-lg flex flex-col justify-between h-full">
                    <div className="flex-1">
                      <div className="flex justify-center mb-6 sm:mb-7 md:mb-5">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-12 md:h-12 bg-slate-700/40 rounded-xl flex items-center justify-center mt-8 sm:mt-10 md:mt-12">
                          <svg
                            className="w-10 h-10 sm:w-11 sm:h-11 md:w-10 md:h-10 text-slate-300"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          >
                            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            <path d="M9 5l7 7-7 7" opacity="0.4" />
                          </svg>
                        </div>
                      </div>

                      <p className="text-[15px] sm:text-base md:text-[15px] leading-relaxed mb-6 sm:mb-7 md:mb-5 text-slate-100 font-light">
                        Across my journey — projects, work experience, and learning playlists — I've
                        built a strong skill set. Now I can see them all in one place.
                      </p>
                    </div>

                    <div className="border-t border-slate-700/40 pt-5 sm:pt-5 md:pt-4">
                      <p className="font-semibold text-white text-[15px] sm:text-base md:text-[15px] mb-0.5">
                        — Arunathevan
                      </p>
                      <p className="text-xs sm:text-sm md:text-xs text-slate-400">
                        Mobile App Developer at HSBC
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* LOGO STRIP */}
              <div className="bg-[#0f1710] rounded-b-2xl px-6 sm:px-8 md:px-8 py-5 sm:py-6 md:py-4 shadow-xl border border-slate-700/50 mt-2">
                <div className="flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 md:gap-4">
                  <div className="text-gray-400 text-sm sm:text-base md:text-sm font-medium whitespace-nowrap md:translate-x-14">
                    Trusted & Supported by
                  </div>

                  <div className="flex items-center gap-6 sm:gap-8 md:gap-10 flex-wrap justify-center transform -translate-x-2 md:-translate-x-16 pt-2">
                    <img
                      src="/Z.png"
                      alt="Zoho"
                      className="h-12 sm:h-14 md:h-19 filter grayscale opacity-75 hover:opacity-100"
                    />
                    <img
                      src="/aws2.png"
                      alt="AWS"
                      className="h-6 sm:h-7 md:h-6 filter grayscale opacity-75 hover:opacity-100"
                    />

                    <div className="flex items-center gap-1 opacity-75 hover:opacity-100">
                      <div className="grid grid-cols-2 gap-[1px] w-5 h-5 sm:w-6 sm:h-6 md:w-5 md:h-5">
                        <div className="bg-gray-300 rounded-sm"></div>
                        <div className="bg-gray-300 rounded-sm"></div>
                        <div className="bg-gray-300 rounded-sm"></div>
                        <div className="bg-gray-300 rounded-sm"></div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-300 text-[8px] sm:text-[9px] md:text-[8px] leading-tight">
                          Microsoft for Startups
                        </span>
                        <span className="text-gray-300 text-xs sm:text-sm md:text-xs font-semibold leading-tight">
                          Founders Hub
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 opacity-75 hover:opacity-100">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-5 md:h-5 bg-gray-300 rounded flex items-center justify-center font-black text-[#0f1720] text-sm sm:text-base md:text-sm">
                        N
                      </div>
                      <span className="text-gray-300 text-sm sm:text-base md:text-sm font-semibold tracking-tight">
                        Notion
                      </span>
                    </div>

                    <div className="flex items-center gap-1 opacity-75 hover:opacity-100">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-5 md:h-5 bg-gray-300 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-3 md:h-3 border border-[#0f1720] rounded-full"></div>
                      </div>
                      <span className="text-gray-300 text-sm sm:text-base md:text-sm font-bold tracking-wide">
                        StartupTN
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] py-3 sm:py-3.5 md:py-2.5 px-6 sm:px-8 md:px-5 shadow-lg">
        <div className="flex justify-end items-center pr-2 sm:pr-6 md:pr-6 lg:pr-10 gap-3 sm:gap-3 md:gap-2">
          <span className="text-gray-400 text-xs sm:text-sm md:text-xs italic tracking-wide opacity-85">
            or press Enter
          </span>
          <button
            type="button"
            onClick={handleContinue}
            aria-label="Continue"
            className="text-sm sm:text-base md:text-[13px] font-medium px-5 sm:px-6 md:px-4 py-2 sm:py-2.5 md:py-1.5 rounded-md bg-[#555] hover:bg-[#007BFF] text-white transition"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}