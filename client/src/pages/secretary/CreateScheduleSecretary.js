import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import style from "../styles/secretary/create_schedule_secretary.module.css";
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";

const CreateScheduleSecretary = () => {
  const [loading, setLoading] = useState(false);

  const {
    data: department,
    isPending: isLoading,
    error: isErorr,
  } = useFetch("http://localhost:5000/departements");

  const {
    data: currentState,
    isPending: stateLoading,
    error: stateError,
  } = useFetch("http://localhost:5000/timeTable/checkModulesForGenerating");

  const [result, setResult] = useState(false);
  const schedule = async () => {
    await fetch("http://localhost:5000/generatingTimetable");
    setResult(true);
  };

  function stateCalculator(id) {
    let state = false;
    currentState.forEach((element) => {
      if (element.Department_ID === id) {
        if (
          element.Hall_Type === element.lecturers &&
          element.Hall_Type === element.modules &&
          element.Hall_Type > 0
        ) {
          state = true;
        }
      }
    });
    return state;
  }

  // useEffect((() => {}, [result]));
  return (
    <>
      <div className={style.topBar}>
        <p>
          مسؤول الجداول &#62;
          <span>إنشاء</span> الجداول
        </p>
      </div>
      <div className={style.page}>
        <div className={style.tableHolder}>
          {!loading && department && currentState && (
            <div className={style.section}>
              <p className={`${style.sectionDivider} ${style.title}`}>التخصص</p>
              <p className={`${style.sectionDivider} ${style.title}`}>الحالة</p>
              <p className={`${style.iconDivider} ${style.title}`}>تنبيه</p>
            </div>
          )}
          {!loading &&
            department &&
            currentState &&
            department.map((element, index) => (
              <div className={`${style.section} ${style.status}`} key={index}>
                <p className={style.sectionDivider}>
                  {element.Department_Name}
                </p>
                <div
                  className={`${style.sectionStatus} ${style.sectionDivider}`}
                >
                  <FontAwesomeIcon
                    icon={
                      stateCalculator(element.Department_ID)
                        ? faCircleCheck
                        : faCircleXmark
                    }
                    className={`${style.sectionIcon} `}
                  />
                  {stateCalculator(element.Department_ID) ? (
                    <p>مكتمل</p>
                  ) : (
                    <p>غير مكتمل</p>
                  )}
                </div>
                <FontAwesomeIcon
                  icon={faBell}
                  className={`${style.iconDivider} ${style.sectionIcon} `}
                />
              </div>
            ))}
          {!loading && department && currentState && (
            <button
              className={style.button}
              onClick={() => {
                schedule();
                setLoading(true);
              }}
            >
              إنشاء جداول
            </button>
          )}
          {result && (
            <p className={style.result}>
              إنتهت العملية، توجه إلى{" "}
              <span>
                <Link to={"/timetables"}>الجداول</Link>
              </span>
              للإستعراض
            </p>
          )}
        </div>

        {isLoading && stateLoading && <Loading />}
        {loading && !result && <Loading />}
      </div>
    </>
  );
};

export default CreateScheduleSecretary;
