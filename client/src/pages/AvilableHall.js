import { useAuthContext } from "../hooks/useAuthContext";
import styleB from './styles/timeTable.module.css';
import style from './styles/searchTimetable.module.css';
import { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const handelTime = (startTime, endTime) => {
    startTime = startTime > 12 ? `${startTime - 12}PM` : `${startTime}AM`;
    endTime = endTime > 12 ? `${endTime - 12}PM` : `${endTime}AM`;

    return `${endTime} - ${startTime}`;
}

const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'];

const AvilableHall = () => {
    const { user } = useAuthContext();

    const [search, setSearch] = useState('');
    const [timetable, setTimetable] = useState([]);
    const [College, setCollege] = useState([]);
    const [halls, setHalls] = useState([]);
    const [emptyHall, setEmptyHall] = useState([]);

    const handelSearch = useCallback(async () => {
        const res1 = await fetch(`http://localhost:5000/timetable/availableHalls/${search}`);
        const data1 = await res1.json();
        setTimetable(data1)

        const res2 = await fetch(`http://localhost:5000/timetable/availableHallsAllWeek/${search}`);
        const data2 = await res2.json();

        setEmptyHall(data2)
    }, [search]);
    
    useEffect(() => {
        handelSearch();
    }, [handelSearch]);

    useEffect(() => {
        timetable.forEach(t => {
            if (!College.includes(t.College_Name))
                setCollege([...College, t.College_Name]);
        })

        timetable.forEach(t => {
            if (!halls.includes(t.Hall_Name))
                setHalls([...halls, t.Hall_Name]);
        })

    }, [timetable, College, halls]);

    return (
        <section className={`${style.timetablePage} ${user && user.type === 1 ? 'containerPage' : ""}`} >
            <header className={style.header}>
                <h1>القاعات المتاحة</h1>
            </header>

            <section >
                <form>
                    <section className={`input ${style.searchBar}`}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        <input 
                            type="search" 
                            name="search" 
                            placeholder='البحث عن قاعات في كلية أو مبنى...'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </section>
                </form>
            </section>

            <section >
                <header>
                    <h2>قاعات فارغة طوال الأسبوع</h2>
                </header>
                <section className={style.timetableContainer}>
                    {
                        emptyHall && emptyHall.length > 0 && emptyHall.map(t => {
                            return (
                                <article id={t.Hall_ID  * Math.random()} key={t.Hall_ID} className={style.timetable}>
                                    <header>
                                        <h1>{t.Hall_Name}</h1>
                                    </header>
                                    <p>السعة {t.Hall_Capacity} مقعد</p>
                                    <p>مبنى {t.Building_Name}</p>
                                    <p>{t.College_Name}</p>
                                </article>
                            )
                        })
                    }
                </section>
            </section>

            <section className={timetable && timetable.length <= 3 ? style.timetableContainer : style.timetableContainer2}>
                {
                    timetable && timetable.length > 0 && College && College.map(c => {
                        return (
                            <div  className={`${styleB.diffTables} ${style.timetable}`} key={`${c}-${new Date().getTime() * Math.random()}`}>
                                <header>
                                    <h1>{c}</h1>
                                </header>
                                <table>
                                    <tbody>
                                        {
                                            days.map(d => {
                                                return (
                                                    <tr key={`${d}-${c}-${new Date().getTime() * Math.random()}`} className={style.flex}>
                                                        <th>{d}</th>
                                                        <td className={style.x}>
                                                            {
                                                                halls.filter(h => timetable.filter(t => t.Hall_Name === h).map(t => t.Day_Name).includes(d)).map(h => {
                                                                    return (
                                                                        <td className={style.HallContainer} key={`${h}-${new Date().getTime() * Math.random()}`}>
                                                                            <th>{h}</th>
                                                                            <td className={style.timeContainer}>
                                                                                {
                                                                                    timetable.filter(hall => hall.College_Name === c && hall.Day_Name === d && h === hall.Hall_Name ).map(i => {
                                                                                        return(
                                                                                            <div key={`${i.Hall_ID}-${c}-${new Date().getTime() * Math.random()}`}>
                                                                                                <h5>{i.College_Name}</h5>
                                                                                                <h5>مبنى {i.Building_Name}</h5>
                                                                                                <p>السعة {i.Hall_Capacity} مقعد</p>
                                                                                                <p>{handelTime(i.Start_Time.slice(0, 2), i.End_Time.slice(0, 2))}</p>
                                                                                            </div>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </td>
                                                                        </td>
                                                                    )
                                                                })
                                                            }
                                                        </td>
                                                        

                                                        {/* <td className={style.OFFDay}>
                                                            {
                                                                timetable.filter(t => t.Day_Name === d && t.College_Name === c).length === 0 &&
                                                                <div>
                                                                    <h4>OFF</h4>
                                                                </div>
                                                            }
                                                        </td> */}
                                                        
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

export default AvilableHall;