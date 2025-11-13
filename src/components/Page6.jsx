import React, { useState, useEffect } from 'react';
import { Menu, X, Bell, BookOpen, Settings, TrendingUp, Briefcase, Wrench, HelpCircle, MessageSquare } from 'lucide-react';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // profile state
  const [profileName, setProfileName] = useState('kj'); // fallback
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    let mounted = true;

    const extractName = (data) => {
      if (!data) return null;

      const tryValues = [];

      // top-level common keys
      tryValues.push(data.fullName, data.fullname, data.name, data.username, data.userName, data.displayName);

      // nested user or profile objects
      if (data.user && typeof data.user === 'object') {
        tryValues.push(data.user.fullName, data.user.fullname, data.user.name, data.user.username, data.user.displayName);
      }
      if (data.profile && typeof data.profile === 'object') {
        tryValues.push(data.profile.fullName, data.profile.name, data.profile.displayName);
      }

      // common fragments
      if (data.firstName || data.lastName) {
        tryValues.push(`${data.firstName || ''} ${data.lastName || ''}`.trim());
      }
      if (data.first_name || data.last_name) {
        tryValues.push(`${data.first_name || ''} ${data.last_name || ''}`.trim());
      }

      // additional nested check e.g., data.user.profile
      if (data.user && data.user.profile && typeof data.user.profile === 'object') {
        tryValues.push(data.user.profile.fullName, data.user.profile.name, data.user.profile.displayName);
      }

      // return first non-empty trimmed value
      for (const v of tryValues) {
        if (typeof v === 'string') {
          const t = v.trim();
          if (t.length > 0) return t;
        }
      }
      return null;
    };

    const fetchProfile = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/form`, { credentials: 'include' });

        if (!mounted) return;

        if (res.ok) {
          // parse and log the result so we can inspect the exact shape
          const data = await res.json().catch(() => ({}));
          console.debug('profileFetchResult:', data); // <-- check this in the browser console

          // find profile picture in multiple common keys
          const rawPic =
            data.profilePic ||
            data.profile_pic ||
            data.profilePicPath ||
            data.imagePath ||
            data.profile_image ||
            (data.user && (data.user.profilePic || data.user.profile_image)) ||
            null;

          if (rawPic) {
            const full = rawPic.startsWith('http') ? rawPic : `${process.env.REACT_APP_API_URL}${rawPic}`;
            setProfilePhoto(full);
          } else {
            setProfilePhoto(null);
          }

          const name = extractName(data) || 'kj';
          setProfileName(name);
        } else {
          // non-OK: keep defaults
          console.warn('Profile fetch returned non-OK status', res.status);
        }
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      } finally {
        if (mounted) setLoadingProfile(false);
      }
    };

    fetchProfile();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out`}>
        {/* Logo/Brand */}
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <div className="w-24 h-8 bg-orange-500 rounded"></div>
        </div>

        {/* Navigation */}
        <nav className="px-4 pt-4 space-y-0.5">
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-orange-500 bg-orange-50 rounded-lg font-medium text-sm">
            <BookOpen size={18} />
            <span>Dashboard</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg text-sm">
            <Settings size={18} />
            <span>Profile</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg text-sm">
            <TrendingUp size={18} />
            <span>Skill Repository</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg text-sm">
            <BookOpen size={18} />
            <span>Learnings</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg text-sm">
            <Briefcase size={18} />
            <span>Jobs</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg text-sm">
            <Wrench size={18} />
            <span>Tools</span>
          </a>
        </nav>

        {/* Sub-menu */}
        <div className="px-4 mt-2">
          <div className="space-y-0.5 pl-3">
            <a href="#" className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
              YouTube to Course
            </a>
            <a href="#" className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
              One Click Resume
            </a>
            <a href="#" className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
              AI Assessment
            </a>

            <div className="flex items-center justify-between px-3 py-2 text-sm">
              <span className="text-blue-500">Setup</span>
              <span className="text-gray-400">56%</span>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-200 bg-white">
          <div className="space-y-0.5 mb-2">
            <a href="#" className="flex items-center gap-3 px-3 py-1.5 text-gray-600 hover:bg-gray-50 rounded-lg text-xs">
              <HelpCircle size={14} />
              <span>Support</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-1.5 text-gray-600 hover:bg-gray-50 rounded-lg text-xs">
              <MessageSquare size={14} />
              <span>Feedback</span>
            </a>
          </div>
          <div className="text-xs text-gray-400 leading-tight px-3">
            <div className="flex gap-1.5 mb-1">
              <a href="#" className="hover:text-gray-600">Privacy Policy</a>
              <span>|</span>
              <a href="#" className="hover:text-gray-600">Terms & Conditions</a>
            </div>
            <p>© 2025 Second Innovation and</p>
            <p>Enterprise Pvt. Ltd.</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
          </div>

          <div className="flex items-center gap-3">
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800">
              <span>✨</span>
              <span>Upgrade</span>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <line x1="12" y1="8" x2="12" y2="16" strokeWidth="2" />
                <line x1="8" y1="12" x2="16" y2="12" strokeWidth="2" />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
              <div className="w-2 h-2 bg-red-500 rounded-full absolute top-1.5 right-1.5"></div>
              <Bell size={20} className="text-gray-600" />
            </button>

            {/* header avatar — fetched photo or initial */}
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold overflow-hidden">
              {profilePhoto ? (
                <img src={profilePhoto} alt="profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {profileName ? profileName.charAt(0).toUpperCase() : 'K'}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Welcome Banner and Skill Badges Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
              {/* Welcome Banner */}
              <div className="lg:col-span-2 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl p-6 lg:p-8 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
                  <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-white rounded-full translate-y-1/2"></div>
                </div>
                <div className="relative z-10">
                  <h2 className="text-2xl lg:text-3xl font-bold mb-2">Welcome back, {profileName}.</h2>
                  <p className="text-blue-100 mb-4">You can now turn your YouTube Playlists into Courses</p>
                  <button className="px-6 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50">
                    Explore Now →
                  </button>
                </div>
              </div>

              {/* Skill Badges */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-6">Skill Badges</h3>
                <div className="flex items-center justify-around">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                        </svg>
                      </div>
                      <span className="text-3xl font-bold text-gray-300">0</span>
                    </div>
                    <p className="text-xs text-gray-500">Role Based</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                        </svg>
                      </div>
                      <span className="text-3xl font-bold text-gray-300">0</span>
                    </div>
                    <p className="text-xs text-gray-500">Super Skills</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Course in Progress */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Course in-Progress</h3>
              <div className="flex items-center justify-center h-40 text-gray-400">
                No courses in progress at the moment.
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
