import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading";
import style from "../styles/secretary/secretaryStudents.module.css";

const SecretaryDepartments = () => {
  const {
    data: data,
    isPending: isLoading,
    error: isErorr,
  } = useFetch("http://localhost:5000/departements");

  console.log("loding is:" + isLoading);
  console.log("data is:" + data);
  console.log("error is:" + isErorr);
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
        {data &&
          data.map((element, index) => (
            <div className={style.departmentSection} key={index}>
              <img
                src={"/images/Mask Group 37.png"}
                alt="paint of a building"
                className={style.departmentImage}
              />
              <p className={style.sectionParagraph}>
                {" "}
                {element["Department_Name"]}{" "}
              </p>
            </div>
          ))}
        {isLoading && <Loading />}
        {isErorr}
      </div>
    </div>
  );
};

export default SecretaryDepartments;
