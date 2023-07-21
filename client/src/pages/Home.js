import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faCalendarDays, 
    faUser, 
    faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import { faSquareTwitter, faSquareFacebook, faSquareInstagram } from '@fortawesome/free-brands-svg-icons';
import style from './styles/home.module.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

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
    }, [])


    return (
        <div className='homePage'>
            {/* START HERO SECTHION */}
            <div id='home' className={`${style.home}`}>

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
                        <Link to='/timetables' className={`link ${style.btn}`}>ابدأ الخدمة </Link>
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