import styles from "../../styles/PatientList.module.css";
function PatientList() {
  const toggleExpand = (e) => {
    const maindiv =
      e.target.parentElement.parentElement.parentElement.parentElement
        .parentElement;
    if (!maindiv.classList.contains(styles.isactive)) {
      maindiv.classList.add(`${styles.isactive}`);

      console.log(e.target.lastChild.textContent);
      e.target.lastChild.textContent = " Show Less";
    } else {
      maindiv.classList.remove(`${styles.isactive}`);

      e.target.lastChild.textContent = " Show More";
    }
  };

  const List = [
    {
      name: "John Doe",
      updatedby: "Nurse Jane",
      updatetime: "3:00am, 8th Jan 2024",
    },
    {
      name: "Lauren Watson",
      updatedby: "Nurse Mary",
      updatetime: "5:00am, 9th Jan 2024",
    },
    {
      name: "Mark Johnson",
      updatedby: "Nurse Jay",
      updatetime: "2:00am, 7th Jan 2024",
    },
    {
      name: "Catherine May",
      updatedby: "Nurse Jane",
      updatetime: "3:30am, 8th Jan 2024",
    },
  ];

  return (
    <div>
      {List.map((item, index) => (
        <div
          key={index}
          className={`card border-5 mb-3  pb-0 px-3 w-full ${styles.maindiv}`}
        >
          <div className="card-body">
            <div className="row">
              <div className="col-12 ">
                <h4 className="card-title ">
                  <b>{item.name}</b>
                </h4>
              </div>
              <div className="col">
                <h6 className="card-subtitle mb-2 text-muted">
                  <p className="card-text text-muted small ">
                    <span className="vl mr-2 ml-0"></span>
                    Last updated by{" "}
                    <span className="font-weight-bold">
                      {" "}
                      {item.updatedby}
                    </span>{" "}
                    {item.updatetime}
                  </p>
                </h6>
              </div>
            </div>
          </div>

          <div className="card-footer bg-white px-0 ">
            <div className="row">
              <div className=" col-md-auto ">
                <a
                  href="#"
                  className="btn btn-outlined btn-black text-muted bg-transparent"
                  data-wow-delay="0.7s"
                >
                  <img
                    src="https://img.icons8.com/ios/50/000000/settings.png"
                    width="19"
                    height="19"
                  />{" "}
                  <small>Edit Data</small>
                </a>
                <a
                  onClick={toggleExpand}
                  href="#"
                  className="btn btn-outlined btn-black text-muted "
                >
                  <img
                    src="https://img.icons8.com/metro/26/000000/more.png"
                    width="20"
                    height="20"
                    className="mr-2 more"
                  />
                  <small> Show More</small>
                </a>
                <span className="vl ml-3"></span>
              </div>

              <div className="col-md-auto w-full">
                <ul className="list-inline d-flex justify-content-end align-items-end">
                  <li className="list-inline-item">
                    {" "}
                    <img
                      src="https://img.icons8.com/ios/50/000000/plus.png"
                      width="30"
                      height="30 "
                      className="more"
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default PatientList;
