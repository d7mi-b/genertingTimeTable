import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import useFetch from "../../hooks/useFetch";
import style from "../styles/secretary/request_management_secretary.module.css";
import { useFetchPut } from "../../hooks/useFetchPut";
import Done from "../../components/Done";

const SecretaryRequestManager = () => {
  const { user } = useAuthContext();
  const { fetchPut, result } = useFetchPut();

  const { data: requestData } = useFetch(
    `http://localhost:5000/requests/${user.Department_ID}`
  );

  const { data: lectureorData } = useFetch(
    `http://localhost:5000/lecturers/department/${user.Department_ID}`
  );

  async function handleSubmit(reqID, lecID, replay) {
    console.log(lecID);
    if (replay !== 1) {
      console.log("ff");
      await fetchPut("http://localhost:5000/requests", {
        Request_ID: reqID,
        Reply: replay,
      });
      window.location.reload();
    } else if (lecID !== 0) {
      console.log("trig");
      await fetchPut("http://localhost:5000/requests", {
        Request_ID: reqID,
        Lecturer_ID: lecID,
        Reply: replay,
      });
      window.location.reload();
    } else {
      alert("الرجاء إختيار مدرس");
    }
  }

  function lecName(id) {
    console.log(id);
    let name = "";
    lectureorData.forEach((element) => {
      if (element.Lecturer_ID === id) {
        name = element.Lecturer_Name;
      }
    });
    return name;
  }

  useEffect(() => {}, [requestData]);
  const [toggleRequest, setRequest] = useState(true);
  console.log(requestData);
  return (
    <>
      <div className={style.topBar}>
        <p>
          مسؤول الجداول &#62; مراجعة <span>الطلبات</span>
        </p>

        <div className={style.toggle}>
          <button
            className={`${toggleRequest ? style.active : ""}`}
            style={{
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              borderLeftWidth: 0,
            }}
            onClick={() => setRequest(true)}
          >
            الواردة
          </button>
          <button
            className={`${!toggleRequest ? style.active : ""}`}
            style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
            onClick={() => setRequest(false)}
          >
            المؤكدة
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
                    {element.Lecturer_Name && (
                      <p>
                        المدرس: <span>{element.Lecturer_Name}</span>
                      </p>
                    )}
                    <p>
                      الحالة:{" "}
                      <span>
                        {element.Lecturer_Name !== null ? "مقبولة" : "مرفوضة"}
                      </span>
                    </p>
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
