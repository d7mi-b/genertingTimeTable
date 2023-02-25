import { Link } from "react-router-dom";
import style from "../styles/secretary/secretaryRequests.module.css";

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
    <div className={style.reviewRequests}>
      <div className={style.navLink}>
        <Link>السكرتير</Link>
        <p>&gt;&gt;</p>
        <Link>الصفحة الرئيسي</Link>
      </div>
      <select className={style.select}>
        <option className={style.sectionOption}>الواردة</option>
        <option className={style.sectionOption}>الصادرة</option>
      </select>
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
                <option key={index} className={style.sectionOption}>{element}</option>
              ))}
            </select>
            <button className={style.sectionButton}>تأكيد</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SecretaryRequestManager;
