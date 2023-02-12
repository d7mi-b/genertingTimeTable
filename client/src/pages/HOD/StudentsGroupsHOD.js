import { faAngleDoubleLeft, faPenToSquare, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import style from '../styles/HOD/StudentsGroupsHOD.module.css';


const Batches = [
    {
        level:'مستوى أول',
        batch_NO:19,
        morning:85,
        parallel:20,
        private_payment:0,
        groups_NO:2,
        groups_details:[
            {
                id:1,
                group_Name:'A',
                NO:55,
                type:'صباحي'
            },
            {
                id:2,
                group_Name:'B',
                NO:50,
                type:'صباحي وموازي'
            }
        ]
    }
]


const Students = () => {
    const [amount, setAmount] = useState()
    
    


    useEffect(() => {
        const editbtn= document.getElementById("editbtn")
        const savebtn= document.getElementById("savebtn")

        editbtn.addEventListener("click", () => {
            const amountInput= document.querySelector('#amount')
            const typeInput= document.querySelector('#type') 

            savebtn.style.cssText="display:flex";
            editbtn.style.cssText="display:none";

            amountInput.removeAttribute("readonly")
            amountInput.focus()
            
        })
    },[])
    

    return(
        <section className="container">
            <header className={style.students_header}>
                    <h3>رئيس القسم</h3>
                    <FontAwesomeIcon className='arrows' icon={faAngleDoubleLeft} />
                    <h3><NavLink className="link" to="/students_groups">مجموعات الطلاب</NavLink></h3>    
            </header>
            <main className={style.students_main}>
                {
                    Batches.map(i => {
                        return(
                            <section>
                                <table>
                                    <thead>
                                        <th> </th>
                                        <th>رقم الدفعة</th>
                                        <th>صباحي</th>
                                        <th>موازي</th>
                                        <th>نفقة خاصة</th>
                                        <th>عدد المجموعات</th>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th className={style.table_level}>{i.level}</th>
                                            <td><input type="textbox" value={i.batch_NO} readonly /></td>
                                            <td><input type="textbox" value={i.morning} readonly /></td>
                                            <td><input type="textbox" value={i.parallel} readonly /></td>
                                            <td><input type="textbox" value={i.private_payment} readonly /></td>
                                            <td><input type="textbox" value={i.groups_NO} readonly /></td>
                                            <td><FontAwesomeIcon icon={faPenToSquare}/></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className={style.a1}></div>
                                <div className={style.a2}></div>
                                <div className={style.a3}></div>
                                    {
                                        Batches[0].groups_details.map(j => {
                                            return(
                                                <div key={j.id} className={style.div}>
                                                    <h1>{j.group_Name}</h1>
                                                    <p><input id="amount" type="textbox" value={j.NO} readonly /></p>
                                                    <p><input id="type" type="textbox" value={j.type} readonly /></p>
                                                    <FontAwesomeIcon icon={faPenToSquare} id="editbtn" className={style.editbtn}/>
                                                    <FontAwesomeIcon icon={faSave} id="savebtn" className={style.savebtn}/>
                                                </div>
                                            )
                                        })
                                    }
                                
                            </section>
                        )
                    })
                }
            </main>
        </section>
    )
}

export default Students;