import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import style from "../styles/secretary/secretaryLaps.module.css";
import { useState } from "react";

const SecretaryLaps = () => {
  const {
    data: hallsData,
    isPending: hallLoading,
    error: hallError,
  } = useFetch("http://localhost:5000/halls/Info");


  return (
    <div className="div">
      <div className={style.navLink}>
        <Link>السكرتير</Link>
        <p>&gt;&gt;</p>
        <Link>الصفحة الرئيسي</Link>
      </div>
      {hallsData && (
        <div className={style.buildingContent}>
          {hallsData.map((hall) => (
            <div className={style.buildingSection} key={hall.Hall_Name}>
              <div className={style.infoSection}>
                <h4> {hall.Hall_Name} </h4>
                <p>مبنى {hall.Building_Name} </p>
                <p> {hall.Hall_Capacity} مقعد </p>
                <p> {hall.Type_Name} </p>
              </div>
              <hr />
              <FontAwesomeIcon icon={faBuilding} className={style.icon} />
            </div>
          ))}
        </div>
      )}
      {hallLoading && <Loading />}
      {hallError}
    </div>
  );
};

export default SecretaryLaps;
