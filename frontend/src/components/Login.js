import { useState, useEffect, useRef } from "react";
import axios from "axios";
import styles from "../styles/Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { motion, useAnimationControls } from "framer-motion";
import { usePageContext } from "../store/PageContext.js";

function Login() {
  // State
  const [profiles, setProfiles] = useState();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  // const [updateForm, setUpdateForm] = useState({
  //   _id: null,
  //   username: "",
  //   password: "",
  // });
  const { setDimLogin, setDimSignUp, dimSignUp, dimLogin } = usePageContext();
  const LoginRef = useRef();
  const pgRef = useRef();
  const navigate = useNavigate();
  const control = useAnimationControls();
  useEffect(() => {
    fetchProfiles();
    if (pgRef.current.clientWidth < 370) {
      setDimSignUp({ height: 368, width: 248 });
    } else if (pgRef.current.clientWidth < 500) {
      setDimSignUp({ height: 468, width: 348 });
    } else {
      setDimSignUp({ height: 598, width: 428 });
    }
  }, []);

  useEffect(() => {
    if (LoginRef.current) {
      console.log(LoginRef.current.clientHeight);
      console.log(LoginRef.current.clientWidth);
      setDimLogin({
        height: LoginRef.current.clientHeight,
        width: LoginRef.current.clientWidth,
      });
    }
  }, [LoginRef, setDimLogin]);

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

  const fetchProfiles = async () => {
    // Fetch the profiles
    const res = await axios.get("http://localhost:3000/profiles");
    // Set to state
    setProfiles(res.data.profiles);
  };

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

  const checkLogin = async (e) => {
    e.preventDefault();

    setProfiles([...profiles, form]);
    console.log(profiles);
    if (profiles) {
      profiles.forEach((element) => {
        if (
          element.username === form.username &&
          element.password === form.password
        ) {
          navigate("/dashboard");
        }
      });
    }
    control.start({
      opacity: [0, 1, 1, 0],
      y: ["-20px", "0px", "0px", "-20px"],
      transition: {
        times: [0, 0.1, 0.99, 1],
        duration: 4,
      },
    });
    setForm({
      username: "",
      password: "",
    });
  };

  // const deleteProfile = async (_id) => {
  //   // Delete the profile
  //   const res = await axios.delete(`http://localhost:3000/profiles/${_id}`);

  //   // Update state
  //   const newProfiles = [...profiles].filter((profile) => {
  //     return profile._id !== _id;
  //   });

  //   setProfiles(newProfiles);
  // };

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
              />
              <label>Username</label>
              <span className={styles.focusborder}></span>
            </div>

            <div className={`${styles.col3} input-effect`}>
              <input
                className={`${styles.effect16}`}
                onChange={updateFormField}
                value={form.password}
                name="password"
                type="password"
                required
                placeholder=""
              />
              <label>Password</label>
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
