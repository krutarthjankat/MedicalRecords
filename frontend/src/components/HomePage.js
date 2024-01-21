import styles from "../styles/HomePage.module.css";
import { motion, useAnimationControls} from "framer-motion";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { useCookies } from "react-cookie";
import axios from "axios";

function HomePage({ prop }) {
  const [open, setOpen] = useState(true);
  const control = useAnimationControls();
  const control1 = useAnimationControls();
  const [cookies, setCookie, removeCookie] = useCookies('token');
  const nav = useNavigate();

  useEffect(() => {
    setCookie("token", cookies.token, { path: "/" });
    console.log(cookies);
    const verifyCookie = async () => {
      if (!cookies.token) {
        return nav("/login");
      }
      console.log(data);
      const { data } = await axios.post(
        "https://medicalrecords.onrender.com/",
        {},
        { withCredentials: true }
      );
      const { status } = data;
      return status
        ? {}
        : (removeCookie("token"), nav("/login"));
    };
    verifyCookie();
  }, [cookies, nav, removeCookie, setCookie]);

  const toggleOpen = () => {
    console.log(open);
    control.start({
      width: !open ? "20vw" : "5vw",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    });
    control1.start({
      width: !open ? "74vw" : "89vw",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    });
    if (!open) {
      setOpen(!open);
    } else {
      setTimeout(() => {
        setOpen(!open);
      }, 120);
    }
  };

  const SidebarItems = [
    { name: "Dashboard", class: "fa-solid fa-chart-line" },
    { name: "Patients", class: "fa-solid fa-bed" },
    { name: "Settings", class: "fa-solid fa-gear" },
    // { name: "MyProfile", class: "fa-regular fa-id-badge" },
    { name: "About", class: "fa-solid fa-circle-info" },
  ];

  return (
    <div className={`${styles.dbpage}`}>
      <motion.div animate={control} className={`${styles.sidebar} origin-left`}>
        <div
          className={`${styles.logo} ${
            open ? "justify-content-between" : "justify-content-center"
          }`}
        >
          {open && (
            <>
              <div className="fa-brands fa-react"></div>
              React App
            </>
          )}
          <button className="bg-transparent border-0" onClick={toggleOpen}>
            <div className="fa-solid fa-bars"></div>
          </button>
        </div>
        <div className={`${styles.divide}`}></div>
        <div className={`${styles.options}`}>
          {SidebarItems.map((item,index) => (
            <div key={index} className={`${styles.buttondiv}`}>
              <button
                className={`${
                  open ? "justify-content-between" : "justify-content-center"
                }`}
                onClick={() => {
                  nav(`/${item.name}`);
                }}
              >
                {open && <span>{item.name}</span>}
                <span className={`${item.class}`}></span>
              </button>
            </div>
          ))}
        </div>

        <div className={`${styles.footer}`}></div>
      </motion.div>
      <motion.div animate={control1} className={`${styles.main} origin-right`}>
        <div className={`${styles.nav}`}>
          <div className={`${styles.search} rounded bg-white`}>
            <input
              className=" w-full bg-transparent px-4 py-1 text-gray-400"
              type="search"
              name="search"
              placeholder="Search..."
            />
            <button type="submit" className=" rounded px-4 py-2 text-white">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
          <Dropdown data-bs-theme="dark">
            <Dropdown.Toggle
              className={`${styles.toggle}`}
              id="dropdown-button"
              variant="secondary"
            >
              <span className={`fa-regular fa-id-badge`}></span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1" active>
                JohnDoe@gmail.com
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                onClick={() => {
                  nav(`../myprofile`);
                }}
              >
                <i className="fa fa-user"></i> My Profile
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  nav(`../editprofile`);
                }}
              >
                <i className="fa fa-edit"></i> Edit Profile
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                onClick={() => {
                  removeCookie("token", { path: "/" });
                  nav(`../login`);
                }}
              >
                <i className="fa fa-sign-out"></i> Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className={`${styles.content}`}>{prop}</div>
      </motion.div>
    </div>
  );
}
export default HomePage;
