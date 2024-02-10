import styles from "../../styles/PatientList.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../../App";
import { useCookies } from "react-cookie";
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
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 1,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Temperature",
    },
  },
};
const labels = [
  0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400,
  1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300,
];
export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: "Dataset 2",
      data: labels.map(() => Math.random() * 1000),
      borderColor: "#2190e47a",
      backgroundColor: "#2190e47a",
    },
  ],
};

function PatientList() {
  const [, setId] = useCookies("patientId");
  const navigate = useNavigate();

  const [vital, setVital] = useState([
    {
      patientid: 1.5,
      patientname: "",
      drincharge: "",
      nurseincharge: "",
      update: [],
      temp: [],
      heartrate: [],
      resprate: [],
      oxysat: [],
      sysbp: [],
      dibp: [],
    },
  ]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get(baseurl + "/data", { data: { type: "vital" } });
    console.log(res.data.vital);
    setVital(res.data.vital);
  };

  const sort = async () => {};

  const toggleExpand = (e) => {
    const maindiv =
      e.target.parentElement.parentElement.parentElement.parentElement
        .parentElement;
    if (!maindiv.classList.contains(styles.isactive)) {
      maindiv.firstChild.lastChild.classList.remove(`${styles.hide}`);
      maindiv.classList.add(`${styles.isactive}`);
      e.target.lastChild.textContent = " Show Less";
    } else {
      maindiv.firstChild.lastChild.classList.add(`${styles.hide}`);
      maindiv.classList.remove(`${styles.isactive}`);
      e.target.lastChild.textContent = " Show More";
    }
  };

  return (
    <div>
      <div className={`${styles.option}`}>
        <button
          className={`${styles.addpt}`}
          onClick={() => {
            navigate(`/Patients/add`);
          }}
        >
          Add Patient
        </button>
        <button className={`${styles.addpt}`} onClick={sort}>
          Sort By
        </button>
      </div>

      {vital.map((item, index) => (
        <div
          key={index}
          className={`card border-5 mb-3 w-full ${styles.maindiv} overflow-hidden`}
        >
          <div className="card-body">
            <div className="row">
              <div className="col-12 ">
                <h4 className="card-title ">
                  Patient-Id: <b>{item.patientid}</b>
                  <br />
                  Patient Name: <b>{item.patientname}</b>
                </h4>
              </div>
              <div className="col">
                <h6 className="card-subtitle mb-0 text-muted">
                  <p className="card-text text-muted small ">
                    <span className="vl mr-2 ml-0"></span>
                    Last updated by{" "}
                    <span className="font-weight-bold">
                      {" "}
                      {item.nurseincharge}
                    </span>{" "}
                    {item.update[8]}
                  </p>
                </h6>
              </div>
            </div>
            <div className={`row ${styles.hide} ${styles.graph}`}>
              <Line
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  aspectRatio: 2,
                  scales: {
                    y: { min: 0, max: 50 },
                  },
                  plugins: {
                    legend: {
                      position: "top",
                    },
                    title: {
                      display: true,
                      text: "Temperature",
                    },
                  },
                }}
                data={{
                  labels: item.update,
                  datasets: [
                    {
                      fill: true,
                      data: item.temp,
                      borderColor: "#2190e47a",
                      backgroundColor: "#2190e47a",
                    },
                  ],
                }}
                width="3px"
              />
              <button
                onClick={() => {
                  setId("patientid", item.patientid, {
                    path: "/MedicalRecords",
                  });
                  // console.log(id);
                  navigate(`/Patients/${item.patientid}`);
                }}
              >
                View Profile
              </button>
            </div>
          </div>

          <div className="card-footer bg-white px-0 ">
            <div className="row">
              <div className=" col-md-auto ">
                <a
                  href="a"
                  className="btn btn-outlined btn-black text-muted bg-transparent"
                  data-wow-delay="0.7s"
                >
                  <img
                    src="https://img.icons8.com/ios/50/000000/settings.png"
                    width="19"
                    height="19"
                    alt="abc"
                  />{" "}
                  <small>Edit Data</small>
                </a>
                <button
                  onClick={toggleExpand}
                  className="btn btn-outlined btn-black text-muted "
                >
                  <img
                    src="https://img.icons8.com/metro/26/000000/more.png"
                    width="20"
                    height="20"
                    alt="abc"
                    className="mr-2 more"
                  />
                  <small> Show More</small>
                </button>
                <span className="vl ml-3"></span>
              </div>

              <div className="col-md-auto w-full">
                <ul className="list-inline d-flex justify-content-end align-items-end">
                  <li className="list-inline-item">
                    {" "}
                    <img
                      src="https://img.icons8.com/ios/50/000000/plus.png"
                      width="30"
                      height="30 "
                      alt="abc"
                      className="more"
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default PatientList;
