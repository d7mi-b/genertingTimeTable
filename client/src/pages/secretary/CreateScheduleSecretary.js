import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import style from "../styles/secretary/create_schedule_secretary.module.css";
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading";

const CreateScheduleSecretary = () => {
  const {
    data: department,
    isPending: isLoading,
    error: isErorr,
  } = useFetch("http://localhost:5000/departements");
  console.log(department);

  const {
    data: currentState,
    isPending: stateLoading,
    error: stateError,
  } = useFetch("http://localhost:5000/timeTable/checkModulesForGenerating");
  console.log(currentState);

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
          {department &&
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
        </div>
        <button className={style.button} onClick={() => stateCalculator(1)}>
          إنشاء جداول
        </button>
        {isLoading && stateLoading && <Loading />}
      </div>
    </>
  );
};

export default CreateScheduleSecretary;
