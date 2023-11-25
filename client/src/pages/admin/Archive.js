import { faBoxArchive } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styleB from '../styles/timeTable.module.css';
import style from '../styles/searchTimetable.module.css';
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

const handelTime = (startTime, endTime) => {
    startTime = startTime > 12 ? `${startTime - 12}PM` : `${startTime}AM`;
    endTime = endTime > 12 ? `${endTime - 12}PM` : `${endTime}AM`;

    return `${endTime} - ${startTime}`;
}

const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'];

const semesters = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Archive = () => {
    const { user } = useAuthContext();

    const { data: colleges } = useFetch('http://localhost:5000/colleges/');
    // const { data: departements } = useFetch('http://localhost:5000/departements/');
    const { data: years } = useFetch('http://localhost:5000/systemState/yerasOfSystem');

    const [timetable, setTimetable] = useState([]);
    const [college, setCollege] = useState('');
    const [departements, setDepartements] = useState([]);
    const [departement, setDepartement] = useState('');
    const [year, setYear] = useState('');

    const handelSearch = async () => {
        setTimetable(null);
        const res = await fetch(`http://localhost:5000/archive/timetable/${departement}/${year}` , {
            headers: { "Authorization": `Bearer ${user.token}`}
        });
        const data = await res.json();
        console.log(data)
        setTimetable(data);
    }

    const getDepartment = async () => {
        setDepartements([]);
        const res = await fetch(`http://localhost:5000/departements/college/${college}`, {
            headers: { "Authorization": `Bearer ${user.token}`}
        });
        const departements = await res.json();
        setDepartements(departements);
    }

    useEffect(() => {
        getDepartment();
    }, [college]);

    useEffect(() => {
        if (departements.length > 0 && !departement) {
            setDepartement(departements[0].Department_Name);
        }
    }, [departement, departements]);

    useEffect(() => {
        if (years && !year) {
            setYear(years[0].System_Year);
        }
    }, [year, years]);

    useEffect(() => {
        if (departement && year)
            handelSearch();
    }, [departement, year]);

    return (
        <section className={`containerPage ${style.timetablePage}`}>
            <header>
                <h1>
                    <FontAwesomeIcon icon={faBoxArchive} />
                    الأرشيف
                </h1>
            </header>

            <section>
                <form className={style.selectContainer}>

                <select name="college" value={college} onChange={(e) => setCollege(e.target.value)}>
                        {
                            colleges && colleges.map(c => {
                                return (
                                    <option key={c.College_ID} value={c.College_ID}>{c.College_Name}</option>
                                )
                            })
                        }
                    </select>

                    <select name="department" value={departement} onChange={(e) => setDepartement(e.target.value)}>
                        {
                            departements && departements.map(d => {
                                return (
                                    <option key={d.Department_ID} value={d.Department_Name}>{d.Department_Name}</option>
                                )
                            })
                        }
                    </select>
                    
                    <select name="year" value={year} onChange={(e) => setYear(e.target.value)}>
                        {
                            years && years.map((y, i) => {
                                return (
                                    <option key={`${y.System_Year}-${i}`} value={y.System_Year}>{y.System_Year}</option>
                                )
                            })
                        }
                    </select>
                </form>
            </section>

            <section className={timetable && timetable.length <= 3 ? style.timetableContainer : style.timetableContainer2}>
                {
                    timetable && timetable.length > 0 && semesters.filter(s => {
                        return timetable.filter(t => t.Semester_ID === s).map(t => t.Semester_ID).includes(s)
                    }).map(s => {
                        return departements && departements.map(dep => {
                            return (
                                <div  className={`${styleB.diffTables} ${style.timetable}`} key={s}>
                                    <header>
                                        {(s === 1 || s === 2) && <h1>{dep.Department_Name} - المستوى الأول - الفصل الدراسي {s === 1 ? "الأول" : "الثاني"} للعام الدراسي {timetable[0].Year}</h1>}
                                        {(s === 3 || s === 4) && <h1>{dep.Department_Name} - المستوى الثاني - الفصل الدراسي {s === 3 ? "الأول" : "الثاني"} للعام الدراسي {timetable[0].Year}</h1>}
                                        {(s === 5 || s === 6) && <h1>{dep.Department_Name} - المستوى الثالث - الفصل الدراسي {s === 5 ? "الأول" : "الثاني"} للعام الدراسي {timetable[0].Year}</h1>}
                                        {(s === 7 || s === 8) && <h1>{dep.Department_Name} - المستوى الرابع - الفصل الدراسي {s === 7 ? "الأول" : "الثاني"} للعام الدراسي {timetable[0].Year}</h1>}
                                        {(s === 9 || s === 10) && <h1>{dep.Department_Name} - المستوى الخامس - الفصل الدراسي {s === 9 ? "الأول" : "الثاني"} للعام الدراسي {timetable[0].Year}</h1>}
                                    </header>
                                    <table>
                                        <tbody>
                                            {
                                                days.map(d => {
                                                    let arr = []
                                                    return (
                                                        <tr key={d}>
                                                            <th>{d}</th>
                                                            
                                                            {
                                                                timetable.filter((t, index) => {
                                                                    if (index > 0 && index < timetable.length - 1) {
    
                                                                        if (timetable[index].Module_ID === timetable[index - 1].Module_ID || timetable[index].Module_ID === timetable[index + 1].Module_ID) {
                                                                            
                                                                            if(!timetable.includes(timetable[index-1]))
                                                                                arr.push(timetable[index-1])
                                                                            
                                                                            arr.push(t)
                                                                        }
                                                                        return (t.Day_Name === d && t.Semester_ID === s && t.Department_Name === dep.Department_Name && !(timetable[index].Module_ID === timetable[index-1].Module_ID) 
                                                                        && !(timetable[index].Module_ID === timetable[index+1].Module_ID)) 
                                                                    }
                                                                    else if (index === 0) {
                                                                        return (t.Day_Name === d && t.Semester_ID === s && t.Department_Name === dep.Department_Name && !(timetable[index].Module_ID === timetable[index + 1].Module_ID)) 
                                                                    }
                                                                    else if (index === timetable.length - 1) {
                                                                        return (t.Day_Name === d && t.Semester_ID === s && t.Department_Name === dep.Department_Name && !(timetable[index].Module_ID === timetable[index - 1].Module_ID)) 
                                                                    }
                                                                    else {
                                                                        return t.Day_Name === d && t.Semester_ID === s && t.Department_Name === dep.Department_Name
                                                                    } 
                                                                }).map(i => {
                                                                    return(
                                                                        <div key={i.ETT_ID}>
                                                                            <h4>{i.Subject_Name}</h4>
                                                                            <h5>{i.Rank_ === 'doctor' ? `د. ${i.Lecturer_Name}` : i.Lecturer_Name}</h5>
                                                                            <p>{i.Group_}</p>
                                                                            <p>{i.Hall_Name}</p>
                                                                            <p>{handelTime(i.Start_Time.slice(0, 2), i.End_Time.slice(0, 2))}</p>
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                            
                                                            <td className={styleB.practicalDiv}>
                                                                {
                                                                    arr.length > 0 &&
                                                                    arr.filter(t => t.Day_Name === d && t.Semester_ID === s).map(j => {
                                                                        return(
                                                                            <div key={j.ETT_ID}>
                                                                                <h4>{j.Subject_Name}</h4>
                                                                                <h5>{j.Rank_ === 'doctor' ? `د. ${j.Lecturer_Name}` : j.Lecturer_Name}</h5>
                                                                                <p>{j.Group_}</p>
                                                                                <p>{j.Hall_Name}</p>
                                                                                <p>{handelTime(j.Start_Time.slice(0, 2), j.End_Time.slice(0, 2))}</p>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </td>
    
                                                            <td className={style.OFFDay}>
                                                                {
                                                                    timetable.filter(t => t.Day_Name === d && t.Semester_ID === s).length === 0 &&
                                                                    <div>
                                                                        <h4>OFF</h4>
                                                                    </div>
                                                                }
                                                            </td>
                                                            
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            )
                        })
                    })
                }
            </section>

            <section>
                {
                    timetable && timetable.length === 0 && 
                    <p className="emptyElement">لا يوجد جدول في الأرشيف</p>
                }
            </section>
        </section>
    )
}

export default Archive;