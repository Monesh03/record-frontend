import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProgressHeader from "./ProgressHeader";

export default function RecordLanding() {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/page4");
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Enter") handleContinue();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7fbff] via-white to-[#fff5f6] flex flex-col overflow-hidden">
      <ProgressHeader currentStep={3} totalSteps={6} />

      {/* Scroll container for small and medium screens */}
      <div className="flex-1 flex items-center justify-center px-4 md:px-10 py-6 md:py-10 mt-12 overflow-y-auto md:overflow-y-auto lg:overflow-visible">
        <div className="w-full max-w-5xl mx-auto flex flex-col justify-between">
          {/* Combined Section */}
          <div className="bg-white/0 rounded-2xl overflow-hidden">
            {/* ensure grid items stretch to equal height */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-stretch">
              {/* LEFT COLUMN: make full height so both columns match */}
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h1 className="font-extrabold text-[22px] sm:text-[26px] md:text-[28px] lg:text-[30px] text-[#071033] leading-snug">
                    You bring the curiosity.
                  </h1>
                  <h2 className="font-extrabold text-[22px] sm:text-[26px] md:text-[28px] lg:text-[30px] text-[#ff5a55] leading-snug -mt-1">
                    We'll back it up with proof.
                  </h2>

                  <p className="text-gray-600 text-sm md:text-[15px] max-w-md mt-4 leading-relaxed">
                    Record is built for learners, job-seekers, and builders. Earn verified skill
                    badges and turn your efforts into outcomes.
                  </p>

                  <div className="mt-5 space-y-4">
                    {[
                      "Earn verified skill badges from projects, courses & YouTube",
                      "Take AI-powered assessments to showcase your skills",
                      "Share your profile & badges publicly, like a mini portfolio",
                      "Be visible to 200+ recruiters hiring via Record",
                    ].map((t, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-7 h-7 rounded-md bg-[#fff3f3] flex items-center justify-center mt-[2px]">
                          <svg
                            className="w-4 h-4 text-[#ff6b67]"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <p className="text-gray-700 text-sm font-medium leading-snug">{t}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="flex flex-col justify-between h-full mt-2">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 md:p-8 text-white shadow-lg flex flex-col justify-between h-full">
                  <div className="flex-1">
                    <div className="flex justify-center mb-5">
                      <div className="w-12 h-12 bg-slate-700/40 rounded-xl flex items-center justify-center mt-12">
                        <svg
                          className="w-10 h-10 text-slate-300"
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

                    <p className="text-[14px] md:text-[15px] leading-relaxed mb-5 text-slate-100 font-light">
                      Across my journey — projects, work experience, and learning playlists — I've
                      built a strong skill set. Now I can see them all in one place.
                    </p>
                  </div>

                  <div className="border-t border-slate-700/40 pt-4">
                    <p className="font-semibold text-white text-[15px] mb-0.5">— Arunathevan</p>
                    <p className="text-xs text-slate-400">Mobile App Developer at HSBC</p>
                  </div>
                </div>
              </div>
            </div>

            {/* LOGO STRIP */}
            <div className="bg-[#0f1710] rounded-b-2xl px-4 md:px-8 py-4 shadow-xl border border-slate-700/50 mt-2">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-gray-400 text-xs md:text-sm font-medium whitespace-nowrap md:translate-x-14">
                  Trusted & Supported by
                </div>

                <div className="flex items-center gap-4 md:gap-10 flex-wrap justify-center transform -translate-x-2 md:-translate-x-16 pt-2">
                  <img
                    src="/zoho.jpg"
                    alt="Zoho"
                    className="h-5 filter grayscale opacity-75 hover:opacity-100"
                  />
                  <img
                    src="/aws2.png"
                    alt="AWS"
                    className="h-6 filter grayscale opacity-75 hover:opacity-100"
                  />

                  <div className="flex items-center gap-1 opacity-75 hover:opacity-100">
                    <div className="grid grid-cols-2 gap-[1px] w-5 h-5">
                      <div className="bg-gray-300 rounded-sm"></div>
                      <div className="bg-gray-300 rounded-sm"></div>
                      <div className="bg-gray-300 rounded-sm"></div>
                      <div className="bg-gray-300 rounded-sm"></div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-300 text-[8px] leading-tight">
                        Microsoft for Startups
                      </span>
                      <span className="text-gray-300 text-xs font-semibold leading-tight">
                        Founders Hub
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 opacity-75 hover:opacity-100">
                    <div className="w-5 h-5 bg-gray-300 rounded flex items-center justify-center font-black text-[#0f1720] text-sm">
                      N
                    </div>
                    <span className="text-gray-300 text-sm font-semibold tracking-tight">Notion</span>
                  </div>

                  <div className="flex items-center gap-1 opacity-75 hover:opacity-100">
                    <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 border border-[#0f1720] rounded-full"></div>
                    </div>
                    <span className="text-gray-300 text-sm font-bold tracking-wide">StartupTN</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] py-2.5 px-5">
        <div className="flex justify-end items-center pr-6 sm:pr-10 gap-2">
          <span className="text-gray-400 text-xs italic tracking-wide opacity-85">
            or press Enter
          </span>
          <button
            type="button"
            onClick={handleContinue}
            aria-label="Continue"
            className="text-[13px] font-medium px-4 py-1.5 rounded-md bg-[#555] hover:bg-[#007BFF] text-white transition"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
