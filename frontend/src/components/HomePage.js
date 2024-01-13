import styles from "../styles/HomePage.module.css";
import { motion, useAnimationControls } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../store/PageContext.js";

function HomePage({prop}) {
  const [open, setOpen] = useState(true);
  const control = useAnimationControls();
  const control1 = useAnimationControls();
  const { userId } = useUserData();
  const nav= useNavigate();
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
      }, 150);
    }
  };

  const SidebarItems = [
    { name: "Dashboard", class: "fa-solid fa-chart-line" },
    { name: "Patients", class: "fa-solid fa-bed" },
    { name: "Settings", class: "fa-solid fa-gear" },
    { name: "MyProfile", class: "fa-regular fa-id-badge" },
    { name: "About", class: "fa-solid fa-circle-info" },
  ];

  return (
    <div className={`${styles.dbpage}`}>
      <motion.div animate={control} className={`${styles.sidebar}`}>
        <div className={`${styles.logo}`}>
          {open && (
            <>
              <div class="fa-brands fa-react"></div>
              &nbsp; React App
            </>
          )}
          <button className={`btn`} onClick={toggleOpen}>
            <div class="fa-solid fa-bars"></div>
          </button>
        </div>

        <div className={`${styles.options}`}>
          {SidebarItems.map((item) => (
            <div className={`${styles.buttondiv}`}>
              <button
                className={`${
                  open ? "justify-content-between" : "justify-content-center"
                }`}
                onClick={() => {
                  nav(`/${item.name}/${userId}`);
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

      <motion.div animate={control1} className={`${styles.main}`}>
        <div className={`${styles.nav}`}>
          <div class={`${styles.search} rounded bg-white`}>
            <input
              class=" w-full border-none bg-transparent px-4 py-1 text-gray-400 outline-none focus:outline-none "
              type="search"
              name="search"
              placeholder="Search..."
            />
            <button
              type="submit"
              className=" rounded bg-blue-600 px-4 py-2 text-white"
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </div>
        <div className={`${styles.content}`}>{prop}</div>
      </motion.div>
    </div>
  );
}
export default HomePage;
