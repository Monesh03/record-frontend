import React from "react";

const Page1 = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    username: '',
    description: '',
    location: '',
    referral: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // Add your navigation logic here
  };

  // Handle Enter key submission
  React.useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    };
    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [formData]);

  const currentStep = 1;
  const totalSteps = 7;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header with integrated progress */}
      <header className="bg-white border-b border-gray-50">
        <div className="flex items-center justify-between px-6 lg:px-12 py-3.5">
          {/* Logo */}
          <div className="w-9 h-9 bg-gray-100 rounded-md flex items-center justify-center flex-shrink-0">
            <div className="w-5 h-5 bg-gray-300 rounded-sm"></div>
          </div>
          
          {/* Progress Bar with Boat - hidden on mobile */}
          <div className="hidden lg:flex flex-1 items-center mx-8 relative">
            {/* Background line */}
            <div className="absolute w-full bg-gray-100" style={{ height: '3px' }}></div>
            
            {/* Orange progress line */}
            <div 
              className="absolute bg-orange-500 transition-all duration-500"
              style={{ 
                width: `${(currentStep / totalSteps) * 100}%`, 
                height: '3px' 
              }}
            ></div>
            
            {/* Step dots and boat */}
            <div className="relative w-full flex items-center justify-between">
              {[1, 2, 3, 4, 5, 6, 7].map((step) => (
                <div key={step} className="relative z-10">
                  {step === currentStep ? (
                    // Boat icon for current step
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-lg transform transition-all duration-500">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v-2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.65 2.62.99 4 .99h2v2h-2zM3.95 19H4c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l1.89-6.68c.08-.26.06-.54-.06-.78s-.32-.42-.58-.5L20 10.62V6c0-1.1-.9-2-2-2h-3V1H9v3H6c-1.1 0-2 .9-2 2v4.62l-1.29.42c-.26.08-.46.26-.58.5s-.15.52-.06.78L3.95 19zM6 6h12v3.97L12 8 6 9.97V6z"/>
                      </svg>
                    </div>
                  ) : (
                    // Small circle for other steps with background
                    <div className="w-2.5 h-2.5 bg-white rounded-full flex items-center justify-center">
                      <div 
                        className={`w-2 h-2 rounded-full ${
                          step < currentStep ? 'bg-orange-500' : 'bg-gray-300'
                        }`}
                      ></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Logout Button */}
          <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-5 py-1.5 rounded-md transition-colors flex-shrink-0">
            Logout
          </button>
        </div>
      </header>

      {/* Main Content - Centered */}
      <main className="flex-1 flex items-center justify-center px-6 py-12 pb-32">
        <div className="w-full max-w-lg" style={{ maxWidth: '480px' }}>
          {/* Heading Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2.5" style={{ letterSpacing: '-0.02em' }}>
              It's your time!
            </h1>
            <p className="text-base text-gray-400 font-normal">
              Let us know about yourself first.
            </p>
          </div>

          {/* Form Container */}
          <div className="w-full space-y-4">
            
            {/* Your Name Field */}
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:bg-white focus:border-gray-300 transition-all"
                style={{ height: '48px' }}
              />
            </div>

            {/* Your Username Field with domain text */}
            <div className="relative">
              <input
                type="text"
                name="username"
                placeholder="Your Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:bg-white focus:border-gray-300 transition-all"
                style={{ height: '48px' }}
              />
              {/* Info icon and domain text */}
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                <svg 
                  className="w-3.5 h-3.5 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                >
                  <circle cx="12" cy="12" r="10"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0-4h.01"/>
                </svg>
                <span className="text-xs text-gray-400 hidden md:inline whitespace-nowrap">app.genrecord/username</span>
              </div>
            </div>

            {/* What best describes you dropdown */}
            <div className="relative">
              <select
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 pr-10 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:bg-white focus:border-gray-300 transition-all appearance-none cursor-pointer"
                style={{ height: '48px', color: formData.description ? '#111827' : '#9CA3AF' }}
              >
                <option value="">What best describes you?</option>
                <option value="student">Student</option>
                <option value="professional">Professional</option>
                <option value="gamer">Gamer</option>
                <option value="content-creator">Content Creator</option>
                <option value="streamer">Streamer</option>
                <option value="other">Other</option>
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Select your location dropdown */}
            <div className="relative">
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 pr-10 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:bg-white focus:border-gray-300 transition-all appearance-none cursor-pointer"
                style={{ height: '48px', color: formData.location ? '#111827' : '#9CA3AF' }}
              >
                <option value="">Select your location</option>
                <option value="north-america">North America</option>
                <option value="south-america">South America</option>
                <option value="europe">Europe</option>
                <option value="asia">Asia</option>
                <option value="africa">Africa</option>
                <option value="oceania">Oceania</option>
                <option value="middle-east">Middle East</option>
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* How do you know us dropdown */}
            <div className="relative">
              <select
                name="referral"
                value={formData.referral}
                onChange={handleChange}
                className="w-full px-4 py-3 pr-10 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:bg-white focus:border-gray-300 transition-all appearance-none cursor-pointer"
                style={{ height: '48px', color: formData.referral ? '#111827' : '#9CA3AF' }}
              >
                <option value="">How do you know us?</option>
                <option value="social-media">Social Media</option>
                <option value="friend">Friend/Family</option>
                <option value="search-engine">Search Engine</option>
                <option value="advertisement">Advertisement</option>
                <option value="youtube">YouTube</option>
                <option value="twitch">Twitch</option>
                <option value="other">Other</option>
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Fixed Black Footer with Continue Button */}
      <footer className="fixed bottom-0 left-0 right-0 bg-gray-900 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3.5">
            {/* Left side text */}
            <p className="text-sm text-gray-500">
              or press Enter ↵
            </p>
            
            {/* Continue Button */}
            <button
              onClick={handleSubmit}
              className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-medium text-base px-9 py-2.5 rounded-lg w-full sm:w-auto transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Continue
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Page1;