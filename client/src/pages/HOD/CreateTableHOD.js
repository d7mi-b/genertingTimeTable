import { faAngleDoubleLeft, faXmark, faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import style from '../styles/HOD/CreateTableHOD.module.css';
import useFetch from '../../hooks/useFetch'
import { useAuthContext } from "../../hooks/useAuthContext";
import Loading from '../../components/Loading';
import { useFetchPut } from '../../hooks/useFetchPut';
import { useFetchPost } from '../../hooks/useFetchPost';



const CreateTable = () => {
    const { user } = useAuthContext();
    const [Department_ID] = useState(Number(user.Department_ID))
    const {data: lecturers} = useFetch(`http://localhost:5000/lecturers/department/${Department_ID}`)
    const {data:hall_types} = useFetch(`http://localhost:5000/hallTypes`)
    const {data:departments} = useFetch(`http://localhost:5000/departements`)
    const {data:modules, isPending} = useFetch(`http://localhost:5000/module/${Department_ID}`)
    const { fetchPut } = useFetchPut();
    const { fetchPost } = useFetchPost();
    
    
    const [semesterSelected] = useState('first_semester');
    const [level_one, setlevel_one] = useState(1);
    const [level_two, setlevel_two] = useState(3);
    const [level_three, setlevel_three] = useState(5);
    const [level_four, setlevel_four] = useState(7);
    const [level_five, setlevel_five] = useState(9);
    const [semester, setSemester] = useState(level_one)
    //const [hallTypeID, setHallTypeID] = useState('')
    const [Subject_ID, setSubject_ID] = useState('')
    const [Subject_Name, setSubject_Name] = useState('')
    const [Subject_Type, setSubject_Type] = useState("")
    const [Subject_Type_ID, setSubject_TypeID] = useState("")
    const [Reciver_ID, setReciver_ID] = useState('')
    const [lecturerArray] = useState([])
    const [hallArray] = useState([])



    const handleSubmit = async (e) => {
        e.preventDefault()
        
        await fetchPost(`http://localhost:5000/requests`,{
                Subject_ID,
                "Sender_ID":Department_ID,
                "Reciver_ID":Number(Reciver_ID),
                "Subject_Type":Subject_Type_ID
            })

        const requestSection = document.getElementById('sendRequest')
        requestSection.style.cssText = 'display: none';
    }

    const handleSave = async () => {
        if(hallArray.length != 0)
        {await fetchPut(`http://localhost:5000/module/updateHall`, hallArray)}
        if(lecturerArray.length != 0)
        {await fetchPut(`http://localhost:5000/module/updateLecturer`, lecturerArray)}

        const btn = document.querySelector('#btn')
        const check = document.querySelector('#check')

        btn.style.cssText = 'display: none';

        check.style.cssText = 'display:inline';

        setTimeout(() =>{
            btn.style.cssText = 'display: inline';

            check.style.cssText = 'display:none';
        } ,2000)
        
    }

    const handleChange = (e) => {
        const list = document.querySelector(".list").querySelectorAll("li");
        const divLink = document.querySelector(".DivLink")
        const value = e.target.value;
        
        list.forEach(i => {
            i.style.cssText="background-color:transparent"
        })
        e.target.style.cssText="background-color: var(--card-color);"
        
        switch(value){
            case 1 : divLink.style.cssText="top:25px";
            setSemester(level_one)
            break;
            case 2 : divLink.style.cssText="top:100px";
            setSemester(level_two)
            break;
            case 3 : divLink.style.cssText="top:175px";
            setSemester(level_three)
            break;
            case 4 : divLink.style.cssText="top:250px";
            setSemester(level_four)
            break;
            case 5 : divLink.style.cssText="top:325px";
            setSemester(level_five)
            break;
            default: console.log('Nothing')
        }
    }

    const handleSelect = (LecturerID,Module_ID,SubjectID,SubjectName,SubjectType,SubjectTypeID) => {
        
        const requestSection = document.getElementById('sendRequest')

        if(LecturerID === 'else'){
            requestSection.style.cssText = 'display: flex';
            setSubject_ID(SubjectID)
            setSubject_Name(SubjectName)
            setSubject_Type(SubjectType)
            setSubject_TypeID(SubjectTypeID)

            lecturerArray.push({
                'Lecturer_ID':null,
                Module_ID
            })

        }
        else{
            
            lecturerArray.push({
                'Lecturer_ID':Number(LecturerID),
                Module_ID
            })

        }

    }

    const handleSetHall = (e,Module_ID) => {
        
        hallArray.push({
            Module_ID,
            'Hall_Type_ID':Number(e)
        })
    }


    useEffect(() => {
        const list = document.querySelector(".list").querySelector("li");
        list.style.cssText="background-color: var(--card-color);";
        
        if(semesterSelected !== 'first_semester'){
            setlevel_one(2);
            setlevel_two(4);
            setlevel_three(6);
            setlevel_four(8);
            setlevel_five(10)
        }

        const closebtn = document.getElementById('colseLogin');
        const requestSection = document.getElementById('sendRequest')

        closebtn.addEventListener('click', () => {
            requestSection.style.cssText = 'display: none';
        })

        
        

    },[semesterSelected])

    return(
        <section className="container">
            <header className={style.createTable_header}>
                <div>
                    <h3>رئيس القسم</h3>
                    <FontAwesomeIcon className='arrows' icon={faAngleDoubleLeft} />
                    <h3><NavLink className="link" to="/create_table">إنشاء جدول جديد</NavLink></h3>    
                </div>
                <div>
                    <h3>السنة الدراسية 2022\2023 - الترم الأول</h3>
                </div>
            </header>
            <article className={style.createTable_main}>
                <main>
                    {
                        isPending && <Loading />
                    }
                    {
                        modules &&
                        modules.filter(e => e.Semester_ID === semester).map(i => {
                            return(

                                <div key={i.Module_ID} className={style.courseDiv}>
                                <select id={i.Module_ID}
                                onChange={e => handleSelect(e.target.value,i.Module_ID,i.Subject_ID,i.Subject_Name,i.Subject_Type,i.Subject_Type_ID)}
                                defaultValue={i.Lecturer_ID}>
                                <option>اختر المدرس : </option>
                                {
                                    lecturers && 
                                    lecturers.map(i => {
                                        return(
                                        <option key={i.Lecturer_ID} value={i.Lecturer_ID}>{i.Lecturer_Name}</option>
                                        )
                                    })
                                }
                                <option value='else'>غير ذلك ..</option>
                            </select>
                            <hr />
                            <select defaultValue={i.Hall_Type_ID} required onChange={e => handleSetHall(e.target.value,i.Module_ID)}>
                                <option>اختر نوع القاعة :</option>
                                {
                                    hall_types && 
                                    hall_types.map(i => {
                                        return(
                                            <option key={i.Hall_Type_ID} value={i.Hall_Type_ID}>{i.Type_Name}</option>
                                        )
                                    })
                                }
                            </select>
                            <hr />
                            <p>{i.Subject_Type}</p>
                            <hr />
                            <h4>{i.Subject_Name}</h4>
                            </div>
                                    
                            )
                        })
                    }
                   
                    {
                        modules &&
                        modules.filter(e => e.Semester_ID === semester).length === 0 &&
                        <div className={style.courseDiv}>لايوجد مواد لهذا المستوى</div>
                        
                    }
                </main>
                <section className={`container-section ${style.sendRequest}`} id='sendRequest'>
                    <article className={`center-section`}>
                        <FontAwesomeIcon className={`close-btn`} id="colseLogin" icon={faXmark} size="xl" />
                        <header>
                            <h1>إرسال طلب مدرس</h1>
                        </header>
                        <form onSubmit={handleSubmit} className={`addForm ${style.sendRequestForm}`}>
                        <label htmlFor="course">المادة :{Subject_Name}</label> 
                        <label htmlFor="courseType">النوع :{Subject_Type}</label>                                
                        <label htmlFor="department">القسم :</label>
                        <select onChange={e => setReciver_ID(e.target.value)} className="input">
                            <option  value="choose">اختر القسم</option>
                            {
                                departments &&
                                departments.map(i => {
                                    return(
                                        <option key={i.Department_ID} value={i.Department_ID}>{i.Department_Name}</option>
                                    )
                                })
                            }
                        </select>
                        <section className="btnContainer">
                            <input className={`btn ${style.btn}`} type="submit" name="submit" value="إرسال" />
                        </section>
                        </form>
                    </article>
                </section>
                <div className={`${style.link} DivLink`}/>
                <ul className={`list ${style.listDiv}`}>
                    <li value='1' onClick={handleChange}>1</li>
                    <div/>
                    <li value='2' onClick={handleChange}>2</li>
                    <div/>
                    <li value='3' onClick={handleChange}>3</li>
                    <div/>
                    <li value='4' onClick={handleChange}>4</li>
                    <div/>
                    <li value='5' onClick={handleChange}>5</li>
                </ul>
            </article>
            <footer className={style.createTable_footer}>
                <button className={`btn ${style.button}`} id='btn' onClick={handleSave}>حفظ</button>
                <FontAwesomeIcon icon={faCheckCircle} id='check' className={style.check} />
            </footer>
        </section>
    )
}

export default CreateTable;