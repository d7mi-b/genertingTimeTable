import { faAngleDoubleLeft, faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { NavLink } from "react-router-dom";
import style from '../styles/HOD/ReviewRequestsHOD.module.css';
import { useState } from "react";
import useFetch from '../../hooks/useFetch';
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFetchPut } from '../../hooks/useFetchPut';



const Review_Requests = () => {
    const [state, setState] = useState('import');
    const { user } = useAuthContext();
    const {data:requests} = useFetch(`http://localhost:5000/requests/${user.Department_ID}`)
    const { data:lecturers } = useFetch(`http://localhost:5000/lecturers/department_short/${user.Department_ID}`)
    const { fetchPut } = useFetchPut();
    

    const [Lecturer_ID,setLecturer_ID] = useState('')

    const handelChangeState = e => {
        setState(e.target.value);
    }

    const handleApprove = async (id,Module_ID) => {

        console.log(Module_ID)
        if(Lecturer_ID){
            await fetchPut('http://localhost:5000/requests',{
                "Request_ID":id,
                "Lecturer_ID":Number(Lecturer_ID),
                "Reply":1
            })

            await fetchPut('http://localhost:5000/module/updateLecturer',[{
                Module_ID,
                "Lecturer_ID":Number(Lecturer_ID)
            }])

            const replyDiv = document.getElementById(id)
            const approveSection = document.getElementById(`a${id}`)

            replyDiv.style.cssText = 'display:none'
            approveSection.style.cssText = 'display:flex'
            
        }
        
    }

    const handleDecline = async (id) => {
        const replyDiv = document.getElementById(id)
        const declineSection = document.getElementById(`x${id}`)
        
        replyDiv.style.cssText = 'display:none'
        declineSection.style.cssText = 'display:flex'

        await fetchPut('http://localhost:5000/requests',{
                "Request_ID":id,
                "Lecturer_ID":undefined,
                "Reply":1
            })
    }

    

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
                    requests && state === "export" &&
                    requests.filter(e => e.Sender_ID === user.Department_ID & e.Reply === 0).map(i => {
                        return(
                            <section key={i.Request_ID} className={style.section}>
                                <div className={style.leftBorder}>
                                    <p >القسم: {i.Department_Name}</p>
                                    <p >المقرر الدراسي: {i.Subject_Name}</p>
                                    <p >النوع: {i.Subject_Type_Name}</p>
                                </div>
    
                                <div className={style.reply_DivExport}>
                                    <h4>اسم المدرس :</h4>
                                    <input type="text" className="input" placeholder="بانتظار الرد" defaultValue={i.Lecturer_Name} readOnly />
                                </div>                                    
                            </section>
                        )
                    })

                }
                {
                    requests && state === "export" &&
                    requests.filter(e => e.Sender_ID === user.Department_ID & e.Reply === 1).map(i => {
                        return(
                            <section key={i.Request_ID} className={style.section}>
                                <div className={style.leftBorder}>
                                    <p >القسم: {i.Department_Name}</p>
                                    <p >المقرر الدراسي: {i.Subject_Name}</p>
                                    <p >النوع: {i.Subject_Type_Name}</p>
                                </div>
    
                                <div className={style.reply_DivExport}>
                                    <h4>اسم المدرس :</h4>
                                    <input type="text" className="input" placeholder="تم رفض الطلب" defaultValue={i.Lecturer_Name} readOnly />
                                </div>                                    
                            </section>
                        )
                    })

                }
                {
                    requests && state === "import" &&
                    requests.filter(e => e.Reciver_ID === user.Department_ID & e.Reply === 0).map(i => {
                        return(
                            <section key={i.Request_ID} className={style.section}>
                                <div className={style.leftBorder}>
                                    <p>القسم: {i.Department_Name}</p>
                                    <p>المقرر الدراسي: {i.Subject_Name}</p>
                                    <p>النوع: {i.Subject_Type_Name}</p>
                                </div>
                                <div >
                                    <div className={style.reply_Div}  id={i.Request_ID}>
                                        <select required id="lecturers"  onChange={e=> setLecturer_ID(e.target.value)}>
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
                                            <button className="btn" onClick={() => handleApprove(i.Request_ID,i.Module_ID)}>تأكيد</button>
                                            <button className="btn" onClick={() => handleDecline(i.Request_ID)}>رفض</button>
                                        </div>
                                    </div>
                                    <div className={style.replyAnswer} id={`a${i.Request_ID}`}>
                                        <h2>تم الرد</h2>
                                        <FontAwesomeIcon icon={faCheckCircle} className={style.icon} />
                                    </div>
                                    <div className={style.declineAnswer} id={`x${i.Request_ID}`}>
                                        <h2>تم الرفض</h2>
                                        <FontAwesomeIcon icon={faTimesCircle} className={style.icon} />
                                    </div>
                                </div>
                                    
                            </section>
                        )
                    })

                }
                 {
                    requests && state === "import" &&
                    requests.filter(e => e.Reciver_ID === user.Department_ID & e.Reply === 1).map(i => {
                        return(
                            <section key={i.Request_ID} className={style.section}>
                                <div className={style.leftBorder}>
                                    <p>القسم: {i.Department_Name}</p>
                                    <p>المقرر الدراسي: {i.Subject_Name}</p>
                                    <p>النوع: {i.Subject_Type_Name}</p>
                                </div>
                                
                                <div className={style.reply_DivExport}>
                                    <h4>اسم المدرس :</h4>
                                    <input type="text" className="input" readOnly placeholder='تم رفض الطلب' value={i.Lecturer_Name} />
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