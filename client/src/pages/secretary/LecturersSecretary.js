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
import { useFetchPut } from "../../hooks/useFetchPut";
import { useFetchDelete } from "../../hooks/useFetchDelete";

const days = [
  { day: "الاحد", value: "Sunday" },
  { day: "الإثنين", value: "Monday" },
  { day: "الثلاثاء", value: "Tuesday" },
  { day: "الأربعاء", value: "Wednesday" },
  { day: "الخميس", value: "Thursday" },
];

const LecturersSecretary = () => {
  const { user } = useAuthContext();
  const { fetchPost, error, result } = useFetchPost();
  const { fetchDelete } = useFetchDelete();
  const { fetchPut, result: updateResult } = useFetchPut();

  const [lecturerName, setName] = useState("");
  const [lecturerRefrence, setRefrence] = useState("");

  const { data: lectureorData } = useFetch(
    `http://localhost:5000/lecturers/department/${user.Department_ID}`
  );

  const handleSubmit = async (e) => {
    console.log(result);
    e.preventDefault();
    await fetchPost(`http://localhost:5000/lecturers/addLecturer`, {
      Lecturer_Name: lecturerName,
      Department_ID: user.Department_ID,
      Rank_: lecturerRefrence,
      Not_Available: "0",
      NO_Available_Days: "0",
      Sunday: "0",
      Monday: "0",
      Tuesday: "0",
      Wednesday: "0",
      Thursday: "0",
    });
  };

  const handleDelete = async (Lecturer_ID) => {
    await fetchDelete("http://localhost:5000/lecturers/deleteLecturer", {
      Lecturer_ID,
    });

    window.location.reload();
  };

  const updateAvailability = async (id, state) => {
    if (state) {
      await fetchPut(`http://localhost:5000/lecturers/updateLecturer`, {
        Lecturer_ID: id,
        Not_Available: "0",
      });
    } else {
      await fetchPut(`http://localhost:5000/lecturers/updateLecturer`, {
        Lecturer_ID: id,
        Not_Available: "1",
      });
    }

    window.location.reload();
  };

  const handleUpdate = async (lecturer) => {
    console.log(updateResult);
    await fetchPut(`http://localhost:5000/lecturers/updateLecturer`, {
      Lecturer_ID: lecturer.Lecturer_ID,
      NO_Available_Days: lecturer.NO_Available_Days,
      Sunday: `${lecturer.Sunday}`,
      Monday: `${lecturer.Monday}`,
      Tuesday: `${lecturer.Tuesday}`,
      Wednesday: `${lecturer.Wednesday}`,
      Thursday: `${lecturer.Thursday}`,
    });
  };

  useEffect(() => {
    const btnAddLecturer = document.querySelector("#addLecturer");
    const addLecturerContainer = document.querySelector(
      "#addLecturerContainer"
    );
    const closeAddLecturer = document.querySelector("#closeIcon");
    const btnSubmitLecturer = document.querySelector("#submitLecturer");

    btnAddLecturer.addEventListener("click", () => {
      setName("");
      setRefrence("");
      addLecturerContainer.style.cssText = "display: flex";
    });

    closeAddLecturer.addEventListener("click", () => {
      addLecturerContainer.style.cssText = "display: none";
    });

    btnSubmitLecturer.addEventListener("click", () => {
      addLecturerContainer.style.cssText = "display: none";
    });
  }, []);

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
              {lectureorData.map((lecturer, index) => {
                if (lecturer.Not_Available === 0) {
                  let lecturerHolder = {
                    Lecturer_ID: lecturer.Lecturer_ID,
                    Lecturer_Name: lecturer.Lecturer_Name,
                    Department_ID: lecturer.Department_ID,
                    Rank_: lecturer.Rank_,
                    Not_Available: "0",
                    NO_Available_Days: "0",
                    Sunday: lecturer.Sunday,
                    Monday: lecturer.Monday,
                    Tuesday: lecturer.Tuesday,
                    Wednesday: lecturer.Wednesday,
                    Thursday: lecturer.Thursday,
                  };
                  return (
                    <div className={`${style.lectureor}`} key={index}>
                      <div className={style.infoSection}>
                        <p className={style.name}>
                          {lecturer.Rank_ === "doctor"
                            ? "الدكتور/ة"
                            : "الأستاذ/ة"}
                          : {lecturer.Lecturer_Name}
                        </p>
                        <p>{lecturer.Department_Name}</p>
                        <div className={style.lecturerAvailabel}>
                          <label className={style.labels}>
                            <input
                              type={"checkbox"}
                              className={style.checkBox}
                              checked={
                                lecturer.Not_Available > 0 ? true : false
                              }
                              onChange={() =>
                                updateAvailability(
                                  lecturer.Lecturer_ID,
                                  lecturer.Not_Available
                                )
                              }
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
                                    defaultChecked={
                                      lecturer[`${element.value}`] === 1
                                        ? true
                                        : false
                                    }
                                    onChange={() => {
                                      if (
                                        lecturerHolder[`${element.value}`] === 0
                                      ) {
                                        lecturerHolder[`${element.value}`] = 1;
                                      } else {
                                        lecturerHolder[`${element.value}`] = 0;
                                      }
                                    }}
                                  ></input>{" "}
                                  {element.day}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className={style.saveAndDelete}>
                        <button
                          className={style.save}
                          onClick={() => handleUpdate(lecturerHolder)}
                        >
                          حفظ <FontAwesomeIcon icon={faSave} size="1x" />
                        </button>
                        <button
                          onClick={() => handleDelete(lecturer.Lecturer_ID)}
                        >
                          حذف <FontAwesomeIcon icon={faTrashCan} size="1x" />
                        </button>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div
                      className={`${style.lectureor} ${style.invalid}`}
                      key={index}
                    >
                      <div className={style.infoSection}>
                        <p className={style.name}>
                          {lecturer.Rank_ === "doctor"
                            ? "الدكتور/ة"
                            : "الأستاذ/ة"}
                          : {lecturer.Lecturer_Name}
                        </p>
                        <p>{lecturer.Department_Name}</p>
                        <div className={style.lecturerAvailabel}>
                          <label className={style.labels}>
                            <input
                              type={"checkbox"}
                              className={style.checkBox}
                              checked={
                                lecturer.Not_Available > 0 ? true : false
                              }
                              onChange={() =>
                                updateAvailability(
                                  lecturer.Lecturer_ID,
                                  lecturer.Not_Available
                                )
                              }
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
                            className={`${style.daysInput} ${style.invalid}`}
                            type="number"
                            value={0}
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
                                    className={`${style.checkBox} ${style.invalid}`}
                                    checked={false}
                                    disabled={true}
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
                        <button className={`${style.save} ${style.invalid}`}>
                          حفظ <FontAwesomeIcon icon={faSave} size="1x" />
                        </button>
                        <button
                          onClick={() => handleDelete(lecturer.Lecturer_ID)}
                        >
                          حذف <FontAwesomeIcon icon={faTrashCan} size="1x" />
                        </button>
                      </div>
                    </div>
                  );
                }
              })}
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
        <Done result={result || updateResult} />
        <Failed error={error} />
      </div>
    </>
  );
};

export default LecturersSecretary;
