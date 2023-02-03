import { faAngleDoubleLeft, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
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
                group_Name:'A',
                NO:55,
                type:'صباحي'
            },
            {
                group_Name:'B',
                NO:50,
                type:'صباحي وموازي'
            }
        ]
    }
]


const Students = () => {
    return(
        <section className="container">
            <header className={style.students_header}>
                    <h3>رئيس القسم</h3>
                    <FontAwesomeIcon className='arrows' icon={faAngleDoubleLeft} />
                    <h3><NavLink className="link" to="/review_requests">مجموعات الطلاب</NavLink></h3>    
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
                                            <td>{i.batch_NO}</td>
                                            <td>{i.morning}</td>
                                            <td>{i.parallel}</td>
                                            <td>{i.private_payment}</td>
                                            <td>{i.groups_NO}</td>
                                            <td><FontAwesomeIcon icon={faPenToSquare}/></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </section>
                        )
                    })
                }
            </main>
        </section>
    )
}

export default Students;