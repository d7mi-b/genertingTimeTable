import style from "../styles/secretary/request_management_secretary.module.css";

const requests = [
  {
    department: "هندسة إلكترونية وإتصالات",
    subject: "Matrix and Vectors",
    level: "الأول",
  },
  {
    department: "هندسة إلكترونية وإتصالات",
    subject: "Matrix and Vectors",
    level: "الأول",
  },
];

const lecturers = ["أحمد", "حسن", "سالم"];

const SecretaryRequestManager = () => {
  return (
    <>
      <div className={style.topBar}>
        <p>
          مراجعة <span>الطلبات</span>
        </p>
        <select name="ss" id="">
          <option className={style.sectionOption}>الواردة</option>
          <option className={style.sectionOption}>الصادرة</option>
        </select>
      </div>
      <div className={style.page}>
        {requests.map((element, index) => (
          <div className={style.requests} key={index}>
            <div className={style.sectionInfo}>
              <p>القسم : {element.department}</p>
              <p>المادة : {element.subject}</p>
              <p>المستوى : {element.level}</p>
            </div>
            <hr className={style.sectionHR} />
            <div className={style.sectionConfirm}>
              <select className={style.sectionSelect}>
                {lecturers.map((element, index) => (
                  <option key={index} className={style.sectionOption}>
                    {element}
                  </option>
                ))}
              </select>
              <button className={style.sectionButton}>تأكيد</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SecretaryRequestManager;
