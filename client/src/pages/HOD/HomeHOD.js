import { faAngleDoubleLeft, faUserGroup, faBookOpen, faBuilding, faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { NavLink } from "react-router-dom";
import style from '../styles/HOD/HomeHOD.module.css';

const services = [
    {
        id:1,
        name: 'مراجعة الطلبات',
        icon: faFile,
        route:'/review_requests'
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
        route:'/halls'
    },
    {
        id:5,
        name: 'أعضاء هيئة التدريس',
        icon: faUserGroup,
        route:'/lecturers'
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
                <button className="btn">الجداول</button>
            </header>
            <main className={style.Home_main}>
            {
                services.map(i => {
                    return (
                        <NavLink to={i.route} className='link'>
                        <div key={i.id}>
                            <FontAwesomeIcon icon={i.icon} className={style.icon} />
                            <p>{i.name}</p>
                        </div>
                        </NavLink>
                    )
                })
            }
            </main>
            <footer className={style.Home_footer}>
                <NavLink to='/create_table'><button className="btn">إنشاء جدول</button></NavLink>
            </footer>
        </section>
    );
}

export default HomeHOD;