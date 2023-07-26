import { Link, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faUser, 
    faLock,
    faXmark,
    faBars,
    faCalendarDay
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useLogin } from '../hooks/useLogin'
import style from '../pages/styles/home.module.css';

export default function HomeLayout () {
    const { login, isLoading, error } = useLogin();
    const [User_Name, setUser_Name] = useState('');
    const [Password, setPassword] = useState('');

    const handelSubmit = async (e) => {
        e.preventDefault();

        await login(User_Name, Password);
    }

    useEffect(() => {
        const loginBtn = document.querySelector('.btnLogin');
        const loginContainer = document.querySelector('.loginContainer');

        loginBtn.addEventListener('click', () => {
            loginContainer.style.cssText = 'display: flex;'
        })

        const closeLoginBtn = document.querySelector('.close-btn');

        closeLoginBtn.addEventListener('click', () => {
            loginContainer.style.cssText = 'display: none;'
        })
        
    }, [])

    return (
        <div>
            {/* NAVBAR */}
            <nav className={`${style.navbar}`}>
                <section className={style.listContainer}>
                    <p className={`${style.bar}`}><FontAwesomeIcon icon={faBars} size='xl'/></p>
                    <section className={`${style.logo}`}>
                        <section>
                            ULTS <FontAwesomeIcon icon={faCalendarDay} />
                        </section>
                    </section>
                    <ul className={`${style.list}`}>
                        <li><Link className={`link`} to='/'>الرئيسية</Link></li>
                        <li><Link className={`link`} to={`/timetables`}>الجداول</Link></li>
                        <li><Link className={`link`} to='/availableHalls'>القاعات الفارغة</Link></li>
                        <li><a className={`link`} href='#ourSystem'>نظامنا</a></li>
                        <li><a className={`link`} href='#contactUs'>تواصل معنا</a></li>
                    </ul>
                </section>
                <section className='btnContainer'>
                    <button className={`btn btnLogin ${style.btn}`}>تسجيل دخول</button>
                </section>
            </nav>

            <Outlet />

            {/* LOGIN PAGE */}
            <section className={`container-section loginContainer ${style.loginContainer}`}>
                <article className={`center-section ${style.loginSection}`}>
                    <FontAwesomeIcon className={`close-btn ${style.btnClose}`} id='colseLogin' icon={faXmark} size='xl' />
                    <section className={`${style.content}`}>
                        <header>
                            <h1>تسجيل الدخول</h1>
                        </header>
                        <form className={`${style.loginForm}`} onSubmit={handelSubmit}>
                            <label htmlFor='User_Name'>اسم المستخدم:</label>
                            <section className={`${style.input}`}>
                                <FontAwesomeIcon icon={faUser} />
                                <input 
                                    type='text' 
                                    name='User_Name'
                                    required 
                                    value={User_Name}
                                    onChange={e => setUser_Name(e.target.value)}
                                />
                            </section>
                            <label htmlFor='password'>كلمة المرور:</label>
                            <section className={`${style.input}`}>
                                <FontAwesomeIcon icon={faLock} />
                                <input 
                                    type='password' 
                                    name='password' 
                                    required
                                    value={Password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </section>
                            <Link to='/' className={`link ${style.link}`}>نسيت كلمة المرور</Link>
                            { error && <p className='errorMessage'>{error}</p> }
                            <section className='btnContainer'>
                                <input className={`btn ${style.btn}`} type='submit' name='submit' value='تسجيل الدخول' />
                            </section>
                        </form>
                    </section>
                    {
                        !isLoading && 
                        <section className={`${style.img}`}>
                            <img src='/images/Mask Group 23.png' alt='login' />
                        </section>
                    }
                </article>
            </section>
        </div>
    )
}