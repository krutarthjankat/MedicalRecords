import { useState, useEffect, useRef } from "react";
import axios from "axios";
import styles from "../styles/SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import { motion, useAnimationControls } from "framer-motion";
import { usePageContext } from "../store/PageContext.js";
import doctor from "../assets/doctor.png";
import nurse from "../assets/nurse.png";
import { useCookies } from "react-cookie";
import { baseurl } from "../App.js";

const SignUp = () => {
  const [display, setDisplay] = useState(true);
  const [alert, setAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [taken, setTaken] = useState({
  //   username: false,
  //   mobno: false,
  //   emailid: false,
  // });
  const { setDimSignUp, setDimLogin, dimLogin, dimSignUp } = usePageContext();
  const SignUpRef = useRef();
  const pgRef = useRef();
  const [cookies, setCookies] = useCookies("token");
  const controls = useAnimationControls();
  const controlh = useAnimationControls();
  const control1 = useAnimationControls();
  const navigate = useNavigate();
  const [createForm, setCreateForm] = useState({
    firstname: "",
    lastname: "",
    username: "",
    mobno: "",
    emailid: "",
    password: "",
    category: "",
    passkey: "",
  });

  // useEffect(() => {
  //   fetchProfiles();
  // }, []);

  useEffect(() => {
    if (SignUpRef.current) {
      console.log(SignUpRef.current.clientWidth);
      setDimSignUp({
        height: SignUpRef.current.clientHeight,
        width: SignUpRef.current.clientWidth,
      });
    }
    control1.start({
      scale: [15, 0],
      transition: {
        times: [0, 1],
        ease: "easeInOut",
        duration: 0.4,
      },
    });
  }, [SignUpRef, setDimSignUp, control1]);

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
      scaleX: [1, !cookies ? 3 : dimLogin.width / dimSignUp.width],
      scaleY: [1, !cookies ? 2 : dimLogin.height / dimSignUp.height],
      opacity: [1, 1],
      transition: {
        delay: 0.2,
        times: [0, 1],
        ease: "easeInOut",
        duration: !cookies ? 0.2 : 0.6,
      },
    },
  };
  // const fetchProfiles = async () => {
  //   const res = await axios.get("https://medicalrecords.onrender.com/profiles");
  //   setProfiles(res.data.profiles);
  // };

  //Updating and checking input fields
  const updateCreateFormField = (e) => {
    const { name, value } = e.target;
    // const check = {
    //   ...createForm,
    //   [name]: value,
    // };
    // if (profiles) {
    //   profiles.forEach((element) => {
    //     if (element.username === check.username) {
    //       setTaken({ username: true });
    //     } else {
    //       setTaken({ ...taken, username: false });
    //     }
    //     if (element.mobno === check.mobno) {
    //       setTaken({ ...taken, [name]: true });
    //     } else {
    //       setTaken({ ...taken, [name]: false });
    //     }
    //     if (element.emailid === check.emailid) {
    //       setTaken({ ...taken, [name]: true });
    //     } else {
    //       setTaken({ ...taken, [name]: false });
    //     }
    //   });
    // }
    setCreateForm({
      ...createForm,
      [name]: value,
    });
  };

  //Creating a profile
  const createProfile = async (e) => {
    e.preventDefault();
    const doctor = document.getElementById("doctor");
    if (doctor.checked) {
      setCreateForm({
        ...createForm,
        category: "nurse",
      });
    } else {
      setCreateForm({
        ...createForm,
        category: "doctor",
      });
    }
    control1.start({
      scale: [0, 15],
      transition: {
        times: [0, 1],
        ease: "easeInOut",
        duration: 0.4,
      },
    });
    setTimeout(() => {
      setIsLoading(true);
    }, 300);

    try {
      const { data } = await axios.post(baseurl + "/signup", createForm, {
        // withCredentials: true,
      });
      console.log(data);
      const { success, message, token } = data;
      setTimeout(() => {
        setIsLoading(false);
        if (success) {
          console.log(message);
          setCookies("token", token, { path: "/MedicalRecords" });
          setAlert(true);
          setTimeout(() => {
            navigate(`/dashboard`);
          }, 500);
        } else {
          control1.start({
            scale: [15, 0],
            transition: {
              times: [0, 1],
              ease: "easeInOut",
              duration: 0.4,
            },
          });
          console.log(message);
        }
      }, 2000);
    } catch (error) {
      console.log(error);
    }

    // setCreateForm({
    //   firstname: "",
    //   lastname: "",
    //   username: "",
    //   mobno: "",
    //   emailid: "",
    //   password: "",
    // });
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
            animate={control1}
            className={styles.animate}
          ></motion.div>
          {isLoading && (
            <div className="row container d-flex justify-content-center">
              <div className="col-md-4 col-sm-6 grid-margin stretch-card">
                <div className={`${styles.loaderdemobox}`}>
                  <div className={`${styles.jumpingdotsloader}`}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <h1>Sign Up</h1>
          <form onSubmit={createProfile}>
            {alert && (
              <div
                className={`alert alert-success ${styles.alert}`}
                role="alert"
              >
                Signed up successfully
              </div>
            )}
            <div className={`${styles.row}`}>
              <div className={`${styles.inputdiv}`}>
                <label className={`${styles.lbl}`} htmlFor="firstname">
                  Firstname{" "}
                </label>
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
                <label className={`${styles.lbl}`} htmlFor="lastname">
                  Lastname
                </label>
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
                <label className={`${styles.lbl}`} htmlFor="username">
                  Username
                  {/* {taken.username && <span>&nbsp; (Already Taken)</span>} */}
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
                <label className={`${styles.lbl}`} htmlFor="mobno">
                  Mobile No{" "}
                </label>
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
                <label className={`${styles.lbl}`} htmlFor="emailid">
                  Email-Id
                </label>
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
                <label className={`${styles.lbl}`} htmlFor="password">
                  Password
                </label>
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
                <label className={`${styles.lbl}`} htmlFor="doctor">
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
                <label className={`${styles.lbl}`} htmlFor="nurse">
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
              <label className={`${styles.lbl}`} htmlFor="passkey">
                Passkey
              </label>
              <input
                name="passkey"
                id="passkey"
                type="text"
                required
                onChange={updateCreateFormField}
                value={createForm.passkey}
                className={`${styles.inputs}`}
                autoComplete="off"
              />
            </motion.div>

            <div className={`${styles.signup}`}>
              <div>
                <label
                  className={`${styles.lbl}`}
                  htmlFor="terms"
                  style={{ fontWeight: "normal" }}
                >
                  <input id="terms" type="checkbox" className="" required />
                  &nbsp; I accept the&nbsp;
                  <a href="/terms">terms & conditions</a>
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  id="signup"
                  className={`${styles.signupbtn} ${styles.btnthree} btn mt-1 col-12`}
                >
                  Create an account
                </button>
              </div>
            </div>
            <div className={styles.links}>
              <Link
                onClick={() => {
                  control1.start({
                    scale: [0, 15],
                    transition: {
                      times: [0, 1],
                      ease: "easeInOut",
                      duration: 0.4,
                    },
                  });
                }}
                to="/login"
              >
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
