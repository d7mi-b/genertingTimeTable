import { faAngleDoubleLeft, faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import style from '../styles/HOD/CoursesHOD.module.css';
import { useAuthContext } from "../../hooks/useAuthContext";
import useFetch from "../../hooks/useFetch";
import Loading from '../../components/Loading';
import { useFetchPost } from "../../hooks/useFetchPost";
import { useFetchDelete } from "../../hooks/useFetchDelete"


const Courses = () => {
    const { user } = useAuthContext();
    const { data:Courses, isPending } = useFetch(`http://localhost:5000/courses/${user.Department_ID}`)
    const { data:colleges } = useFetch(`http://localhost:5000/colleges`)
    const { fetchPost } = useFetchPost(); 
    const { fetchDelete } = useFetchDelete();
    
    const [first_semester, setFirst_semester] = useState(1);
    const [second_semester, setSecond_semester] = useState(2);
    const [Subject_Name, setSubject_Name] = useState('');
    const [Subject_Code, setSubject_Code] = useState('');
    const [Credit_Theoretical, setCredit_Theory] = useState('0');
    const [Credit_Practical, setCredit_Practical] = useState('0');
    const [Credit_Tutorial, setCredit_Tutorial] = useState('0');
    const [Semester_ID, setSemester_ID] = useState('');
    const [College_ID, setCollege_ID] = useState('')
    
    
    const handleSubmit = async () => {
       
        
        await fetchPost('http://localhost:5000/courses/addCourse', {
            Subject_Name,
            Subject_Code,
            Credit_Theoretical,
            Credit_Practical,
            Credit_Tutorial,
            Semester_ID,
            College_ID,
            "Department_ID":user.Department_ID
        })
    }

   const handleChange = (e) => {
        const list = document.querySelector('.list').querySelectorAll('li')
        const value = e.target.value;

        switch(value){
            case 1 :setFirst_semester(1);
            setSecond_semester(2);
            break;
            case 2 :setFirst_semester(3);
            setSecond_semester(4);
            break;
            case 3 :setFirst_semester(5);
            setSecond_semester(6);
            break;
            case 4 :setFirst_semester(7);
            setSecond_semester(8);
            break;
            case 5 :setFirst_semester(9);
            setSecond_semester(10);
            break;
            default: console.log("there is no value")
        }

        list.forEach(i => {
            i.style.cssText="background-color:transparent"
        })

        e.target.style.cssText="background-color: #DDDADB;"
   }

   const handleDelete = async (id) => {
    
        await fetchDelete('http://localhost:5000/courses/deleteCourse',{
            "Subject_ID":id
        })
        window.location.reload()
   }

    useEffect(() => {
        const list = document.querySelector('.list').querySelector('li')
        list.style.cssText="background-color: #DDDADB;";

        const addCoursebtn = document.getElementById('addCoursebtn')
        const addCourseSection = document.getElementById("addCourse")
        const colseLogin = document.getElementById('colseLogin')

        addCoursebtn.addEventListener('click', () => {
            addCourseSection.style.cssText="display:flex";
        })

        colseLogin.addEventListener('click', () => {
            addCourseSection.style.cssText="display:none";
        })

    },[])

    return(
        <section className={`container ${style.container_courses}`}>
            <ul className={`${style.list} list`}>
                <li value='1' onClick={handleChange}>المستوى الأول</li>
                <hr></hr>
                <li value='2' onClick={handleChange}>المستوى الثاني</li>
                <hr></hr>
                <li value='3' onClick={handleChange}>المستوى الثالث</li>
                <hr></hr>
                <li value='4' onClick={handleChange}>المستوى الرابع</li>
                <hr></hr>
                <li value='5' onClick={handleChange}>المستوى الخامس</li>
            </ul>
            
            <header className={style.courses_header}>
                    <h3>رئيس القسم</h3>
                    <FontAwesomeIcon className='arrows' icon={faAngleDoubleLeft} />
                    <h3><NavLink className="link" to="/Courses">المقررات الدراسية</NavLink></h3>    
            </header>

            <main className={style.courses_main}>
                 <header>
                    <h3>الترم الأول: </h3>
                    <button className="btn" id="addCoursebtn">إضافة مادة</button>
                </header>
                <section>
                    <div className={style.table_Header}>
                        <h4> </h4>
                        <h4>تمارين</h4>
                        <hr />
                        <h4>عملي</h4>
                        <hr />
                        <h4>نظري</h4>
                        <hr />
                        <h4>Code</h4>
                        <hr />
                        <h3 className={style.course_name}>المادة</h3>
                    </div>
                    {
                        isPending && <Loading />
                    }
                        {
                            Courses &&
                        Courses.filter(e => e.Semester_ID === first_semester).map(i => {
                            return( 
                                <div key={i.Subject_ID} className={style.table_Data}>
                                    <p><FontAwesomeIcon className={style.delete_icon} icon={faTrashCan}
                                    onClick={() => {handleDelete(i.Subject_ID)}} /></p>
                                    <hr />
                                    <p>{i.Credit_Tutorial}</p>
                                    <hr />
                                    <p>{i.Credit_Practical}</p>
                                    <hr />
                                    <p>{i.Credit_Theoretical}</p>
                                    <hr />
                                    <p>{i.Subject_Code}</p>
                                    <hr />
                                    <h4>{i.Subject_Name}</h4>
                                </div>
                            )
                           
                        })
                        }
                        {
                            Courses &&
                            Courses.filter(e => e.Semester_ID === first_semester).length === 0 && 
                            <div className={style.table_Data}>
                                <h4>لايوجد مواد لهذا الترم</h4>
                            </div>
                        }
                </section>
                <header>
                    <h3>الترم الثاني:</h3>
                </header>
                <section>
                    <div className={style.table_Header}>
                        <h4> </h4>
                        <h4>تمارين</h4>
                        <hr />
                        <h4>عملي</h4>
                        <hr />
                        <h4>نظري</h4>
                        <hr />
                        <h4>Code</h4>
                        <hr />
                        <h3 className={style.course_name}>المادة</h3>
                    </div>
                        {
                            Courses && 
                        Courses.filter(e => e.Semester_ID === second_semester).map(i => {
                            return(
                                <div key={i.Subject_ID} className={style.table_Data}>
                                    <p><FontAwesomeIcon icon={faTrashCan} className={style.delete_icon} 
                                    onClick={() => {handleDelete(i.Subject_ID)}} /></p>
                                    <hr />
                                    <p>{i.Credit_Tutorial}</p>
                                    <hr />
                                    <p>{i.Credit_Practical}</p>
                                    <hr />
                                    <p>{i.Credit_Theoretical}</p>
                                    <hr />
                                    <p>{i.Subject_Code}</p>
                                    <hr />
                                    <h4>{i.Subject_Name}</h4>
                                </div>
                            )
                        })
                        }
                        {
                            Courses &&
                            Courses.filter(e => e.Semester_ID === second_semester).length === 0 && 
                            <div className={style.table_Data}>
                                <h4>لايوجد مواد لهذا الترم</h4>
                            </div>
                        }
                </section>
            </main>
            <section className={`container-section ${style.addCourse}`} id='addCourse'>
                <article className={`center-section`}>
                    <FontAwesomeIcon className={`close-btn`} id="colseLogin" icon={faXmark} size="xl" />
                    <header>
                        <h1>إضافة مادة جديدة</h1>
                    </header>
                    <form onSubmit={handleSubmit} className={`addForm ${style.addCourseForm}`}>
                        <label htmlFor="name">اسم المادة:</label>
                        <input type="text" name="name" className="input" required onChange={e => setSubject_Name(e.target.value)} />
                        <label htmlFor="code">كود المادة :</label>
                        <input type="text" name="code" className="input" required onChange={e => setSubject_Code(e.target.value)}/>
                        <label htmlFor="hours">عدد الساعات :</label>
                        <section>
                            <label htmlFor="theory">نظري</label>
                            <input type='number' name='theory' className="input" onChange={e => setCredit_Theory(e.target.value)} />
                            <label htmlFor="practical">عملي</label>
                            <input type='number' name='practical' className="input" onChange={e => setCredit_Practical(e.target.value)} />
                            <label htmlFor="excersise">تمارين</label>
                            <input type='number' name='excersise' className="input" onChange={e => setCredit_Tutorial(e.target.value)} />
                        </section>
                    <label htmlFor="semester">الترم :</label>
                    <select className="input" required onChange={e => setSemester_ID(e.target.value)}>
                        <option>اختر الترم</option>
                        <option  value={first_semester}>الترم الأول</option>
                        <option  value={second_semester}>الترم الثاني</option>
                    </select>
                    <label htmlFor="college">الكلية :</label>
                    <select className="input" required onChange={e => setCollege_ID(e.target.value)}>
                        <option>اختر الكلية</option>
                        {
                            colleges &&
                            colleges.map(i => {
                                return(
                                    <option key={i.College_ID} value={i.College_ID}>{i.College_Name}</option>
                                )
                            })  
                        }
                    </select>
                    <section className="btnContainer">
                        <input className={`btn ${style.btn}`} type="submit" name="submit" value="إضافة" />
                    </section>
                    </form>
                </article>
            </section>
        </section>
    )
}

export default Courses;