import { Link } from "react-router-dom";
import style from "../styles/secretary/secretaryLecturers.module.css";

const availabelLectureors = [
  {
    name: "أحمد خالد العكبري",
    department: "قسم العمادة",
    availabel: true,
  },
  {
    name: "أحمد خالد العكبري",
    department: "قسم العمادة",
    availabel: false,
  },
];

const days = ["الاحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"];

const SecretaryLecturers = () => {
  return (
    <div className={style.lectureorsContainer}>
      <div className={style.navLink}>
        <div className={style.navSection}>
          <div className={style.links}>
            <Link>السكرتير</Link>
            <p>&gt;&gt;</p>
            <Link>الصفحة الرئيسي</Link>
          </div>
        </div>
        <button className={style.navButton}>إضافة مدرس</button>
      </div>
      {availabelLectureors.map((element) => (
        <div className={style.lectureor}>
          <div className={style.infoSection}>
            <p>الأستاذ/ة: {element.name}</p>
            <p>{element.department}</p>
            <div className={style.lecturerAvailabel}>
              <label className={style.labels}>
                <input
                  type={"checkbox"}
                  className={style.checkBox}
                  checked={element.availabel}
                ></input>{" "}
                غير متاح
              </label>
            </div>
          </div>
          <hr className={style.sectionHR} />
          <div className={style.daySection}>
            <div className={style.availabelDays}>
              <p>عدد أيام الحضور: </p>
              <input className={style.daysInput} type="number"></input>
            </div>
            <div className="daysCheckBoxes">
              <div className="checkboxTitle">
                <p>الأيام المتاحة: </p>
              </div>
              <div className={style.checkboxDays}>
                {days.map((element, index) => (
                  <div className="days">
                    <label className={style.labels}>
                      <input type="checkbox" className={style.checkBox}></input>{" "}
                      {element}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SecretaryLecturers;
