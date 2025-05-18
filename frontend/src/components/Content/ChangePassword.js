import { FaLock, FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import { useNavigate} from "react-router-dom";
import { motion} from "framer-motion";

const ChangePassword = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password change
  };

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
        className=" mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden"
      >
        <div className="flex flex-col md:flex-row">
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full p-8 bg-gray-50 dark:bg-gray-900"
          >
            <div className="w-full flex flex-row justify-between">
              <div>
                <h3 className="text-3xl font-bold text-yellow-500 dark:text-yellow-400 mb-6 border-b-2 border-yellow-400 pb-2 flex items-center gap-3">
                  <FaLock />
                  Change Password
                </h3>
              </div>
              <div>
                <motion.button
                  whileHover={{ x: -3 }}
                  onClick={() => navigate("/Myprofile")}
                  className="items-center gap-2 text-yellow-600 dark:text-yellow-400 z-10"
                >
                  <FaArrowLeft />
                </motion.button>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300 ">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="sm:col-span-2"
                >
                  <label className="block text-sm font-semibold mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={form.currentPassword}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-800"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-sm font-semibold mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={form.newPassword}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-800"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm font-semibold mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-800"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="sm:col-span-2 flex justify-end mt-2"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg shadow transition-colors duration-300 flex items-center gap-2"
                  >
                    <FaLock />
                    Update Password
                  </motion.button>
                </motion.div>
              </div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ChangePassword;
