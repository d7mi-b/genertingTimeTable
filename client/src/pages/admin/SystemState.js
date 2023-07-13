import { faGear } from "@fortawesome/free-solid-svg-icons";
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
    const { data: weights } = useFetch('http://localhost:5000/systemState/weights')
    const { fetchPut, result, isLoading, error: errorUpdate } = useFetchPut();

    const [yaer, setYear] = useState('');
    const [semester, setSemester] = useState('');
    const [defaultSetting, setDefaultSetting] = useState(null);

    const [lecturerAvailabilty, setLecturerAvailabilty] = useState(0);
    const [timeGap, setTimeGap] = useState(0);
    const [labsOnSameDay, setLabsOnSameDay] = useState(0);
    const [dayOFF, setdayOFF] = useState(0);
    const [lecturesOnDay, setLecturesOnDay] = useState(0);
    const [groupsTimes, setGroupsTimes] = useState(0);


    const handelSubmite = async (e) => {
        e.preventDefault();
        await fetchPut('http://localhost:5000/systemState/update', {
            System_State_ID: data.System_State_ID, 
            System_Year: yaer, 
            System_Semester: semester
        });
    }

    const handelChangeDefaultWeights = async e => {
        setDefaultSetting(e)
        await fetchPut('http://localhost:5000/systemState/changeDefaultWieghts', {
            System_State_ID: data.System_State_ID, 
            Default_Weights: e
        });
    }

    const handelWeightsController = async e => {
        e.preventDefault();
        await fetchPut('http://localhost:5000/systemState/weights/update', {
            lecturerAvailabilty: lecturerAvailabilty, 
            timeGap: timeGap, 
            labsOnSameDay: labsOnSameDay, 
            dayOFF: dayOFF, 
            lecturesOnDay: lecturesOnDay, 
            groupsTimes: groupsTimes
        });
    }

    useEffect(() => {
        if (data) {
            setYear(data.System_Year);
            setSemester(data.System_Semester);
            setDefaultSetting(data.Default_Weights)
        }

        if (weights) {
            setLecturerAvailabilty(weights.lecturerAvailabilty);
            setTimeGap(weights.timeGap);
            setLabsOnSameDay(weights.labsOnSameDay);
            setdayOFF(weights.dayOFF);
            setLecturesOnDay(weights.lecturesOnDay);
            setGroupsTimes(weights.groupsTimes);
        }

    }, [data, weights])

    return (
        <section className={`containerPage ${style.systemState}`}>
            { 
                !isPending && data &&
                <article className={style.contnent}>
                    <header>
                        <h1> <FontAwesomeIcon icon={faGear} /> إعدادات النظام</h1>
                    </header>
                    <section className={style.systemInfo}>
                        <p>إسم النظام:  {data.System_Name}</p>
                        <p>العام الجامعي: {yaer}</p>
                        <p>الفصل الدراسي: {semester === 1 ? 'الأول' : "الثاني"}</p>
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
                                            checked={ semester === 1 }
                                            onChange={e => setSemester(+e.target.value)}
                                        />
                                        الفصل الدراسي الأول
                                    </section>
                                    <section className={style.radio}>
                                        <input 
                                            type='radio' 
                                            name="systemSemester" 
                                            required 
                                            value='2' 
                                            checked={ semester === 2 }
                                            onChange={e => setSemester(+e.target.value)}
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

                    <article className={`${style.systemUpdateState}`}>
                        <h3>اعدادات الجدول</h3>

                        <section className={style.weightsInfo}>
                            <section className={`input ${style.radios}`}>
                                <section className={style.radio}>
                                    <input 
                                        type='radio' 
                                        name="defaultWeights" 
                                        required 
                                        value='1' 
                                        checked={ defaultSetting === 1 }
                                        onChange={e => handelChangeDefaultWeights(+e.target.value)}
                                    />
                                    الإعدادات الإفتراضية
                                </section>
                                <section className={style.radio}>
                                    <input 
                                        type='radio' 
                                        name="defaultWeights" 
                                        required 
                                        value='0' 
                                        checked={ defaultSetting === 0 }
                                        onChange={e => handelChangeDefaultWeights(+e.target.value)}
                                    />
                                    تخصيص الإعدادات
                                </section>
                            </section>
                        </section>

                        {
                            !defaultSetting && 
                            <form className={`${style.weightsSetting}`} onSubmit={handelWeightsController}>
                                <section className={style.weightsController}>
                                    <section>
                                        <p>نصاب التدريس لأعضاء هيئة التدريس</p>
                                        <input 
                                            className={style.weightsRange}
                                            type='range' value={lecturerAvailabilty} 
                                            min='0.25' max='1' step='0.25' 
                                            list="rangelabel"
                                            onChange={(e) => setLecturerAvailabilty(+e.target.value)}
                                        />
                                        <datalist id="rangelabel">
                                            <option value="0.25" label="25%" />
                                            <option value="0.50" label="50%"/>
                                            <option value="0.75" label="75%" />
                                            <option value="1" label="100%"/>                                            
                                        </datalist>
                                    </section>

                                    <section>
                                        <p>أوقات الفراغ بين المحاضرات</p>
                                        <input 
                                            className={style.weightsRange}
                                            type='range' value={timeGap} 
                                            min='0.25' max='1' step='0.25' 
                                            list="rangelabel"
                                            onChange={(e) => setTimeGap(+e.target.value)}
                                        />
                                        <datalist id="rangelabel">
                                            <option value="0.25" label="25%" />
                                            <option value="0.50" label="50%"/>
                                            <option value="0.75" label="75%" />
                                            <option value="1" label="100%"/>                                            
                                        </datalist>
                                    </section>

                                    <section>
                                        <p>محاضرات العملي في يوم واحد</p>
                                        <input 
                                            className={style.weightsRange}
                                            type='range' value={labsOnSameDay} 
                                            min='0.25' max='1' step='0.25' 
                                            list="rangelabel"
                                            onChange={(e) => setLabsOnSameDay(+e.target.value)}
                                        />
                                        <datalist id="rangelabel">
                                            <option value="0.25" label="25%" />
                                            <option value="0.50" label="50%"/>
                                            <option value="0.75" label="75%" />
                                            <option value="1" label="100%"/>                                            
                                        </datalist>
                                    </section>

                                    <section>
                                        <p>أيام الأوف للطلاب</p>
                                        <input 
                                            className={style.weightsRange}
                                            type='range' value={dayOFF} 
                                            min='0.25' max='1' step='0.25' 
                                            list="rangelabel"
                                            onChange={(e) => setdayOFF(+e.target.value)}
                                        />
                                        <datalist id="rangelabel">
                                            <option value="0.25" label="25%" />
                                            <option value="0.50" label="50%"/>
                                            <option value="0.75" label="75%" />
                                            <option value="1" label="100%"/>                                            
                                        </datalist>
                                    </section>

                                    <section>
                                        <p>عدد المحاضرات في اليوم للطلاب</p>
                                        <input 
                                            className={style.weightsRange}
                                            type='range' value={lecturesOnDay} 
                                            min='0.25' max='1' step='0.25' 
                                            list="rangelabel"
                                            onChange={(e) => setLecturesOnDay(+e.target.value)}
                                        />
                                        <datalist id="rangelabel">
                                            <option value="0.25" label="25%" />
                                            <option value="0.50" label="50%"/>
                                            <option value="0.75" label="75%" />
                                            <option value="1" label="100%"/>                                            
                                        </datalist>
                                    </section>

                                    <section>
                                        <p>أوقات إبتداء الدوام</p>
                                        <input 
                                            className={style.weightsRange}
                                            type='range' value={groupsTimes} 
                                            min='0.25' max='1' step='0.25' 
                                            list="rangelabel"
                                            onChange={(e) => setGroupsTimes(+e.target.value)}
                                        />
                                        <datalist id="rangelabel">
                                            <option value="0.25" label="25%" />
                                            <option value="0.50" label="50%"/>
                                            <option value="0.75" label="75%" />
                                            <option value="1" label="100%"/>                                            
                                        </datalist>
                                    </section>
                                </section>
                                <section className={`btnContainer ${style.btnContaineer}`}>
                                    <input className={`btn ${style.btn}`} disabled={isLoading} type='submit' name='submit' value='تحديث' />
                                </section>
                            </form>
                        }
                    </article>
                </article>
            }
            {
                error &&<p className="emptyElement">{error}</p>
            }
            {
                isPending && <Loading />
            }
            <Done result={result} error={errorUpdate} />

            <Falid error={errorUpdate} />
        </section>
    )
}

export default SystemState;