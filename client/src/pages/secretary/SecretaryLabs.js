import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import style from "../styles/secretary/secretaryLaps.module.css";

const ClassesAndLaps = [
  {
    name: "C301",
    inBuilding: "C",
    capacity: "80",
    type: "قاعة محاضرات",
  },
  {
    name: "A200",
    inBuilding: "A",
    capacity: "100",
    type: "قاعة محاضرات",
  },
  {
    name: "C301",
    inBuilding: "C",
    capacity: "80",
    type: "قاعة محاضرات",
  },
  {
    name: "A200",
    inBuilding: "A",
    capacity: "100",
    type: "قاعة محاضرات",
  },
  {
    name: "C301",
    inBuilding: "C",
    capacity: "80",
    type: "قاعة محاضرات",
  },
  {
    name: "A200",
    inBuilding: "A",
    capacity: "100",
    type: "قاعة محاضرات",
  },
];

const SecretaryLaps = () => {
  return (
    <div className="div">
      <div className={style.navLink}>
        <Link>السكرتير</Link>
        <p>&gt;&gt;</p>
        <Link>الصفحة الرئيسي</Link>
      </div>
      <div className={style.buildingContent}>
        {ClassesAndLaps.map((element) => (
          <div className={style.buildingSection}>
            <div className={style.infoSection}>
              <h4> {element.name} </h4>
              <p>مبنى {element.inBuilding} </p>
              <p> {element.capacity} مقعد </p>
              <p> {element.type} </p>
            </div>
            <hr />
            <FontAwesomeIcon icon={faBuilding} className={style.icon} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecretaryLaps;
