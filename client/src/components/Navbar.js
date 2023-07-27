
import { faBars, faBell, faCalendarDay, faGear, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import useFetch from '../hooks/useFetch';
import { useLogout } from '../hooks/useLogout';
import style from './styles/navbar.module.css';

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const { data: department } = useFetch(`http://localhost:5000/departements/${user.Department_ID}`);
    const { data: notification } = useFetch(`http://localhost:5000/notification/${user.Department_ID}`);

    const handelLogout = () => {
        logout();

        window.location.replace('/');
    }

    return (
        <nav className={`${style.navbar}`}>
            <section className={style.listContainer}>
                <p className={`${style.bar}`}><FontAwesomeIcon icon={faBars} size='xl'/></p>
                <p className={`${style.logo}`}>
                    <section>
                        ULTS <FontAwesomeIcon icon={faCalendarDay} />
                    </section>
                </p>
                <ul className={`${style.list}`}>
                    <li><NavLink className={`link`} to='/'>الرئيسية</NavLink></li>
                    <li><NavLink className={`link`} to='/timetables'>الجداول</NavLink></li>
                    <li><NavLink className={`link`} to='/availableHalls'>القاعات الفارغة</NavLink></li>
                    <li><NavLink className={`link`} to='lecturers'>أعضاء هيئة التدريس</NavLink></li>
                    <li><NavLink className={`link`} to='halls'>القاعات</NavLink></li>
                    <li><NavLink className={`link`} to='requests'>مراجعة الطلبات</NavLink></li>
                </ul>
            </section>
            <section className={`${style.iconsContainer}`}>
                <section className={`${style.notivcations} ${style.icons}`}>
                    <p><FontAwesomeIcon icon={faBell} size='xl' /></p>
                    <ul className={`${style.list} ${style.listNotivications}`}>
                        <header>
                            <h4>التنبيهات</h4>
                        </header>
                        {
                            notification && notification.map(n => {
                                return (
                                    <li className={`${style.ntivication}`} key={n.Notification_ID}>
                                        {n.Notification_Text}
                                    </li>
                                )
                            })
                        }
                        {
                            notification && notification.length === 0 && <p className='emptyElement'>لا توجد تنبيهات</p>
                        }
                    </ul>
                </section>
                <section className={`${style.profile} ${style.icons}`}>
                    <p><FontAwesomeIcon icon={faUserCircle} size='xl' /></p>
                    <ul className={`${style.list} ${style.listProfile}`}>
                        <li>{user.name}</li>
                        <li>{department && department.Department_Name}</li>
                        <li><FontAwesomeIcon icon={faGear} />الإعدادات</li>
                        <li><button className={`btn`} onClick={handelLogout}>تسجيل خروج</button></li>
                    </ul>
                </section>
            </section>
        </nav>
    );
}

export default Navbar;