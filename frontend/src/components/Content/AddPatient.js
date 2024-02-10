// import styles from "../../styles/Patient.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddPatient() {
  const navigate = useNavigate();
  const [createForm, setCreateForm] = useState({
    patientid:"",
    patientname: "",
    dateofadm: "",
    age: "",
    relmobno: "",
    sex: "",
    room: "",
    occupation: "",
    isolation: "",
    precautions:"",
    allergies:"",
    admdiagnosis:"",
    docuavail:"",
    history:[],
  });


  const updateCreateFormField = (e) => {
    const { name, value } = e.target;
    setCreateForm({
      ...createForm,
      [name]: value,
    });
  };

  return (
    <div className="container rounded bg-white">
      <div className="row">
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
                  value=""
                  name="patientname"
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Date Of Admission</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="eg: 2022-02-05"
                  value=""
                  name="dateofadm"
                  id="dateofadm"
                />
              </div>
              <div className="col-md-6">
                <label className="labels">Age</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value=""
                  name="age"
                  id="age"
                />
              </div>
              <div className="col-md-6">
                <label className="labels">Sex</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value=""
                  name="sex"
                  id="sex"
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Address</label>
                <textarea
                  type="text"
                  className="form-control"
                  placeholder=""
                  value=""
                  name="address"
                  id="address"
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Relative Mobile No</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value=""
                  name="relmobno"
                  id="relmobno"
                />
              </div>
              <div className="col-md-6">
                <label className="labels">Room/Bed</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value=""
                  name="room"
                  id="room"
                />
              </div>
              <div className="col-md-6">
                <label className="labels">Occupation</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value=""
                  name="occupation"
                  id="occupation"
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Incharge Doctor</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value=""
                  name="drincarge"
                  id="drincharge"
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Precautions</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="eg: HPV/HIV"
                  value=""
                  name="precautions"
                  id="precautions"
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Allergies</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="eg: Penicillin Allergy"
                  value=""
                  name="allergies"
                  id="allergies"
                />
              </div>

              <div className="col-md-6">
                <label className="labels">Isolation</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="eg: Yes(Corona)"
                  value=""
                  name="isolation"
                  id="isolation"
                />
              </div>
              <div className="col-md-6">
                <label className="labels">Documents</label>
                <input
                  type="text"
                  className="form-control"
                  value=""
                  placeholder="Yes/No"
                  name="docuavail"
                  id="docuavail"
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
                  value=""
                />
              </div>
              <div className="col-md-12">
                <label className="labels">
                  History of Presenting Complaint
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  placeholder=""
                  value=""
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Past Medical History</label>
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="eg: Diagnosed Diabetic 10yrs back"
                  value=""
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Drug History</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value=""
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Family History</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value=""
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Social History</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="eg: alcohol addiction"
                  value=""
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
                  value=""
                />
              </div>
              <div className="col-md-4">
                <label className="labels">Heart Rate</label>
                <input
                  type="text"
                  className="form-control"
                  value=""
                  placeholder=""
                />
              </div>
              <div className="col-md-4">
                <label className="labels">Systolic BP</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value=""
                />
              </div>
              <div className="col-md-4">
                <label className="labels">Diastolic BP</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value=""
                />
              </div>
              <div className="col-md-4">
                <label className="labels">Respiration</label>
                <input
                  type="text"
                  className="form-control"
                  value=""
                  placeholder=""
                />
              </div>
              <div className="col-md-4">
                <label className="labels">Oxygen</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className=" col-md-12 mt-2 mb-2 text-center">
          <button className="btn btn-primary profile-button" type="button">
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
}
export default AddPatient;
