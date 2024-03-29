import { faAngleDoubleLeft, faBuilding } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { NavLink } from "react-router-dom";
import style from '../styles/HOD/HallsHOD.module.css';
import useFetch from '../../hooks/useFetch';
import Loading from '../../components/Loading';
import { useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";


const Halls = () => {
    const { user } = useAuthContext();
    const {data:info,isPending , error:errorHalls} = useFetch(`http://localhost:5000/halls/department/${user.Department_ID}`)

    useEffect(() => {
        if(errorHalls){
            throw Error("لا يوجد قاعات لهذا القسم")
        }
    },[errorHalls])
   
    return(
        <section className="container">
            <header className={style.halls_header}>
                    <h3>رئيس القسم</h3>
                    <FontAwesomeIcon className='arrows' icon={faAngleDoubleLeft} />
                    <h3><NavLink className="link" to={`/halls`}>القاعات والمعامل الدراسية</NavLink></h3>    
            </header>
            {
                    isPending && <Loading />
            }
            { errorHalls && <p className="emptyElement">{errorHalls}</p>}
            <main className={style.halls_main}>
                {
                    info &&
                    info.map(i => {
                        return(
                            <div key={i.Hall_ID} className={style.box}>
                                <div>
                                    <h3>{i.Hall_Name}</h3>
                                    <p>مبنى {i.Building_Name}</p>
                                    <p>{i.Hall_Capacity} مقعد</p>
                                    <p>{i.Type_Name}</p>
                                </div>
                                <FontAwesomeIcon icon={faBuilding} className={style.icon} />
                            </div>
                        )
                    })
                }
            </main>
        </section>
    )
}


export default Halls;