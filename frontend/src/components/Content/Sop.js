import styles from "../../styles/Sop.module.css";

function Sop() {
  return (
    <div className={`${styles.maindiv}`}>
      <div className={`${styles.blogcard}`}>
        <div className={`${styles.meta}`}>
          <div
            className={`${styles.photo}`}
          ></div>
          <ul className={`${styles.details}`}>
            <li className={`${styles.author}`}>
              <a href="#">John Doe</a>
            </li>
            <li className={`${styles.date}`}>Aug. 24, 2015</li>
            <li className={`${styles.tags}`}>
              <ul>
                <li>
                  <a href="#">Learn</a>
                </li>
                <li>
                  <a href="#">Code</a>
                </li>
                <li>
                  <a href="#">HTML</a>
                </li>
                <li>
                  <a href="#">CSS</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className={`${styles.description}`}>
          <h1>Learning to Code</h1>
          <h2>Opening a door to the future</h2>
          <p>
            {" "}
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum
            dolorum architecto obcaecati enim dicta praesentium, quam nobis!
            Neque ad aliquam facilis numquam. Veritatis, sit.
          </p>
          <p className={`${styles.readmore}`}>
            <a href="#">Read More</a>
          </p>
        </div>
      </div>
      <div className={`${styles.blogcard} alt`}>
        <div className={`${styles.meta}`}>
          <div
            className={`${styles.photo}`}
            >
            </div>
          <ul className={`${styles.details}`}>
            <li className={`${styles.author}`}>
              <a href="#">Jane Doe</a>
            </li>
            <li className={`${styles.date}`}>July. 15, 2015</li>
            <li className={`${styles.tags}`}>
              <ul>
                <li>
                  <a href="#">Learn</a>
                </li>
                <li>
                  <a href="#">Code</a>
                </li>
                <li>
                  <a href="#">JavaScript</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className={`${styles.description}`}>
          <h1>Mastering the Language</h1>
          <h2>Java is not the same as JavaScript</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum
            dolorum architecto obcaecati enim dicta praesentium, quam nobis!
            Neque ad aliquam facilis numquam. Veritatis, sit.
          </p>
          <p className={`${styles.readmore}`}>
            <a href="#">Read More</a>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Sop;