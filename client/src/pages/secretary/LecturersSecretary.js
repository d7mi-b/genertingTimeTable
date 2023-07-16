import { useAuthContext } from "../../hooks/useAuthContext";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import style from "../styles/secretary/lecturers_secretary.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faUser,
  faTrashCan,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { useFetchPost } from "../../hooks/useFetchPost";
import Done from "../../components/Done";
import Failed from "../../components/Done";

const days = [
  { day: "الاحد", value: "Sunday" },
  { day: "الإثنين", value: "Monday" },
  { day: "الثلاثاء", value: "Tuesday" },
  { day: "الأربعاء", value: "Wednesday" },
  { day: "الخميس", value: "Thursday" },
];

const LecturersSecretary = () => {
  const { user } = useAuthContext();
  const { fetchPost, result, isLoading, error } = useFetchPost();
  const {
    data: lectureorData,
    isPending: lectureorLoading,
    error: lectureorError,
  } = useFetch(
    `http://localhost:5000/lecturers/department/${user.Department_ID}`
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchPost(`http://localhost:5000/lecturers/addLecturer`, {
      Lecturer_Name: lecturerName,
      Department_ID: "7",
      Rank_: lecturerRefrence,
      Not_Available: "0",
      NO_Available_Days: "0",
      Sunday: "0",
      Monday: "0",
      Tuesday: "0",
      Wednesday: "0",
      Thursday: "0",
    });
    console.log(result);
    console.log(isLoading);
    console.log(error);
  };

  console.log(lectureorData);
  console.log(lectureorLoading);
  console.log(lectureorError);

  const [lecturerName, setName] = useState("");
  const [lecturerRefrence, setRefrence] = useState("");

  useEffect(() => {
    const btnAddLecturer = document.querySelector("#addLecturer");
    const addLecturerContainer = document.querySelector(
      "#addLecturerContainer"
    );
    const closeAddLecturer = document.querySelector("#closeIcon");
    const btnSubmitLecturer = document.querySelector("#submitLecturer");

    btnAddLecturer.addEventListener("click", () => {
      addLecturerContainer.style.cssText = "display: flex";
    });

    closeAddLecturer.addEventListener("click", () => {
      addLecturerContainer.style.cssText = "display: none";
    });

    btnSubmitLecturer.addEventListener("click", () => {
      addLecturerContainer.style.cssText = "display: none";
      setName("");
      setRefrence("");
      console.log({ lecturerName, lecturerRefrence });
    });
  });

  return (
    <>
      <div className={style.topBar}>
        <p>
          <span>أعضاء</span> هيئة التدريس
        </p>
        <button className={style.addButton} id="addLecturer">
          إضافة مدرس
        </button>
      </div>
      <div className={style.searchBar}>
        <p>
          عدد المدرسين
          <span>{lectureorData && lectureorData.length}</span>
        </p>
        <div className={style.sort}>
          <p>الترتيب حسب</p>
          <select>
            <option value="new">الأحدث</option>
            <option value="old">الأقدم</option>
          </select>
        </div>
        <input type="text" placeholder="البحث بالإسم" />
      </div>
      <div className={style.page}>
        <section className={style.lectureorsContainer}>
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
                                  lecturer[`${element.value}`] > 0
                                    ? true
                                    : false
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
                  <div className={style.saveAndDelete}>
                    <button className={style.save}>
                      حفظ <FontAwesomeIcon icon={faSave} size="1x" />
                    </button>
                    <button>
                      حذف <FontAwesomeIcon icon={faTrashCan} size="1x" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section
          className={style.addLecturerContainer}
          id="addLecturerContainer"
        >
          <div className={style.inputCard}>
            <form onSubmit={handleSubmit}>
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
                      value={lecturerName}
                      onChange={(e) => setName(e.target.value)}
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
                        onClick={() => setRefrence("teacher")}
                        name="academicReference"
                      ></input>
                    </section>
                    <section className={style.radioSection}>
                      <label htmlFor="academicReference">دكتور/ة</label>
                      <input
                        required
                        className={style.radio}
                        type="radio"
                        value={"doctor"}
                        onClick={() => setRefrence("doctor")}
                        name="academicReference"
                      ></input>
                    </section>
                  </section>
                  <button className={style.addButton} id="submitLecturer">
                    إضافة
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
        <Done result={result} />
        <Failed error={error} />
      </div>
    </>
  );
};

export default LecturersSecretary;
