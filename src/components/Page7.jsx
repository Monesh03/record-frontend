import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { Menu } from "lucide-react";

const Page7 = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/form", {
          credentials: "include",
        });
        if (res.ok) {
          const form = await res.json();
          setData(form);
        }
      } catch (err) {
        console.error("Error loading dashboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading Dashboard...</p>;
  if (!data) return <p className="text-center mt-10">No user data found.</p>;

  const fullImage =
    data.profilePic && !data.profilePic.startsWith("http")
      ? `http://localhost:5000${data.profilePic}`
      : data.profilePic || "/default-avatar.png";

  const sidebarItems = [
    { name: "Dashboard Overview", key: "dashboard" },
    { name: "Personal Details", key: "personal" },
    { name: "Education Details", key: "education" },
    { name: "Experience", key: "experience" },
    { name: "Skills", key: "skills" },
    { name: "Project Details", key: "project" },
  ];

  // Section Renderer
  const renderSection = () => {
    switch (activeSection) {
      case "personal":
        return (
          <SectionCard
            title="👤 Personal Details"
            color="orange"
            details={[
              ["DOB", data.step1?.dob],
              ["Gender", data.step1?.gender],
              ["Contact", data.step1?.contact],
              ["Address", data.step1?.address],
            ]}
          />
        );
      case "education":
        return (
          <SectionCard
            title="🎓 Education Details"
            color="blue"
            details={[
              ["Degree", data.step2?.degree],
              ["University", data.step2?.university],
              ["Year", data.step2?.year],
              ["Grade", data.step2?.grade],
            ]}
          />
        );
      case "experience":
        return (
          <SectionCard
            title="💼 Experience"
            color="green"
            details={[
              ["Company", data.step3?.company],
              ["Role", data.step3?.role],
              ["Duration", data.step3?.duration],
              ["Description", data.step3?.description],
            ]}
          />
        );
      case "skills":
        return (
          <div className="bg-yellow-50 p-6 rounded-xl shadow-md border border-yellow-200">
            <h3 className="text-xl font-bold text-yellow-600 mb-2">🧠 Skills</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {data.step4?.skills?.length ? (
                data.step4.skills.map((s, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full text-sm"
                  >
                    {s}
                  </span>
                ))
              ) : (
                <p>—</p>
              )}
            </div>
          </div>
        );
     case "project":
  return (
    <div className="bg-purple-50 p-4 sm:p-6 rounded-xl shadow-md border border-purple-200">
      <h3 className="text-xl font-bold text-purple-600 mb-3">🚀 Project Details</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
        <div>
          <p className="font-semibold text-sm sm:text-base mb-1">Project Title</p>
          <p className="text-sm sm:text-base bg-white border rounded-md p-2 shadow-sm">
            {data.step5?.projectTitle || "—"}
          </p>
        </div>

        <div>
          <p className="font-semibold text-sm sm:text-base mb-1">GitHub Link</p>
          <a
            href={data.step5?.githubLink || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-blue-600 underline text-sm sm:text-base truncate"
          >
            {data.step5?.githubLink || "—"}
          </a>
        </div>

        <div className="sm:col-span-2">
          <p className="font-semibold text-sm sm:text-base mb-1">Description</p>
          <p className="text-sm sm:text-base bg-white border rounded-md p-2 shadow-sm">
            {data.step5?.projectDescription || "—"}
          </p>
        </div>

        <div className="sm:col-span-2">
          <p className="font-semibold text-sm sm:text-base mb-1">Live Demo</p>
          <a
            href={data.step5?.demoLink || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-blue-600 underline text-sm sm:text-base truncate"
          >
            {data.step5?.demoLink || "—"}
          </a>
        </div>
      </div>
    </div>
  );

  
      default:
        return (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="text-center bg-white p-6 md:p-10 rounded-2xl shadow border border-gray-200">
              <img
                src={fullImage}
                alt="Profile"
                className="w-24 h-24 md:w-28 md:h-28 mx-auto rounded-full border-4 border-orange-400 object-cover shadow-md mb-4"
              />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
                Welcome, {data.step1?.name || "User"} 👋
              </h2>
              <p className="text-gray-500">
                {data?.user?.email || "Email not available"}
              </p>
            </div>

            {/* Static Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <DashboardCard
                title="🧾 Profile Completion"
                value="100%"
                desc="All onboarding steps completed"
                color="bg-green-100 text-green-800 border-green-200"
              />
              <DashboardCard
                title="📂 Uploaded Documents"
                value="5"
                desc="Profile, Resume, Certificates"
                color="bg-blue-100 text-blue-800 border-blue-200"
              />
              <DashboardCard
                title="⚙️ Status"
                value="Active"
                desc="Profile verified successfully"
                color="bg-orange-100 text-orange-800 border-orange-200"
              />
            </div>

            {/* Quick Info */}
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* ============ SIDEBAR ============ */}
      {/* ============ SIDEBAR ============ */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md border-r border-gray-200 z-40 transform transition-transform duration-300 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0`}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-200 bg-orange-50">
          <h1 className="text-2xl font-bold text-orange-500">RECORD</h1>
          <LogoutButton />
        </div>

        {/* Profile Info */}
        <div className="p-6 text-center border-b border-gray-200">
          <img
            src={fullImage}
            alt="Profile"
            className="w-20 h-20 mx-auto rounded-full border-2 border-orange-400 object-cover mb-3"
          />
          <p className="font-semibold text-gray-800">{data.step1?.name || "User"}</p>
          <p className="text-sm text-gray-500">{data.user?.email || "Email not available"}</p>
        </div>

        {/* Scrollable Menu */}
        <div className="flex-1 p-6 overflow-y-auto">
          <p className="font-semibold text-gray-700 mb-3">Menu</p>
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li
                key={item.key}
                onClick={() => {
                  setActiveSection(item.key);
                  setSidebarOpen(false);
                }}
                className={`cursor-pointer p-2 rounded-md hover:bg-orange-100 ${
                  activeSection === item.key ? "bg-orange-200 font-medium" : ""
                }`}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Edit Profile — stays fixed at bottom */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <Link
            to="/page1"
            className="block text-center bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
          >
            ✏️ Edit Profile
          </Link>
        </div>
      </aside>


      {/* ============ MAIN CONTENT ============ */}
      <main className="flex-1 p-6 md:p-8 md:ml-64">
        {/* Mobile Header */}
        <div className="flex justify-between items-center mb-6 md:hidden">
          <h1 className="text-2xl font-bold text-orange-500">RECORD</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="bg-orange-500 text-white p-2 rounded-md"
          >
            <Menu size={20} />
          </button>
        </div>

        {renderSection()}
      </main>
    </div>
  );
};

// ✅ Reusable Section Card
const SectionCard = ({ title, color, details }) => (
  <div
    className={`p-6 rounded-xl shadow-md border border-${color}-200 bg-${color}-50 transition-all`}
  >
    <h3 className={`text-xl font-bold text-${color}-600 mb-2`}>{title}</h3>
    <div className="mt-3 space-y-1 text-gray-700 text-sm md:text-base">
      {details.map(([label, value], i) => (
        <p key={i}>
          <strong>{label}:</strong> {value || "—"}
        </p>
      ))}
    </div>
  </div>
);

// ✅ Dashboard Card Component (Fully Responsive)
const DashboardCard = ({ title, value, desc, color }) => (
  <div
    className={`p-4 sm:p-5 rounded-xl shadow-md border ${color} flex flex-col justify-center items-center text-center w-full transition-transform hover:scale-[1.02]`}
  >
    <h4 className="text-base sm:text-lg font-semibold mb-1 text-gray-800">{title}</h4>
    <p className="text-2xl sm:text-3xl font-bold mb-1">{value}</p>
    <p className="text-xs sm:text-sm text-gray-600">{desc}</p>
  </div>
);



export default Page7;
