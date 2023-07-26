import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading";
import style from "../styles/secretary/departments_secretary.module.css";

const DepartmentsSecretary = () => {
  const {
    data,
    isPending: isLoading,
    error: isErorr,
  } = useFetch("http://localhost:5000/departements");

  const {
    data: departments,
    isPending: loadingDepartment,
    error: errorDepartments,
  } = useFetch(`http://localhost:5000/departements/college/${1}`);

  console.log("departments is:" + departments);
  console.log("loadingCollege is:" + loadingDepartment);
  console.log("errorCollege is:" + errorDepartments);
  console.log("loding is:" + isLoading);
  console.log("data is:" + data);
  console.log(data);
  console.log("error is:" + isErorr);
  return (
    <>
      <div className={style.topBar}>
        {data && (
          <>
            <p>
              مسؤول الجداول &#62; نظرة عامة على <span>الأقسام</span>
            </p>
            <p>
              عدد الأقسام <span>{data.length}</span>
            </p>
          </>
        )}
      </div>
      <div className={style.page}>
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
    </>
  );
};

export default DepartmentsSecretary;
