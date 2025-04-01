import blood_pressure from "../../assets/blood_pressure_monitor.svg";
import oxysat from "../../assets/pulse_oximeter_alt.svg";
import heart from "../../assets/heart_cardiogram.svg";
import lungs from "../../assets/respirology.svg";
import temp from "../../assets/thermometer.svg";
import styles from "../../styles/Patient.module.css";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { baseurl } from "../../App";

function Patient() {
  const [isLoading, setLoading] = useState(true);
  const [vital, setVital] = useState({});
  
  const [patient, setPatient] = useState({});
  const [id] = useCookies("patientId");

  useEffect(() => {
    fetchProfile();
  },[id]);

  const fetchProfile = async () => {
    try {
      const res = await axios.post(baseurl + "/profile", {
        patientid: id.patientid,
      });
    console.log(res);
      setVital(res.data.vital);
      setPatient(res.data.user);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
    <div className="container">
      <div className="main-body">
        {/* <nav aria-label="breadcrumb" className="main-breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="a">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href="a">User</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              User Profile
            </li>
          </ol>
        </nav> */}

        <div className="row gutters-sm">
          <div className="col-md-4 mb-3 ">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                    alt="Admin"
                    className="rounded-circle"
                    width="150"
                  />
                  <div className="mt-3">
                    <h4>{`#` + vital.patientid}</h4>
                    {/* <p className="text-secondary mb-1">Full Stack Developer</p>
                    <p className="text-muted font-size-sm">
                      Bay Area, San Francisco, CA
                    </p> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="card mt-3 shadow-sm">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-12 text-center">
                    <h5 className="mb-3 fw-bold text-decoration-underline text-center">
                      Body Vitals at Admission
                    </h5>
                  </div>
                </div>

                <div className="row justify-content-around">
                  <div
                    className={`${styles.circlevital}`}
                    style={{
                      border: `5px solid ${
                        vital.temp[0] > 36.7 && vital.temp[0] < 38.3
                          ? "rgb(28, 210, 28)"
                          : "rgb(179, 11, 11)"
                      }`,
                      boxShadow: `0px 0px 10px 1px ${
                        vital.temp[0] > 36.7 && vital.temp[0] < 38.3
                          ? "rgb(28, 210, 28)"
                          : "rgb(179, 11, 11)"
                      }`,
                    }}
                  >
                    <div>
                      <img src={temp} alt="temp"></img>
                    </div>
                    <div>
                      <span>{vital.temp[0] + "C"}</span>
                    </div>
                  </div>
                  <div
                    className={`${styles.circlevital} `}
                    style={{
                      border: `5px solid ${
                        vital.heartrate[0] > 60 && vital.heartrate[0] < 100
                          ? "rgb(28, 210, 28)"
                          : "rgb(179, 11, 11)"
                      }`,
                      boxShadow: `0px 0px 10px 1px ${
                        vital.heartrate[0] > 60 && vital.heartrate[0] < 100
                          ? "rgb(28, 210, 28)"
                          : "rgb(179, 11, 11)"
                      }`,
                    }}
                  >
                    <div>
                      <img src={heart} alt="heart"></img>
                    </div>
                    <div>
                      <span>{vital.heartrate[0] + " Bpm"}</span>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-around">
                  <div
                    className={`${styles.circlevital}`}
                    style={{
                      border: `5px solid ${
                        vital.sysbp[0] > 110 &&
                        vital.sysbp[0] < 135 &&
                        vital.dibp[0] > 70 &&
                        vital.dibp[0] < 90
                          ? "rgb(28, 210, 28)"
                          : "rgb(179, 11, 11)"
                      }`,
                      boxShadow: `0px 0px 10px 1px ${
                        vital.sysbp[0] > 110 &&
                        vital.sysbp[0] < 135 &&
                        vital.dibp[0] > 70 &&
                        vital.dibp[0] < 90
                          ? "rgb(28, 210, 28)"
                          : "rgb(179, 11, 11)"
                      }`,
                    }}
                  >
                    <div>
                      <img src={blood_pressure} alt="bp"></img>
                    </div>
                    <div>
                      <span>{`${vital.sysbp[0]}/${vital.dibp[0]} mm/Hg`}</span>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-around">
                  <div
                    className={`${styles.circlevital}`}
                    style={{
                      border: `5px solid ${
                        vital.resprate[0] >= 12 && vital.resprate[0] <= 25
                          ? "rgb(28, 210, 28)"
                          : "rgb(179, 11, 11)"
                      }`,
                      boxShadow: `0px 0px 10px 1px ${
                        vital.resprate[0] >= 12 && vital.resprate[0] <= 25
                          ? "rgb(28, 210, 28)"
                          : "rgb(179, 11, 11)"
                      }`,
                    }}
                  >
                    <div>
                      <img className="img-fluid" src={lungs} alt="resp"></img>
                    </div>
                    <div>
                      <span>{vital.resprate[0]}</span>
                    </div>
                  </div>
                  <div
                    className={`${styles.circlevital}`}
                    style={{
                      border: `5px solid ${
                        vital.oxysat[0] > 98
                          ? "rgb(28, 210, 28)"
                          : "rgb(179, 11, 11)"
                      }`,
                      boxShadow: `0px 0px 10px 1px ${
                        vital.oxysat[0] > 98
                          ? "rgb(28, 210, 28)"
                          : "rgb(179, 11, 11)"
                      }`,
                    }}
                  >
                    <div>
                      <img src={oxysat} alt="oxy"></img>
                    </div>
                    <div>
                      <span>{`${vital.oxysat[0]}%`}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card mb-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-12 text-center">
                    <h5 className="mb-3 fw-bold text-decoration-underline">
                      Personal Details
                    </h5>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Full Name</h6>
                  </div>

                  <div className="col-sm-3 text-secondary">
                    {patient.patientname}
                  </div>
                  <div className="col-sm-3">
                    <h6 className="mb-0">Date of Admission</h6>
                  </div>
                  <div className="col-sm-3 text-secondary">
                    {patient.dateofadm}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Age</h6>
                  </div>
                  <div className="col-sm-3 text-secondary">{patient.age}</div>
                  <div className="col-sm-3">
                    <h6 className="mb-0">Sex</h6>
                  </div>
                  <div className="col-sm-3 text-secondary">{patient.sex}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Address</h6>
                  </div>
                  <div className="col-sm-3 text-secondary">
                    {patient.address}
                  </div>
                  <div className="col-sm-3">
                    <h6 className="mb-0">Relative contact no</h6>
                  </div>
                  <div className="col-sm-3 text-secondary">
                    {patient.relmobno}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Room/Bed no</h6>
                  </div>
                  <div className="col-sm-3 text-secondary">{patient.room}</div>

                  <div className="col-sm-3">
                    <h6 className="mb-0">Occupation</h6>
                  </div>
                  <div className="col-sm-3 text-secondary">
                    {patient.occupation}
                  </div>
                </div>

                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Incharge Doctor</h6>
                  </div>
                  <div className="col-sm-3 text-secondary">
                    {vital.drincharge}
                  </div>
                  <div className="col-sm-3">
                    <h6 className="mb-0">Isolation</h6>
                  </div>
                  <div className="col-sm-3 text-secondary">
                    {patient.isolation}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Allergies</h6>
                  </div>
                  <div className="col-sm-3 text-secondary">
                    {patient.allergies}
                  </div>
                  <div className="col-sm-3">
                    <h6 className="mb-0">Precautions</h6>
                  </div>
                  <div className="col-sm-3 text-secondary">
                    {patient.precautions}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">
                      Documented Consent for intensive care
                    </h6>
                  </div>
                  <div className="col-sm-3 text-secondary">
                    {patient.docuavail}
                  </div>
                  <div className="col-sm-3">
                    <h6 className="mb-0">Admission Diagnosis</h6>
                  </div>
                  <div className="col-sm-3 text-secondary">
                    {patient.admdiagnosis}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-12 text-center">
                    <h5 className="mb-3 fw-bold text-decoration-underline">
                      History
                    </h5>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Presenting Complaint</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {patient.history[0]}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">History of Presenting Complaint</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {patient.history[1]}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Past Medical History</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {patient.history[2]}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Drug History</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {patient.history[3]}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Family History</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {patient.history[4]}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Social History</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {patient.history[5]}
                  </div>
                </div>
                {/* <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Incharge Doctor</h6>
                  </div>
                  <div className="col-sm-3 text-secondary">
                    Dr. Hansraj Hathi
                  </div>
                </div> */}
                {/* <div className="row">
                  <div className="col-sm-12">
                    <a
                      className="btn btn-info "
                      target="__blank"
                      href="https://www.bootdey.com/snippets/view/profile-edit-data-and-skills"
                    >
                      Edit
                    </a>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Patient;
