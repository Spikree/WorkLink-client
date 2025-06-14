import { useState } from "react";
import { MdWorkHistory } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { workLinkLogoDark } from "../assets/assets";
import {
  FiBriefcase,
  FiBook,
  FiStar,
  FiUser,
  FiSettings,
  FiLogOut,
  FiHome,
  FiMenu,
  FiX,
  FiPlusCircle,
  FiSave,
} from "react-icons/fi";
import { MessageSquareText } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

type MenuItem = {
  title: string;
  icon: React.ReactElement;
  to: string;
};

const MobileNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const navigate = useNavigate();
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
        setIsMenuOpen(false);
      },
    },
    {
      title: "Settings",
      icon: <FiSettings size={16} />,
      action: () => {
        navigate("/settings");
        setIsMenuOpen(false);
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
    <div className="sm:hidden mb-16" onClick={dontShowProfileOptions}>
      {/* Fixed Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 bg-[#1d1e27] z-50">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <div
            onClick={() => {
              navigate("/home");
              setIsMenuOpen(false);
            }}
            className="flex items-center"
          >
            <div className="h-10 w-10  rounded-lg flex items-center justify-center">
              <span className="text-lg">
                <img
                  className="rounded-xl"
                  src={workLinkLogoDark}
                  alt="work link logo"
                />
              </span>
            </div>
            <span className="ml-2 text-white font-semibold">Skill Match</span>
          </div>

          {/* Menu Toggle Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white p-2"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Full Screen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-[#1d1e27] z-40 pt-16"
          >
            <div className="flex flex-col h-full">
              {/* Menu Items */}
              <div className="flex-1 px-4 py-6 overflow-y-auto">
                <div className="space-y-2">
                  {menuItems.map((item, index) => {
                    const isActive = isMenuItemActive(item);
                    return (
                      <motion.button
                        key={index}
                        onClick={() => {
                          navigate(item.to);
                          setIsMenuOpen(false);
                        }}
                        className={`flex items-center w-full text-gray-300 hover:bg-[#292a36] rounded-lg px-4 py-3 transition-colors ${
                          isActive
                            ? "bg-gray-700 text-white"
                            : "text-gray-300 hover:bg-gray-700"
                        }`}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="text-gray-400">{item.icon}</span>
                        <span className="ml-3 font-medium">{item.title}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Profile Section */}
              <div className="border-t border-gray-700 px-4 py-4">
                <div
                  onClick={() => setShowProfileOptions(!showProfileOptions)}
                  className="flex items-center space-x-3 mb-4"
                >
                  <div className="h-10 w-10 rounded-full bg-gray-600 text-white flex items-center justify-center">
                    {authUser?.profile.profilePicture ? (
                      <img
                        className="h-10 w-10 rounded-full bg-gray-600 text-white flex items-center justify-center"
                        src={authUser?.profile?.profilePicture}
                      />
                    ) : (
                      authUser?.profile?.name?.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-300">
                      {authUser?.profile?.name}
                    </p>
                    <p className="text-xs text-gray-500">{authUser?.email}</p>
                  </div>
                </div>

                <AnimatePresence>
                  {showProfileOptions && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="space-y-2"
                    >
                      {profileOptions.map((option, index) => (
                        <motion.button
                          key={index}
                          onClick={option.action}
                          className="flex items-center w-full text-gray-300 hover:bg-[#292a36] rounded-lg px-4 py-3 transition-colors"
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className="text-gray-400">{option.icon}</span>
                          <span className="ml-3 text-sm">{option.title}</span>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;
