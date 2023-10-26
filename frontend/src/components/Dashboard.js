import styles from "../styles/Dashboard.module.css";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const n=useNavigate();
  const toLogin=()=>{
    n('/login');
  }
  return (
    <div className={`${styles.dbpage}`}>
      <div className={`${styles.sidebar}`}>
        <div className={`${styles.img}`}></div>
        <div className={`${styles.options}`}>
          <div className={`${styles.buttondiv}`}>
            <button>Home</button>
          </div>
          <div className={`${styles.buttondiv}`}>
            <button>Patients</button>
          </div>
          <div className={`${styles.buttondiv}`}>
            <button>Settings</button>
          </div>
          <div onClick={toLogin} className={`${styles.buttondiv}`}>
            <button>Akkad Bakkad</button>
          </div>
          <div className={`${styles.buttondiv}`}>
            <button>Bumbay Bo</button>
          </div>
        </div>
        <div className={`${styles.footer}`}></div>
      </div>
      <div className={`${styles.main}`}>
        <div className={`${styles.nav}`}></div>
        <div className={`${styles.content}`}></div>
      </div>
    </div>
  );
}
export default Dashboard;
