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
import style from "../styles/secretary/home_secretary.module.css";
import "../styles/secretary/home_secretary.module.css";
import { useAuthContext } from "../../hooks/useAuthContext";

let date = new Date();

const sections = [
  {
    name: "أقسام الطلاب",
    icon: faUserGroup,
    link: "departments",
  },
  {
    name: "القاعات والمعامل الدراسية",
    icon: faBuilding,
    link: "halls",
  },
  {
    name: "الجداول الحالية",
    icon: faCalendarDays,
    link: "current-schedules",
  },
  {
    name: "أعضاء هيئة التدريس",
    icon: faUserTie,
    link: "lecturers",
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

const HomeSecretary = () => {
  const { user } = useAuthContext();

  console.log(user);

  return (
    <>
      <div className={style.topBar}>
        <p>
          <span>مرحباً</span> {user.name}
        </p>
        <div className={style.semester}>
          <p>
            الفصل
            <span>{user.semester === 1 ? "الأول" : "الثاني"}</span>
          </p>
          <p>
            للسنة{" "}
            <span>
              {date.getFullYear() - 1}/{date.getFullYear()}
            </span>
            م
          </p>
        </div>
      </div>
      <div className={style.page}>
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
    </>
  );
};

export default HomeSecretary;
