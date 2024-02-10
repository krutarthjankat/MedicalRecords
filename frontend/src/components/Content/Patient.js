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
  const [id] = useCookies("patientId");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.post(baseurl + "/profile", {
        patientid: String(id.patientid),
      });
      //   console.log(res.data.user.temp);
      setVital(res.data.user);
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
                      <span>{`${vital.sysbp[0]}/${vital.dibp[0]}`+' mm/Hg'}</span>
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
                        vital.oxysat[0] > 90
                          ? "rgb(28, 210, 28)"
                          : "rgb(179, 11, 11)"
                      }`,
                      boxShadow: `0px 0px 10px 1px ${
                        vital.oxysat[0] > 90
                          ? "rgb(28, 210, 28)"
                          : "rgb(179, 11, 11)"
                      }`,
                    }}
                  >
                    <div>
                      <img src={oxysat} alt="oxy"></img>
                    </div>
                    <div>
                      <span>{`${vital.oxysat[0]}`+'%'}</span>
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
                    {vital.patientname}
                  </div>
                  <div className="col-sm-3">
                    <h6 className="mb-0">Date of Admission</h6>
                  </div>
                  <div className="col-sm-3 text-secondary">
                    {vital.update[0]}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Age</h6>
                  </div>
                  <div className="col-sm-3 text-secondary">45</div>
                  <div className="col-sm-3">
                    <h6 className="mb-0">Sex</h6>
                  </div>
                  <div className="col-sm-3 text-secondary">Male</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Address</h6>
                  </div>
                  <div className="col-sm-3 text-secondary">
                    B-wing, Gokuldham Society
                  </div>
                  <div className="col-sm-3">
                    <h6 className="mb-0">Relative contact no</h6>
                  </div>
                  <div className="col-sm-3 text-secondary">(239) 816-9029</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Room/Bed no</h6>
                  </div>
                  <div className="col-sm-3 text-secondary">351</div>

                  <div className="col-sm-3">
                    <h6 className="mb-0">Occupation</h6>
                  </div>
                  <div className="col-sm-3 text-secondary">Businessman</div>
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
                  <div className="col-sm-3 text-secondary">No</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Allergies</h6>
                  </div>
                  <div className="col-sm-3 text-secondary">-</div>
                  <div className="col-sm-3">
                    <h6 className="mb-0">Precautions</h6>
                  </div>
                  <div className="col-sm-3 text-secondary">-</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">
                      Documented Consent for intensive care
                    </h6>
                  </div>
                  <div className="col-sm-3 text-secondary">Yes</div>
                  <div className="col-sm-3">
                    <h6 className="mb-0">Admission Diagnosis</h6>
                  </div>
                  <div className="col-sm-3 text-secondary">
                    Suspendisse turpis ante, pharetra vel lacus vitae.
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Quisque ac metus condimentum, fermentum nisl lobortis,
                    placerat urna.
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">History of Presenting Complaint</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    Suspendisse iaculis ligula at dui volutpat aliquam. Sed
                    efficitur ipsum id tincidunt volutpat. Aliquam faucibus
                    feugiat libero tempus porttitor.
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Past Medical History</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    Sed vitae scelerisque quam, et vestibulum ante. Suspendisse
                    hendrerit, ligula in fringilla consectetur, lectus dui
                    mattis urna, et cursus nibh metus a dolor.
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Drug History</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    Praesent vitae eros nec felis pulvinar tincidunt. Donec
                    commodo pulvinar odio quis varius. Fusce ut ex risus.
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Family History</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    Donec bibendum pharetra nunc eu dictum. Phasellus ut nulla
                    id augue tincidunt bibendum. Aenean eu mattis sapien.
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Social History</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    Donec blandit non ipsum vitae fringilla. In vel augue eget
                    libero rhoncus consequat iaculis eu purus.
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

            <div className="row gutters-sm">
              <div className="col-sm-6 mb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <h6 className="d-flex align-items-center mb-3">
                      <i className="material-icons text-info mr-2">
                        assignment
                      </i>
                      Project Status
                    </h6>
                    <small>Web Design</small>
                    <div className="progress mb-3" style={{ height: "5px" }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: "80%" }}
                        aria-valuenow="80"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <small>Website Markup</small>
                    <div className="progress mb-3" style={{ height: "5px" }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: "72%" }}
                        aria-valuenow="72"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <small>One Page</small>
                    <div className="progress mb-3" style={{ height: "5px" }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: "89%" }}
                        aria-valuenow="89"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <small>Mobile Template</small>
                    <div className="progress mb-3" style={{ height: "5px" }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: "55%" }}
                        aria-valuenow="55"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <small>Backend API</small>
                    <div className="progress mb-3" style={{ height: "5px" }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: "66%" }}
                        aria-valuenow="66"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 mb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <h6 className="d-flex align-items-center mb-3">
                      <i className="material-icons text-info mr-2">
                        assignment
                      </i>
                      Project Status
                    </h6>
                    <small>Web Design</small>
                    <div className="progress mb-3" style={{ height: "5px" }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: "80%" }}
                        aria-valuenow="80"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <small>Website Markup</small>
                    <div className="progress mb-3" style={{ height: "5px" }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: "72%" }}
                        aria-valuenow="72"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <small>One Page</small>
                    <div className="progress mb-3" style={{ height: "5px" }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: "89%" }}
                        aria-valuenow="89"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <small>Mobile Template</small>
                    <div className="progress mb-3" style={{ height: "5px" }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: "55%" }}
                        aria-valuenow="55"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <small>Backend API</small>
                    <div className="progress mb-3" style={{ height: "5px" }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: "66%" }}
                        aria-valuenow="66"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Patient;
