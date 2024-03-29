import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import useFetch from '../hooks/useFetch';
import Loading from '../components/Loading';
import { useAuthContext } from "../hooks/useAuthContext";
import style from './styles/timeTable.module.css';
import { useEffect, useState } from "react";


const TimeTableView = () => {
    const { user } = useAuthContext();
    const { data:schedules, isPending } = useFetch(`http://localhost:5000/timeTable`)
    const [level,setLevel] = useState("")
    const [tableType,setTableType] = useState(0)
    const days = ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس"]
    const levels_1 = [1,3,5,7,9]
    const levels_2 = [2,4,6,8,10]
    const { data } = useFetch('http://localhost:5000/systemState')

    const handlePrint = async (Level) => {
        console.log(Level)

        let title;
    
        if(Level == 1 || Level == 2 ) title = 'مستوى أول';
        else if(Level == 3 || Level == 4) title = 'مستوى ثاني';
        else if(Level == 5 || Level == 6) title = 'مستوى ثالث';
        else if(Level == 7 || Level == 8) title = 'مستوى رابع';
        else title = 'جدول مستوى خامس';

        await fetch('http://localhost:5000/pdf/Scheduels?' + new URLSearchParams({
            Level,
            Department_ID: user.Department_ID,
            Department_Name: schedules[0] ? schedules[0].Department_Name : schedules,
            year: data.System_Year,
            semester: data.System_Semester
        }))
        .then(response => {
            response.blob().then(blob => {
                // Creating new object of PDF file
                const fileURL = window.URL.createObjectURL(blob);
                // Setting various property values
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = `جدول ${schedules[0] ? schedules[0].Department_Name : schedules} ${title}.pdf`;
                alink.click();
            })
        })
        .catch(err => console.log(err));
    }

    const handleSwitchView = (e) => {
        const single = document.querySelector("#singleTable")
        const multiple = document.getElementById("multipleTables")


        if(e.target.id === "singleTable") {
            single.style.cssText=" background-color: var(--main-color);color: white;"
            multiple.style.cssText=" background-color: transparent;color: var(--font-color);"
            setTableType(0)
        }
        else {
            multiple.style.cssText=" background-color: var(--main-color);color: white;"
            single.style.cssText=" background-color: transparent;color: var(--font-color);"
            setTableType(1)
        }
    }

    useEffect(() => {
        const single = document.querySelector("#singleTable")
        single.style.cssText=" background-color: var(--main-color);color: white;"
        if(user.semester === 1) setLevel(levels_1)
        else setLevel(levels_2)
        

    },[user.semester])

    return(
        <section className="container">
            {
                isPending && <Loading />
            }
            <header className={style.timeTable_header} >
                <div>
                    <h3>الجدول الحالي</h3>
                    <FontAwesomeIcon className='arrows' icon={faAngleDoubleLeft} />
                    { schedules && <h3>قسم {schedules[0] ? schedules[0].Department_Name : schedules} </h3>}    
                </div>
                <h3>
                    {user.semester === 1 && "الترم الأول"}
                    {user.semester === 2 && "الترم الثاني"}
                </h3>
            </header>
            <section className={style.subHeader}>
            
                <div className={style.switch}>
                    <div className={`${style.singleTable}`} id="singleTable" onClick={handleSwitchView}>
                        جدول واحد
                    </div>
                    <div className={style.multipleTable} id="multipleTables" onClick={handleSwitchView}>
                        جداول منفصلة
                    </div>
                </div>
                
            </section>
           {
           schedules && tableType === 0 &&
           <div className={style.tableDiv}>
            <table className={style.table}>
                    <thead  className={style.tableHeader}>
                        <tr>
                            <td></td>
                            <th>مستوى أول</th>
                            <th>مستوى ثاني</th>
                            <th>مستوى ثالث</th>
                            <th>مستوى رابع</th>
                            <th>مستوى خامس</th>
                        </tr>
                    </thead>
                    <tbody className={style.tableBody}>
                        {
                            days.map(d => {
                                return(
                                    <tr key={d}>
                                        <th key={d}>{d}</th>
                                        {
                                            level.map(l => {
                                                let arr = []
                                                return(
                                                    <td className={style.data}>
                                                        <div className={style.cell}>
                                                        {
                                                            schedules.filter((t,index) => {
                                                            if(index > 0 && index < schedules.length-1){

                                                                if(schedules[index].Module_ID === schedules[index-1].Module_ID || schedules[index].Module_ID === schedules[index+1].Module_ID) {
                                                                    
                                                                    if(!schedules.includes(schedules[index-1]))
                                                                    arr.push(schedules[index-1])
                                                                    
                                                                    arr.push(t)

                                                                }
                                                                return (t.Day_Name === d && t.Semester_ID === l && !(schedules[index].Module_ID === schedules[index-1].Module_ID) 
                                                                && !(schedules[index].Module_ID === schedules[index+1].Module_ID)) 
                                                                    
                                                            }
                                                            else if(index === 0){
                                                                return (t.Day_Name === d && t.Semester_ID === l && !(schedules[index].Module_ID === schedules[index+1].Module_ID)) 
                                                            }
                                                            else if(index === schedules.length-1){
                                                                return (t.Day_Name === d && t.Semester_ID === l && !(schedules[index].Module_ID === schedules[index-1].Module_ID)) 
                                                            }
                                                            else {
                                                                return t.Day_Name === d && t.Semester_ID === l
                                                            }
                                                                
                                
                                                            
                                                            } ).map((i) => {
                                                                return(
                                                                    
                                                                    <div key={i.ETT_ID} className={style.modules}>
                                                                        <div>
                                                                        <h4>{i.Subject_Name}</h4>
                                                                        <p>{i.Lecturer_Name}</p>
                                                                        <p>{i.Hall_Name}</p>
                                                                        <p>{i.End_Time.slice(0,2)}-{i.Start_Time.slice(0,2)}</p>
                                                                        </div>
                                                                    </div>
                                                                    
                                                                )
                                                            })
                                                            
                                                        }
                                                        <div className={arr.filter(f => f.Day_Name === d && f.Semester_ID === l).length%3 === 0 ? `${style.practicalDiv3}`:`${style.practicalDiv2}`}>
                                                        {
                                                            
                                                            arr.filter(f => f.Day_Name === d && f.Semester_ID === l).map(j => {
    
                                                            return(
                                                                <div>
                                                                    <h4>{j.Subject_Name}</h4>
                                                                    <p>{j.Lecturer_Name}</p>
                                                                    <p>{j.Hall_Name}</p>
                                                                    <p>{j.Start_Time.slice(0,2)}-{j.End_Time.slice(0,2)}</p>
                                                                </div>
                                                            )
                                                            })
                                                           
                                                        }
                                                        </div>
                                                        </div>
                                                    </td>
                                                )
                                            })
                                        }
                                    </tr>
                                )
                                
                            })
                        }
                    </tbody>
                </table>
            </div>
            }
            {
            schedules && tableType === 1 &&
            level.map(l => {
                return(
                    <div  className={style.diffTables}>
                        <section className={style.printTableSection}>
                            {(l === 1 || l === 2) && <h2>مستوى أول</h2>}
                            {(l === 3 || l === 4) && <h2>مستوى ثاني</h2>}
                            {(l === 5 || l === 6) && <h2>مستوى ثالث</h2>}
                            {(l === 7 || l === 8) && <h2>مستوى رابع</h2>}
                            {(l === 9 || l === 10) && <h2>مستوى خامس</h2>}
                            
                            <button className={`btn ${style.button}`} onClick={() => handlePrint(l)}> طباعة الجدول</button>
                        </section>
                    
                        <table>

                            <tbody>
                            {
                                days.map(d => {
                                let arr =[]

                                    return(
                                        <tr>
                                            <th>{d}</th>
                                        {
                                            schedules.filter((t,index) =>{
                                                if(index > 0 && index < schedules.length-1){

                                                if(schedules[index].Module_ID === schedules[index-1].Module_ID || schedules[index].Module_ID === schedules[index+1].Module_ID) {
                                                    
                                                    if(!schedules.includes(schedules[index-1]))
                                                    arr.push(schedules[index-1])
                                                    
                                                    arr.push(t)

                                                }
                                                return (t.Day_Name === d && t.Semester_ID === l && !(schedules[index].Module_ID === schedules[index-1].Module_ID) 
                                                && !(schedules[index].Module_ID === schedules[index+1].Module_ID)) 
                                                    
                                            }
                                            else if(index === 0){
                                                return (t.Day_Name === d && t.Semester_ID === l && !(schedules[index].Module_ID === schedules[index+1].Module_ID)) 
                                            }
                                            else if(index === schedules.length-1){
                                                return (t.Day_Name === d && t.Semester_ID === l && !(schedules[index].Module_ID === schedules[index-1].Module_ID)) 
                                            }
                                            else {
                                                return t.Day_Name === d && t.Semester_ID === l
                                            } 
                                        }).map(i => {
                                                return(
                                                    <div>
                                                        <h4>{i.End_Time.slice(0,5)}-{i.Start_Time.slice(0,5)}</h4>
                                                        <h5>{i.Subject_Name}</h5>
                                                        <p>{i.Lecturer_Name}</p>
                                                        <p>{i.Group_}</p>
                                                        <p>{i.Hall_Name}</p>
                                                    </div>
                                                )
                                            })
                                        }
                                        
                                        <section className={arr.filter(f => f.Day_Name === d && f.Semester_ID === l).length%3 === 0 ? `${style.practicalDiv3}`:`${style.practicalDiv2}`}>
                                        {
                                            arr.filter(t => t.Day_Name === d && t.Semester_ID === l).map(j => {
                                                return(
                                                    <div>
                                                        <h4>{j.End_Time.slice(0,5)}-{j.Start_Time.slice(0,5)}</h4>
                                                        <h5>{j.Subject_Name}</h5>
                                                        <p>{j.Lecturer_Name}</p>
                                                        <p>{j.Group_}</p>
                                                        <p>{j.Hall_Name}</p>
                                                    </div>
                                                )
                                            })
                                        }
                                        </section>
                                        <section className={style.practicalDiv}>
                                        {
                                            schedules.filter(t => t.Day_Name === d && t.Semester_ID === l).length === 0 &&
                                                
                                            <div>
                                                <h4>OFF</h4>
                                            </div>
                                                
                                            
                                        }
                                        </section>
                                        
                                        </tr>
                                        
                                    )
                                    
                                }
                                
                                )
                                
                            }
                            </tbody>
                        </table>
                        <section className={style.printTableSection}>
                        </section>
                    </div>
                )
            })
            }
        </section>
    )
}

export default TimeTableView; 