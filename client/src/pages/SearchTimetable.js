import { useAuthContext } from '../hooks/useAuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import styleB from './styles/timeTable.module.css';
import style from './styles/searchTimetable.module.css';


const handelTime = (startTime, endTime) => {
    startTime = startTime > 12 ? `${startTime - 12}PM` : `${startTime}AM`;
    endTime = endTime > 12 ? `${endTime - 12}PM` : `${endTime}AM`;

    return `${endTime} - ${startTime}`;
}

const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'];

const semesters = [
    'المستوى الدراسي الأول',
    'المستوى الدراسي الثاني',
    'المستوى الدراسي الثالث',
    'المستوى الدراسي الرابع',
    'المستوى الدراسي الخامس',
    'المستوى الدراسي السادس',
    'المستوى الدراسي السابع',
    'المستوى الدراسي الثامن',
    'المستوى الدراسي التاسع',
    'المستوى الدراسي العاشر'
];

const SearchTimetable = () => {
    const { user } = useAuthContext();

    const [search, setSearch] = useState('');
    const [timetable, setTimetable] = useState(null);

    const handelSearch = async (search) => {
        const res = await fetch(`http://localhost:5000/timetable/search/${search}`);

        const timetable = await res.json();

        setTimetable(timetable)
    }

    useEffect(() => {
        if (search)
            handelSearch(search);

        if (!search)
            setTimetable(null);
    }, [search])

    return (
        <section className={`${style.timetablePage} ${user && user.type === 1 ? 'containerPage' : ""}`}>
            <header className={style.header}>
                <h1>
                    <FontAwesomeIcon icon={faCalendarDay} />
                    الجداول
                </h1>
            </header>

            <section >
                <form>
                    <section className={`input ${style.searchBar}`}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        <input 
                            type="search" 
                            name="search" 
                            placeholder='البحث عن جدول قسم, مستوى, محاضر, قاعة....'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </section>
                </form>
            </section>

            <section className={timetable && timetable.length < 3 ? style.timetableContainer : style.timetableContainer2}>
                {
                    timetable && timetable.length < 3 && timetable.map(t => {
                        return (
                            <article id={t.ETT_ID} key={t.ETT_ID} className={style.timetable}>
                                <header>
                                    <h1>{t.Subject_Name}</h1>
                                    <h3>{t.Subject_Type_Name}</h3>
                                </header>
                                <p>{t.Rank_ === 'doctor' ? `د. ${t.Lecturer_Name}` : t.Lecturer_Name}</p>
                                <p>{t.Department_Name}</p>
                                <p>{t.Semester_Name}</p>
                                <p>{t.Hall_Name}</p>
                                <p>{t.Day_Name}</p>
                                <p>{handelTime(t.Start_Time.slice(0, 2), t.End_Time.slice(0, 2))}</p>
                            </article>
                        )
                    })
                }

                {
                    timetable && timetable.length > 3 && semesters.filter(s => {
                        return timetable.filter(t => t.Semester_Name === s).map(t => t.Semester_Name).includes(s)
                    }).map(s => {
                        return (
                            <div  className={`${styleB.diffTables} ${style.timetable}`} key={s}>
                                <header>
                                    <h1>{s}</h1>
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
                                                                    return (t.Day_Name === d && t.Semester_Name === s && !(timetable[index].Module_ID === timetable[index-1].Module_ID) 
                                                                    && !(timetable[index].Module_ID === timetable[index+1].Module_ID)) 
                                                                }
                                                                else if (index === 0) {
                                                                    return (t.Day_Name === d && t.Semester_Name === s && !(timetable[index].Module_ID === timetable[index + 1].Module_ID)) 
                                                                }
                                                                else if (index === timetable.length - 1) {
                                                                    return (t.Day_Name === d && t.Semester_Name === s && !(timetable[index].Module_ID === timetable[index - 1].Module_ID)) 
                                                                }
                                                                else {
                                                                    return t.Day_Name === d && t.Semester_Name === s
                                                                } 
                                                            }).map(i => {
                                                                return(
                                                                    <td key={i.ETT_ID}>
                                                                        <h4>{i.Subject_Name}</h4>
                                                                        <h5>{i.Lecturer_Name}</h5>
                                                                        <p>{i.Group_}</p>
                                                                        <p>{i.Hall_Name}</p>
                                                                        <p>{handelTime(i.Start_Time.slice(0, 2), i.End_Time.slice(0, 2))}</p>
                                                                    </td>
                                                                )
                                                            })
                                                        }
                                                        
                                                        <td className={styleB.practicalDiv}>
                                                            {
                                                                arr.length > 0 &&
                                                                arr.filter(t => t.Day_Name === d && t.Semester_Name === s).map(j => {
                                                                    return(
                                                                        <td key={j.ETT_ID}>
                                                                            <h4>{j.Subject_Name}</h4>
                                                                            <h5>{j.Lecturer_Name}</h5>
                                                                            <p>{j.Group_}</p>
                                                                            <p>{j.Hall_Name}</p>
                                                                            <p>{handelTime(j.Start_Time.slice(0, 2), j.End_Time.slice(0, 2))}</p>
                                                                        </td>
                                                                    )
                                                                })
                                                            }
                                                        </td>

                                                        <td className={style.OFFDay}>
                                                            {
                                                                timetable.filter(t => t.Day_Name === d && t.Semester_Name === s).length === 0 &&
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
                }
            </section>
        </section>
    )
}

export default SearchTimetable;