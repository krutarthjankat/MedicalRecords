import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../../App";
import addData from "../../assets/add_data.svg";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import "chartjs-adapter-date-fns";
import { enGB } from "date-fns/locale";
import "react-toastify/dist/ReactToastify.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ArcElement,
  TimeScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { motion } from "framer-motion";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  TimeScale,
  Title,
  Tooltip,
  Filler,
  Legend
);

function PatientList() {
  const [isLoading, setLoading] = useState(true);
  const [id, setId] = useCookies("patientId");
  const navigate = useNavigate();

  const [vital, setVital] = useState([
    {
      patientid: 1,
      patientname: "",
      drincharge: "",
      nurseupdate: "",
      update: [],
      temp: [],
      heartrate: [],
      resprate: [],
      oxysat: [],
      sysbp: [],
      dibp: [],
    },
  ]);

  const [newvital, setNewVital] = useState({});
  const [expandedCards, setExpandedCards] = useState({});
  const [showVitalForms, setShowVitalForms] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get(baseurl + "/data", { data: { type: "vital" } });
    console.log(res.data.vital);
    setVital(res.data.vital);
    setLoading(false);
  };

  const toggleExpand = (patientId) => {
    setExpandedCards((prev) => ({
      ...prev,
      [patientId]: !prev[patientId],
    }));
  };

  // const sort = (e) => {};

  const toggleVitalFields = (patientId) => {
    setShowVitalForms((prev) => ({
      ...prev,
      [patientId]: !prev[patientId],
    }));
  };

  const updateVitalField = (e) => {
    const { name, value } = e.target;
    setNewVital({ ...newvital, [name]: value });
  };

  const addVitals = async (e) => {
    e.preventDefault();
    newvital.patientid = parseInt(
      e.target.parentElement.parentElement.firstChild.firstChild.firstChild
        .firstChild.childNodes[1].textContent
    );
    newvital.update = new Date();

    const { data } = await axios.post(baseurl + "/", {
      token: id.token,
    });
    newvital.nurseupdate = data.user;
    const res = await axios.post(baseurl + "/addvital", newvital);
    setNewVital({
      ...newvital,
      temp: "",
      heartrate: "",
      sysbp: "",
      dibp: "",
      oxysat: "",
      resprate: "",
    });
    console.log(res);
    toast(res.data.message);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        Loading the data {console.log("loading state")}
      </div>
    );
  }

  return (
    <div>
      <ToastContainer />
      <div className="flex space-x-4 mb-4 text-black dark:text-white">
        <button
          className="px-4 py-2 bg-yellow-400 dark:bg-gray-400 text-white rounded hover:bg-blue-600 transition-colors"
          onClick={() => {
            navigate(`/Patients/add`);
          }}
        >
          Add Patient
        </button>
      </div>

      {vital.map((item, index) => (
        <motion.div
        key={index}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{  duration: 0.01 }}
          className={`mb-6 w-full rounded text-black dark:text-white border-4 border-gray-200 overflow-hidden transition-all duration-1000 ${
            expandedCards[item.patientid] || showVitalForms[item.patientid]
              ? "max-h-[2000px]"
              : "max-h-[300px]"
          }`}
        >
          <div className="p-4">
            <div className="flex flex-wrap ">
              <div className="w-full ">
                <h4 className="text-xl text-black dark:text-white font-semibold">
                  Patient-Id:{" "}
                  <b className="text-xl text-black dark:text-white">
                    {item.patientid}
                  </b>
                  <br />
                  Patient Name:{" "}
                  <b className="text-xl text-black dark:text-white">
                    {item.patientname}
                  </b>
                </h4>
              </div>
              <div className="w-full">
                <h6 className="text-sm text-gray-500">
                  <p className="text-xs text-black dark:text-white">
                    <span className="h-5 text-black dark:text-white inline-block"></span>
                    Last updated by{" "}
                    <span className="font-bold text-black dark:text-white">
                      {item.nurseupdate[item.nurseupdate.length - 1]}
                    </span>{" "}
                    on{" "}
                    {new Date(
                      item.update[item.update.length - 1]
                    ).toLocaleString()}
                  </p>
                </h6>
              </div>
              <button
                className="px-4 py-2 bg-yellow-400 dark:bg-white text-white dark:text-black rounded hover:bg-blue-500 transition-colors mt-4"
                onClick={() => {
                  setId("patientid", item.patientid, {
                    path: "/MedicalRecords",
                  });
                  navigate(`/Patients/${item.patientid}`);
                }}
              >
                View Profile
              </button>
            </div>
            <div
              className={`mt-4 w-full flex flex-wrap justify-around ${
                expandedCards[item.patientid] ? "block" : "hidden"
              }`}
            >
              {[
                {
                  title: "Temperature",
                  data: [{ data: item.temp }],
                  yRange: [30, 50],
                },
                {
                  title: "Heart Rate",
                  data: [{ data: item.heartrate }],
                  yRange: [30, 150],
                },
                {
                  title: "Blood Pressure",
                  data: [
                    { label: "Systolic BP", data: item.sysbp },
                    { label: "Diastolic BP", data: item.dibp },
                  ],
                  yRange: [0, 160],
                  legend: { position: "right", align: "start" },
                },
                {
                  title: "Respiration Rate",
                  data: [{ data: item.resprate }],
                  yRange: [0, 40],
                },
                {
                  title: "Oxygen Saturation",
                  data: [{ data: item.oxysat }],
                  yRange: [70, 100],
                },
              ].map(
                ({ title, data, yRange, legend = { display: false } }, idx) => (
                  <div key={idx} className="w-full md:w-1/2 lg:w-2/5 p-2">
                    <Line
                      options={{
                        responsive: true,
                        maintainAspectRatio: true,
                        aspectRatio: 2,
                        scales: {
                          y: { min: yRange[0], max: yRange[1] },
                          x: {
                            type: "time",
                            adapters: {
                              date: { locale: enGB },
                            },
                          },
                        },
                        plugins: {
                          legend,
                          title: {
                            display: true,
                            text: title,
                            align: "start",
                          },
                        },
                      }}
                      data={{
                        labels: item.update,
                        datasets: data.map((d) => ({
                          fill: true,
                          borderColor: "#2190e47a",
                          backgroundColor: "#2190e47a",
                          tension: 0.5,
                          ...d,
                        })),
                      }}
                    />
                  </div>
                )
              )}
            </div>
          </div>

          {/* Update Vitals Button + Form */}
          <div className="bg-white p-4 border-t">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => toggleVitalFields(item.patientid)}
                className="flex items-center text-gray-500 hover:text-gray-700"
              >
                <img src={addData} alt="addData" className="mr-2" />
                <small>Update Vitals</small>
              </button>
              <button
                onClick={() => toggleExpand(item.patientid)}
                className="flex items-center text-gray-500 hover:text-gray-700"
              >
                <img
                  src="https://img.icons8.com/metro/26/000000/more.png"
                  width="20"
                  height="20"
                  alt="abc"
                  className="mr-2 opacity-50"
                />
                <small>
                  {expandedCards[item.patientid] ? "Show Less" : "Show More"}
                </small>
              </button>
              <span className="border-l border-gray-400 h-6 mx-2"></span>
            </div>
          </div>
          <div
            className={`p-4 border-t ${
              showVitalForms[item.patientid] ? "block" : "hidden"
            }`}
          >
            <form onSubmit={addVitals} className="flex flex-wrap">
              {[
                { label: "Temperature", name: "temp" },
                { label: "Heart Rate", name: "heartrate" },
                { label: "Oxygen", name: "oxysat" },
                { label: "Systolic BP", name: "sysbp" },
                { label: "Diastolic BP", name: "dibp" },
                { label: "Respiration", name: "resprate" },
              ].map(({ label, name }) => (
                <div key={name} className="w-full md:w-1/3 p-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={newvital[name]}
                    name={name}
                    id={name}
                    onChange={updateVitalField}
                    autoComplete="off"
                  />
                </div>
              ))}
              <div className="w-full flex justify-center my-2">
                <button
                  type="submit"
                  className="px-4 py-2 border-4 border-gray-300 rounded hover:bg-gray-100 transition-colors"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default PatientList;
