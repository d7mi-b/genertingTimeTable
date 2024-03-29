import { faAngleDoubleLeft, faUserGroup, faBookOpen, faBuilding, faFile, faChalkboardTeacher, faTable } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { NavLink } from "react-router-dom";
import style from '../styles/HOD/HomeHOD.module.css';


const services = [
    {
        id:1,
        name: 'مراجعة الطلبات',
        icon: faFile,
        route:'/requests'
    },
    {
        id:2,
        name: 'مجموعات الطلاب',
        icon: faUserGroup,
        route:'/students_groups' 
    },
    {
        id:3,
        name: 'المقررات الدراسية',
        icon: faBookOpen,
        route:'/courses'
    },
    {
        id:4,
        name: 'القاعات',
        icon: faBuilding,
        route:`/halls`
    },
    {
        id:5,
        name: 'أعضاء هيئة التدريس',
        icon: faChalkboardTeacher,
        route:'/lecturers'
    },
    {
        id:6,
        name: 'ربط البيانات',
        icon: faTable,
        route:'/create_table'
    }
    
]

const HomeHOD = () => {

    return (
        <section className={`container`}>
            <header className={style.Home_header}>
                <div>
                    <h3>رئيس القسم</h3>
                    <FontAwesomeIcon className='arrows' icon={faAngleDoubleLeft} />
                    <h3><NavLink className="link" to="/">الصفحة الرئيسية</NavLink></h3>
                </div>
                <NavLink to="/timeTableView"><button className="btn">الجداول</button></NavLink>
            </header>
            <main className={style.Home_main}>
            {
                services.map(i => {
                    return (
                        <NavLink to={i.route} className='link' key={i.id}>
                        <div>
                            <FontAwesomeIcon icon={i.icon} className={style.icon} />
                            <p>{i.name}</p>
                        </div>
                        </NavLink>
                    )
                })
            }
            </main>
        </section>
    );
}

export default HomeHOD;