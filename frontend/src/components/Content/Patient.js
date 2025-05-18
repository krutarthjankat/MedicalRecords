import blood_pressure from "../../assets/blood_pressure_monitor.svg";
import oxysat from "../../assets/pulse_oximeter_alt.svg";
import heart from "../../assets/heart_cardiogram.svg";
import lungs from "../../assets/respirology.svg";
import temp from "../../assets/thermometer.svg";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { baseurl } from "../../App";

function Patient() {
  const [isLoading, setLoading] = useState(true);
  const [vital, setVital] = useState({});
  const [patient, setPatient] = useState({});
  const [id] = useCookies(["patientid"]);

  useEffect(() => {
    fetchProfile();
  }, );

  const fetchProfile = async () => {
    try {
      const res = await axios.post(baseurl + "/profile", {
        patientid: id.patientid,
      });
      setVital(res.data.vital);
      setPatient(res.data.user);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // const getVitalStyle = (condition) =>
  //   condition
  //     ? "border-green-500 shadow-md shadow-green-400"
  //     : "border-red-600 shadow-md shadow-red-500";

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg dark:text-white">
        Loading the data...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white p-4">
      <div className="container mx-auto py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column */}
          <div className="lg:w-1/3 w-full space-y-6">
            {/* Avatar */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl text-center">
              <img
                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                alt="Avatar"
                className="rounded-full w-32 h-32 mx-auto border-4 border-indigo-300 dark:border-indigo-700"
              />
              <h4 className="mt-4 text-xl font-bold text-indigo-700 dark:text-indigo-300">
                #{vital.patientid}
              </h4>
            </div>

            {/* Vitals */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl">
              <h5 className="text-center text-lg font-bold text-indigo-600 dark:text-indigo-300 mb-6">
                Body Vitals at Admission
              </h5>

              <div className="flex justify-around mb-4">
                <VitalCard
                  icon={temp}
                  label={`${vital.temp[0]}°C`}
                  condition={vital.temp[0] > 36.7 && vital.temp[0] < 38.3}
                  alt="Temperature"
                />
                <VitalCard
                  icon={heart}
                  label={`${vital.heartrate[0]} Bpm`}
                  condition={
                    vital.heartrate[0] > 60 && vital.heartrate[0] < 100
                  }
                  alt="Heart Rate"
                />
              </div>

              <div className="flex justify-center mb-4">
                <VitalCard
                  icon={blood_pressure}
                  label={`${vital.sysbp[0]}/${vital.dibp[0]} mmHg`}
                  condition={
                    vital.sysbp[0] > 110 &&
                    vital.sysbp[0] < 135 &&
                    vital.dibp[0] > 70 &&
                    vital.dibp[0] < 90
                  }
                  alt="Blood Pressure"
                />
              </div>

              <div className="flex justify-around">
                <VitalCard
                  icon={lungs}
                  label={vital.resprate[0]}
                  condition={vital.resprate[0] >= 12 && vital.resprate[0] <= 25}
                  alt="Respiration"
                />
                <VitalCard
                  icon={oxysat}
                  label={`${vital.oxysat[0]}%`}
                  condition={vital.oxysat[0] > 98}
                  alt="Oxygen"
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:w-2/3 w-full">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl space-y-6">
              <h5 className="text-center text-lg font-bold text-indigo-600 dark:text-indigo-300 underline">
                Personal Details
              </h5>

              <DetailRow
                label1="Full Name"
                value1={patient.patientname}
                label2="Date of Admission"
                value2={patient.dateofadm}
              />
              <DetailRow
                label1="Age"
                value1={patient.age}
                label2="Sex"
                value2={patient.sex}
              />
              <DetailRow
                label1="Address"
                value1={patient.address}
                label2="Relative Contact No"
                value2={patient.relmobno}
              />
              <DetailRow
                label1="Room/Bed No"
                value1={patient.room}
                label2="Occupation"
                value2={patient.occupation}
              />
              <DetailRow
                label1="Incharge Doctor"
                value1={vital.drincharge}
                label2="Isolation"
                value2={patient.isolation}
              />
              <DetailRow
                label1="Allergies"
                value1={patient.allergies}
                label2="Precautions"
                value2={patient.precautions}
              />
              <DetailRow
                label1="Consent for Intensive Care"
                value1={patient.docuavail}
                label2="Admission Diagnosis"
                value2={patient.admdiagnosis}
              />

              <h5 className="text-center text-lg font-bold text-indigo-600 dark:text-indigo-300 underline mt-4">
                History
              </h5>
              {patient.history?.map((item, i) => (
                <div key={i} className="flex flex-col mb-2">
                  <span className="font-semibold">{historyLabels[i]}:</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const DetailRow = ({ label1, value1, label2, value2 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-sm sm:text-base">
    <div className="font-semibold">{label1}</div>
    <div className="text-gray-700 dark:text-gray-300">{value1}</div>
    <div className="font-semibold">{label2}</div>
    <div className="text-gray-700 dark:text-gray-300">{value2}</div>
  </div>
);

const VitalCard = ({ icon, label, condition, alt }) => (
  <div
    className={`w-24 h-24 rounded-full border-4 flex flex-col items-center justify-center text-sm text-center font-semibold transition duration-300 ${
      condition
        ? "border-green-500 text-green-600 dark:text-green-400"
        : "border-red-600 text-red-600 dark:text-red-400"
    } ${
      condition
        ? "bg-green-100 dark:bg-green-900"
        : "bg-red-100 dark:bg-red-900"
    } shadow-md`}
  >
    <img src={icon} alt={alt} className="w-6 h-6 mb-1" />
    {label}
  </div>
);

const historyLabels = [
  "Presenting Complaint",
  "History of Presenting Complaint",
  "Past Medical History",
  "Drug History",
  "Family History",
  "Social History",
];

export default Patient;