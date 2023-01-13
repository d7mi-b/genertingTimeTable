import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faBars, faBuilding, faCalendarDay, faHome, faTableCellsLarge, faUser } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import style from './styles/sidebar.module.css';

const Sidebar = () => {
    return (
        <aside className={`sidebar ${style.sidebar}`}>
            <FontAwesomeIcon className={`${style.bars}`} icon={faBars} size='xl' />
            <section className={`${style.logo}`}>
                MHA
            </section>
            <ul className={`${style.list}`}>
                <li>
                    <NavLink to='/'><FontAwesomeIcon icon={faHome} /><span>الرئيسية</span></NavLink>
                </li>
                <li>
                    <NavLink to='users'><FontAwesomeIcon icon={faUser} /><span>المستخدمين</span></NavLink>
                </li>
                <li>
                    <NavLink to='bulding'><FontAwesomeIcon icon={faBuilding} /><span>المباني والقاعات</span></NavLink>
                </li>
                <li>
                    <NavLink to='departements'><FontAwesomeIcon icon={faTableCellsLarge} /><span>الأقسام</span></NavLink>
                </li>
                <li>
                    <NavLink to='timetables'><FontAwesomeIcon icon={faCalendarDay} /><span>الجداول</span></NavLink>
                </li>
            </ul>

            <section className='btnContainer'>
                <FontAwesomeIcon className={`${style.logoutIcon}`} icon={faArrowRightFromBracket} size='xl' />
                <button className={`btn ${style.btn}`}>تسجيل الخروج</button>
            </section>
        </aside>
    );
}

export default Sidebar;