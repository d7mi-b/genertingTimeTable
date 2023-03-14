import { faAngleDoubleLeft, faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { NavLink } from "react-router-dom";
import style from '../styles/HOD/ReviewRequestsHOD.module.css';
import { useEffect, useState } from "react";
import useFetch from '../../hooks/useFetch';
import { useAuthContext } from "../../hooks/useAuthContext";


/*const info = [
    {
        id:1,
        department:'هندسة إلكترونية واتصالات',
        course:'programming 1',
        level:'الثاني',
        type:'import',
        state:false
    },
    {
        id:2,
        department:'هندسة مدنية',
        course:'programming 1',
        level:'الثاني',
        type:'export',
        state:false
    }
]
*/

const Review_Requests = () => {
    const [state, setState] = useState('import');
    const { user } = useAuthContext();
    const {data:exportedData} = useFetch(`http://localhost:5000/requests/exportRequests/${user.Department_ID}`)
    const {data:importedData} = useFetch(`http://localhost:5000/requests/importRequests/${user.Department_ID}`)
    const { data:lecturers, isPending, error } = useFetch(`http://localhost:5000/lecturers/department/${user.Department_ID}`)
    

    const handelChangeState = e => {
        setState(e.target.value);
    }

    const handleApprove = (id) => {
        
        const replyDiv = document.querySelector(`form${id}`)
        const approvedSection = document.getElementById(id)

        approvedSection.style.cssText = 'display:flex'
        replyDiv.style.cssText = 'display:none'

    }

    const handleDecline = (id) => {
        
        const declineSection = document.getElementById(id)
        console.log(declineSection)
        const replyDiv = document.querySelector(`form${id}`)

        declineSection.style.cssText = 'display:flex'
        replyDiv.style.cssText = 'display:none'
    }

    useEffect(() => {
    


    },[])

    return(
        <section className={style.review_container}>
            <header className={style.requests_header}>
                    <h3>رئيس القسم</h3>
                    <FontAwesomeIcon className='arrows' icon={faAngleDoubleLeft} />
                    <h3><NavLink className="link" to="/review_requests">مراجعة الطلبات</NavLink></h3>    
            </header>
            <main className={style.requests_main}>
                <select value={state} onChange={handelChangeState}>
                    <option name='import' value='import'>الواردة</option>
                    <option name='export' value='export'>الصادرة</option>
                </select>
                {
                    exportedData && state === "export" &&
                    exportedData.map(i => {
                        return(
                            <section key={i.Request_ID} className={style.section}>
                                <div className={style.leftBorder}>
                                    <p key={i.Department_ID}>القسم: {i.Department_Name}</p>
                                    <p key={i.Subject_Name}>المقرر الدراسي: {i.Subject_Name}</p>
                                    <p key={i.Subject_Type}>النوع: {i.Subject_Type}</p>
                                </div>
    
                                <div className={style.reply_DivExport}>
                                    <h4>اسم المدرس :</h4>
                                    <input type="text" className="input" placeholder="بانتظار الرد" value={i.Lecturer_Name} readOnly />
                                </div>                                    
                            </section>
                        )
                    })

                }
                {
                    importedData && state === "import" &&
                    importedData.map(i => {
                        return(
                            <section key={i.Request_ID} className={style.section}>
                                <div className={style.leftBorder}>
                                    <p>القسم: {i.Department_Name}</p>
                                    <p>المقرر الدراسي: {i.Subject_Name}</p>
                                    <p>النوع: {i.Subject_Type}</p>
                                </div>
                                    <div>
                                        <div className={style.reply_Div} id={`form${i.Request_ID}`}>
                                            <select required name="lecturers">
                                                <option>اختر المدرس</option>
                                                {
                                                    lecturers &&
                                                    lecturers.map(i => {
                                                        return(
                                                        <option key={i.lecturer_ID} value={i.Lecturer_ID}>{i.Lecturer_Name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <div>
                                                <button className="btn" onClick={() => handleApprove(i.Request_ID)}>تأكيد</button>
                                                <button className="btn" onClick={() => handleDecline(i.Sender_ID)}>رفض</button>
                                            </div>
                                        </div>
                                        <div className={style.replyAnswer} id={i.Request_ID}>
                                            <h2>تم الرد</h2>
                                            <FontAwesomeIcon icon={faCheckCircle} className={style.icon} />
                                        </div>
                                        <div className={style.declineAnswer} id={i.Request_ID}>
                                            <h2>تم الرفض</h2>
                                            <FontAwesomeIcon icon={faTimesCircle} className={style.icon} />
                                        </div>
                                    </div>
                                    
                            </section>
                        )
                    })

                }
            </main>
        </section>
    )
}

export default Review_Requests;