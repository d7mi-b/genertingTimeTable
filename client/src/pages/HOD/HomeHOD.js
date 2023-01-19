import { faAngleDoubleLeft, faUserGroup, faBookOpen, faHospital } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import style from '../styles/HOD/HomeHOD.module.css';

const services = [
    {
        id:1,
        name: 'مراجعة الطلبات',
        icon: faUserGroup
    },
    {
        id:2,
        name: 'مجموعات الطلاب',
        icon: faUserGroup 
    },
    {
        id:3,
        name: 'المقررات الدراسية',
        icon: faBookOpen
    },
    {
        id:4,
        name: 'القاعات',
        icon: faHospital
    },
    {
        id:5,
        name: 'أعضاء هيئة التدريس',
        icon: faUserGroup
    }
    
]

const HomeHOD = () => {
    return (
        <section className={`container`}>
            <header className={style.Home_header}>
                <div>
                    <h3>رئيس القسم</h3>
                    <FontAwesomeIcon className='arrows' icon={faAngleDoubleLeft} />
                    <h3><a className="link" href="#">الصفحة الرئيسية</a></h3>
                </div>
                <button className="btn">الجداول</button>
            </header>
            <main className={style.Home_main}>
            {
                services.map(i => {
                    return (
                        <div key={i.id}>
                            <FontAwesomeIcon icon={i.icon} />
                            <p>{i.name}</p>
                        </div>
                    )
                })
            }
            </main>
        </section>
    );
}

export default HomeHOD;