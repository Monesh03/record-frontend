import React from "react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const ProgressHeader = ({
  currentStep = 1,
  totalSteps = 6,
  setCurrentStep,      // optional: setter to control step from parent
  onBack,              // optional: callback (newStep) => { ... } for custom nav
  stepRoutePrefix,     // optional: e.g. "/page" -> "/page2", "/page3" ...
  onLogout,
}) => {
  const navigate = useNavigate();
  const pct = totalSteps > 1 ? ((currentStep - 1) / (totalSteps - 1)) * 100 : 0;

  const handleBack = () => {
    // If we can decrement the step, do it and compute newStep
    if (currentStep > 1) {
      const newStep = currentStep - 1;

      // update parent state if setter provided
      if (typeof setCurrentStep === "function") {
        setCurrentStep(newStep);
      }

      // allow parent to handle navigation (preferred)
      if (typeof onBack === "function") {
        onBack(newStep);
        return;
      }

      // if user provided a prefix for step routes, navigate to that route
      if (typeof stepRoutePrefix === "string" && stepRoutePrefix.length > 0) {
        // ensure we don't create double slashes
        const prefix = stepRoutePrefix.endsWith("/") ? stepRoutePrefix.slice(0, -1) : stepRoutePrefix;
        navigate(`${prefix}${newStep}`);
        return;
      }

      // last fallback: go back in browser history
      navigate(-1);
      return;
    }

    // if at first step, just fallback to browser history
    navigate(-1);
  };

  return (
    <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-12 py-4">
        {/* Back button (visible from step 2 onwards) - LEFT SIDE */}
        <div className="w-16 sm:w-20 lg:w-24 flex justify-start">
          {currentStep > 1 && (
            <button
              onClick={handleBack}
              className="flex items-center gap-1 text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium px-2 py-1 rounded border border-gray-300 hover:bg-gray-50"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline">Back</span>
            </button>
          )}
        </div>

        {/* Progress bar - hidden on mobile */}
        <div className="hidden md:flex flex-1 items-center mx-4 lg:mx-8 xl:mx-12 max-w-5xl">
          <div className="relative w-full" style={{ height: "60px" }}>
            <div className="absolute w-full h-0.5 bg-gray-300" style={{ top: "50%", transform: "translateY(-50%)" }} />
            <div
              className="absolute h-0.5 bg-orange-500 transition-all duration-500 ease-in-out"
              style={{ width: `${pct}%`, top: "50%", transform: "translateY(-50%)" }}
            />
            <div className="absolute transition-all duration-500 ease-in-out" style={{ left: `${pct}%`, top: "24%", transform: "translate(-50%, -50%)" }}>
              <svg className="w-10 h-10 text-gray-900" fill="currentColor" viewBox="0 0 24 24" style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.1))" }}>
                <path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v-2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.65 2.62.99 4 .99h2v2h-2zM3.95 19H4c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l1.89-6.68c.08-.26.06-.54-.06-.78s-.32-.42-.58-.5L20 10.62V6c0-1.1-.9-2-2-2h-3V1H9v3H6c-1.1 0-2 .9-2 2v4.62l-1.29.42c-.26.08-.46.26-.58.5s-.15.52-.06.78L3.95 19zM6 6h12v3.97L12 8 6 9.97V6z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Mobile progress indicator */}
        <div className="md:hidden flex-1 mx-4">
          <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 mb-2">
            <span className="font-medium">Step {currentStep}/{totalSteps}</span>
            <span className="text-orange-500 font-semibold">{Math.round(pct)}%</span>
          </div>
          <div className="relative w-full" style={{ height: "32px" }}>
            <div className="absolute w-full h-1 bg-gray-200 rounded-full" style={{ top: "50%", transform: "translateY(-50%)" }} />
            <div className="absolute h-1 bg-orange-500 rounded-full transition-all duration-500 ease-in-out" style={{ width: `${pct}%`, top: "50%", transform: "translateY(-50%)" }} />
            <div className="absolute transition-all duration-500 ease-in-out" style={{ left: `${pct}%`, top: "50%", transform: "translate(-50%, -50%)" }}>
              <svg className="w-7 h-7 text-gray-900" fill="currentColor" viewBox="0 0 24 24" style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.15))" }}>
                <path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v-2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.65 2.62.99 4 .99h2v2h-2zM3.95 19H4c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l1.89-6.68c.08-.26.06-.54-.06-.78s-.32-.42-.58-.5L20 10.62V6c0-1.1-.9-2-2-2h-3V1H9v3H6c-1.1 0-2 .9-2 2v4.62l-1.29.42c-.26.08-.46.26-.58.5s-.15.52-.06.78L3.95 19zM6 6h12v3.97L12 8 6 9.97V6z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Logout button - RIGHT SIDE */}
        <div className="w-16 sm:w-20 lg:w-24 flex justify-end">
          <LogoutButton />
        </div>
      </div>
    </header>
  );
};

export default ProgressHeader;
