import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import useFetch from "../../hooks/useFetch";
import style from "../styles/secretary/secretaryLecturers.module.css";

const days = [
  { day: "الاحد", value: "Sunday" },
  { day: "الإثنين", value: "Monday" },
  { day: "الثلاثاء", value: "Tuesday" },
  { day: "الأربعاء", value: "Wednesday" },
  { day: "الخميس", value: "Thursday" },
];

const SecretaryLecturers = () => {
  const { user } = useAuthContext();

  const {
    data: lectureorData,
    isPending: lectureorLoading,
    error: lectureorError,
  } = useFetch(
    `http://localhost:5000/lecturers/department/${user.Department_ID}`
  );

  console.log(lectureorData);
  console.log(lectureorLoading);
  console.log(lectureorError);

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
      {lectureorData && (
        <div>
          {lectureorData.map((lecturer, index) => (
            <div className={style.lectureor} key={index}>
              <div className={style.infoSection}>
                <p className={style.name}>
                  الأستاذ/ة: {lecturer.Lecturer_Name}
                </p>
                <p>{lecturer.Department_Name}</p>
                <div className={style.lecturerAvailabel}>
                  <label className={style.labels}>
                    <input
                      type={"checkbox"}
                      className={style.checkBox}
                      checked={lecturer.Not_Available > 0 ? true : false}
                      onChange={() => {}}
                    ></input>{" "}
                    غير متاح
                  </label>
                </div>
              </div>
              <hr className={style.sectionHR} />
              <div className={style.daySection}>
                <div className={style.availabelDays}>
                  <p>عدد أيام الحضور: </p>
                  <input
                    className={style.daysInput}
                    type="number"
                    value={lecturer.NO_Available_Days || 0}
                    readOnly={true}
                  ></input>
                </div>
                <div className="daysCheckBoxes">
                  <div className="checkboxTitle">
                    <p>الأيام المتاحة: </p>
                  </div>
                  <div className={style.checkboxDays}>
                    {days.map((element, index) => (
                      <div className="days" key={index}>
                        <label className={style.labels}>
                          <input
                            type="checkbox"
                            className={style.checkBox}
                            checked={
                              lecturer[`${element.value}`] > 0 ? true : false
                            }
                            onChange={() => {}}
                          ></input>{" "}
                          {element.day}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SecretaryLecturers;
