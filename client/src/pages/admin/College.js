import { faXmark, faTableCellsLarge, faBuildingColumns } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import Done from '../../components/Done';
import Falid from '../../components/Faild';
import Delete from '../../components/Delete';
import useFetch from '../../hooks/useFetch';
import style from '../styles/admin/building.module.css';
import styleDep from '../styles/admin/departements.module.css';
import { useFetchPut } from '../../hooks/useFetchPut';
import { useFetchPost } from '../../hooks/useFetchPost';

const College = () => {
    const { College_ID } = useParams();
    const { data: colleges } = useFetch('http://localhost:5000/colleges');
    const { data: college, isPending: loadingCollege, error: errorCollege} = useFetch(`http://localhost:5000/colleges/${College_ID}`);
    const { data: departments, isPending: loadingDepartment, error: errorDepartments } = useFetch(`http://localhost:5000/departements/college/${College_ID}`);

    const { fetchPut, result: updateResult, isLoading: loadingUpdate, error: updateError } = useFetchPut();
    const { fetchPost, result: postResult, isLoading: loadingPost, error: postError } = useFetchPost();

    const [College_Id, setCollege_ID] = useState('')
    const [ Department_ID, setDepartment_ID ] = useState('');
    const [ Department_Name, setDepartment_Name ] = useState('');
    

    const handelUpdate = async e => {
        e.preventDefault();

        await fetchPut('http://localhost:5000/departements/updateDepartment', {
            Department_ID, Department_Name, College_ID: College_Id
        })
    }

    const handelAdd = async e => {
        e.preventDefault();
        
        await fetchPost('http://localhost:5000/departements/addDepartment', {
            Department_Name, College_ID
        });

        const departemntsContainer = document.getElementById('departemntsContainer');

        const departemnt = document.createElement('a');
        departemnt.classList.add(styleDep.departemnt);

        departemnt.innerHTML = `
            <section class=${styleDep.img}>
                <img src='/images/Mask Group 36.png' alt='departemnt' />
            </section>
            <h1>${Department_Name}</h1>
        `;
        
        departemntsContainer.appendChild(departemnt);
    }

    useEffect(() => {
        if (errorCollege) {
            throw Error('لم يتم العثور على الكلية التي تبحث عنها');
        }

        if (departments) {
            if (departments.length > 0) {
                const btnUpdateDepartment = document.getElementById('btnUpdateDepartment');
                const updateDepartmentSec = document.getElementById('updateDepartmentSec');
                const closeUpdateDepartmentSec = document.getElementById('closeUpdateDepartmentSec');
        
                btnUpdateDepartment.addEventListener('click', () => {
                    setDepartment_Name(departments.filter(d => d.Department_ID === Department_ID)[0].Department_Name);
                    updateDepartmentSec.style.cssText = 'display: grid';
                })
        
                closeUpdateDepartmentSec.addEventListener('click', () => {
                    updateDepartmentSec.style.cssText = 'display: none';
                })
        
                const btnDeleteDepartment = document.getElementById('btnDeleteDepartment');
                const deleteDepartmentSec = document.getElementById('deleteDepartmentSec');
                const closeDeleteDepartmentSec = document.getElementById('closeDeleteDepartmentSec');

                btnDeleteDepartment.addEventListener('click', () => {
                    setDepartment_Name(departments.filter(d => d.Department_ID === Department_ID)[0].Department_Name);
                    deleteDepartmentSec.style.cssText = 'display: grid';
                })
        
                closeDeleteDepartmentSec.addEventListener('click', () => {
                    deleteDepartmentSec.style.cssText = 'display: none';
                })

                const openDeleteComponent = document.getElementById('openDeleteComponent')
                const deletComponent = document.querySelector('#deletComponent');
        
                openDeleteComponent.addEventListener('click', () => {
                    deletComponent.style.cssText = 'display: flex';
                })

                const btnAddDepartment = document.getElementById('btnAddDepartment');
                const addDepartmentSec = document.getElementById('addDepartmentSec');
                const closeAddDepartmentSec = document.getElementById('closeAddDepartmentSec');
        
                btnAddDepartment.addEventListener('click', () => {
                    setDepartment_Name('')
                    addDepartmentSec.style.cssText = 'display: grid';
                })
        
                closeAddDepartmentSec.addEventListener('click', () => {
                    addDepartmentSec.style.cssText = 'display: none';
                })
            }

            if (departments.length > 0 && !Department_ID)
                setDepartment_ID(departments[0].Department_ID);

            if (Department_ID) 
                setDepartment_Name(departments.filter(d => d.Department_ID === Department_ID)[0].Department_Name);
        }

        setCollege_ID(College_ID)

    }, [errorDepartments, departments, loadingDepartment, Department_ID, College_ID]);

    return (
        <section className={`containerPage ${style.container}`}>
            {
                loadingCollege && <Loading />
            }
            {
                !loadingCollege &&
                <article className={style.content}>
                    <header>
                        <h1>
                            <FontAwesomeIcon icon={faBuildingColumns} />
                            {college && college.College_Name}
                        </h1>
                    </header>

                    { errorCollege && <p className="emptyElement">{errorCollege}</p>}

                    <article className={`${style.halls}`}>
                        <header>
                            <h2>
                                <FontAwesomeIcon icon={faTableCellsLarge} />
                                أقسام الكلية
                            </h2>
                        </header>
                    </article>

                    {
                        departments && departments.length > 0 && 
                        <section className={`${styleDep.departemntsContainer}`} id='departemntsContainer'>
                            {   departments &&
                                departments.map(e => {
                                    return (
                                        <Link to={`department/${e.Department_ID}`} className={`${styleDep.departemnt}`} key={e.Department_ID} id={e.Department_ID}>
                                            <section className={`${styleDep.img}`}>
                                                <img src='/images/Mask Group 36.png' alt='departemnt' />
                                            </section>
                                            <h1>{e.Department_Name}</h1>
                                        </Link>
                                    )
                                })
                            }
                        </section>
                    }

                    {
                        departments && departments.length === 0 && <p className='emptyElement'>لا يوجد أقسام</p>
                    }

                    {
                        departments && departments.length > 0 &&
                        <section className={style.buttons}>
                            <button className={`btn`} id='btnAddDepartment'>إضافة قسم</button>
                            <button className={`btn`} id='btnUpdateDepartment'>تعديل بيانات قسم</button>
                            <button className={`btn`} id='btnDeleteDepartment'>حذف قسم</button>
                        </section>
                    }

                    <section className={`container-section ${style.updateDepartementSection}`} id='addDepartmentSec' >
                        <article className={`center-section`}>
                            <FontAwesomeIcon className={`close-btn ${style.btnClose}`} id='closeAddDepartmentSec' icon={faXmark} size='xl' />
                            <header>
                                <h1>إضافة قسم</h1>
                            </header>
                            <form className={`addForm`} onSubmit={handelAdd}>
                                <label htmlFor='name'>إسم القسم :</label>
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
                                <section className='btnContainer'>
                                    <input className={`btn ${style.btn}`} type='submit' name='submit' value='إضافة القسم' disabled={loadingPost} />
                                </section>
                            </form>
                        </article>
                    </section>

                    <section className={`container-section ${style.updateDepartementSection}`} id='updateDepartmentSec' >
                        <article className={`center-section`}>
                            <FontAwesomeIcon className={`close-btn ${style.btnClose}`} id='closeUpdateDepartmentSec' icon={faXmark} size='xl' />
                            <header>
                                <h1>تعديل بيانات قسم</h1>
                            </header>
                            <form className={`addForm`} onSubmit={handelUpdate}>
                                <label htmlFor="departement">القسم:</label>
                                <section className="input">
                                    <FontAwesomeIcon icon={faTableCellsLarge} />
                                    <select value={Department_ID} onChange={e => setDepartment_ID(+e.target.value)}>
                                        {
                                        departments &&
                                        departments.map(e => {
                                            return (
                                            <option value={e.Department_ID} key={e.Department_ID}>{e.Department_Name}</option>
                                            )
                                        })
                                        }
                                    </select>
                                </section>
                                <label htmlFor='name'>إسم القسم الجديد:</label>
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
                                    <select value={College_Id} onChange={e => setCollege_ID(+e.target.value)}>
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
                                <section className='btnContainer'>
                                    <input className={`btn ${style.btn}`} type='submit' name='submit' value='تعديل بيانات القسم' disabled={loadingUpdate} />
                                </section>
                            </form>
                        </article>
                    </section>

                    <section className={`container-section ${style.updateDepartementSection}`} id='deleteDepartmentSec' >
                        <article className={`center-section`}>
                            <FontAwesomeIcon className={`close-btn ${style.btnClose}`} id='closeDeleteDepartmentSec' icon={faXmark} size='xl' />
                            <header>
                                <h1> حذف قسم</h1>
                            </header>
                            <form className={`addForm`} onSubmit={(e) => e.preventDefault()}>
                                <label htmlFor="departement">القسم:</label>
                                <section className="input">
                                    <FontAwesomeIcon icon={faTableCellsLarge} />
                                    <select value={Department_ID} onChange={e => setDepartment_ID(+e.target.value)}>
                                        {
                                        departments &&
                                        departments.map(e => {
                                            return (
                                            <option value={e.Department_ID} key={e.Department_ID}>{e.Department_Name}</option>
                                            )
                                        })
                                        }
                                    </select>
                                </section>
                                <section className='btnContainer'>
                                    <input className={`btn ${style.btn}`} id='openDeleteComponent' type='submit' name='submit' value='حذف القسم' disabled={loadingUpdate} />
                                </section>
                            </form>
                        </article>
                    </section>

                    <Done result={updateResult || postResult} error={updateError || postError} />

                    <Falid error={updateError || postError} />

                    <Delete url='http://localhost:5000/departements/deleteDepartment' body={{Department_ID}} element={Department_ID} />
                </article>
            }
        </section>
    );
}

export default College;