import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import style from "../styles/secretary/laps_secretary.module.css";
import { useAuthContext } from "../../hooks/useAuthContext";

const SecretaryLaps = () => {
  const { user } = useAuthContext();
  const {
    data: hallsData,
    isPending: hallLoading,
    error: hallError,
  } = useFetch(`http://localhost:5000/halls/department/${user.Department_ID}`);
  console.log(hallsData);
  return (
    <>
      <div className={style.topBar}>
        {hallsData && (
          <>
            <p>
              عدد المباني والقاعات <span>{hallsData.length}</span>
            </p>
          </>
        )}
      </div>
      <div className={style.page}>
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
    </>
  );
};

export default SecretaryLaps;
