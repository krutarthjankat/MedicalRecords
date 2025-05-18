import styles from "../../styles/Sop.module.css";

function Sop() {
  return (
    <div className={`${styles.maindiv}`}>
      <iframe
        title="SOP"
        src="https://sbmurban.org/storage/app/media/pdf/Swachh%20Hospitals.pdf"
        width="100%"
        height="100%"
      ></iframe>
    </div>
  );
}
export default Sop;