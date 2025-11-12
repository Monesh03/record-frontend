import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LOGOS = [
  { src: "/logos/zoho.png", alt: "Zoho" },
  { src: "/logos/aws.png", alt: "AWS" },
  { src: "/logos/founders-hub.png", alt: "Founders Hub" },
  { src: "/logos/notion.png", alt: "Notion" },
  { src: "/logos/skyroot.png", alt: "StartupTN" },
];

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
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6 md:px-12 py-10 pb-28">
        <div className="w-full max-w-7xl">
          {/* Combined Section with attached bottom logo strip */}
          <div className="bg-white/0 rounded-3xl shadow-none overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-stretch">
              {/* LEFT COLUMN */}
              <div className="flex flex-col justify-between">
                <div>
                  <h1 className="font-extrabold text-[28px] sm:text-[32px] md:text-[42px] lg:text-[46px] text-[#071033] leading-tight">
                    You bring the curiosity.
                  </h1>
                  <h2 className="font-extrabold text-[28px] sm:text-[32px] md:text-[42px] lg:text-[46px] text-[#ff5a55] leading-tight -mt-2">
                    We'll back it up with proof.
                  </h2>

                  <p className="text-gray-600 text-sm md:text-base max-w-xl mt-5">
                    Record is built for people like you — learners, job-seekers, builders. Whatever
                    your goal, we help you earn verified skill badges and turn effort into outcomes.
                  </p>

                  <div className="mt-7 space-y-6">
                    {[
                      "Earn verified skill badges from projects, courses & YouTube",
                      "Take AI-powered assessments to showcase your skills",
                      "Share your profile & badges publicly, like a mini portfolio",
                      "Be visible to 200+ recruiters hiring via Record",
                    ].map((t, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-9 h-9 rounded-md bg-[#fff3f3] flex items-center justify-center ring-0 mt-1">
                          <svg
                            className="w-5 h-5 text-[#ff6b67]"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <p className="text-gray-700 font-medium">{t}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="flex flex-col justify-between">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 -3xl p-10 md:p-12 text-white shadow-2xl flex flex-col justify-between h-full">
                  <div>
                    {/* Centered Icon Box */}
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-slate-700/40 rounded-2xl flex items-center justify-center mt-2">
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

                   <br></br>
                   <br></br>
                   <br></br>
                   <br></br>
                    <p className="text-base md:text-lg leading-relaxed mb-6 text-slate-100 font-light">
                      Throughout my journey spanning projects, work experience, licenses, education,
                      and even my personal YouTube learning playlists, I've built a strong skill set.
                      And now I can see them all in one place.
                    </p>
                  </div>

                  <div className="border-t border-slate-700/40 pt-6">
                    <p className="font-semibold text-white text-lg mb-1">— Arunathevan</p>
                    <p className="text-sm text-slate-400">Mobile App Developer at HSBC</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ✅ ATTACHED LOGO STRIP (below both columns) */}
            <div className="mt-0 bg-[#0f1720] rounded-b-3xl px-6 md:px-8 py-5 shadow-inner flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-gray-400 text-sm md:text-base">Trusted & Supported by</div>
              <div className="flex items-center gap-8 flex-wrap justify-center md:justify-end">
                {LOGOS.map((l) => (
                  <div key={l.alt} className="flex items-center">
                    <img
                      src={l.src}
                      alt={l.alt}
                      className="h-6 object-contain filter grayscale opacity-85"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const span = document.createElement("span");
                        span.className = "text-gray-400 text-sm px-2";
                        span.textContent = l.alt;
                        e.currentTarget.parentNode.appendChild(span);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] py-3.5 px-6">
        <div className="flex justify-end items-center pr-6 sm:pr-10 gap-3">
          <span className="text-gray-400 text-[13px] italic tracking-wide opacity-85">or press Enter</span>

          <button
            type="button"
            onClick={handleContinue}
            aria-label="Continue"
            className="text-[14px] font-medium px-5 py-2 rounded-md shadow-sm bg-[#555] hover:bg-[#007BFF] text-white transition-colors duration-200 ease-in-out"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
