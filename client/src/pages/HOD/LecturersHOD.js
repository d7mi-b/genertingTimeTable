import { faAngleDoubleLeft, faXmark, faUser, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { NavLink } from "react-router-dom";
import style from '../styles/HOD/LecturersHOD.module.css';
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import useFetch from '../../hooks/useFetch';
import { useFetchPost } from "../../hooks/useFetchPost";
import { useFetchPut } from "../../hooks/useFetchPut";
import { useFetchDelete } from "../../hooks/useFetchDelete";
import Loading from '../../components/Loading';


const Lecturers = () => {
    const { user } = useAuthContext();
    const { data:info, isPending, error } = useFetch(`http://localhost:5000/lecturers/department/${user.Department_ID}`)
    const { fetchPost} = useFetchPost()
    const { fetchPut } = useFetchPut()
    const { fetchDelete } = useFetchDelete()

    const [Lecturer_ID,setLecturer_ID] = useState('')
    const [Lecturer_Name, setLecturer_Name] = useState('');
    const [Department_ID, setDepartment_id] = useState(user.Department_ID);
    const [Rank_, setRank] = useState('');
    const [Not_Available] = useState('0');
    const [NO_Available_Days, setNO_AV_Days] = useState(null);
    const [Sunday, setSunday] = useState(null);
    const [Monday, setMonday] = useState(null);
    const [Tuesday, setTuesday] = useState(null);
    const [Wednesday, setWednesday] = useState(null);
    const [Thursday, setThursday] = useState(null);


    const handelSubmit =async () => {
    
        await fetchPost(`http://localhost:5000/lecturers/addLecturer`,
        {
            Lecturer_Name,
            Department_ID,
            Rank_,
            Not_Available,
            NO_Available_Days,
            "Sunday":'0',
            "Monday":'0',
            "Tuesday":'0',
            "Wednesday":'0',
            "Thursday":'0'
        })
      };

    const handleRank = (e) => {
    
        if(e === 'doctor')
        return <p> الدكتور\ة:</p>
        else 
        return <p> الاستاذ\ة:</p>
    }

    const handleNotAv = async (id, state) => {
       
       if(state){

            await fetchPut(`http://localhost:5000/lecturers/updateLecturer`,{
                "Lecturer_ID":id,
                "Not_Available":"0"
            })  
        }
        else{
        
            await fetchPut(`http://localhost:5000/lecturers/updateLecturer`,{
                "Lecturer_ID":id,
                "Not_Available":"1"
            })
        }
        
        window.location.reload()
}
    

    const openDeleteSection = (id) => {
        setLecturer_ID(id)
        const deleteSection = document.getElementById('deleteSection');
        deleteSection.style.cssText = "display: flex";
    }

    const cancelDeleteSection = () => {
        const deleteSection = document.getElementById('deleteSection');
        deleteSection.style.cssText = "display: none";
    }
    
    const handleDelete = async () => {
        
        await fetchDelete('http://localhost:5000/lecturers/deleteLecturer',{
            Lecturer_ID
        })

        window.location.reload()
    }

    const handleUpdate = async (id) => {

            await fetchPut(`http://localhost:5000/lecturers/updateLecturer`,{
            "Lecturer_ID":id,
            NO_Available_Days,
            Sunday,
            Monday,
            Tuesday,
            Wednesday,
            Thursday
        })  
        
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
        <section className={`container ${style.section_HOD} ${style.container}`}>
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
                            <input type="text" name="L_name" onChange={e => setLecturer_Name(e.target.value)}/>
                        </section>
                        <label htmlFor="position">الرتبة:</label>
                        <section className={style.labels}>
                            <input type='radio' name="position" value="doctor" onClick={e => setRank(e.target.value)}/>
                            <label htmlFor="doctor">دكتور\ة</label>
                            <input type='radio' name="position" value="teacher" onClick={e => setRank(e.target.value)}/>
                            <label htmlFor="teacher">أستاذ\ة</label>
                        </section>
                
                        
                        <section className="btnContainer">
                            <input className={`btn ${style.btn}`} type="submit" name="submit" value="إضافة" />
                        </section>
                    </form>
                </article>
            </section>
            <main className={style.lecturers_main}>
                {error && <p>{error}</p>}
                {
                    info &&
                    info.filter(e => e.Not_Available === 0).map(i => {
                        return(
                            <div id={i.Lecturer_ID} key={i.Lecturer_ID} className={style.lecturer_box}>
                                <section className={style.first_section}>
                                    <label className={style.labels}>
                                    {handleRank(i.Rank_)}
                                    <h4>{i.Lecturer_Name}</h4>
                                    </label>
                                    <label className={style.labels}>
                                    <h4>قسم: {i.Department_Name}</h4>
                                    </label>
                                    <label className={style.labels}>
                                        <input type='checkbox' name='Not_avilable' value='Not_avilable' 
                                        onClick={e => handleNotAv(i.Lecturer_ID,i.Not_Available)} />
                                        <label>غير متاح</label>
                                    </label>
                                </section>
                                <section>
                                    <div className={style.labels}>
                                        <p>عدد أيام الحضور : </p>
                                        <input type='number' name="daysNum" 
                                        defaultValue={i.NO_Available_Days}
                                        onChange={e => setNO_AV_Days(e.target.value)}/>
                                    </div>
                                    <div className={style.labels}>
                                        <p> الأيام المتاحة :</p>
                                    </div>
                                    <div className={style.editbtn}>
                                        <div className={style.labels}>
                                            {i.Sunday === 1 && <input type='checkbox' name='sunday' defaultChecked
                                             onChange={() => setSunday("0")} />}
                                            {i.Sunday === 0 && <input type='checkbox' name='sunday' 
                                             onChange={() => setSunday("1")} />}
                                            <p>الأحد</p>
                                            {i.Monday === 1 && <input type='checkbox' name='monday' defaultChecked
                                             onChange={() => setMonday("0")} />}
                                            {i.Monday === 0 && <input type='checkbox' name='monday' 
                                             onChange={() => setMonday("1")} />}
                                            <p>الأثنين</p>
                                            {i.Tuesday === 1 && <input type='checkbox' name='Tuesday' defaultChecked
                                             onChange={() => setTuesday("0")} />}
                                            {i.Tuesday === 0 && <input type='checkbox' name='Tuesday' 
                                             onChange={() => setTuesday("1")} />}
                                            <p>الثلاثاء</p>
                                            {i.Wednesday === 1 && <input type='checkbox' name='Wednesday' defaultChecked
                                             onChange={() => setWednesday("0")} />}
                                            {i.Wednesday === 0 && <input type='checkbox' name='Wednesday' 
                                             onChange={() => setWednesday("1")} />}
                                            <p>الأربعاء</p>
                                            {i.Thursday === 1 && <input type='checkbox' name='Thursday' defaultChecked
                                             onChange={() => setThursday("0")} />}
                                            {i.Thursday === 0 && <input type='checkbox' name='Thursday' 
                                             onChange={() => setThursday("1")} />}
                                            <p>الخميس</p>
                                        </div>
                                        <div>
                                            <button className="btn" onClick={() => handleUpdate(i.Lecturer_ID)}>حفظ</button>
                                            <button className="btn" onClick={() => openDeleteSection(i.Lecturer_ID)}><FontAwesomeIcon icon={faTrash} className={style.deletebtn}/></button>
                                        </div>
                                    </div>
                                </section>
                                <section className={`container-section ${style.deleteLecturer}`} id='deleteSection'>
                                    <article className={`center-section`}>
                                        <header>
                                            <h1>هل انت متأكد من حذف المحاضر</h1>
                                        </header>                        
                                        <section className={style.deletebtns}>
                                            <button className='btn' onClick={handleDelete}>حذف</button>
                                            <button className='btn' id='cancel' onClick={cancelDeleteSection}>إلغاء</button>
                                        </section>
                                    </article>
                                </section>
                            </div>
                        )
                        
                })
                }
                {
                    info &&
                    info.filter(e => e.Not_Available === 1).map(i => {
                        return(
                            <div id={i.Lecturer_ID} key={i.Lecturer_ID} className={`${style.selected} ${style.lecturer_box}`}>
                                <section className={style.first_section}>
                                    <label className={style.labels}>
                                    {handleRank(i.Rank_)}
                                    <p>{i.Lecturer_Name}</p>
                                    </label>
                                    <label className={style.labels}>
                                    <p>قسم: {i.Department_Name}</p>
                                    </label>
                                    <label className={style.labels}>
                                        <input type='checkbox' name='Not_avilable' value='Not_avilable' 
                                        defaultChecked
                                        onClick={e => handleNotAv(i.Lecturer_ID,i.Not_Available)} />
                                        <label>غير متاح</label>
                                    </label>
                                </section>
                                <section>
                                    <label className={style.labels}>
                                        <p>عدد أيام الحضور : </p>
                                        <input type='number' name="daysNum" defaultValue={i.NO_Available_Days} disabled={true}/>
                                    </label>
                                    <label className={style.labels}>
                                        <p> الأيام المتاحة :</p>
                                    </label>
                                    <label className={style.labels}>
                                        <input type='checkbox' name='sunday' value='sunday' disabled={true} />
                                        <p>الأحد</p>
                                        <input type='checkbox' name='monday' value='monday' disabled={true}/>
                                        <p>الأثنين</p>
                                        <input type='checkbox' name='tuesday' value='tuesday' disabled={true}/>
                                        <p>الثلاثاء</p>
                                        <input type='checkbox' name='wednesday' value='wednesday' disabled={true}/>
                                        <p>الأربعاء</p>
                                        <input type='checkbox' name='thursday' value='thursday' disabled={true}/>
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