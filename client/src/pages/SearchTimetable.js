import { useAuthContext } from '../hooks/useAuthContext';
import style from './styles/searchTimetable.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

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

            <section className={style.timetableContainer}>
                {
                    timetable && timetable.map(t => {
                        return (
                            <article id={t.ETT_ID} key={t.ETT_ID} className={style.timetable}>
                                <header>
                                    <h1>{t.Subject_Name}</h1>
                                </header>
                                <p>{t.Lecturer_Name}</p>
                                <p>{t.Department_Name}</p>
                                <p>{t.Semester_Name}</p>
                                <p>{t.Hall_Name}</p>
                                <p>{t.Day_Name}</p>
                                <p>{t.Start_Time.slice(0, 2)} - {t.End_Time.slice(0, 2)}</p>
                            </article>
                        )
                    })
                }
            </section>
        </section>
    )
}

export default SearchTimetable;