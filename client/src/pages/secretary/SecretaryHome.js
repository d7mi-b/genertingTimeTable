import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faCalendarCheck,
  faCalendarDays,
  faFile,
  faUserGroup,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import style from "../styles/secretary/secretary.module.css";

let date = new Date();

const sections = [
  {
    name: "الطلاب",
    icon: faUserGroup,
    link: "departments",
  },
  {
    name: "القاعات والمعامل الدراسية",
    icon: faBuilding,
    link: "laps",
  },
  {
    name: "الجداول الحالية",
    icon: faCalendarDays,
  },
  {
    name: "أعضاء هيئة التدريس",
    icon: faUserTie,
    link: "lecturesrs",
  },
  {
    name: "مراجعة الطلبات",
    icon: faFile,
    link: "requests",
  },
  {
    name: "إنشاء جدول جديد",
    icon: faCalendarCheck,
    link: "createTable",
  },
];

const semesters = ["الأول", "الثاني"];

const SecretaryHome = () => {
  return (
    <div className={style.secretaryPage}>
      <div className={style.header}>
        <p>
          السنة الدراسية {date.getFullYear() - 1}/{date.getFullYear()}
        </p>
        <div className={style.semester}>
          <p>الترم:</p>
          <select>
            {semesters.map((element, index) => (
              <option key={index}> {element} </option>
            ))}
          </select>
        </div>
        <button className={style.button}>تحديث</button>
      </div>
      <div className={style.navLink}>
        {/* <div className={style.navSection}> */}
        <Link>السكرتير</Link>
        <p>&gt;&gt;</p>
        <Link>الصفحة الرئيسي</Link>
        {/* </div> */}
        {/* <button className={style.navButton}>إضافة مدرس</button> */}
      </div>
      <div className={style.content}>
        <div className={style.sectionHolder}>
          {sections.map((element, index) => (
            <Link
              to={element.link}
              className={`${style.section} ${
                index % 2 !== 0 ? style.odd : null
              }`}
              key={index}
            >
              <FontAwesomeIcon
                icon={element.icon}
                className={style.sectionIcon}
              />
              <p className={style.sectionParagraph}>{element.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecretaryHome;
