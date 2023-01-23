import { faAngleDoubleLeft, faBuilding } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { NavLink } from "react-router-dom";
import style from '../styles/HOD/HallsHOD.module.css';


const info = [
    {
        id:1,
        name:'C201',
        building:'C',
        capacity:'50',
        type:'قاعة محاضرات'
    },
    {
        id:2,
        name:'A203',
        building:'A',
        capacity:45,
        type:'قاعة محاضرات'
    },
    {
        id:3,
        name:'C202',
        building:'C',
        capacity:40,
        type:'قاعة محاضرات'
    },
    {
        id:4,
        name:'C1',
        building:'C',
        capacity:25,
        type:'معمل برمجة'
    },
    {
        id:5,
        name:'C2',
        building:'C',
        capacity:20,
        type:'معمل برمجة'
    },
    {
        id:6,
        name:'C3',
        building:'C',
        capacity:20,
        type:'معمل شبكات'
    }
]

const Halls = () => {

    return(
        <section className="container">
            <header className={style.halls_header}>
                    <h3>رئيس القسم</h3>
                    <FontAwesomeIcon className='arrows' icon={faAngleDoubleLeft} />
                    <h3><NavLink className="link" to="/halls">القاعات والمعامل الدراسية</NavLink></h3>    
            </header>
            <main className={style.halls_main}>
                {
                    info.map(i => {
                        return(
                            <div key={i.id} className={style.box}>
                                <div>
                                    <p>{i.name}</p>
                                    <p>مبنى {i.building}</p>
                                    <p>{i.capacity} مقعد</p>
                                    <p>{i.type}</p>
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