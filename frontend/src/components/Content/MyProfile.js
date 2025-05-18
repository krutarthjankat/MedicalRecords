import { FaUserCircle, FaEdit, FaLock } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Main Profile Component
function MyProfile() {
  const [user] = useState({
    firstname: "Camila",
    lastname: "Smith",
    username: "camila123",
    mobno: "(12) 03 4567890",
    emailid: "camila.smith@example.com",
    category: "Community Medicine",
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full p-6 bg-gray-100 dark:bg-gray-900 min-h-screen"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="max-w-6xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden"
      >
        <div className="flex flex-col md:flex-row">
          {/* Profile Card - Left Side */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="md:w-1/3 bg-gradient-to-br from-yellow-400 to-yellow-500 dark:from-yellow-500 dark:to-yellow-600 flex flex-col items-center justify-center py-10 px-6 text-white relative"
          >
            <div className="relative group">
              <FaUserCircle className="text-8xl mb-4 text-white/90 hover:text-white transition-all duration-300" />
            </div>
            <h2 className="text-2xl font-bold text-center">{`${user.firstname} ${user.lastname}`}</h2>
            <p className="text-yellow-100 dark:text-yellow-200 mt-1">
              {user.category}
            </p>

            <Link
              to="/Editprofile"
              className="w-48 mt-6 text-sm bg-white text-yellow-600 dark:text-yellow-700 font-medium px-4 py-1.5 rounded shadow hover:bg-gray-100 dark:hover:bg-gray-200 flex items-center gap-2 transition-all duration-300 hover:shadow-md"
            >
              <FaEdit />
              Edit Profile
            </Link>
            <Link
              to="/ChangePassword"
              className="w-48 mt-2 text-sm bg-white text-yellow-600 dark:text-yellow-700 font-medium px-4 py-1.5 rounded shadow hover:bg-gray-100 dark:hover:bg-gray-200 flex items-center gap-2 transition-all duration-300 hover:shadow-md"
            >
              <FaLock />
              Change Password
            </Link>
          </motion.div>

          {/* Profile Info - Right Side */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="md:w-2/3 p-8 bg-gray-50 dark:bg-gray-900"
          >
            <h3 className="text-3xl font-bold text-yellow-500 dark:text-yellow-400 mb-6 border-b-2 border-yellow-400 pb-2 flex items-center gap-3">
              <FaUserCircle className="text-2xl" />
              My Profile
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300">
              {Object.entries(user).map(([key, value]) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.1 * (Object.keys(user).indexOf(key) + 1),
                  }}
                >
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </p>
                  <p className="text-lg font-medium">{value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Password Change Section */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="p-8 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-2xl font-bold text-yellow-500 dark:text-yellow-400 mb-6 flex items-center gap-3">
            <FaLock />
            Change Password
          </h3>
          <PasswordForm />
        </motion.div> */}
      </motion.div>
    </motion.div>
  );
}

export default MyProfile;
