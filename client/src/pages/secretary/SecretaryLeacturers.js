import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";
import style from "../styles/secretary/secretaryLecturers.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faUser } from "@fortawesome/free-solid-svg-icons";

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

  useEffect(() => {
    const btnAddLecturer = document.querySelector("#addLecturer");
    const addLecturerContainer = document.querySelector(
      "#addLecturerContainer"
    );
    const closeAddLecturer = document.querySelector("#closeIcon");

    btnAddLecturer.addEventListener("click", () => {
      addLecturerContainer.style.cssText = "display: flex";
    });

    closeAddLecturer.addEventListener("click", () => {
      addLecturerContainer.style.cssText = "display: none";
    });
  });

  let lecturerName = '';
  

  return (
    <div className={style.lectureorsContainer}>
      <nav className={style.navLink}>
        <div className={style.navSection}>
          <div className={style.links}>
            <Link>السكرتير</Link>
            <p>&gt;&gt;</p>
            <Link>الصفحة الرئيسي</Link>
          </div>
        </div>
        <button className={style.navButton} id="addLecturer">
          إضافة مدرس
        </button>
      </nav>

      <section className={style.lecturersContainer}>
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
      </section>

      <section className={style.addLecturerContainer} id="addLecturerContainer">
        <div className={style.inputCard}>
          <form action="">
            <div className="card">
              <div className={style.cardHeader}>
                <p className={style.title}> إضافة عضو هيئة تدرس</p>
                <FontAwesomeIcon
                  icon={faXmark}
                  className={style.closeIcon}
                  id="closeIcon"
                ></FontAwesomeIcon>
              </div>
              <div className={style.cardContent}>
                <label htmlFor="name">الإسم:</label>
                <section className={style.input}>
                  <FontAwesomeIcon icon={faUser} className={style.icon} />
                  <input
                    type="text"
                    name="name"
                    required
                    value={null}
                    onChange={null}
                    className={style.inputFeild}
                  />
                </section>
                <label htmlFor="academicRefrence">الرتبة العلمية:</label>
                <section className={style.referenceChoices}>
                  <section className={style.radioSection}>
                    <label htmlFor="academicReference">أستاذ/ة</label>
                    <input
                      required
                      className={style.radio}
                      type="radio"
                      value={"teacher"}
                      name="academicReference"
                    ></input>
                  </section>
                  <section className={style.radioSection}>
                    <label htmlFor="academicReference">دكتور/ة</label>
                    <input
                      required
                      className={style.radio}
                      type="radio"
                      value={"doctore"}
                      name="academicReference"
                    ></input>
                  </section>
                </section>
                <button className={style.addButton}>إضافة</button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default SecretaryLecturers;
