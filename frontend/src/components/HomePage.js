import styles from "../styles/HomePage.module.css";
import { motion, useAnimationControls } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { useCookies } from "react-cookie";
import axios from "axios";
import { baseurl } from "../App";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

function HomePage({ prop }) {
  const [open, setOpen] = useState(true);
  const control = useAnimationControls();
  const control1 = useAnimationControls();
  const [cookies, , removeCookie] = useCookies("token");
  const nav = useNavigate();
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        return nav("/login");
      }
      const { data } = await axios.post(
        baseurl + "/",
        { token: cookies.token }
        // { withCredentials: true }
      );
      // console.log(data);
      const { status } = data;
      return status
        ? {}
        : (removeCookie("token"), console.log("cookie removed"), nav("/login"));
    };
    verifyCookie();
  }, [cookies, nav, removeCookie]);

  const toggleOpen = () => {
    console.log(open);
    control.start({
      width: !open ? "21vw" : "5vw",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    });
    control1.start({
      width: !open ? "76vw" : "92vw",
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
    { name: "Staff Duty Chart", class: "fas fa-tasks" },
    { name: "SOPs", class: "fa-solid fa-bed-pulse" },
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
          {SidebarItems.map((item, index) => (
            <div key={index} className={`${styles.buttondiv}`}>
              <button
                className={`${
                  open ? "justify-content-between" : "justify-content-center"
                }`}
                onClick={() => {
                  nav(`/${item.name}`);
                }}
              >
                {open && <p className={`${styles.txt}`}>{item.name}</p>}
                <p
                  className={`${item.class} ${styles.pic} ${
                    open
                      ? "justify-content-end"
                      : "justify-content-center w-full"
                  }`}
                ></p>
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
              <span className={`fa fa-user`}></span>
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
                <i className="fa-regular fa-id-badge"></i> My Profile
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
                  removeCookie("token", { path: "/MedicalRecords" });
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
