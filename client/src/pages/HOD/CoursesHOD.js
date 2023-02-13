import { faAngleDoubleLeft, faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import style from '../styles/HOD/CoursesHOD.module.css';

const Courses_data = {
        firstLevel:{
            firstSemester:[
                {
                    id:1,
                    name:'Defferential Calculus',
                    code:'MATH111',
                    theory:2,
                    practical:0,
                    excersise:2
                },
                {
                    id:2,
                    name:'General Physics I',
                    code:'PHYS111',
                    theory:2,
                    practical:2,
                    excersise:0
                },
                {
                    id:3,
                    name:'General Chemistry I',
                    code:'CHEM111',
                    theory:1,
                    practical:2,
                    excersise:0
                },
                {
                    id:4,
                    name:'Islamic Culture I',
                    code:'ISLAM111',
                    theory:2,
                    practical:0,
                    excersise:0
                },
                {
                    id:5,
                    name:'English Language I',
                    code:'ENG111',
                    theory:2,
                    practical:0,
                    excersise:0
                },
                {
                    id:6,
                    name:'Arabic Language I',
                    code:'ARAB111',
                    theory:2,
                    practical:0,
                    excersise:0
                },
                {
                    id:7,
                    name:'Computer Skills',
                    code:'CSC117',
                    theory:1,
                    practical:2,
                    excersise:0
                }
            ],
            secondSemester:[
                {
                    id:8,
                    name:'Integral Calculus',
                    code:'MATH121',
                    theory:2,
                    practical:0,
                    excersise:2
                },
                {
                    id:9,
                    name:'General Physics II',
                    code:'PHYS121',
                    theory:2,
                    practical:2,
                    excersise:0
                },   
                {
                    id:10,
                    name:'Introduction to Computer Engineering',
                    code:'COE122',
                    theory:2,
                    practical:0,
                    excersise:0
                },  
                {
                    id:11,
                    name:'Islamic Culture II',
                    code:'ISLAM121',
                    theory:2,
                    practical:0,
                    excersise:0
                }, 
                {
                    id:12,
                    name:'English Language II',
                    code:'ENG121',
                    theory:2,
                    practical:0,
                    excersise:0
                }, 
                {
                    id:13,
                    name:'Arabic Language II',
                    code:'ARAB121',
                    theory:2,
                    practical:0,
                    excersise:0
                },  
                {
                    id:14,
                    name:'Computer Programming',
                    code:'COE121',
                    theory:2,
                    practical:2,
                    excersise:0
                }            
            ]
        } 
    }



const Courses = () => {
    
    const handleSubmit = (e) => {
        e.preventDefault();
    }

   const handleChange = (e) => {
        const list = document.querySelector('.list').querySelectorAll('li')
        const value = e.target.value;

        list.forEach(i => {
            i.style.cssText="background-color:transparent"
        })

        e.target.style.cssText="background-color: #DDDADB;"
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
                        <h4></h4>
                        <hr />
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
                        Courses_data.firstLevel.firstSemester.map(i => {
                            return(
                                <div key={i.id} className={style.table_Data}>
                                    <p><FontAwesomeIcon className={style.delete_icon} icon={faTrashCan} /></p>
                                    <hr />
                                    <p>{i.excersise}</p>
                                    <hr />
                                    <p>{i.practical}</p>
                                    <hr />
                                    <p>{i.theory}</p>
                                    <hr />
                                    <p>{i.code}</p>
                                    <hr />
                                    <h4>{i.name}</h4>
                                </div>
                            )
                        })
                        }
                </section>
                <header>
                    <h3>الترم الثاني:</h3>
                </header>
                <section>
                    <div className={style.table_Header}>
                        <h4></h4>
                        <hr />
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
                        Courses_data.firstLevel.secondSemester.map(i => {
                            return(
                                <div key={i.id} className={style.table_Data}>
                                    <p><FontAwesomeIcon icon={faTrashCan} className={style.delete_icon} /></p>
                                    <hr />
                                    <p>{i.excersise}</p>
                                    <hr />
                                    <p>{i.practical}</p>
                                    <hr />
                                    <p>{i.theory}</p>
                                    <hr />
                                    <p>{i.code}</p>
                                    <hr />
                                    <h4>{i.name}</h4>
                                </div>
                            )
                        })
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
                        <input type="text" name="name" className="input" />
                        <label htmlFor="code">كود المادة :</label>
                        <input type="text" name="code" className="input" />
                        <label htmlFor="hours">عدد الساعات :</label>
                        <section>
                            <label htmlFor="theory">نظري</label>
                            <input type='number' name='theory' className="input" />
                            <label htmlFor="practical">عملي</label>
                            <input type='number' name='practical' className="input" />
                            <label htmlFor="excersise">تمارين</label>
                            <input type='number' name='excersise' className="input" />
                        </section>
                    <label htmlFor="semester">الترم :</label>
                    <select className="input">
                        <option  value="first_semester">الترم الأول</option>
                        <option  value="second_semester">الترم الثاني</option>
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