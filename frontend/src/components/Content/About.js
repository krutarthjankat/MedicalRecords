import styles from "../../styles/About.module.css";
function About() {
  return (
    <div className={`${styles.section} about-section`} id="about">
      <div className="container">
        <div className="row align-items-center flex-row-reverse">
          <div className="col-md-6">
            <div className={`${styles.abouttext} go-to`}>
              <h3>About Me</h3>
              <h6 className="lead">
                A Lead UX &amp; UI designer based in Canada
              </h6>
              <p>
                I <mark>design and develop</mark> services for customers of all
                sizes, specializing in creating stylish, modern websites, web
                services and online stores. My passion is to design digital user
                experiences through the bold interface and meaningful
                interactions.
              </p>
              <div className={`row ${styles.aboutlist}`}>
                <div className="col-md-6">
                  <div className="media">
                    <label>Birthday</label>
                    <p>4th april 1998</p>
                  </div>
                  <div className="media">
                    <label>Age</label>
                    <p>22 Yr</p>
                  </div>
                  <div className="media">
                    <label>Residence</label>
                    <p>Canada</p>
                  </div>
                  <div className="media">
                    <label>Address</label>
                    <p>California, USA</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="media">
                    <label>E-mail</label>
                    <p>info@domain.com</p>
                  </div>
                  <div className="media">
                    <label>Phone</label>
                    <p>820-885-3321</p>
                  </div>
                  <div className="media">
                    <label>Skype</label>
                    <p>skype.0404</p>
                  </div>
                  <div className="media">
                    <label>Freelance</label>
                    <p>Available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <div className={`${styles.aboutavatar}`}>
              <img
                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                title=""
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
    
}
export default About;
