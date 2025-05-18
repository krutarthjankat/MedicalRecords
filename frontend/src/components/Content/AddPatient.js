import { useState, useEffect } from "react";
import axios from "axios";
import { baseurl } from "../../App";
import { useCookies } from "react-cookie";
import { motion } from "framer-motion";

function AddPatient() {
  const [cookies] = useCookies("token");
  const [createForm, setCreateForm] = useState({
    patientid: 1,
    patientname: "",
    dateofadm: "",
    age: "",
    relmobno: "",
    sex: "",
    address: "",
    room: "",
    occupation: "",
    isolation: "",
    precautions: "",
    allergies: "",
    admdiagnosis: "",
    docuavail: "",
    history: [],
  });
  const [vital, setVital] = useState({
    patientid: 1,
    patientname: "",
    drincharge: "",
    nurseupdate: [],
    update: [],
    temp: [],
    heartrate: [],
    resprate: [],
    oxysat: [],
    sysbp: [],
    dibp: [],
  });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchData();
    setLoaded(true);
  }, []);


  const fetchData = async () => {
    const res = await axios.get(baseurl + "/data", { data: { type: "vital" } });
    console.log(res);
  };

  const updateVitalField = (e) => {
    const { name, value } = e.target;
    setVital({
      ...vital,
      [name]: value,
    });
  };

  const updateCreateFormField = (e) => {
    const { name, value } = e.target;
    console.log(parseInt(name));

    if (!parseInt(name)) {
      setCreateForm({
        ...createForm,
        [name]: value,
      });
      if (name === "dateofadm") {
        setVital({
          ...vital,
          patientid:
            new Date(createForm.dateofadm).getTime() + new Date().getSeconds(),
        });
      }
      console.log(createForm);
      return;
    }
    createForm.history[name * 1 - 1] = value;
    setCreateForm(createForm);
  };

  const createPatientProfile = async (e) => {
    e.preventDefault();
    vital.update.push(new Date());
    vital.patientname = createForm.patientname;
    createForm.patientid = vital.patientid;

    try {
      const { data } = await axios.post(baseurl + "/", {
        token: cookies.token,
      });
      vital.nurseupdate = data.user;
      vital.update = new Date();
      const res = await axios.post(baseurl + "/addvital", vital);
      const res1 = await axios.post(baseurl + "/addpatient", createForm);
      console.log(res.data, res1.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const formSectionVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div
      className={`min-h-screen w-full bg-gray-100 dark:bg-gray-900 min-h-screen`}
    >
      <div className="dark:bg-gray-900 dark:text-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <motion.form
            onSubmit={createPatientProfile}
            className="flex flex-col gap-6"
            initial="hidden"
            animate={loaded ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {/* Left Column - Profile Details */}
            <motion.div
              className="flex-1 p-6 border-gray-200 dark:border-gray-700"
              variants={formSectionVariants}
            >
              <div className="space-y-6">
                <motion.div
                  variants={itemVariants}
                  className="flex justify-between items-center"
                >
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    Profile Details
                  </h2>
                </motion.div>

                <motion.div
                  variants={containerVariants}
                  className="grid grid-cols-1 gap-4"
                >
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
                      placeholder="Patient name"
                      value={createForm.patientname}
                      name="patientname"
                      onChange={updateCreateFormField}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Date Of Admission
                    </label>
                    <input
                      type="datetime-local"
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
                      placeholder="eg: 2022-02-05"
                      value={createForm.dateofadm}
                      name="dateofadm"
                      id="dateofadm"
                      onChange={updateCreateFormField}
                    />
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Age
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
                        placeholder="Age"
                        value={createForm.age}
                        name="age"
                        id="age"
                        onChange={updateCreateFormField}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Sex
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
                        placeholder="Gender"
                        value={createForm.sex}
                        name="sex"
                        id="sex"
                        onChange={updateCreateFormField}
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Address
                    </label>
                    <textarea
                      type="text"
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100 min-h-[80px]"
                      placeholder="Patient address"
                      value={createForm.address}
                      name="address"
                      id="address"
                      onChange={updateCreateFormField}
                    />
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Relative Mobile No
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
                        placeholder="Phone number"
                        value={createForm.relmobno}
                        name="relmobno"
                        id="relmobno"
                        onChange={updateCreateFormField}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Incharge Doctor
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
                        placeholder="Doctor name"
                        value={vital.drincharge}
                        name="drincharge"
                        id="drincharge"
                        onChange={updateVitalField}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Room/Bed
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
                        placeholder="Room number"
                        value={createForm.room}
                        name="room"
                        id="room"
                        onChange={updateCreateFormField}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Occupation
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
                        placeholder="Occupation"
                        value={createForm.occupation}
                        name="occupation"
                        id="occupation"
                        onChange={updateCreateFormField}
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Precautions
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
                      placeholder="eg: HPV/HIV"
                      value={createForm.precautions}
                      name="precautions"
                      id="precautions"
                      onChange={updateCreateFormField}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Allergies
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
                      placeholder="eg: Penicillin Allergy"
                      value={createForm.allergies}
                      name="allergies"
                      id="allergies"
                      onChange={updateCreateFormField}
                    />
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Isolation
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
                        placeholder="eg: Yes(Corona)"
                        value={createForm.isolation}
                        name="isolation"
                        id="isolation"
                        onChange={updateCreateFormField}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Documents
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
                        value={createForm.docuavail}
                        placeholder="Yes/No"
                        name="docuavail"
                        id="docuavail"
                        onChange={updateCreateFormField}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column - History and Vitals */}
            <motion.div className="flex-1 p-6" variants={formSectionVariants}>
              <div className="space-y-6">
                <motion.div
                  variants={itemVariants}
                  className="flex justify-between items-center"
                >
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    Medical History
                  </h2>
                </motion.div>

                <motion.div
                  variants={containerVariants}
                  className="grid grid-cols-1 gap-4"
                >
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Presenting Complaint
                    </label>
                    <textarea
                      type="text"
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100 min-h-[80px]"
                      placeholder="eg: Right side paralysis since 3hrs"
                      value={createForm.history[0]}
                      name="1"
                      onChange={updateCreateFormField}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      History of Presenting Complaint
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
                      placeholder="Details"
                      value={createForm.history[1]}
                      name="2"
                      onChange={updateCreateFormField}
                    />
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Past Medical History
                      </label>
                      <textarea
                        type="text"
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100 min-h-[80px]"
                        placeholder="eg: Diagnosed Diabetic 10yrs back"
                        value={createForm.history[2]}
                        name="3"
                        onChange={updateCreateFormField}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Drug History
                      </label>
                      <textarea
                        type="text"
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100 min-h-[80px]"
                        placeholder="Medications"
                        value={createForm.history[3]}
                        name="4"
                        onChange={updateCreateFormField}
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Family History
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
                      placeholder="Family medical history"
                      value={createForm.history[4]}
                      name="5"
                      onChange={updateCreateFormField}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Social History
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
                      placeholder="eg: alcohol addiction"
                      value={createForm.history[5]}
                      name="6"
                      onChange={updateCreateFormField}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Admission Diagnosis
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
                      placeholder="Diagnosis"
                      value={createForm.admdiagnosis}
                      name="admdiagnosis"
                      onChange={updateCreateFormField}
                    />
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="pt-4 border-t border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                        Vitals at Admission
                      </h3>
                    </div>

                    <motion.div
                      variants={containerVariants}
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4"
                    >
                      <motion.div variants={itemVariants}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Temperature
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
                          placeholder="°C"
                          value={vital.temp}
                          name="temp"
                          id="temp"
                          onChange={updateVitalField}
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Heart Rate
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
                          value={vital.heartrate}
                          placeholder="bpm"
                          name="heartrate"
                          id="heartrate"
                          onChange={updateVitalField}
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Systolic BP
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
                          placeholder="mmHg"
                          value={vital.sysbp}
                          name="sysbp"
                          id="sysbp"
                          onChange={updateVitalField}
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Diastolic BP
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
                          placeholder="mmHg"
                          value={vital.dibp}
                          name="dibp"
                          id="dibp"
                          onChange={updateVitalField}
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Respiration
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
                          value={vital.resprate}
                          placeholder="breaths/min"
                          name="resprate"
                          id="resprate"
                          onChange={updateVitalField}
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Oxygen
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
                          placeholder="SpO2 %"
                          value={vital.oxysat}
                          name="oxysat"
                          id="oxysat"
                          onChange={updateVitalField}
                        />
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              variants={itemVariants}
              className="w-full col-span-2 mt-4 text-center"
            >
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors dark:bg-blue-700 dark:hover:bg-blue-800"
              >
                Save Profile
              </button>
            </motion.div>
          </motion.form>
        </div>
      </div>
    </div>
  );
}

export default AddPatient;
