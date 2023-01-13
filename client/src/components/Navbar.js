
import { faBars, faBell, faGear, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import style from './styles/navbar.module.css';

const Navbar = () => {
    return (
        <nav className={`${style.navbar}`}>
            <section className={style.listContainer}>
                <p className={`${style.bar}`}><FontAwesomeIcon icon={faBars} size='xl'/></p>
                <p className={`${style.logo}`}>MHA</p>
                <ul className={`${style.list}`}>
                    <li><NavLink className={`link`} to='/'>الرئيسية</NavLink></li>
                    <li><a className={`link`} href='#ourSystem'>نظامنا</a></li>
                    <li><a className={`link`} href='#contactUs'>تواصل معنا</a></li>
                </ul>
            </section>
            <section className={`${style.iconsContainer}`}>
                <section className={`${style.notivcations} ${style.icons}`}>
                    <p><FontAwesomeIcon icon={faBell} size='xl' /></p>
                    <ul className={`${style.list} ${style.listNotivications}`}>
                        <header>
                            <h4>التنبيهات</h4>
                        </header>
                        <li className={`${style.ntivication}`}>تنبيه</li>
                        <li className={`${style.ntivication}`}>تنبيه</li>
                        <li className={`${style.ntivication}`}>تنبيه</li>
                    </ul>
                </section>
                <section className={`${style.profile} ${style.icons}`}>
                    <p><FontAwesomeIcon icon={faUserCircle} size='xl' /></p>
                    <ul className={`${style.list} ${style.listProfile}`}>
                        <li>د. مكارم بامطرف</li>
                        <li><FontAwesomeIcon icon={faGear} />الإعدادات</li>
                        <li><button className={`btn`}>تسجيل خروج</button></li>
                    </ul>
                </section>
            </section>
        </nav>
    );
}

export default Navbar;