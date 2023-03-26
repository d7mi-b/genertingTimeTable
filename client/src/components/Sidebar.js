import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faBars, faBuilding, faCalendarDay, faGear, faHome, faTableCellsLarge, faUser } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import style from './styles/sidebar.module.css';

const Sidebar = () => {
    const { logout } = useLogout();

    const handelLogout = () => {
        logout();

        window.location.replace('/');
    }

    return (
        <aside className={`sidebar ${style.sidebar}`}>
            <FontAwesomeIcon className={`${style.bars}`} icon={faBars} size='xl' />
            <section className={`${style.logo}`}>
                MHA
            </section>
            <ul className={`${style.list}`}>
                <li>
                    <NavLink to='/' className='link'><FontAwesomeIcon icon={faHome} /><span>الرئيسية</span></NavLink>
                </li>
                <li>
                    <NavLink to='users' className='link'><FontAwesomeIcon icon={faUser} /><span>المستخدمين</span></NavLink>
                </li>
                <li>
                    <NavLink to='bulding' className='link'><FontAwesomeIcon icon={faBuilding} /><span>المباني والقاعات</span></NavLink>
                </li>
                <li>
                    <NavLink to='departements' className='link'><FontAwesomeIcon icon={faTableCellsLarge} /><span>الأقسام</span></NavLink>
                </li>
                <li>
                    <NavLink to='timetables' className='link'><FontAwesomeIcon icon={faCalendarDay} /><span>الجداول</span></NavLink>
                </li>
                <li>
                    <NavLink to='systemState' className='link'><FontAwesomeIcon icon={faGear} /><span>إعدادات النظام</span></NavLink>
                </li>
            </ul>

            <section className='btnContainer'>
                <FontAwesomeIcon className={`${style.logoutIcon}`} onClick={handelLogout} icon={faArrowRightFromBracket} size='xl' />
                <button className={`btn ${style.btn}`} onClick={handelLogout}>تسجيل الخروج</button>
            </section>
        </aside>
    );
}

export default Sidebar;