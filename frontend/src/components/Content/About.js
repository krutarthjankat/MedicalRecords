import styles from "../../styles/About.module.css";
function About() {
  return (
    <div className={`${styles.section} about-section`} id="about">
      <div className="container bg-black rounded card">
        <div className="row card-body align-items-center flex-row-reverse">
          <div className={`col-md-8 ${styles.abouttext}`}>
            <h3>About Me</h3>
            <h6 className="lead">
              A Full Stack Web Developer based in India
            </h6>
            <p className="wrap">
              I <mark>design and develop</mark> services for customers of all
              sizes, specializing in creating stylish, modern websites, web
              services and online stores. My passion is to design digital user
              experiences through the bold interface and meaningful
              interactions.
            </p>
            <div className={`row ${styles.aboutlist}`}>
              <div className="col-md-6">
                <div className="media">
                  <label>BirthDate</label>
                  <p>14th November 2003</p>
                </div>
                <div className="media">
                  <label>Age</label>
                  <p>20 Yr</p>
                </div>
                <div className="media">
                  <label>Residence</label>
                  <p>India</p>
                </div>
                <div className="media">
                  <label>Address</label>
                  <p>Gujarat</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="media">
                  <label>E-mail</label>
                  <p>krutarth.jankat62@gmail.com</p>
                </div>
                <div className="media">
                  <label>Phone</label>
                  <p>820-885-3321</p>
                </div>
                <div className="media">
                  <label>GitHub</label>
                  <a classname="w-full" href="https://github.com/krutarthjankat">
                    https://github.com/krutarthjankat
                  </a>
                </div>
                <div className="media">
                  <label>Job</label>
                  <p>Student</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 text-center">
            <div className={`${styles.aboutavatar}`}>
              <img
                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                title=""
                alt=""
              />
              <h3 className="mt-3 text-white">Krutarth Jankat</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default About;
