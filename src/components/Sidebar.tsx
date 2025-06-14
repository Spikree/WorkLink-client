import { useState } from "react";
import { MdWorkHistory } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { workLinkLogoDark } from "../assets/assets";

import {
  FiChevronLeft,
  FiChevronRight,
  FiBriefcase,
  FiBook,
  FiStar,
  FiUser,
  FiSettings,
  FiLogOut,
  FiHome,
  FiPlusCircle,
  // FiCloudSnow,
  FiSave,
  // FiClipboard,
} from "react-icons/fi";
import { MessageSquareText } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

type MenuItem = {
  title: string;
  icon: React.ReactElement;
  to: string;
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { authUser, logout } = useAuthStore();
  const dontShowProfileOptions = () => {
    if (showProfileOptions) {
      setShowProfileOptions(false);
    }
  };

  const freelancerMenuItems = [
    { title: "Home", icon: <FiHome size={20} />, to: "/dashboard" },
    {
      title: "Applied Jobs",
      icon: <FiBriefcase size={20} />,
      to: "/appliedjobs",
    },
    {
      title: "Finished Jobs",
      icon: <MdWorkHistory size={20} />,
      to: "/finishedJobs",
    },
    { title: "Saved Jobs", icon: <FiBook size={20} />, to: "/savedJobs" },
    { title: "Current Job", icon: <FiStar size={20} />, to: "/currentJob" },
    { title: "Chat", icon: <MessageSquareText size={20} />, to: "/chat" },
  ];

  const employerMenuItems = [
    { title: "dashboard", icon: <FiHome size={20} />, to: "/dashboard" },
    {
      title: "Post Job",
      icon: <FiPlusCircle size={20} />,
      to: "/postJob",
    },
    {
      title: "Jobs in progress",
      icon: <FiSave size={20} />,
      to: "/getOnGoingJobs",
    },
    {
      title: "Finished Jobs",
      icon: <MdWorkHistory size={20} />,
      to: "/finishedJobs",
    },
    { title: "Chat", icon: <MessageSquareText size={20} />, to: "/chatEmp" },
  ];

  const profileOptions = [
    {
      title: "Profile",
      icon: <FiUser size={16} />,
      action: () => {
        navigate("/profile");
      },
    },
    {
      title: "Settings",
      icon: <FiSettings size={16} />,
      action: () => {
        navigate("/settings");
      },
    },
    {
      title: "Logout",
      icon: <FiLogOut size={16} />,
      action: () => {
        logout();
      },
    },
  ];

  const isMenuItemActive = (item: MenuItem) => {
    if (item.title === "Chat") {
      return (
        location.pathname === item.to ||
        location.pathname.startsWith("/chatRoom")
      );
    }
    
    if (item.title === "Finished Jobs") {
      return (
        location.pathname === item.to ||
        location.pathname.startsWith("/jobDashboard")
      );
    }
    
    return location.pathname === item.to;
  };

  const menuItems =
    authUser?.role === "employer" ? employerMenuItems : freelancerMenuItems;

  return (
    <div className=" hidden sm:flex" onClick={dontShowProfileOptions}>
      <div
        className={`${
          isOpen ? "w-64" : "w-20"
        } bg-[#1d1e27] flex flex-col transition-all duration-300 h-screen relative`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:flex hidden absolute -right-3 top-8 bg-[#1d1e27] text-white rounded-full p-1.5 border border-gray-600 hover:bg-[#292a36] focus:outline-none"
        >
          {isOpen ? <FiChevronLeft size={16} /> : <FiChevronRight size={16} />}
        </button>

        <div
          onClick={() => navigate("/dashboard")}
          className="p-4 border-b border-gray-700"
        >
          <div className="flex items-center justify-center">
            <div className="h-10 w-10 rounded-lg flex items-center justify-center">
              <span className="text-xl">
                <img
                  className="rounded-xl"
                  src={workLinkLogoDark}
                  alt="work link logo"
                />
              </span>
            </div>
            {isOpen && (
              <span className="ml-3 text-white font-semibold">WorkLink</span>
            )}
          </div>
        </div>

        <div
          className="flex flex-col p-4 gap-2"
          onClick={() => {
            setShowProfileOptions(false);
          }}
        >
          {menuItems.map((item, index) => {
            const isActive = isMenuItemActive(item);

            return (
              <button
                key={index}
                onClick={() => navigate(item.to)}
                className={`flex items-center rounded-lg px-4 py-3 transition-colors duration-200 relative group ${
                  isActive
                    ? "bg-gray-700 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                <span className={isActive ? "text-white" : "text-gray-400"}>
                  {item.icon}
                </span>
                {isOpen && (
                  <motion.span className="ml-3 font-medium">
                    {item.title}
                  </motion.span>
                )}

                {!isOpen && (
                  <div className="absolute left-full ml-2 px-2 py-2 bg-gray-800 text-white text-sm rounded-md whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {item.title}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="relative mt-auto">
          <AnimatePresence>
            {showProfileOptions && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-full mb-2 w-full px-4"
              >
                <div
                  onClick={() => {
                    setShowProfileOptions(!showProfileOptions);
                  }}
                  className="bg-[#292a36] rounded-lg shadow-lg overflow-hidden"
                >
                  {profileOptions.map((option, index) => (
                    <button
                      key={index}
                      className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-600 transition-colors"
                      onClick={option.action}
                    >
                      <span className="text-gray-400">{option.icon}</span>
                      {isOpen && (
                        <span className="text-sm">{option.title}</span>
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div
            onClick={() => setShowProfileOptions(!showProfileOptions)}
            className="p-4 border-t border-gray-700 cursor-pointer hover:bg-[#292a36] transition-colors"
          >
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gray-600 text-white flex justify-center items-center">
                {authUser?.profile.profilePicture ? (
                  <img
                    className="h-8 w-8 rounded-full bg-gray-600 text-white flex justify-center items-center"
                    src={authUser?.profile?.profilePicture}
                  />
                ) : (
                  authUser?.profile?.name?.charAt(0).toUpperCase()
                )}
              </div>

              {isOpen && (
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-300">
                    {authUser?.profile?.name}
                  </p>
                  <p className="text-xs text-gray-500">{authUser?.email}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
