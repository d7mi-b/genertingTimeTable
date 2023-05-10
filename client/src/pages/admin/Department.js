import { faBuilding, faBuildingColumns, faUser, faUserGroup, faTableCellsLarge, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchPut } from '../../hooks/useFetchPut';
import Loading from "../../components/Loading";
import Done from '../../components/Done';
import Falid from '../../components/Faild';
import Delete from '../../components/Delete';
import useFetch from "../../hooks/useFetch";
import style from '../styles/admin/depaetment.module.css';

const Department = () => {
    const { Department_ID } = useParams();
    const { data: department, isPending: loadingDepartment, error: errorDepartment } = useFetch(`http://localhost:5000/departements/${Department_ID}`);
    const { data: batches, isPending: loadingBatches, error: errorBatches } = useFetch(`http://localhost:5000/batches/department/${Department_ID}`);
    const { data: lecturers, isPending: loadingLeactures, errorLectures } = useFetch(`http://localhost:5000/lecturers/department/${Department_ID}`);
    const { data: halls, isPending: loadingHalls, error: errorHalls } = useFetch(`http://localhost:5000/halls/department/${Department_ID}`);
    const { data: colleges } = useFetch('http://localhost:5000/colleges');
    const { fetchPut, result, isLoading: loadingUpdate, error: errorUpdate } = useFetchPut();
    const [ Department_Name, setDepartment_Name ] = useState('');
    const [College_ID, setCollege_ID] = useState('');

    const handelUpdate = async e => {
        e.preventDefault();

        await fetchPut('http://localhost:5000/departements/updateDepartment', {
            Department_ID, Department_Name, College_ID
        })
    }

    useEffect(() => {
        if (errorDepartment) {
            throw Error('لم يتم العثور القسم الذي تبحث عنه');
        }

        if (department) {
            setCollege_ID(department.College_ID);
            setDepartment_Name(department.Department_Name);
        }

        if (!(loadingDepartment || loadingBatches || loadingLeactures || loadingHalls)) {
            const btnUpdateDepartment = document.getElementById('btnUpdateDepartment');
            const updateDepartmentSec = document.getElementById('updateDepartmentSec');
            const closeUpdateDepartmentSec = document.getElementById('closeUpdateDepartmentSec');
    
            btnUpdateDepartment.addEventListener('click', () => {
                updateDepartmentSec.style.cssText = 'display: grid';
            })
    
            closeUpdateDepartmentSec.addEventListener('click', () => {
                updateDepartmentSec.style.cssText = 'display: none';
            })
    
            const btnDeleteDepartment = document.getElementById('btnDeleteDepartment');
            const deletComponent = document.querySelector('#deletComponent');
    
            btnDeleteDepartment.addEventListener('click', () => {
                deletComponent.style.cssText = 'display: flex';
            })
        }
        

    }, [errorDepartment, department, College_ID, loadingDepartment, loadingBatches, loadingLeactures, loadingHalls]);

    return (
        <div className={`containerPage ${style.container}`}>

            { (loadingDepartment || loadingBatches || loadingLeactures || loadingHalls) && <Loading />}
            
            { 
                !(loadingDepartment || loadingBatches || loadingLeactures || loadingHalls)
                &&
                <div>
                    <header>
                        <h1>
                            <FontAwesomeIcon icon={faBuildingColumns} />
                            {department && department.College_Name} قسم {department && department.Department_Name}
                        </h1>
                        <p>
                            <FontAwesomeIcon icon={faUser} />
                            رئيس القسم {department && department.Name}
                        </p>
                    </header>

                    { errorDepartment && <p className="emptyElement">{errorDepartment}</p>}

                    <article className={`${style.batches}`}>
                        <header>
                            <h2>
                                <FontAwesomeIcon icon={faUserGroup} />
                                طلاب القسم {department && department.countOfStudent} طالب
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
                                                <h3>{e.Semester_Name}</h3>
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
                                            <div className={style.buildingIcon}>
                                                <FontAwesomeIcon icon={faBuilding} className={style.icon} />
                                            </div>
                                        </article>
                                    )
                                })
                            }
                        </section>
                    </article>

                    <section className={style.buttons}>
                        <button className={`btn`} id='btnUpdateDepartment'>تعديل بيانات القسم</button>
                        <button className={`btn`} id='btnDeleteDepartment'>حذف القسم</button>
                    </section>

                    <section className={`container-section ${style.updateDepartementSection}`} id='updateDepartmentSec' >
                        <article className={`center-section`}>
                            <FontAwesomeIcon className={`close-btn ${style.btnClose}`} id='closeUpdateDepartmentSec' icon={faXmark} size='xl' />
                            <header>
                                <h1>تعديل بيانات قسم</h1>
                            </header>
                            <form className={`addForm`} onSubmit={handelUpdate}>
                                <label htmlFor='name'>إسم القسم:</label>
                                <section className={`input`}>
                                    <FontAwesomeIcon icon={faTableCellsLarge} />
                                    <input 
                                        type='text' 
                                        name='name'
                                        required
                                        value={Department_Name}
                                        onChange={e => setDepartment_Name(e.target.value)} 
                                    />
                                </section>
                                <label htmlFor="departement">الكلية:</label>
                                <section className="input">
                                    <FontAwesomeIcon icon={faBuildingColumns} />
                                    <select value={College_ID} onChange={e => setCollege_ID(+e.target.value)}>
                                        {
                                            colleges &&
                                            colleges.map(e => {
                                                return (
                                                <option value={e.College_ID} key={e.College_ID}>{e.College_Name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </section>
                                {
                                    !loadingUpdate &&
                                    <section className='btnContainer'>
                                        <input className={`btn ${style.btn}`} type='submit' name='submit' value='تعديل بيانات القسم' />
                                    </section>
                                }
                            </form>
                        </article>
                    </section>

                    <Done result={result} error={errorUpdate} />

                    <Falid error={errorUpdate} />

                    <Delete url='http://localhost:5000/departements/deleteDepartment' body={{ Department_ID }} />
                </div>
            }

        </div>
    )
}

export default Department;