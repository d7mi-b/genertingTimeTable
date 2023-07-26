import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faBars, faBoxArchive, faBuilding, faBuildingColumns, faCalendarDay, faGear, faHome, faUser } from '@fortawesome/free-solid-svg-icons';
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
                ULTS  <FontAwesomeIcon icon={faCalendarDay} />
            </section>
            <ul className={`${style.list}`}>
                <li>
                    <NavLink to='/' className='link'><FontAwesomeIcon icon={faHome} /><span>الرئيسية</span></NavLink>
                </li>
                <li>
                    <NavLink to='users' className='link'><FontAwesomeIcon icon={faUser} /><span>المستخدمون</span></NavLink>
                </li>
                <li>
                    <NavLink to='colleges' className='link'><FontAwesomeIcon icon={faBuildingColumns} /><span>الكليات</span></NavLink>
                </li>
                <li>
                    <NavLink to='bulding' className='link'><FontAwesomeIcon icon={faBuilding} /><span>المباني والقاعات</span></NavLink>
                </li>
                <li>
                    <NavLink to='timetables' className='link'><FontAwesomeIcon icon={faCalendarDay} /><span>الجداول</span></NavLink>
                </li>
                <li>
                    <NavLink className={`link`} to='/availableHalls'><FontAwesomeIcon icon={faBuilding} /> القاعات الفارغة</NavLink>
                </li>
                <li>
                    <NavLink to='systemState' className='link'><FontAwesomeIcon icon={faGear} /><span>إعدادات النظام</span></NavLink>
                </li>
                <li>
                    <NavLink to='archive' className='link'><FontAwesomeIcon icon={faBoxArchive} /><span>الأرشيف</span></NavLink>
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