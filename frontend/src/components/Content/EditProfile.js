import { FaEdit,  FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import { useNavigate} from "react-router-dom";
import { motion} from "framer-motion";

const EditProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstname: "Camila",
    lastname: "Smith",
    username: "camila123",
    mobno: "(12) 03 4567890",
    emailid: "camila.smith@example.com",
    category: "Community Medicine",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/profile");
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
        initial={{ scale: 0.98 }}
        animate={{ scale: 1 }}
        className="max-w-6xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden"
      >
        <div className="flex flex-col md:flex-row">
          {/* Back Button */}

          {/* Edit Form */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full p-8 bg-gray-50 dark:bg-gray-900"
          >
            <div className="w-full flex flex-row justify-between">
              <div>
                <h3 className="text-3xl font-bold text-yellow-500 dark:text-yellow-400 mb-6 border-b-2 border-yellow-400 pb-2 flex items-center gap-3">
                  <FaEdit />
                  Edit Profile
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300">
                {Object.entries(user).map(([key, value]) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.05 * (Object.keys(user).indexOf(key) + 1),
                    }}
                  >
                    <label className="block text-sm font-semibold mb-1 capitalize">
                      {key.replace(/([A-Z])/g, " $1")}
                    </label>
                    {key === "category" ? (
                      <select
                        name={key}
                        value={value}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-800"
                      >
                        <option value="Community Medicine">
                          Community Medicine
                        </option>
                        <option value="General Practitioner">
                          General Practitioner
                        </option>
                        <option value="Specialist">Specialist</option>
                        <option value="Administrator">Administrator</option>
                      </select>
                    ) : (
                      <input
                        type={
                          key === "emailid"
                            ? "email"
                            : key === "mobno"
                            ? "tel"
                            : "text"
                        }
                        name={key}
                        value={value}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-800"
                      />
                    )}
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="sm:col-span-2 flex justify-end mt-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg shadow transition-colors duration-300 flex items-center gap-2"
                  >
                    <FaEdit />
                    Save Changes
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

export default EditProfile;
