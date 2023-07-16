import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import style from "../styles/secretary/create_schedule_secretary.module.css";

const departmentScheduleStatus = [
  {
    name: "هندسة حاسوب",
    status: true,
  },
  {
    name: "هندسة إلكترونية واتصالات",
    status: true,
  },
  {
    name: "هندسة معمارية",
    status: false,
  },
  {
    name: "هندسة مدنية",
    status: true,
  },
  {
    name: "هندسة كيميائية",
    status: false,
  },
  {
    name: "هندسة بترولية",
    status: true,
  },
];
const CreateScheduleSecretary = () => {
  return (
    <>
      <div className={style.topBar}>
        <p>
          <span>إنشاء</span> الجداول
        </p>
      </div>
      <div className={style.page}>
        <div className={style.tableHolder}>
          <div className={style.section}>
            <p className={`${style.sectionDivider} ${style.title}`}>التخصص</p>
            <p className={`${style.sectionDivider} ${style.title}`}>الحالة</p>
            <p className={`${style.iconDivider} ${style.title}`}>تنبيه</p>
          </div>
          {departmentScheduleStatus.map((element, index) => (
            <div className={`${style.section} ${style.status}`} key={index}>
              <p className={style.sectionDivider}>{element.name}</p>
              <div className={`${style.sectionStatus} ${style.sectionDivider}`}>
                <FontAwesomeIcon
                  icon={element.status ? faCircleCheck : faCircleXmark}
                  className={`${style.sectionIcon} `}
                />
                {element.status ? <p>مكتمل</p> : <p>غير مكتمل</p>}
              </div>
              <FontAwesomeIcon
                icon={faBell}
                className={`${style.iconDivider} ${style.sectionIcon} `}
              />
            </div>
          ))}
        </div>
        <button className={style.button}>إنشاء جداول</button>
      </div>
    </>
  );
};

export default CreateScheduleSecretary;