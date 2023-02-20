import { Link } from "react-router-dom";
import style from "../styles/secretary/secretaryStudents.module.css";

const departments = [
  "هندسة حاسوب",
  "هندسة إلكترونية واتصالات",
  "هندسة معمارية",
  "هندسة مدنية",
  "هندسة كيميائية",
  "هندسة بترولية",
];
const SecretaryDepartments = () => {
  return (
    <div className="ssscontainer">
      <div className={style.navLink}>
        {/* <div className={style.navSection}> */}
        <Link>السكرتير</Link>
        <p>&gt;&gt;</p>
        <Link>الصفحة الرئيسي</Link>
        {/* </div> */}
        {/* <button className={style.navButton}>إضافة مدرس</button> */}
      </div>
      <div className={style.departmentsContent}>
        {departments.map((element) => (
          <div className={style.departmentSection}>
            <img
              src={"/images/Mask Group 37.png"}
              alt="paint of a building"
              className={style.departmentImage}
            />
            <p className={style.sectionParagraph}> {element} </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecretaryDepartments;
