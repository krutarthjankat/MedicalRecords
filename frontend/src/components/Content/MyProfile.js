import styles from "../../styles/MyProfile.module.css";
function MyProfile() {
  return (<div className={`container ${styles.complete}`}>
      <div className={`${styles.profilenav} rounded`}>
        <div className={`${styles.userheading} rounded`}>
          <div className={`${styles.photo} rounded-circle`}>
            <i className="fa fa-user-circle"></i>
          </div>
          <h1 className="text-wrap">Camila Smith</h1>
        </div>

        <ul className="nav nav-pills flex-column">
          <li className="active">
            <a href="abdc">
              <i className="fa fa-user"></i>Profile
            </a>
          </li>
          <li>
            <a href="/editprofile">
              <i className="fa fa-edit"></i>Edit profile
            </a>
          </li>
        </ul>
      </div>

      <div className={`${styles.profileinfo} rounded`}>
        <div className="panel">
          <div className={`${styles.biographinfo}`}>
            <h1 className={`font-weight-bold`}>My Profile</h1>
            <div className="row">
              <div
                className={`${styles.biorow} d-flex justify-content-start align-item-top`}
              >
                <span>First Name </span>
                <span>: Camila</span>
              </div>
              <div
                className={`${styles.biorow} d-flex justify-content-start align-item-top`}
              >
                <span>Last Name </span>
                <span>: Smith</span>
              </div>
              <div
                className={`${styles.biorow} d-flex justify-content-start align-item-top`}
              >
                <span>Username </span>
                <span>: Australia</span>
              </div>
              <div
                className={`${styles.biorow} d-flex justify-content-start align-item-top`}
              >
                <span>DOB</span>
                <span>: 13 July 1983</span>
              </div>
              <div
                className={`${styles.biorow} d-flex justify-content-start align-item-top`}
              >
                <span>Speciality </span>
                <span>: Community Medicine</span>
              </div>
              <div
                className={`${styles.biorow} d-flex justify-content-start align-item-top`}
              >
                <span>Email </span>
                <span>: jsmith@flatlab.com</span>
              </div>
              <div
                className={`${styles.biorow} d-flex justify-content-start align-item-top`}
              >
                <span>Mobile No.</span>
                <span>: (12) 03 4567890</span>
              </div>
              <div
                className={`${styles.biorow} d-flex justify-content-start align-item-top`}
              >
                <span>Phone </span>
                <span>: 88 (02) 123456</span>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}
export default MyProfile;
