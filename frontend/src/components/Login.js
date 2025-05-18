import { useState, useEffect, useRef } from "react";
import axios from "axios";
import styles from "../styles/Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { motion, useAnimationControls } from "framer-motion";
import { usePageContext } from "../store/PageContext.js";
import { useCookies } from "react-cookie";
import { baseurl } from "../App.js";

function Login() {
  // State
  // const [profiles, setProfiles] = useState();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [type, setType] = useState("password");
  const [cookies, setCookies] = useCookies("token");
  const { setDimLogin, setDimSignUp, dimSignUp, dimLogin } = usePageContext();
  const LoginRef = useRef();
  const pgRef = useRef();
  const navigate = useNavigate();
  const control = useAnimationControls();
  const control1 = useAnimationControls();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    // fetchProfiles();
    if (pgRef.current.clientWidth < 370) {
      setDimSignUp({ height: 280, width: 200 });
    } else if (pgRef.current.clientWidth < 500) {
      setDimSignUp({ height: 468, width: 348 });
    } else {
      setDimSignUp({ height: 598, width: 428 });
    }
  }, [setDimSignUp]);

  // useEffect(() => {
  //   if (cookies) {
  //     navigate(`/dashboard`);
  //   }
  // }, [navigate,cookies]);

  //Getting page widths for smooth transitions
  useEffect(() => {
    if (LoginRef.current) {
      setDimLogin({
        height: LoginRef.current.clientHeight,
        width: LoginRef.current.clientWidth,
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
  }, [LoginRef, setDimLogin,control1]);

  //Various Animations
  var routeVariants = {
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
      scaleX: [1, (cookies.token) ? 4 : dimSignUp.width / dimLogin.width],
      scaleY: [1, (cookies.token) ? 2 : dimSignUp.height / dimLogin.height],
      opacity: [1, 0.8],
      transition: {
        delay: 0.2,
        times: [0, 1],
        ease: "easeInOut",
        duration: cookies.token ? 0.2 : 0.6,
      },
    },
  };

  // const fetchProfiles = async () => {
  //   // Fetch the profiles
  //   const res = await axios.get("https://medicalrecords.onrender.com/profiles");
  //   // Set to state
  //   setProfiles(res.data.profiles);
  // };

  const handleToggle = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  //Updation of input fields
  const updateFormField = (e) => {
    const { name, value } = e.target;
    const check = { ...form, [name]: value };
    if (check[e.target.name] !== "") {
      e.target.classList.add(`${styles.hascontent}`);
    } else {
      e.target.classList.remove(`${styles.hascontent}`);
    }
    setForm({
      ...form,
      [name]: value,
    });
  };

  //Checking validity of inputs
  const checkLogin = async (e) => {
    e.preventDefault();
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
    }, 200);

    try {
      const { data } = await axios.post(baseurl + "/login", form, 
      // {
      //   credentials: "include",
      //   withCredentials: true,
      // }
      );
      console.log(data);
      const { success, message, token } = data;

      setTimeout(() => {
        setIsLoading(false);
        if (success) {
          console.log(message);
          setCookies("token", token, { path: "/MedicalRecords" });

          setTimeout(() => {}, 1000);
          navigate(`/Dashboard`);
        } else {
          console.log(data.status);
          control1.start({
            scale: [15, 0],
            transition: {
              times: [0, 1],
              ease: "easeInOut",
              duration: 0.4,
            },
          });

          control.start({
            opacity: [0, 1, 1, 0],
            y: ["-20px", "0px", "0px", "-20px"],
            transition: {
              times: [0, 0.1, 0.99, 1],
              duration: 3,
              delay: 0.5,
            },
          });
          const usr = document.getElementById("username");
          const pas = document.getElementById("password");
          usr.classList.remove(`${styles.hascontent}`);
          pas.classList.remove(`${styles.hascontent}`);
        }
      }, 2000);
    } catch (error) {
      console.log(error);
    }
    setForm({
      username: "",
      password: "",
    });
  };

  return (
    <div ref={pgRef} className={styles.Loginpg}>
      <div>
        <motion.form
          variants={routeVariants}
          initial="initial"
          animate="show"
          exit="exit"
          ref={LoginRef}
          onSubmit={checkLogin}
          className={styles.form}
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
          <motion.div
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={control}
            className={`${styles.invalid}`}
            role="alert"
          >
            Invalid Username/Password
          </motion.div>

          <div className={styles.container1}>
            <div className={`${styles.col3} input-effect`}>
              <input
                className={`${styles.effect16}`}
                type="text"
                placeholder=""
                onChange={updateFormField}
                value={form.username}
                name="username"
                id="username"
                required
                autoComplete="off"
              />
              <label>Username</label>
              <span className={styles.focusborder}></span>
            </div>

            <div className={`${styles.col3} input-effect `}>
              <input
                className={`${styles.effect16}`}
                type={type}
                placeholder=""
                onChange={updateFormField}
                value={form.password}
                name="password"
                id="password"
                required
                autoComplete="off"
              />
              <label>Password</label>
              {type === "text" && (
                <span
                  className={`fa-solid fa-eye ${styles.eyeicon}`}
                  style={{ color: "#2264a6" }}
                  onClick={handleToggle}
                ></span>
              )}
              {type === "password" && (
                <span
                  className={`fa-solid fa-eye-slash ${styles.eyeicon}`}
                  style={{ color: "#2264a6" }}
                  onClick={handleToggle}
                ></span>
              )}
              <span className={styles.focusborder}></span>
            </div>
          </div>
          <div className={styles.signin}>
            <div>
              <label>Sign in</label>
            </div>
            <div>
              <button type="submit" id="login" className={styles.signinbtn}>
                <i className="fa-solid fa-arrow-right-to-bracket text-white hover:text-[#00cec8]"></i>
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
              to="/signup"
            >
              <span>Don't have an Account? Sign Up</span>
            </Link>
            {/* <Link>
              <span>Forgot Password?</span>
            </Link> */}
          </div>
        </motion.form>
      </div>
    </div>
  );
}
export default Login;
