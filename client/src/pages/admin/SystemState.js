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
    const [dayOFF, setDayOFF] = useState(0);
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
            setDayOFF(weights.dayOFF);
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
                        <p>إسم الجامعة:  {data.System_Name}</p>
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
                                <header>
                                    <h3>
                                        عند تكوين الجدول يجب تلبية الشروط الأتية:
                                    </h3>
                                </header>
                                <section className={style.weightsController}>
                                    <section className={style.containerWehigs}>
                                        <p>
                                            الإلتزام بعدد أيام حضور المحاضرين التي تم توضيحها في اعدادات المحاضر
                                        </p>
                                        <section className={style.chooseWeight}>
                                            <section className={style.radio}>
                                                <input 
                                                    type='radio' 
                                                    name="weight1" 
                                                    required 
                                                    value='0' 
                                                    checked={ lecturerAvailabilty === 0 }
                                                    onChange={e => setLecturerAvailabilty(+e.target.value)}
                                                />
                                                1
                                            </section>
                                            <section className={style.radio}>
                                                <input 
                                                    type='radio' 
                                                    name="weight1" 
                                                    required 
                                                    value='0.25' 
                                                    checked={ lecturerAvailabilty === 0.25 }
                                                    onChange={e => setLecturerAvailabilty(+e.target.value)}
                                                />
                                                2
                                            </section>
                                            <section className={style.radio}>
                                                <input 
                                                    type='radio' 
                                                    name="weight1" 
                                                    required 
                                                    value='0.5' 
                                                    checked={ lecturerAvailabilty === 0.5 }
                                                    onChange={e => setLecturerAvailabilty(+e.target.value)}
                                                />
                                                3
                                            </section>
                                            <section className={style.radio}>
                                                <input 
                                                    type='radio' 
                                                    name="weight1" 
                                                    required 
                                                    value='0.75' 
                                                    checked={ lecturerAvailabilty === 0.75 }
                                                    onChange={e => setLecturerAvailabilty(+e.target.value)}
                                                />
                                                4
                                            </section>
                                            <section className={style.radio}>
                                                <input 
                                                    type='radio' 
                                                    name="weight1" 
                                                    required 
                                                    value='1' 
                                                    checked={ lecturerAvailabilty === 1 }
                                                    onChange={e => setLecturerAvailabilty(+e.target.value)}
                                                />
                                                5
                                            </section>
                                        </section>
                                    </section>

                                    <section className={style.containerWehigs}>
                                        <p>
                                            تقليل الزمن الفارغ بين المحاضرات
                                        </p>
                                        <section className={style.chooseWeight}>
                                            <section className={style.radio}>
                                                <input 
                                                    type='radio' 
                                                    name="weight2" 
                                                    required 
                                                    value='0' 
                                                    checked={ timeGap === 0 }
                                                    onChange={e => setTimeGap(+e.target.value)}
                                                />
                                                1
                                            </section>
                                            <section className={style.radio}>
                                                <input 
                                                    type='radio' 
                                                    name="weight2" 
                                                    required 
                                                    value='0.25' 
                                                    checked={ timeGap === 0.25 }
                                                    onChange={e => setTimeGap(+e.target.value)}
                                                />
                                                2
                                            </section>
                                            <section className={style.radio}>
                                                <input 
                                                    type='radio' 
                                                    name="weight2" 
                                                    required 
                                                    value='0.5' 
                                                    checked={ timeGap === 0.5 }
                                                    onChange={e => setTimeGap(+e.target.value)}
                                                />
                                                3
                                            </section>
                                            <section className={style.radio}>
                                                <input 
                                                    type='radio' 
                                                    name="weight2" 
                                                    required 
                                                    value='0.75' 
                                                    checked={ timeGap === 0.75 }
                                                    onChange={e => setTimeGap(+e.target.value)}
                                                />
                                                4
                                            </section>
                                            <section className={style.radio}>
                                                <input 
                                                    type='radio' 
                                                    name="weight2" 
                                                    required 
                                                    value='1' 
                                                    checked={ timeGap === 1 }
                                                    onChange={e => setTimeGap(+e.target.value)}
                                                />
                                                5
                                            </section>
                                        </section>
                                    </section>

                                    <section className={style.containerWehigs}>
                                        <p>
                                            تكون محاضرات العملي في يوم واحد
                                        </p>
                                        <section className={style.chooseWeight}>
                                            <section className={style.radio}>
                                                <input 
                                                    type='radio' 
                                                    name="weight3" 
                                                    required 
                                                    value='0' 
                                                    checked={ labsOnSameDay === 0 }
                                                    onChange={e => setLabsOnSameDay(+e.target.value)}
                                                />
                                                1
                                            </section>
                                            <section className={style.radio}>
                                                <input 
                                                    type='radio' 
                                                    name="weight3" 
                                                    required 
                                                    value='0.25' 
                                                    checked={ labsOnSameDay === 0.25 }
                                                    onChange={e => setLabsOnSameDay(+e.target.value)}
                                                />
                                                2
                                            </section>
                                            <section className={style.radio}>
                                                <input 
                                                    type='radio' 
                                                    name="weight3" 
                                                    required 
                                                    value='0.5' 
                                                    checked={ labsOnSameDay === 0.5 }
                                                    onChange={e => setLabsOnSameDay(+e.target.value)}
                                                />
                                                3
                                            </section>
                                            <section className={style.radio}>
                                                <input 
                                                    type='radio' 
                                                    name="weight3" 
                                                    required 
                                                    value='0.75' 
                                                    checked={ labsOnSameDay === 0.75 }
                                                    onChange={e => setLabsOnSameDay(+e.target.value)}
                                                />
                                                4
                                            </section>
                                            <section className={style.radio}>
                                                <input 
                                                    type='radio' 
                                                    name="weight3" 
                                                    required 
                                                    value='1' 
                                                    checked={ labsOnSameDay === 1 }
                                                    onChange={e => setLabsOnSameDay(+e.target.value)}
                                                />
                                                5
                                            </section>
                                        </section>
                                    </section>

                                    <section className={style.containerWehigs}>
                                        <p>
                                            يعطى الطلاب يوم فارغ
                                        </p>
                                        <section className={style.chooseWeight}>
                                            <section className={style.radio}>
                                                <input 
                                                    type='radio' 
                                                    name="weight4" 
                                                    required 
                                                    value='0' 
                                                    checked={ dayOFF === 0 }
                                                    onChange={e => setDayOFF(+e.target.value)}
                                                />
                                                1
                                            </section>
                                            <section className={style.radio}>
                                                <input 
                                                    type='radio' 
                                                    name="weight4" 
                                                    required 
                                                    value='0.25' 
                                                    checked={ dayOFF === 0.25 }
                                                    onChange={e => setDayOFF(+e.target.value)}
                                                />
                                                2
                                            </section>
                                            <section className={style.radio}>
                                                <input 
                                                    type='radio' 
                                                    name="weight4" 
                                                    required 
                                                    value='0.5' 
                                                    checked={ dayOFF === 0.5 }
                                                    onChange={e => setDayOFF(+e.target.value)}
                                                />
                                                3
                                            </section>
                                            <section className={style.radio}>
                                                <input 
                                                    type='radio' 
                                                    name="weight4" 
                                                    required 
                                                    value='0.75' 
                                                    checked={ dayOFF === 0.75 }
                                                    onChange={e => setDayOFF(+e.target.value)}
                                                />
                                                4
                                            </section>
                                            <section className={style.radio}>
                                                <input 
                                                    type='radio' 
                                                    name="weight4" 
                                                    required 
                                                    value='1' 
                                                    checked={ dayOFF === 1 }
                                                    onChange={e => setDayOFF(+e.target.value)}
                                                />
                                                5
                                            </section>
                                        </section>
                                    </section>

                                    <section className={style.containerWehigs}>
                                        <p>
                                            لا يزيد عدد المحاضرات عن ثلاث محاضرات للطلاب في اليوم الواحد
                                        </p>
                                        <section className={style.chooseWeight}>
                                            <section className={style.radio}>
                                                <input 
                                                    type='radio' 
                                                    name="weight5" 
                                                    required 
                                                    value='0' 
                                                    checked={ lecturesOnDay === 0 }
                                                    onChange={e => setLecturesOnDay(+e.target.value)}
                                                />
                                                1
                                            </section>
                                            <section className={style.radio}>
                                                <input 
                                                    type='radio' 
                                                    name="weight5" 
                                                    required 
                                                    value='0.25' 
                                                    checked={ lecturesOnDay === 0.25 }
                                                    onChange={e => setLecturesOnDay(+e.target.value)}
                                                />
                                                2
                                            </section>
                                            <section className={style.radio}>
                                                <input 
                                                    type='radio' 
                                                    name="weight5" 
                                                    required 
                                                    value='0.5' 
                                                    checked={ lecturesOnDay === 0.5 }
                                                    onChange={e => setLecturesOnDay(+e.target.value)}
                                                />
                                                3
                                            </section>
                                            <section className={style.radio}>
                                                <input 
                                                    type='radio' 
                                                    name="weight5" 
                                                    required 
                                                    value='0.75' 
                                                    checked={ lecturesOnDay === 0.75 }
                                                    onChange={e => setLecturesOnDay(+e.target.value)}
                                                />
                                                4
                                            </section>
                                            <section className={style.radio}>
                                                <input 
                                                    type='radio' 
                                                    name="weight5" 
                                                    required 
                                                    value='1' 
                                                    checked={ lecturesOnDay === 1 }
                                                    onChange={e => setLecturesOnDay(+e.target.value)}
                                                />
                                                5
                                            </section>
                                        </section>
                                    </section>

                                    <section className={style.containerWehigs}>
                                        <p>
                                            أن تبدأ المحاضرة الأولى في الساعة الثامنة صباحًا
                                        </p>
                                        <section className={style.chooseWeight}>
                                            <section className={style.radio}>
                                                <input 
                                                    type='radio' 
                                                    name="weight6" 
                                                    required 
                                                    value='0' 
                                                    checked={ lecturesOnDay === 0 }
                                                    onChange={e => setGroupsTimes(+e.target.value)}
                                                />
                                                1
                                            </section>
                                            <section className={style.radio}>
                                                <input 
                                                    type='radio' 
                                                    name="weight6" 
                                                    required 
                                                    value='0.25' 
                                                    checked={ groupsTimes === 0.25 }
                                                    onChange={e => setGroupsTimes(+e.target.value)}
                                                />
                                                2
                                            </section>
                                            <section className={style.radio}>
                                                <input 
                                                    type='radio' 
                                                    name="weight6" 
                                                    required 
                                                    value='0.5' 
                                                    checked={ groupsTimes === 0.5 }
                                                    onChange={e => setGroupsTimes(+e.target.value)}
                                                />
                                                3
                                            </section>
                                            <section className={style.radio}>
                                                <input 
                                                    type='radio' 
                                                    name="weight6" 
                                                    required 
                                                    value='0.75' 
                                                    checked={ groupsTimes === 0.75 }
                                                    onChange={e => setGroupsTimes(+e.target.value)}
                                                />
                                                4
                                            </section>
                                            <section className={style.radio}>
                                                <input 
                                                    type='radio' 
                                                    name="weight6" 
                                                    required 
                                                    value='1' 
                                                    checked={ groupsTimes === 1 }
                                                    onChange={e => setGroupsTimes(+e.target.value)}
                                                />
                                                5
                                            </section>
                                        </section>
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