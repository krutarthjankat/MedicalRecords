import styles from "../../styles/PatientList.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../../App";
import addData from "../../assets/add_data.svg";
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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get(baseurl + "/data", { data: { type: "vital" } });
    console.log(res.data.vital);
    setVital(res.data.vital);
    setLoading(false);
  };

  const toggleExpand = (e) => {
    const maindiv =
      e.target.parentElement.parentElement.parentElement.parentElement
        .parentElement;
        console.log(maindiv.firstChild.lastChild.classList);
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

  const sort = (e) => {};

  const toggleVitalFields = (e) => {
    const maindiv =
      e.target.parentElement.parentElement.parentElement.parentElement
        .parentElement;
    console.log(maindiv);
    if (!maindiv.classList.contains(styles.isactive2)) {
      maindiv.lastChild.classList.remove(`${styles.hide2}`);
      maindiv.classList.add(`${styles.isactive2}`);
     
    } else {
      maindiv.lastChild.classList.add(`${styles.hide2}`);
      maindiv.classList.remove(`${styles.isactive2}`);
    }
  };

  const updateVitalField = (e) => {
    const { name, value } = e.target;
    setNewVital({ ...newvital, [name]: value });
  };


  const addVitals = async (e) => {
    e.preventDefault();
    newvital.patientid =parseInt(e.target.parentElement.parentElement.firstChild.firstChild.firstChild
        .firstChild.childNodes[1].textContent);
        newvital.update=new Date();
        console.log(newvital);
        const { data } = await axios.post(baseurl + "/", {
          token: id.token,
        });
        newvital.nurseupdate=data.user;
      const res = await axios.post(baseurl + "/addvital", newvital);
      console.log(res.data);
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        Loading the data {console.log("loading state")}
      </div>
    );
  }


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
                      {item.nurseupdate[item.nurseupdate.length - 1]}
                    </span>{" "}
                    {item.update[item.update.length - 1]}
                  </p>
                </h6>
              </div>
            </div>
            <div className={`row ${styles.graph} ${styles.hide}`}>
              <Line
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  aspectRatio: 2,
                  legend: {
                    display: false,
                  },
                  scales: {
                    y: { min: 0, max: 50 },
                  },
                  plugins: {
                    legend: {
                      display:false
                    },
                    title: {
                      display: true,
                      text: "Temperature",
                    },
                  },
                }}
                data={{
                  labels: item.update.map((date) => {
                    return new Date(date).toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                    });
                  }),
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

          <div className=" card-footer bg-white px-0 ">
            <div className="row">
              <div className=" col-md-auto ">
                <button
                  onClick={toggleVitalFields}
                  className="btn btn-outlined btn-black text-muted bg-transparent"
                  data-wow-delay="0.7s"
                >
                  <img src={addData} alt="addData" />
                  <small>Update Vitals</small>
                </button>
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
            </div>
          </div>
          <div className={`card border ${styles.hide2}`}>
            <form onSubmit={addVitals} className="row">
              <div className="col-md-4">
                <label className="labels">Temperature</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={newvital.temp}
                  name="temp"
                  id="temp"
                  onChange={updateVitalField}
                />
              </div>
              <div className="col-md-4">
                <label className="labels">Heart Rate</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={newvital.heartrate}
                  name="heartrate"
                  id="heartrate"
                  onChange={updateVitalField}
                />
              </div>
              <div className="col-md-4">
                <label className="labels">Oxygen</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={newvital.oxysat}
                  name="oxysat"
                  id="oxysat"
                  onChange={updateVitalField}
                />
              </div>
              <div className="col-md-4">
                <label className="labels">Systolic BP</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={newvital.sysbp}
                  name="sysbp"
                  id="sysbp"
                  onChange={updateVitalField}
                />
              </div>
              <div className="col-md-4">
                <label className="labels">Diastolic BP</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={newvital.dibp}
                  name="dibp"
                  id="dibp"
                  onChange={updateVitalField}
                />
              </div>
              <div className="col-md-4">
                <label className="labels">Respiration</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={newvital.resprate}
                  name="resprate"
                  id="resprate"
                  onChange={updateVitalField}
                />
              </div>
              <div className="col-md-12 d-flex justify-content-center mt-2 mb-2">
                <button tyoe="submit" className="btn border border-5 ">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}
export default PatientList;
