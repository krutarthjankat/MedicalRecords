import { useState, useEffect, useRef } from "react";
import axios from "axios";
import styles from "../styles/Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { motion, useAnimationControls } from "framer-motion";
import { usePageContext } from "../store/PageContext.js";
import { useCookies } from "react-cookie";

function Login() {
  // State
  // const [profiles, setProfiles] = useState();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [type, setType] = useState("password");
  const [cookies,setCookies] = useCookies("token");
  const { setDimLogin, setDimSignUp, dimSignUp, dimLogin } = usePageContext();
  const LoginRef = useRef();
  const pgRef = useRef();
  const navigate = useNavigate();
  const control = useAnimationControls();

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
      console.log(LoginRef.current.clientWidth);
      setDimLogin({
        height: LoginRef.current.clientHeight,
        width: LoginRef.current.clientWidth,
      });
    }
  }, [LoginRef, setDimLogin]);

  //Various Animations
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
      scaleX: [1, dimSignUp.width / dimLogin.width],
      scaleY: [1, dimSignUp.height / dimLogin.height],
      opacity: [1, 0.8],
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
    try {
      const { data } = await axios.post(
        "https://medicalrecords.onrender.com/login",
        form,
        {
          credentials: 'include',
          withCredentials: true,
        }
      );
      console.log(data);
      const { success, message ,token} = data;
      if (success) {
        console.log(message);
        setCookies("token", token, { path: "/" });
        navigate(`/Dashboard`);
      } else {
        console.log(data.status);
        control.start({
          opacity: [0, 1, 1, 0],
          y: ["-20px", "0px", "0px", "-20px"],
          transition: {
            times: [0, 0.1, 0.99, 1],
            duration: 4,
          },
        });
        const usr = document.getElementById("username");
        const pas = document.getElementById("password");
        usr.classList.remove(`${styles.hascontent}`);
        pas.classList.remove(`${styles.hascontent}`);
      }
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
            variants={abc}
            animate="show"
            exit="exit"
            className={styles.animate}
          ></motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={control}
            className={`alert alert-danger ${styles.invalid}`}
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
                <i className="fa-solid fa-arrow-right-to-bracket"></i>
              </button>
            </div>
          </div>
          <div className={styles.links}>
            <Link to="/signup">
              <span>Sign Up</span>
            </Link>
            <Link>
              <span>Forgot Password?</span>
            </Link>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
export default Login;
