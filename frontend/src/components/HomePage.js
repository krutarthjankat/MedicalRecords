"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { baseurl } from "../App";
import {
  BarChartIcon as ChartSquareBar,
  UserIcon as UserGroup,
  ClipboardList,
  ChevronLeft,
  Search,
  UserCircle,
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function HomePage({ prop }) {
  const [open, setOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cookies, , removeCookie] = useCookies("token");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const savedMode = localStorage.getItem("darkMode");
      return savedMode ? JSON.parse(savedMode) : false;
    }
    return false;
  });
  const nav = useNavigate();

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        return nav("/login");
      }
      const { data } = await axios.post(baseurl + "/", {
        token: cookies.token,
      });
      const { status } = data;
      return status
        ? {}
        : (removeCookie("token"), console.log("cookie removed"), nav("/login"));
    };
    verifyCookie();
  }, [cookies, nav, removeCookie]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const SidebarItems = [
    {
      name: "Dashboard",
      icon: (
        <ChartSquareBar size={20} color={`${darkMode ? "#D1D5DB" : "black"}`} />
      ),
    },
    {
      name: "Patients",
      icon: <UserGroup size={20} color={`${darkMode ? "#D1D5DB" : "black"}`} />,
    },
    {
      name: "SOPs",
      icon: (
        <ClipboardList size={20} color={`${darkMode ? "#D1D5DB" : "black"}`} />
      ),
    },
    // { name: "About", icon: <InformationCircle size={20} /> },
  ];

  return (
    <div
      className={`flex flex-col md:flex-row h-screen text-gray-800 dark:text-gray-200 ${
        darkMode ? "dark" : ""
      }`}
    >
      {/* Mobile Header - unchanged */}
      <div className="md:hidden bg-yellow-400 dark:bg-gray-900 text-white dark:text-gray-100 p-4 flex justify-between items-center">
        <div className="flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="mr-4 text-white dark:text-gray-200 hover:text-blue-200 dark:hover:text-gray-400 transition-all duration-300"
          >
            {mobileMenuOpen ? (
              <X
                size={24}
                className="transform rotate-180 transition-transform duration-300"
              />
            ) : (
              <Menu
                size={24}
                className="transform transition-transform duration-300"
              />
            )}
          </button>
          <span className="text-xl font-semibold">MediCords</span>
        </div>
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="flex items-center justify-center h-10 w-10 rounded-full bg-white dark:bg-gray-700 hover:bg-blue-500 dark:hover:bg-gray-600 focus:outline-none transition-colors duration-200"
          >
            {darkMode ? (
              <Sun size={20} color="white" />
            ) : (
              <Moon size={20} className="black" />
            )}
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center justify-center h-10 w-10 rounded-full bg-white dark:bg-gray-700 hover:bg-blue-500 dark:hover:bg-gray-600 focus:outline-none transition-colors duration-200"
            >
              <UserCircle size={24} color={`${darkMode ? "white" : "black"}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700">
                <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                  JohnDoe@gmail.com
                </div>
                <button
                  onClick={() => nav("/myprofile")}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <span className="mr-2">👤</span> My Profile
                </button>
                <button
                  onClick={() => nav("/editprofile")}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <span className="mr-2">✏️</span> Edit Profile
                </button>
                <div className="border-t border-gray-200 dark:border-gray-700"></div>
                <button
                  onClick={() => {
                    removeCookie("token", { path: "/MedicalRecords" });
                    nav("/login");
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <span className="mr-2">🚪</span> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar with Proper Closing Animation */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ease-in-out ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        style={{
          transition: mobileMenuOpen
            ? "opacity 300ms ease-in-out"
            : "opacity 300ms ease-in-out, visibility 0s linear 300ms",
        }}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={toggleMobileMenu}
        />

        {/* Sidebar */}
        <div
          className={`absolute left-0 top-0 h-full w-64 bg-gray-50 dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Sidebar content remains exactly the same as before */}
          <div className="p-4 border-b border-blue-200 dark:border-gray-700 flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                MediCords
              </span>
            </div>
            <button
              onClick={toggleMobileMenu}
              className="p-1 rounded-full hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors duration-200 text-gray-700 dark:text-gray-300"
            >
              <X size={20} color={`${darkMode ? "#D1D5DB" : "black"}`} />
            </button>
          </div>

          <div className="mt-6">
            {SidebarItems.map((item, index) => (
              <div key={index} className="mb-2">
                <button
                  className={`flex items-center justify-start pl-6 w-full py-3 px-4 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700 hover:text-blue-700 dark:hover:text-blue-400 transition-colors duration-200 ${
                    window.location.pathname === `/${item.name}` ||
                    (window.location.pathname === "/" &&
                      item.name === "Dashboard")
                      ? "bg-blue-100 dark:bg-gray-700 text-blue-700 dark:text-blue-400"
                      : ""
                  }`}
                  onClick={() => {
                    nav(`/${item.name}`);
                    setMobileMenuOpen(false);
                  }}
                >
                  <span
                    className={`
              ${
                window.location.pathname === `/${item.name}` ||
                (window.location.pathname === "/" && item.name === "Dashboard")
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-400"
              }`}
                  >
                    {item.icon}
                  </span>
                  <span className="ml-3">{item.name}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar - Desktop */}
      <div
        className={`hidden md:block ${
          open ? "w-60 lg:w-[22%]" : "w-20"
        } duration-300 h-screen bg-gray-50 dark:bg-[#1A1C22] relative border-x-2 border-gray-200 dark:border-gray-700`}
      >
        <div
          className={`flex items-center ${
            open ? "justify-between" : "justify-center"
          } p-4 border-b border-blue-200 dark:border-gray-700`}
        >
          {open && (
            <div className="flex items-center">
              <span
                className={`text-3xl font-semibold text-gray-800 dark:text-[#D1D5DB]`}
              >
                MediCords
              </span>
            </div>
          )}

          <button
            onClick={toggleSidebar}
            className="p-1 rounded-full hover:bg-blue-100 dark:hover:bg-gray-700 text-gray-700 dark:text-[#D1D5DB] transition-colors duration-200"
          >
            {open ? (
              <ChevronLeft
                size={20}
                color={`${darkMode ? "#D1D5DB" : "black"}`}
              />
            ) : (
              <Menu
                size={24}
                className="transform transition-transform duration-300"
              />
            )}
          </button>
        </div>

        <div className="mt-6">
          {SidebarItems.map((item, index) => (
            <div key={index} className="mb-2">
              <button
                className={`flex items-center ${
                  open ? "justify-start pl-6" : "justify-center"
                } w-full py-3 px-4 text-gray-700 dark:text-[#D1D5DB] hover:bg-blue-200 dark:hover:bg-gray-700 text-xl font-semibold hover:text-blue-700 dark:hover:text-blue-400 transition-colors duration-200 ${
                  window.location.pathname === `/${item.name}` ||
                  (window.location.pathname === "/" &&
                    item.name === "Dashboard")
                    ? "mx-2 bg-blue-100 dark:bg-gray-700 text-gray-700 dark:text-[#D1D5DB]"
                    : ""
                }`}
                onClick={() => {
                  nav(`/${item.name}`);
                }}
              >
                <span
                  className={`${
                    window.location.pathname === `/${item.name}` ||
                    (window.location.pathname === "/" &&
                      item.name === "Dashboard")
                      ? "text-gray-700 dark:text-[#D1D5DB]"
                      : "text-gray-700 dark:text-[#D1D5DB]"
                  }`}
                >
                  {item.icon}
                </span>
                {open && (
                  <span className="ml-3 text-gray-700 dark:text-[#D1D5DB]">
                    {item.name}
                  </span>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation - Desktop */}
        <div className="hidden md:flex bg-yellow-400 dark:bg-[#23262E] text-white dark:text-gray-100 p-4 flex justify-between items-center shadow-md">
          <div className="flex-1 max-w-3xl">
            <div className="relative">
              <input
                type="search"
                placeholder="Search..."
                className="w-full bg-white dark:bg-gray-700 text-white dark:text-gray-100 placeholder-indigo-200 dark:placeholder-gray-400 rounded-lg py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-gray-500 transition-all duration-200"
              />
              <button className="absolute right-3 top-2.5 text-indigo-200 dark:text-gray-400 hover:text-white dark:hover:text-gray-300 transition-colors duration-200">
                <Search size={18} />
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="flex items-center justify-center h-10 w-10 rounded-full bg-white dark:bg-gray-700 hover:bg-blue-500 dark:hover:bg-gray-600 focus:outline-none transition-colors duration-200"
            >
              {darkMode ? (
                <Sun size={20} color="white" />
              ) : (
                <Moon size={20} className="black" />
              )}
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center justify-center h-10 w-10 rounded-full bg-white dark:bg-gray-700 hover:bg-blue-500 dark:hover:bg-gray-600 focus:outline-none transition-colors duration-200"
              >
                <UserCircle
                  size={24}
                  color={`${darkMode ? "white" : "black"}`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700">
                  <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                    JohnDoe@gmail.com
                  </div>
                  <button
                    onClick={() => nav("/myprofile")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <span className="mr-2">👤</span> My Profile
                  </button>
                  <button
                    onClick={() => nav("/editprofile")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <span className="mr-2">✏️</span> Edit Profile
                  </button>
                  <div className="border-t border-gray-200 dark:border-gray-700"></div>
                  <button
                    onClick={() => {
                      removeCookie("token", { path: "/MedicalRecords" });
                      nav("/login");
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <span className="mr-2">🚪</span> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-white dark:bg-[#121317] text-gray-700 dark:text-gray-300">
          {prop}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
