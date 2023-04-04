import { faAngleDoubleLeft, faPenToSquare,faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { useState } from "react";
import { NavLink } from "react-router-dom";
import style from '../styles/HOD/StudentsGroupsHOD.module.css';
import useFetch from '../../hooks/useFetch';
import { useAuthContext } from "../../hooks/useAuthContext";
import Loading from '../../components/Loading';
import { useFetchDelete } from '../../hooks/useFetchDelete';
import { useFetchPut } from '../../hooks/useFetchPut';
import { useFetchPost } from '../../hooks/useFetchPost';


const Students = () => {
    const { user } = useAuthContext();
    const [Department_ID] = useState(user.Department_ID)
    const {data:Batches, isPending} = useFetch(`http://localhost:5000/batches/department/${Department_ID}`)
    const {data:batchTypes} = useFetch(`http://localhost:5000/batches/batchType`)
    const [Batch_ID,setBatch_ID] = useState('');
    const [Batch_NO,setBatch_NO] = useState('');
    const [Batch_General_Count,setGeneral_Count] = useState('');
    const [Batch_Payment_Count,setPayment_Count] = useState('');
    const [Batch_Parallel_Count,setParallel_Count] = useState('');
    const [groups,setGroups] = useState([])
    const [Group_Count,setGroup_Count] = useState('')
    const [Group_ID,setGroup_ID] = useState('')
    const [Batch_Type_ID,setBatch_Type_ID] = useState('')
    const { fetchDelete } = useFetchDelete()
    const { fetchPut } = useFetchPut()
    const { fetchPost } = useFetchPost()
    const [error,setError] = useState()
    const [deletedGroup, setDeletedGroup] = useState(0)

    const handleOpenSection = id => {
        const editSection = document.getElementById(`b${id}`)

        editSection.style.cssText = 'display:flex;'

    }

    const handleCloseSection = id => {
        const editSection = document.getElementById(`b${id}`)

        editSection.style.cssText = 'display:none;'
        setError('')
    }

    const handleAddGroup = id => {

        const editSection = document.getElementById(`groups${id}`)

        const section = document.createElement('section')
        section.classList.add(style.groupText)

        const text1 = document.createElement('input')
        text1.setAttribute("type","text")
        text1.setAttribute('id','groupName')

        const text2  = document.createElement('input')
        text2.setAttribute("type","number")
        text2.setAttribute('id','groupCount')

        const select  = document.createElement('select')
        select.setAttribute('id','BatchTypeID')
        select.defaultValue=batchTypes[0].Batch_Type_ID
        const option1 = document.createElement('option')
        option1.value=batchTypes[0].Batch_Type_ID;
        option1.innerText = batchTypes[0].Batch_Type
        const option2 = document.createElement('option')
        option2.value=batchTypes[1].Batch_Type_ID;
        option2.innerText = batchTypes[1].Batch_Type
        const option3 = document.createElement('option')
        option3.value=batchTypes[2].Batch_Type_ID;
        option3.innerText = batchTypes[2].Batch_Type

        select.appendChild(option1)
        select.appendChild(option2)
        select.appendChild(option3)

        section.appendChild(text1)
        section.appendChild(text2)
        section.appendChild(select)

        editSection.appendChild(section)
    }

    const handleDeleteGroup = async (Group_ID) => {

        const groupSection = document.getElementById(`Group${Group_ID}`)
        groupSection.style.cssText = 'display:none;'
        
        const deletedGroup = groupSection.querySelector('input').value
        setDeletedGroup(deletedGroup)
        
        await fetchDelete('http://localhost:5000/batches/deleteGroup',{
            Group_ID
        })
        
    }

    const handleSave = async (e) => {
        e.preventDefault()

        let groupCount = 0;
        const Newgroup = document.getElementById('groupCount')

        if(groups) {

            groups.forEach(i => {
                let group = document.getElementById(`input${i.Group_ID}`)
                
                console.log(group)
                groupCount+=Number(group.value)
                
            })
        }
        
        if(Newgroup)
        groupCount+=Number(Newgroup.value)

        groupCount-=deletedGroup
        console.log(Batch_General_Count+Batch_Parallel_Count+Batch_Payment_Count,groupCount)

        if(Batch_General_Count+Batch_Parallel_Count+Batch_Payment_Count === groupCount ){
            await fetchPut('http://localhost:5000/batches/updateBatch',{
                Batch_ID,
                Batch_General_Count, 
                Batch_Parallel_Count, 
                Batch_Payment_Count 
            })
            
            await fetchPut('http://localhost:5000/batches/updateGroup',{
                Group_ID,
                Group_Count,
                Batch_Type_ID
            })

            const groupName = document.getElementById('groupName')
            const newGroup = document.getElementById('groupCount')
            const select = document.getElementById('BatchTypeID')
            

            if(groupName && newGroup && select)
            {
                console.log( groupName.value, newGroup.value, select.value, Batch_ID )
                await fetchPost('http://localhost:5000/batches/addGroup',{
                    "Group_": groupName.value, 
                    "Group_Count": newGroup.value, 
                    "Batch_Type_ID": select.value, 
                    Batch_ID 
                })
            }
        
            window.location.reload()

        }
        else setError('عدد الطلاب لا يتوافق مع عدد المجموعات')

    }

    

    return(
        <section className="container">
            <header className={style.students_header}>
                    <h3>رئيس القسم</h3>
                    <FontAwesomeIcon className='arrows' icon={faAngleDoubleLeft} />
                    <h3><NavLink className="link" to="/students_groups">مجموعات الطلاب</NavLink></h3>    
            </header>
            <main className={style.students_main}>
                {
                    isPending && <Loading />
                }
                {
                    Batches &&
                    Batches.sort((a,b) => a.Semester_ID>b.Semester_ID ? 1 : a.Semester_ID<b.Semester_ID ? -1 : 0).map(i => {
                        return(
                            <section key={i.Batch_ID} className={style.tableSection}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th> </th>
                                            <th>رقم الدفعة</th>
                                            <th>قبول عام</th>
                                            <th>موازي</th>
                                            <th>نفقة خاصة</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th className={style.table_level}>{i.Semester_Name}</th>
                                            <td>{i.Batch_NO}</td>
                                            <td>{i.Batch_General_Count}</td>
                                            <td>{i.Batch_Parallel_Count}</td>
                                            <td>{i.Batch_Payment_Count}</td>
                                            <td><FontAwesomeIcon icon={faPenToSquare}
                                            onClick={()=> {
                                                setBatch_ID(i.Batch_ID);
                                                setBatch_NO(i.Batch_NO);
                                                setGeneral_Count(i.Batch_General_Count);
                                                setParallel_Count(i.Batch_Parallel_Count);
                                                setPayment_Count(i.Batch_Payment_Count);
                                                handleOpenSection(i.Batch_ID);
                                                setGroups(i.Groups)
                                            }}
                                            className={style.editbtn}/></td>
                                        </tr>
                                        <tr >
                                            <td className={style.a3}></td>
                                        </tr>
                                        
                                    </tbody>
                                </table>
                                    {
                                        i.Groups &&
                                        i.Groups.map(j => {

                                            return(
                                                <div key={j.Group_ID} className={style.div}>
                                                    <h1>{j.Group_}</h1>
                                                    <p>{j.Group_Count}</p>
                                                    <p>{j.Batch_Type}</p>
                                                    <div className={style.a3}></div>
                                                    <div className={style.a2}></div>

                                                </div>
                                            )
                                        })
                                    }
                                  
                                <section className={`container-section ${style.editSection}`} id={`b${i.Batch_ID}`}>
                                    <article className={`center-section`} id={`article${i.Batch_ID}`}>
                                        <FontAwesomeIcon className={`close-btn ${style.btnClose}`} 
                                        onClick={()=>handleCloseSection(i.Batch_ID)} icon={faXmark} size="xl" />
                                        <header>
                                            <h1>تعديل معلومات المجموعات</h1>
                                        </header>
                                        
                                        <form className={`addForm `}>
                                            <section className={style.NoInput}>
                                                <label htmlFor="name">رقم الدفعة:</label>
                                                <input type="text" readOnly value={Batch_NO} name="L_name" />
                                            </section>
                                            <label htmlFor="student_NO">عدد الطلاب:</label>
                                            <section className={style.NoInput}>
                                                <input type='text' name="general" 
                                                    onChange={e => setGeneral_Count(Number(e.target.value))} 
                                                    defaultValue={Batch_General_Count} />
                                                <label htmlFor="general">عام</label>
                                                <input type='text' name="parallel" 
                                                    onChange={e => setParallel_Count(Number(e.target.value))} 
                                                    defaultValue={Batch_Parallel_Count} />
                                                <label htmlFor="paralle">موازي</label>
                                                <input type='text' name="payment" 
                                                    onChange={e => setPayment_Count(Number(e.target.value))} 
                                                    defaultValue={Batch_Payment_Count} />
                                                <label htmlFor="payment">نفقة خاصة</label>
                                            </section>
                                            <label htmlFor="groups">المجموعات:</label>
                                            <div id={`groups${i.Batch_ID}`}>
                                            {
                                                i.Groups &&
                                                i.Groups.map(j => {
                                                    return(
                                                    <section key={j.Group_ID} id={`Group${j.Group_ID}`} 
                                                    className={style.groupText}>
                                                        <label htmlFor="payment">{j.Group_}</label>
                                                        <input type='text' name="group" 
                                                            onChange={e => {
                                                                setGroup_Count(e.target.value) 
                                                                setGroup_ID(j.Group_ID)
                                                                setBatch_Type_ID(j.Batch_Type_ID)}}
                                                            defaultValue={j.Group_Count}
                                                            id={`input${j.Group_ID}`} />
                                                        <select onChange={e => {
                                                            setBatch_Type_ID(e.target.value)
                                                            setGroup_ID(j.Group_ID)
                                                            setGroup_Count(j.Group_Count)
                                                            }} defaultValue={j.Batch_Type_ID}>
                                                        { 
                                                            batchTypes &&
                                                            batchTypes.map(k => {
                                                                return(
                                                                    <option key={k.Batch_Type_ID} value={k.Batch_Type_ID}>{k.Batch_Type}</option>
                                                                )
                                                            })
                                                            
                                                        }
                                                        </select>
                                                        <FontAwesomeIcon 
                                                            onClick={() => handleDeleteGroup(j.Group_ID)}
                                                            className={style.editbtn} icon={faXmark} />
                                                    </section>
                                                    )
                                                })
                                            }
                                            </div>
                                            { error && <p className='errorMessage'>{error}</p> }
                                            <label onClick={()=>handleAddGroup(i.Batch_ID)} 
                                                className={style.addGroup}>+إضافة مجموعة</label>
                                            <section className="btnContainer">
                                                <button className={`btn `} onClick={handleSave} name="submit" >حفظ</button>
                                            </section>
                                        </form>
                                    </article>
                                </section>
                            </section>
                        )
                    })
                }
                
            </main>
        </section>
    )
}

export default Students;