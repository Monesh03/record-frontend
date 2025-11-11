import React from "react";

const ProgressHeader = ({ currentStep = 1, totalSteps = 6, onBack }) => {
  const pct = totalSteps > 1 ? ((currentStep - 1) / (totalSteps - 1)) * 100 : 0;

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-12 py-4">
        {/* Logo placeholder */}
        <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-400 rounded-sm" />
        </div>

        {/* Progress bar - hidden on mobile */}
        <div className="hidden md:flex flex-1 items-center mx-8 lg:mx-16 xl:mx-24 max-w-4xl">
          <div className="relative w-full" style={{ height: '50px' }}>
            {/* Background line */}
            <div 
              className="absolute w-full h-0.5 bg-gray-200" 
              style={{ top: '60%', transform: 'translateY(-50%)' }} 
            />
            
            {/* Progress line */}
            <div
              className="absolute h-0.5 bg-orange-500 transition-all duration-500 ease-in-out"
              style={{ 
                width: `${pct}%`, 
                top: '60%', 
                transform: 'translateY(-50%)'
              }}
            />
            
            {/* Boat icon positioned above the line */}
            <div 
              className="absolute transition-all duration-500 ease-in-out"
              style={{ 
                left: `${pct}%`, 
                top: '0',
                transform: 'translateX(-50%)'
              }}
            >
              <svg 
                className="w-9 h-9 text-orange-500 drop-shadow-md" 
                fill="#001" 
                viewBox="0 0 24 24"
                style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
              >
                <path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v-2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.65 2.62.99 4 .99h2v2h-2zM3.95 19H4c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l1.89-6.68c.08-.26.06-.54-.06-.78s-.32-.42-.58-.5L20 10.62V6c0-1.1-.9-2-2-2h-3V1H9v3H6c-1.1 0-2 .9-2 2v4.62l-1.29.42c-.26.08-.46.26-.58.5s-.15.52-.06.78L3.95 19zM6 6h12v3.97L12 8 6 9.97V6z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Mobile progress indicator */}
        <div className="md:hidden flex-1 mx-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span className="font-medium">Step {currentStep} of {totalSteps}</span>
            <span className="text-orange-500 font-medium">{Math.round(pct)}%</span>
          </div>
          <div className="mt-2 w-full h-1 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-orange-500 transition-all duration-500 ease-in-out"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* Back button (visible from step 2 onwards) */}
        <div className="w-8 sm:w-20 lg:w-24 flex justify-end">
          {currentStep >= 2 && onBack && (
            <button 
              onClick={onBack}
              className="flex items-center gap-1 text-gray-600 hover:text-gray-800 transition-colors text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline">Back</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default ProgressHeader;