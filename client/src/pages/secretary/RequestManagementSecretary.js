import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import useFetch from "../../hooks/useFetch";
import style from "../styles/secretary/request_management_secretary.module.css";
import { useFetchPut } from "../../hooks/useFetchPut";
import Done from "../../components/Done";

const SecretaryRequestManager = () => {
  const { user } = useAuthContext();
  const { fetchPut, error, result } = useFetchPut();

  const { data: requestData } = useFetch(
    `http://localhost:5000/requests/${user.Department_ID}`
  );

  const { data: lectureorData } = useFetch(
    `http://localhost:5000/lecturers/department/${user.Department_ID}`
  );


  async function handleSubmit(reqID, lecID, replay) {
    console.log(lecID);
    if (lecID !== 0 || replay !== 1) {
      await fetchPut("http://localhost:5000/requests", {
        Request_ID: reqID,
        Lecturer_ID: lecID,
        Reply: replay,
      });
    } else {
      alert("الرجاء إختيار مدرس");
    }
  }
  useEffect(() => {}, [requestData]);
  const [toggleRequest, setRequest] = useState(false);
  console.log(requestData);
  return (
    <>
      <div className={style.topBar}>
        <p>
          مراجعة <span>الطلبات</span>
        </p>

        <div className={style.toggle}>
          <button
            className={`${style.right} ${toggleRequest ? style.active : ""}`}
            onClick={() => setRequest(true)}
          >
            الوارد
          </button>
          <button
            className={`${style.left}  ${!toggleRequest ? style.active : ""}`}
            onClick={() => setRequest(false)}
          >
            المؤكد
          </button>
        </div>
      </div>
      <div className={style.page}>
        {lectureorData &&
          requestData &&
          toggleRequest &&
          requestData
            .filter((r) => !r.Reply)
            .map((element, index) => {
              let lecIdHandler = 0;
              return (
                <div className={style.requests} key={index}>
                  <div className={style.sectionInfo}>
                    <p>القسم : {element.Department_Name}</p>
                    <p>المادة : {element.Subject_Name}</p>
                    <p>نوعها : {element.Subject_Type_Name}</p>
                  </div>
                  <hr className={style.sectionHR} />
                  <div className={style.sectionConfirm}>
                    <select className={style.sectionSelect}>
                      <option className={style.sectionOption}>
                        إختر المدرس
                      </option>
                      {lectureorData.map((lec, i) => {
                        return (
                          <option
                            key={i}
                            className={style.sectionOption}
                            onClick={(x) => (lecIdHandler = lec.Lecturer_ID)}
                          >
                            {lec.Lecturer_Name}
                          </option>
                        );
                      })}
                    </select>
                    <div className={style.buttonsRow}>
                      <button
                        className={style.sectionButton}
                        onClick={() => {
                          handleSubmit(element.Request_ID, lecIdHandler, 1);
                          lecIdHandler = 0;
                        }}
                      >
                        تأكيد
                      </button>
                      <button
                        className={style.sectionButton}
                        onClick={() => {
                          handleSubmit(element.Request_ID, lecIdHandler, 0);
                          lecIdHandler = 0;
                        }}
                      >
                        رفض
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

        {lectureorData &&
          requestData &&
          !toggleRequest &&
          requestData
            .filter((r) => r.Reply)
            .map((element, index) => {
              let lecIdHandler = 0;
              return (
                <div className={style.requests} key={index}>
                  <div className={style.sectionInfo}>
                    <p>القسم : {element.Department_Name}</p>
                    <p>المادة : {element.Subject_Name}</p>
                    <p>نوعها : {element.Subject_Type_Name}</p>
                  </div>
                  <hr className={style.sectionHR} />
                  <div className={style.sectionConfirm}>
                    <select className={style.sectionSelect}>
                      <option className={style.sectionOption}>
                        إختر المدرس
                      </option>
                      {lectureorData.map((lec, i) => {
                        return (
                          <option
                            key={i}
                            className={style.sectionOption}
                            onClick={(x) => (lecIdHandler = lec.Lecturer_ID)}
                          >
                            {lec.Lecturer_Name}
                          </option>
                        );
                      })}
                    </select>
                    <div className={style.buttonsRow}>
                      <button
                        className={style.sectionButton}
                        onClick={() => {
                          handleSubmit(element.Request_ID, lecIdHandler, 1);
                          lecIdHandler = 0;
                        }}
                      >
                        تأكيد
                      </button>
                      <button
                        className={style.sectionButton}
                        onClick={() => {
                          handleSubmit(element.Request_ID, lecIdHandler, 0);
                          lecIdHandler = 0;
                        }}
                      >
                        رفض
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
      <Done result={result} />
    </>
  );
};

export default SecretaryRequestManager;
