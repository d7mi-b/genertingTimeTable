import { faAngleDoubleLeft, faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { NavLink } from "react-router-dom";
import style from '../styles/HOD/ReviewRequestsHOD.module.css';
import { useEffect, useState } from "react";

const info = [
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


const Review_Requests = () => {
    const [state, setState] = useState('import');

    const handelChangeState = e => {
        setState(e.target.value);
    }

    useEffect(() => {

        const btnApprove = document.querySelector('#approve')
        const btnDecline = document.querySelector('#decline')
        const replyDiv = document.querySelector('#replyForm')
        const approvedSection = document.querySelector('#approveSection')
        const declineSection = document.querySelector('#declineSection')

        btnApprove.addEventListener('click', () => {
            approvedSection.style.cssText = 'display:flex'
            replyDiv.style.cssText = 'display:none'
        });

        btnDecline.addEventListener('click', () => {
            declineSection.style.cssText = 'display:flex'
            replyDiv.style.cssText = 'display:none'
        });


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
                    info.filter(e => state === e.type).map(i => {
                        return(
                            <section key={i.id} className={style.section}>
                                <div className={style.leftBorder}>
                                    <p>القسم: {i.department}</p>
                                    <p>المقرر الدراسي: {i.course}</p>
                                    <p>المستوى: {i.level}</p>
                                </div>
                                <div className={style.reply_Div} id='replyForm'>
                                    <select name="lecturers">
                                        <option>د.خالد فوزي اشبير</option>
                                        <option>د.رشا بن ثعلب</option>
                                        <option>أ.فاطمة بافرج</option>
                                        <option>أ.عصمت</option>
                                    </select>
                                    <div>
                                        <button className="btn" id='approve'>تأكيد</button>
                                        <button className="btn" id='decline'>رفض</button>
                                    </div>
                                </div>
                                <div className={style.replyAnswer} id='approveSection'>
                                    <h2>تم الرد</h2>
                                    <FontAwesomeIcon icon={faCheckCircle} className={style.icon} />
                                </div>
                                <div className={style.declineAnswer} id='declineSection'>
                                    <h2>تم الرفض</h2>
                                    <FontAwesomeIcon icon={faTimesCircle} className={style.icon} />
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