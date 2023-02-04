import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faCalendarDays, 
    faUser, 
    faEnvelope,
    faLock,
    faXmark,
    faBars
} from '@fortawesome/free-solid-svg-icons';
import { faSquareTwitter, faSquareFacebook, faSquareInstagram } from '@fortawesome/free-brands-svg-icons';
import style from './styles/home.module.css';
import { useEffect, useState } from 'react';
import { useLogin } from '../hooks/useLogin';

const features = [
    {
        id: 1,
        title: 'سهولة الاستخدام',
        body: 'تتيح واجهات النظام سهولة ومرونة في استخدام النظام',
        img: '/images/Mask Group 27.png'
    },
    {
        id: 2,
        title: 'خفيف',
        body: 'عملية إنشاء الجدول ستكون في الخادم لذلك لن يكون هناك أي جهد على أجهزة المستخدمين',
        img: '/images/Mask Group 28.png'
    },
    {
        id: 3,
        title: 'إداري',
        body: 'إدارة كافة التفاصيل المتعلقة بإنشاء الجداول  من قاعات ومواد ومعلمين',
        img: '/images/Mask Group 29.png'
    }
]

const Home = () => {
    const { login, isLoading, erroe } = useLogin();
    const [User_Name, setUser_Name] = useState('');
    const [Password, setPassword] = useState('');

    const handelSubmit = async (e) => {
        e.preventDefault();

        await login(User_Name, Password);
    }

    useEffect(() => {
        const featuresSection = document.getElementById('features');
        const featuresList = document.querySelectorAll('.feature');
        
        window.onscroll = () => {
            if (featuresSection.offsetTop <= window.scrollY + 500) {
                featuresList.forEach(e => {
                    e.classList.add('translateAnimation');
                })
            }
            else if (featuresSection.offsetTop >= window.scrollY + 500) {
                featuresList.forEach(e => {
                    e.classList.remove('translateAnimation');
                })
            }
        }

        const loginBtn = document.querySelector('.btnLogin');
        const loginContainer = document.querySelector('.loginContainer');
        const closeLoginBtn = document.querySelector('.close-btn');

        loginBtn.addEventListener('click', () => {
            loginContainer.style.cssText = 'display: flex;'
        })

        closeLoginBtn.addEventListener('click', () => {
            loginContainer.style.cssText = 'display: none;'
        })
    }, [])

    return (
        <div className='homePage'>
            {/* START HERO SECTHION */}
            <div id='home' className={`${style.home}`}>
                {/* NAVBAR */}
                <nav className={`${style.navbar}`}>
                    <section className={style.listContainer}>
                        <p className={`${style.bar}`}><FontAwesomeIcon icon={faBars} size='xl'/></p>
                        <p className={`${style.logo}`}>MHA</p>
                        <ul className={`${style.list}`}>
                            <li><a className={`link`} href='#home'>الرئيسية</a></li>
                            <li><a className={`link`} href='#ourSystem'>نظامنا</a></li>
                            <li><a className={`link`} href='#contactUs'>تواصل معنا</a></li>
                        </ul>
                    </section>
                    <section className='btnContainer'>
                        <button className={`btn btnLogin ${style.btn}`}>تسجيل دخول</button>
                    </section>
                </nav>

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
                                        type='name' 
                                        name='User_Name' 
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
                                        value={Password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </section>
                                <Link to='/' className={`link ${style.link}`}>نسيت كلمة المرور</Link>
                                <section className='btnContainer'>
                                    <input className={`btn ${style.btn}`} type='submit' name='submit' value='تسجيل الدخول' />
                                </section>
                            </form>
                        </section>
                        <section className={`${style.img}`}>
                            <img src='/images/Mask Group 23.png' alt='login' />
                        </section>
                    </article>
                </section>

                <section className={`${style.heroSection}`}>
                    <header>
                        <h1>الحل التقني الأمثل لإنشاء الجداول</h1>
                    </header>
                </section>

                <section className={`${style.sechduleSearch}`}>
                    <article className={`${style.content}`}>
                        <header>
                            <h1>
                                <FontAwesomeIcon icon={faCalendarDays} />
                                استعلام عن الجداول الدراسية 
                            </h1>
                        </header>
                        <p>توفر لك خدمة الاستعلام عن الجداول إمكانية الاطلاع على جدول قسم معين او أعضاء هيئة التدريس.</p>
                    </article>
                    <section className={`btnContainer`}>
                        <button className={`btn ${style.btn}`}>ابدأ الخدمة </button>
                    </section>
                </section>
            </div>
            {/* END HERO SECTION */}

            {/* START OUR SYSTEM SECTION */}
            <section id='ourSystem' className={`${style.ourSystem}`}>
                <article className={`${style.content}`}>
                    <header>
                        <h1>نظامنا</h1>
                    </header>
                    <p>
                        يقوم نظامنا بتوفير العناء للجامعات والكليات وذلك عبر 
                        إعداد الجداول الخاصة بالمحاضرات بطريقة مثالية تناسب 
                        احتياجات وقيود الجامعة والكلية. 
                    </p>
                </article>
                <section className={`${style.img}`}>
                    <img src='/images/Group11.png' alt='Time Table' />
                </section>
            </section>
            {/* END OUR SYSTEM SECTION */}

            {/* START FEATURES SYSTEM */}
            <section className={`${style.features}`} id='features'>
                {
                    features.map(e => {
                        return (
                            <article className={`feature ${style.feature}`} key={e.id}>
                                <section className={`${style.img}`}>
                                    <img src={e.img} alt='featur' />
                                </section>
                                <header>
                                    <h1>{e.title}</h1>
                                </header>
                                <p>{e.body}</p>
                            </article>
                        );
                    })
                }
            </section>
            {/* END FEATURES SYSTEM */}
            
            {/* START CONTACT US SECTION */}
            <section id='contactUs' className={`${style.contactUs}`}>
                <header>
                    <h1>أبدا باستخدام الحل التقني الأمثل لإعداد جداولك وإدارتها</h1>
                </header>
                <form className={`${style.formContactUs}`}>
                    <label htmlFor='name'>الأسم: </label>
                    <section className={`${style.input}`}>
                        <FontAwesomeIcon icon={faUser} />
                        <input type='name' name='name' />
                    </section>
                    <label htmlFor='email'>البريد الإلكتروني: </label>
                    <section className={`${style.input}`}>
                        <FontAwesomeIcon icon={faEnvelope} />
                        <input type='email' name='email' />
                    </section>
                    <section className='btnContainer'>
                        <input className={`btn ${style.btn}`} type='submit' name='submit' value='تواصل معنا' />
                    </section>
                </form>
            </section>
            {/* END CONTACT US SECTION */}

            {/* START FOOTER */}
            <footer className={`${style.footer}`}>
                <header>
                    <h2>MHA</h2>
                </header>
                <p>الحل التقني الأمثل لإنشاء الجداول</p>
                <ul className={style.iconList}>
                    <li><a className='link' href='/'><FontAwesomeIcon icon={faSquareTwitter} /></a></li>
                    <li><a className='link' href='/'><FontAwesomeIcon icon={faEnvelope} /></a></li>
                    <li><a className='link' href='/'><FontAwesomeIcon icon={faSquareFacebook} /></a></li>
                    <li><a className='link' href='/'><FontAwesomeIcon icon={faSquareInstagram} /></a></li>
                </ul>
                <p className={style.copyrigth}>الحقوق محفوظة لجامعة حضرموت - كلية الهندسة والبترول - قسم هندسة الحاسوب - الدفعة الخامسة عشر - المجموعة السابعة &copy; 2023</p>
            </footer>
            {/* END FOOTER */}
        </div>
    );
}

export default Home;