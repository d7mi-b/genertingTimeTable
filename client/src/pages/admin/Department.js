import { faBuilding, faBuildingColumns, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import useFetch from "../../hooks/useFetch";
import style from '../styles/admin/depaetment.module.css';

const Department = () => {
    const { Department_ID } = useParams();
    const { data: department, isPending: loadingDepartment, error: errorDepartment } = useFetch(`http://localhost:5000/departements/${Department_ID}`);
    const { data: batches, isPending: loadingBatches, error: errorBatches } = useFetch(`http://localhost:5000/batches/department/${Department_ID}`);
    const { data: lecturers, isPending: loadingLeactures, errorLectures } = useFetch(`http://localhost:5000/lecturers/department/${Department_ID}`);
    const { data: halls, isPending: loadingHalls, error: errorHalls } = useFetch(`http://localhost:5000/building/department/${Department_ID}`);

    useEffect(() => {
        if (errorDepartment)
            throw Error('لم يتم العثور القسم الذي تبحث عنه')
    }, [errorDepartment])

    return (
        <div className={`containerPage ${style.container}`}>

            { (loadingDepartment || loadingBatches || loadingLeactures || loadingHalls) && <Loading />}

            <header>
                <h1>
                    <FontAwesomeIcon icon={faBuildingColumns} />
                    {department && department.College_Name} قسم {department && department.Department_Name}
                </h1>
            </header>

            { errorDepartment && <p className="emptyElement">{errorDepartment}</p>}

            <article className={`${style.batches}`}>
                <header>
                    <h2>
                        <FontAwesomeIcon icon={faUserGroup} />
                        طلاب القسم
                    </h2>
                </header>
                <section className={`${style.batchesContainer}`}>
                    { errorBatches && <p className="emptyElement">{errorBatches}</p>}
                    {
                        batches && 
                        batches.map(e => {
                            return (
                                <article className={`${style.batch}`} id={e.Batch_ID} key={e.Batch_ID}>
                                    <header>
                                        <h3>المستوى {e.Level_Name}</h3>
                                    </header>
                                    <section className={`${style.countBatch}`}>
                                        <section className={`${style.count}`}>
                                            <p>القبول العام</p>
                                            <p>{e.Batch_General_Count}</p>
                                        </section>
                                        <section className={`${style.count}`}>
                                            <p>النفقة الخاصة</p>
                                            <p>{e.Batch_Payment_Count}</p>
                                        </section>
                                        <section className={`${style.count}`}>
                                            <p>الموازي</p>
                                            <p>{e.Batch_Parallel_Count}</p>
                                        </section>
                                    </section>
                                </article>
                            );
                        })
                    }
                </section>
            </article>

            <article className={`${style.lecturers}`}>
                <header>
                    <h2>
                        <FontAwesomeIcon icon={faUserGroup} />
                        أعضاء هيئة التدريس {lecturers && lecturers.length} أعضاء
                    </h2>
                </header>
                <section className={`${style.lecturersContainer}`}>
                    { errorLectures && <p className="emptyElement">{errorLectures}</p>}
                    {
                        lecturers && 
                        lecturers.map(e => {
                            return (
                                <article className={`${style.lecturer}`} id={e.Lecturer_ID} key={e.Lecturer_ID}>
                                    <p>{e.Lecturer_Name}</p>
                                </article>
                            )
                        })
                    }
                </section>
            </article>

            <article className={`${style.halls}`}>
                <header>
                    <h2>
                        <FontAwesomeIcon icon={faBuilding} />
                        القاعات والمختبرات التابعة للقسم {halls && halls.length} قاعة ومختبر
                    </h2>
                </header>
                <section className={`${style.hallsContainer}`}>
                    { errorHalls && <p className="emptyElement">{errorHalls}</p>}
                    {
                        halls && 
                        halls.map(e => {
                            return (
                                <article className={`${style.hall}`} id={e.Hall_ID} key={e.Hall_ID}>
                                    <div>
                                        <p>{e.Hall_Name}</p>
                                        <p>مبنى {e.Building_Name}</p>
                                        <p>{e.Hall_Capacity} مقعد</p>
                                        <p>{e.Type_Name}</p>
                                    </div>
                                    <FontAwesomeIcon icon={faBuilding} className={style.icon} />
                                </article>
                            )
                        })
                    }
                </section>
            </article>
        </div>
    )
}

export default Department;