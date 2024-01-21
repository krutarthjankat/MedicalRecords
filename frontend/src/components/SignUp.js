import { useState, useEffect, useRef } from "react";
import axios from "axios";
import styles from "../styles/SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import { motion, useAnimationControls } from "framer-motion";
import { usePageContext } from "../store/PageContext.js";
import doctor from "../assets/doctor.png";
import nurse from "../assets/nurse.png";

const SignUp = () => {
  const [profiles, setProfiles] = useState();
  const [display, setDisplay] = useState(true);
  const [alert, setAlert] = useState(false);
  const [taken, setTaken] = useState({
    username: false,
    mobno: false,
    emailid: false,
  });
  const { setDimSignUp, setDimLogin, dimLogin, dimSignUp } = usePageContext();
  const SignUpRef = useRef();
  const pgRef = useRef();
  const controls = useAnimationControls();
  const controlh = useAnimationControls();
  const navigate = useNavigate();
  const [createForm, setCreateForm] = useState({
    firstname: "",
    lastname: "",
    username: "",
    mobno: "",
    emailid: "",
    password: "",
  });

  useEffect(() => {
    fetchProfiles();
  }, []);

  useEffect(() => {
    if (SignUpRef.current) {
      console.log(SignUpRef.current.clientWidth);
      setDimSignUp({
        height: SignUpRef.current.clientHeight,
        width: SignUpRef.current.clientWidth,
      });
    }
  }, [SignUpRef, setDimSignUp]);

  useEffect(() => {
    if (pgRef.current.clientWidth < 500) {
      setDimLogin({ height: 445, width: 250 });
    } else {
      setDimLogin({ height: 560, width: 320 });
    }
  }, [setDimLogin]);

  //Passkey Input field Animation
  const dropdownHandler = () => {
    if (
      document.querySelectorAll("input[type=radio]:checked").length > 0 &&
      display
    ) {
      controls.start({
        height: "auto",
        y: "0vh",
        opacity: 1,
        scaleY: 1,
      });
      controlh.start({
        height:
          dimSignUp.height < 400 ? 328 : dimSignUp.height < 500 ? 545 : 670,
        transition: {
          duration: 0.2,
        },
      });
      setDisplay(false);
      setDimSignUp({
        width: dimSignUp.width,
        height:
          dimSignUp.height < 400 ? 328 : dimSignUp.height < 500 ? 545 : 670,
      });
    }
  };

  const routeVariants = {
    initial: {
      y: "0vh",
      opacity: 0,
    },
    show: {
      opacity: [0.8, 1],
      y: "0vh",
      transition: {
        times: [0, 1],
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    exit: {
      scaleX: [1, dimLogin.width / dimSignUp.width],
      scaleY: [1, dimLogin.height / dimSignUp.height],
      opacity: [1, 1],
      transition: {
        delay: 0.2,
        times: [0, 1],
        ease: "easeInOut",
        duration: 0.6,
      },
    },
  };

  const abc = {
    show: {
      scale: [15, 0],
      transition: {
        times: [0, 1],
        ease: "easeInOut",
        duration: 0.4,
      },
    },
    hide: {
      scale: 0,
    },
    exit: {
      scale: [0, 15],

      transition: {
        times: [0, 1],
        ease: "easeInOut",
        duration: 0.5,
      },
    },
  };

  const fetchProfiles = async () => {
    const res = await axios.get("https://medicalrecords.onrender.com/profiles");
    setProfiles(res.data.profiles);
  };

  //Updating and checking input fields
  const updateCreateFormField = (e) => {
    const { name, value } = e.target;
    const check = {
      ...createForm,
      [name]: value,
    };
    if (profiles) {
      profiles.forEach((element) => {
        if (element.username === check.username) {
          setTaken({ username: true });
        } else {
          setTaken({ ...taken, username: false });
        }
        // if (element.mobno === check.mobno) {
        //   setTaken({ ...taken, [name]: true });
        // } else {
        //   setTaken({ ...taken, [name]: false });
        // }
        // if (element.emailid === check.emailid) {
        //   setTaken({ ...taken, [name]: true });
        // } else {
        //   setTaken({ ...taken, [name]: false });
        // }
      });
    }
    setCreateForm({
      ...createForm,
      [name]: value,
    });
  };

  //Creating a profile
  const createProfile = async (e) => {
    e.preventDefault();
    const key = document.getElementById("key");
    if (key.value === "abcd") {
      try {
        const { data } = await axios.post(
          "https://medicalrecords.onrender.com/signup",
          createForm,
          {
            withCredentials: true,
            credentials: "include",
          }
        );
        console.log(data);
        const { success, message } = data;
        if (success) {
          console.log(message);
          setAlert(true);
          setTimeout(() => {
            navigate(`/dashboard`);
          }, 1000);
          setProfiles([...profiles, data.profile]);
        } else {
          console.log(message);
        }
      } catch (error) {
        console.log(error);
      }
    }
    // if (key.value === "abcd") {
    //   const res = await axios.post(
    //     "https://medicalrecords.onrender.com/profiles",
    //     createForm
    //   );
    //   setAlert(true);
    //   setTimeout(() => navigate("/dashboard"), 1000);
    //   setProfiles([...profiles, res.data.profile]);
    // }
    setCreateForm({
      firstname: "",
      lastname: "",
      username: "",
      mobno: "",
      emailid: "",
      password: "",
    });
  };

  return (
    <>
      <div ref={pgRef} className={styles.signuppg}>
        <motion.div
          variants={routeVariants}
          initial="show"
          animate={controlh}
          exit="exit"
          ref={SignUpRef}
          className={`${styles.form}`}
        >
          <motion.div
            variants={abc}
            animate="show"
            exit="exit"
            className={styles.animate}
          ></motion.div>
          <h1>Sign Up</h1>
          <form onSubmit={createProfile}>
            {alert && (
              <div className={`alert alert-success ${styles.alert}`} role="alert">
                Signed up successfully
              </div>
            )}
            <div className={`${styles.row}`}>
              <div className={`${styles.inputdiv}`}>
                <label htmlFor="firstname">Firstname </label>
                <input
                  className={styles.inputs}
                  type="text"
                  placeholder="John"
                  onChange={updateCreateFormField}
                  value={createForm.firstname}
                  name="firstname"
                  id="firstname"
                  required
                  autoComplete="off"
                />
              </div>
              <div className={`${styles.inputdiv}`}>
                <label htmlFor="lastname">Lastname</label>
                <input
                  className={styles.inputs}
                  type="text"
                  placeholder="Titor"
                  onChange={updateCreateFormField}
                  value={createForm.lastname}
                  name="lastname"
                  id="lastname"
                  required
                  autoComplete="off"
                />
              </div>
            </div>

            <div className={`${styles.row}`}>
              <div className={`${styles.inputdiv}`}>
                <label htmlFor="username">
                  Username
                  {taken.username && <span>&nbsp; (Already Taken)</span>}
                </label>
                <input
                  className={styles.inputs}
                  type="text"
                  placeholder="Thunderbolt56"
                  onChange={updateCreateFormField}
                  value={createForm.username}
                  name="username"
                  id="username"
                  required
                  autoComplete="off"
                />
              </div>
              <div className={`${styles.inputdiv}`}>
                <label htmlFor="mobno">Mobile No </label>
                <input
                  className={styles.inputs}
                  type="text"
                  placeholder="89xxxxxx00"
                  onChange={updateCreateFormField}
                  value={createForm.mobno}
                  name="mobno"
                  id="mobno"
                  required
                  autoComplete="off"
                />
              </div>
            </div>
            <div className={`${styles.row}`}>
              <div className={`${styles.inputdiv}`}>
                <label htmlFor="emailid">Email-Id</label>
                <input
                  className={`${styles.inputs}`}
                  type="email"
                  placeholder="johntitor123@gmail.com"
                  onChange={updateCreateFormField}
                  value={createForm.emailid}
                  name="emailid"
                  id="emailid"
                  required
                  autoComplete="off"
                />
              </div>
            </div>

            <div className={`${styles.row}`}>
              <div className={`${styles.inputdiv}`}>
                <label htmlFor="password">Password</label>
                <input
                  className={`${styles.inputs}`}
                  onChange={updateCreateFormField}
                  value={createForm.password}
                  name="password"
                  type="password"
                  id="password"
                  required
                  placeholder="abcd1234"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className={`${styles.choicediv}`}>
              <div className={`${styles.contcheckbox}`}>
                <input
                  name="choice"
                  type="radio"
                  id="doctor"
                  required
                  onClick={dropdownHandler}
                  className={`${styles.choice}`}
                />
                <label htmlFor="doctor">
                  <img src={doctor} alt="doc.jpg" />
                  <span className={`${styles.covercheckbox}`}>
                    <svg viewBox="0 0 12 10">
                      <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                    </svg>
                  </span>
                  <div className={`${styles.info}`}>Doctor</div>
                </label>
              </div>
              <div className={`${styles.contcheckbox}`}>
                <input
                  name="choice"
                  type="radio"
                  id="nurse"
                  onClick={dropdownHandler}
                  className={`${styles.choice}`}
                />
                <label htmlFor="nurse">
                  <img src={nurse} alt="nurse.jpg" />
                  <span className={`${styles.covercheckbox}`}>
                    <svg viewBox="0 0 12 10">
                      <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                    </svg>
                  </span>
                  <div className={`${styles.info}`}>Nurse</div>
                </label>
              </div>
            </div>
            <motion.div
              id="drop"
              initial={{ height: 0, opacity: 0, y: "-2vh", scaleY: 0.5 }}
              animate={controls}
              transition={{ duration: 0.2 }}
              className={`${styles.inputdiv}`}
            >
              <label htmlFor="key">Passkey</label>
              <input
                id="key"
                type="text"
                required
                className={`${styles.inputs}`}
                autoComplete="off"
              />
            </motion.div>

            <div className={`${styles.signup}`}>
              <div>
                <label htmlFor="terms" style={{ fontWeight: "normal" }}>
                  <input id="terms" type="checkbox" className="" required />
                  &nbsp; I accept the&nbsp;
                  <a href="/terms">terms & conditions</a>
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  id="login"
                  className={`${styles.signupbtn} ${styles.btnthree} btn mt-1 col-12`}
                >
                  Create an account
                </button>
              </div>
            </div>
            <div className={styles.links}>
              <Link to="/login">
                <span>Already have an account? Login</span>
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
};
export default SignUp;
