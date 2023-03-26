import { faCalendar, faCalendarWeek, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import useFetch from "../../hooks/useFetch";
import { useFetchPut } from "../../hooks/useFetchPut";
import Done from '../../components/Done';
import Falid from '../../components/Faild';
import style from '../styles/admin/systemstate.module.css';

const SystemState = () => {
    const { data, isPending, error } = useFetch('http://localhost:5000/systemState');
    const { fetchPut, result, isLoading, error: errorUpdate } = useFetchPut();
    const [yaer, setYear] = useState('');
    const [semester, setSemester] = useState('');

    const handelSubmite = async (e) => {
        e.preventDefault();
        await fetchPut('http://localhost:5000/systemState/update', {
            System_State_ID: data.System_State_ID, 
            System_Year: yaer, 
            System_Semester: semester
        })
    }

    useEffect(() => {
        if (data) {
            setYear(data.System_Year);
            setSemester(data.System_Semester);
        }
    }, [data])

    return (
        <section className={`containerPage ${style.systemState}`}>
            { 
                isPending ? <Loading />
                :
                <article>
                    <header>
                        <h1> <FontAwesomeIcon icon={faGear} /> إعدادات النظام</h1>
                    </header>
                    <section className={style.systemInfo}>
                        <p>إسم النظام:  {data.System_Name}</p>
                        <p>العام الجامعي: {data.System_Year}</p>
                        <p>الفصل الدراسي: {data.System_Semester === '1' ? 'الأول' : "الثاني"}</p>
                    </section>

                    <section className={`${style.systemUpdateState}`}>
                        <h3>تحديث معلومات النظام</h3>
                        <form className={`addForm`} onSubmit={handelSubmite}>
                            <section className={style.inputs}>
                                <section className={`input`}>
                                    <label htmlFor="systemYear">العام الجامعي: </label>
                                    <input 
                                        type='text' 
                                        name="systemYear" 
                                        required 
                                        value={yaer} 
                                        onChange={e => setYear(e.target.value)}
                                    />
                                </section>
                                <section className={`input ${style.radios}`}>
                                    <label htmlFor="systemSemester">الفصل الدراسي:  </label>
                                    <section className={style.radio}>
                                        <input 
                                            type='radio' 
                                            name="systemSemester" 
                                            required 
                                            value='1' 
                                            checked={ semester === '1'}
                                            onChange={e => setSemester(e.target.value)}
                                        />
                                        الفصل الدراسي الأول
                                    </section>
                                    <section className={style.radio}>
                                        <input 
                                            type='radio' 
                                            name="systemSemester" 
                                            required 
                                            value='2' 
                                            checked={ semester === '2'}
                                            onChange={e => setSemester(e.target.value)}
                                        />
                                        الفصل الدراسي الثاني
                                    </section>
                                </section>
                            </section>
                            <section className={`btnContainer ${style.btnContaineer}`}>
                                <input className={`btn ${style.btn}`} disabled={isLoading} type='submit' name='submit' value='تحديث' />
                            </section>
                        </form>
                    </section>

                    <Done result={result} error={errorUpdate} />

                    <Falid error={errorUpdate} />
                </article>
            }
            {
                error &&<p className="emptyElement">{error}</p>
            }
        </section>
    )
}

export default SystemState;