import { faAngleDoubleLeft, faXmark, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { NavLink, useParams } from "react-router-dom";
import style from '../styles/HOD/LecturersHOD.module.css';
import { useEffect } from "react";
import useFetch from '../../hooks/useFetch';
import Loading from '../../components/Loading';

const info = [
    {
        id:1,
        position:'doctor',
        name:'خالد فوزي اشبير',
        department:'هندسة حاسوب'
    },
    {
        id:2,
        position:'doctor',
        name:'رشا بن ثعلب',
        department:'هندسة حاسوب'
    },
    {
        id:3,
        position:'teacher',
        name:'فاطمة بافرج',
        department:'هندسة حاسوب'
    }
]


const Lecturers = () => {
    const {department_id} = useParams();
    const { data:info, isPending, error } = useFetch(`http://localhost:5000/lecturers/department/${department_id}`)

    const handelSubmit = (e) => {
        e.preventDefault();
      };

    const position= (i) => {
        if(i.position === 'doctor')
        return <p> الدكتور\ة:</p>
        else 
        return <p> الاستاذ\ة:</p>
    }

    useEffect(() => {
        const btnAddLecturer = document.querySelector('.btnAddLecturer');
        const addLecturerSection = document.querySelector("#addLecturer");
        const btnCloseAddLecturer = document.querySelector('#colseLogin');

        btnAddLecturer.addEventListener("click", () => {
            addLecturerSection.style.cssText = "display: flex";
          });
      
        btnCloseAddLecturer.addEventListener("click", () => {
            addLecturerSection.style.cssText = "display: none";
          });

          
    },[]);

    return(
        <section className={`container ${style.section_HOD}`}>
            {
                    isPending && <Loading />
            }
            <header className={style.lecturers_header}>
                <div>
                    <h3>رئيس القسم</h3>
                    <FontAwesomeIcon className='arrows' icon={faAngleDoubleLeft} />
                    <h3><NavLink className="link" to="/lecturers">أعضاء هيئة التدريس</NavLink></h3>    
                </div>
                <button className="btn btnAddLecturer">إضافة مدرس</button>
            </header>
            <section className={`container-section ${style.addLecturerSection}`} id='addLecturer'>
                <article className={`center-section`}>
                    <FontAwesomeIcon className={`close-btn ${style.btnClose}`} id="colseLogin" icon={faXmark} size="xl" />
                    <header>
                    <h1>إضافة عضو هيئة تدريس</h1>
                    </header>
                    <form onSubmit={handelSubmit} className={`addForm ${style.addLecturerForm}`}>
                    <label htmlFor="name">الإسم:</label>
                    <section className="input">
                        <FontAwesomeIcon icon={faUser} />
                        <input type="text" name="name" />
                    </section>
                    <label htmlFor="position">الرتبة:</label>
                    <section className={style.labels}>
                        <input type='radio' name="position" value="doctor" />
                        <label htmlFor="doctor">دكتور\ة</label>
                        <input type='radio' name="position" value="teacher" />
                        <label htmlFor="teacher">أستاذ\ة</label>
                    </section>
                    <label htmlFor="collage">الكلية:</label>
                    <section className="input">
                        <input type='text' name="collage" />
                    </section>
                    <label htmlFor="department">القسم:</label>
                    <section className="input">
                        <input type='text' name="department" />
                    </section>
                    <section className="btnContainer">
                        <input className={`btn ${style.btn}`} type="submit" name="submit" value="إضافة" />
                    </section>
                    </form>
                </article>
            </section>
            <main className={style.lecturers_main}>
                {
                    info &&
                    info.map(i => {
                        return(
                            <div key={i.Lecturer_ID}>
                                <section className={style.first_section}>
                                    <label className={style.labels}>
                                    {position(i)}
                                    <p>{i.Lecturer_Name}</p>
                                    </label>
                                    <label className={style.labels}>
                                    <p>قسم: {i.Department_Name}</p>
                                    </label>
                                    <label className={style.labels}>
                                    <input type='checkbox' name='avilable' value='avilable' />
                                    <label>غير متاح</label>
                                    </label>
                                </section>
                                <section>
                                    <label className={style.labels}>
                                        <p>عدد أيام الحضور : </p>
                                        <input type='number' name="daysNum" />
                                    </label>
                                    <label className={style.labels}>
                                        <p> الأيام المتاحة :</p>
                                    </label>
                                    <label className={style.labels}>
                                        <input type='checkbox' name='sunday' value='sunday' />
                                        <p>الأحد</p>
                                        <input type='checkbox' name='monday' value='monday' />
                                        <p>الأثنين</p>
                                        <input type='checkbox' name='tuesday' value='tuesday' />
                                        <p>الثلاثاء</p>
                                        <input type='checkbox' name='wednesday' value='wednesday' />
                                        <p>الأربعاء</p>
                                        <input type='checkbox' name='thursday' value='thursday' />
                                        <p>الخميس</p>
                                    </label>
                                </section>
                            </div>
                        )
                        
                })
                }
            </main>
        </section>
    );
}

export default Lecturers;