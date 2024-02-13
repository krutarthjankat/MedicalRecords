// import styles from "../../styles/Patient.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { baseurl } from "../../App";
import { useCookies } from "react-cookie";

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

  useEffect(() => {
    fetchData();
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
    createForm.history[(name * 1)-1] = value;
    setCreateForm(createForm);
  };

  const createPatientProfile = async (e) => {
    e.preventDefault();
    vital.update.push(new Date());
    vital.patientname=createForm.patientname;
    createForm.patientid=vital.patientid;
    // setVital(vital);
    console.log(vital.patientname);
    try {
      const { data } = await axios.post(
        baseurl + "/",
        { token: cookies.token }
      );
      vital.nurseupdate=data.user;
      vital.update=new Date();
      const res = await axios.post(baseurl + "/addvital", vital);
      const res1 = await axios.post(baseurl + "/addpatient", createForm);
      console.log(res.data,res1.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container rounded bg-white">
      <form onSubmit={createPatientProfile} className="row">
        <div className="col-md-6 border-right">
          <div className="p-1 py-3">
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="text-right">Profile Details</h4>
            </div>
            <div className="row mt-1">
              <div className="col-md-12">
                <label className="labels">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={createForm.patientname}
                  name="patientname"
                  onChange={updateCreateFormField}
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Date Of Admission</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  placeholder="eg: 2022-02-05"
                  value={createForm.dateofadm}
                  name="dateofadm"
                  id="dateofadm"
                  onChange={updateCreateFormField}
                />
              </div>
              <div className="col-md-6">
                <label className="labels">Age</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={createForm.age}
                  name="age"
                  id="age"
                  onChange={updateCreateFormField}
                />
              </div>
              <div className="col-md-6">
                <label className="labels">Sex</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={createForm.sex}
                  name="sex"
                  id="sex"
                  onChange={updateCreateFormField}
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Address</label>
                <textarea
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={createForm.address}
                  name="address"
                  id="address"
                  onChange={updateCreateFormField}
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Relative Mobile No</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={createForm.relmobno}
                  name="relmobno"
                  id="relmobno"
                  onChange={updateCreateFormField}
                />
              </div>
              <div className="col-md-6">
                <label className="labels">Room/Bed</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={createForm.room}
                  name="room"
                  id="room"
                  onChange={updateCreateFormField}
                />
              </div>
              <div className="col-md-6">
                <label className="labels">Occupation</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={createForm.occupation}
                  name="occupation"
                  id="occupation"
                  onChange={updateCreateFormField}
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Incharge Doctor</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={vital.drincharge}
                  name="drincharge"
                  id="drincharge"
                  onChange={updateVitalField}
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Precautions</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="eg: HPV/HIV"
                  value={createForm.precautions}
                  name="precautions"
                  id="precautions"
                  onChange={updateCreateFormField}
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Allergies</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="eg: Penicillin Allergy"
                  value={createForm.allergies}
                  name="allergies"
                  id="allergies"
                  onChange={updateCreateFormField}
                />
              </div>

              <div className="col-md-6">
                <label className="labels">Isolation</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="eg: Yes(Corona)"
                  value={createForm.isolation}
                  name="isolation"
                  id="isolation"
                  onChange={updateCreateFormField}
                />
              </div>
              <div className="col-md-6">
                <label className="labels">Documents</label>
                <input
                  type="text"
                  className="form-control"
                  value={createForm.docuavail}
                  placeholder="Yes/No"
                  name="docuavail"
                  id="docuavail"
                  onChange={updateCreateFormField}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="p-1 py-3">
            <div className="d-flex justify-content-between align-items-center ">
              <h4 className="text-right">History</h4>
            </div>
            <div className="row mt-1">
              <div className="col-md-12">
                <label className="labels">Presenting Complaint</label>
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="eg: Right side paralysis since 3hrs"
                  value={createForm.history[0]}
                  name="1"
                  onChange={updateCreateFormField}
                />
              </div>
              <div className="col-md-12">
                <label className="labels">
                  History of Presenting Complaint
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={createForm.history[1]}
                  name="2"
                  onChange={updateCreateFormField}
                />
              </div>
              <div className="col-md-6">
                <label className="labels">Past Medical History</label>
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="eg: Diagnosed Diabetic 10yrs back"
                  value={createForm.history[2]}
                  name="3"
                  onChange={updateCreateFormField}
                />
              </div>
              <div className="col-md-6">
                <label className="labels">Drug History</label>
                <textarea
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={createForm.history[3]}
                  name="4"
                  onChange={updateCreateFormField}
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Family History</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={createForm.history[4]}
                  name="5"
                  onChange={updateCreateFormField}
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Social History</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="eg: alcohol addiction"
                  value={createForm.history[5]}
                  name="6"
                  onChange={updateCreateFormField}
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Admission Diagnosis</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={createForm.admdiagnosis}
                  name="admdiagnosis"
                  onChange={updateCreateFormField}
                />
              </div>

              <div className="d-flex justify-content-between align-items-center mt-3 mb-1">
                <h5 className="text-right">Vitals at Admission</h5>
              </div>
              <div className="col-md-4">
                <label className="labels">Temperature</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={vital.temp}
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
                  value={vital.heartrate}
                  placeholder=""
                  name="heartrate"
                  id="heartrate"
                  onChange={updateVitalField}
                />
              </div>
              <div className="col-md-4">
                <label className="labels">Systolic BP</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={vital.sysbp}
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
                  value={vital.dibp}
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
                  value={vital.resprate}
                  placeholder=""
                  name="resprate"
                  id="resprate"
                  onChange={updateVitalField}
                />
              </div>
              <div className="col-md-4">
                <label className="labels">Oxygen</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={vital.oxysat}
                  name="oxysat"
                  id="oxysat"
                  onChange={updateVitalField}
                />
              </div>
            </div>
          </div>
        </div>
        <div className=" col-md-12 mt-2 mb-2 text-center">
          <button className="btn btn-primary profile-button" type="submit">
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
}
export default AddPatient;
