import { faBuilding, faXmark, faTrash, faEdit, faTableCellsLarge, faChair, faFlask } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import Done from '../../components/Done';
import Falid from '../../components/Faild';
import Delete from '../../components/Delete';
import useFetch from '../../hooks/useFetch';
import style from '../styles/admin/building.module.css';
import { useFetchPut } from '../../hooks/useFetchPut';
import { useFetchPost } from '../../hooks/useFetchPost';

const Building = () => {
    const { Building_ID } = useParams();
    const { data: building, isPending: loadingBuilding, error: errorBuilding} = useFetch(`http://localhost:5000/building/${Building_ID}`);
    const { data: halls, isPending: loadinghalls, error: errorHalls } = useFetch(`http://localhost:5000/halls/building/${Building_ID}`);
    const { data: departements } = useFetch('http://localhost:5000/departements');
    const { data: hall_types } = useFetch('http://localhost:5000/hallTypes');

    const { fetchPut, result: updateResult, isLoading: loadingUpdate, error: updateError } = useFetchPut();
    const { fetchPost, result: postResult, isLoading: loadingPost, error: postError } = useFetchPost();

    const [Building_Name, setBuilding_Name] = useState('');
    const [deleteAPI, setDeleteAPI] = useState(null);
    const [deleteBody, setDeleteBody] = useState(null);

    const [Hall_ID, setHall_ID] = useState('');
    const [Hall_Name, setHall_Name] = useState('');
    const [Hall_Capacity, setHall_Capacity] = useState('');
    const [Department_ID, setDepartment_ID] = useState('');
    const [Hall_Type_ID, setHall_Type_ID] = useState('');

    const handelUpdate = async e => {
        e.preventDefault();

        await fetchPut('http://localhost:5000/building/updateBuilding', {
            Building_ID, Building_Name
        });
    }

    const handelDeleteBuilding = () => {
        setDeleteAPI('http://localhost:5000/building/deleteBuilding');
        setDeleteBody({ Building_ID });
    }

    const handelAddHall = async (e) => {
        e.preventDefault();
        
        await fetchPost('http://localhost:5000/halls/addHall', {
            Hall_Name, Hall_Capacity, Department_ID, Building_ID, Hall_Type_ID
        })
    }

    const fillUpdateHallData = e => {
        setHall_Name(e.Hall_Name);
        setHall_Capacity(e.Hall_Capacity);
        setDepartment_ID(e.Department_ID);
        setHall_Type_ID(e.Hall_Type_ID);
    }

    const handelUpdateHall = async e => {
        e.preventDefault();

        await fetchPut('http://localhost:5000/halls/updateHall', {
            Hall_ID, Hall_Name, Hall_Capacity, Department_ID, Building_ID, Hall_Type_ID
        });
    }

    const handelDeleteHall = () => {
        setDeleteAPI('http://localhost:5000/halls/deleteHall');
        setDeleteBody({ Hall_ID });
    }

    useEffect(() => {
        if (errorBuilding) {
            throw Error('لم يتم العثور القسم الذي تبحث عنه');
        }

        if (building) {
            setBuilding_Name(building.Building_Name)

            const btnUpdateBuilding = document.getElementById('btnUpdateBuilding');
            const updateBuildingSection = document.getElementById('updateBuildingSection');
            const closeUpdateBuildingtSec = document.getElementById('closeUpdateBuildingtSec');

            btnUpdateBuilding.addEventListener('click', () => {
                updateBuildingSection.style.cssText = 'display: grid';
            })

            closeUpdateBuildingtSec.addEventListener('click', () => {
                updateBuildingSection.style.cssText = 'display: none';
            })

            const btnDeleteBuilding = document.getElementById('btnDeleteBuilding');
            const deletComponent = document.querySelector('#deletComponent');

            btnDeleteBuilding.addEventListener('click', () => {
                deletComponent.style.cssText = 'display: flex';
            });

            const btnAddHall = document.getElementById('btnAddHall');
            const addHallSection = document.getElementById('addHallSection');
            const closeAddHallSection = document.getElementById('closeAddHallSection');

            btnAddHall.addEventListener('click', () => {
                addHallSection.style.cssText = 'display: grid';
            })

            closeAddHallSection.addEventListener('click', () => {
                addHallSection.style.cssText = 'display: none';
            })

            if (Hall_ID) {
                const editIconHall = document.getElementById(`edit-icon-${Hall_ID}`);
                const updateHallSection = document.getElementById('updateHallSection');
                const closeUpdateHallSection = document.getElementById('closeUpdateHallSection');

                editIconHall.addEventListener('click', () => {
                    updateHallSection.style.cssText = 'display: grid';
                })

                closeUpdateHallSection.addEventListener('click', () => {
                    updateHallSection.style.cssText = 'display: none';
                })

                const deleteIconHall = document.getElementById(`delete-icon-${Hall_ID}`);
                const deletComponent = document.querySelector('#deletComponent');

                deleteIconHall.addEventListener('click', () => {
                    deletComponent.style.cssText = 'display: flex';
                })
            }
        }

    }, [errorBuilding, building, Hall_ID])

    return (
        <section className={`containerPage ${style.container}`}>
            {
                (loadingBuilding || loadinghalls) && <Loading />
            }
            {
                !loadingBuilding &&
                <article className={style.content}>
                    <header>
                        <h1>
                            <FontAwesomeIcon icon={faBuilding} />
                            مبنى {building && building.Building_Name}
                        </h1>
                        <section className=''>
                            <button className={`btn ${style.btn}`} id='btnAddHall'>إضافة قاعة</button>
                        </section>
                    </header>

                    { errorBuilding && <p className="emptyElement">{errorBuilding}</p>}

                    <article className={`${style.halls}`}>
                        <header>
                            <h2>
                                <FontAwesomeIcon icon={faBuilding} />
                                قاعات ومختبرات المبنى
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
                                                <p>{e.Department_Name}</p>
                                                <section className={style.icon}>
                                                    <FontAwesomeIcon 
                                                        icon={faEdit} 
                                                        id={`edit-icon-${e.Hall_ID}`} 
                                                        onMouseOver={() => setHall_ID(e.Hall_ID)}
                                                        onClick={() => fillUpdateHallData(e)}
                                                    />
                                                    <FontAwesomeIcon 
                                                        icon={faTrash} 
                                                        onMouseOver={() => setHall_ID(e.Hall_ID)}
                                                        onClick={handelDeleteHall} 
                                                        id={`delete-icon-${e.Hall_ID}`}
                                                    />
                                                </section>
                                            </div>
                                            <FontAwesomeIcon icon={faBuilding} className={style.icon} />
                                        </article>
                                    )
                                })
                            }
                        </section>
                    </article>

                    <section className={style.buttons}>
                        <button className={`btn`} id="btnUpdateBuilding">تعديل بيانات المبنى</button>
                        <button 
                            className={`btn`} 
                            id='btnDeleteBuilding'
                            onClick={handelDeleteBuilding}
                        >
                            حذف المبنى
                        </button>
                    </section>

                    <section className={`container-section ${style.updateBuldingSection}`} id='updateBuildingSection'>
                        <article className={`center-section`}>
                            <FontAwesomeIcon className={`close-btn ${style.btnClose}`} id='closeUpdateBuildingtSec' icon={faXmark} size='xl' />
                            <header>
                                <h1>تعديل بيانات مبنى</h1>
                            </header>
                            <form className={`addForm`} onSubmit={handelUpdate}>
                                <label htmlFor='name'>إسم المبنى:</label>
                                <section className={`input`}>
                                    <FontAwesomeIcon icon={faBuilding} />
                                    <input 
                                        type='text' 
                                        name='name' 
                                        required
                                        value={Building_Name}
                                        onChange={e => setBuilding_Name(e.target.value)}
                                    />
                                </section>
                                {
                                    !loadingUpdate &&
                                    <section className='btnContainer'>
                                        <input className={`btn ${style.btn}`} type='submit' name='submit' value='تعديل بيانات المبنى' />
                                    </section>
                                }
                            </form>
                        </article>
                    </section>

                    <section className={`container-section ${style.addHallSection}`} id="addHallSection">
                        <article className={`center-section`}>
                            <FontAwesomeIcon className={`close-btn ${style.btnClose}`} id='closeAddHallSection' icon={faXmark} size='xl' />
                            <header>
                                <h1>إضافة قاعة</h1>
                            </header>
                            <form className={`addForm`} onSubmit={handelAddHall}>
                                <label htmlFor='name'>اسم القاعة: </label>
                                <section className={`input ${style.input}`}>
                                    <FontAwesomeIcon icon={faBuilding} />
                                    <input 
                                        type='text' 
                                        name='name' 
                                        required
                                        value={Hall_Name}
                                        onChange={e => setHall_Name(e.target.value)}
                                    />
                                </section>
                                <label htmlFor='capacity'>سعة القاعة: </label>
                                <section className={`input ${style.input}`}>
                                    <FontAwesomeIcon icon={faChair} />
                                    <input 
                                        type='number' 
                                        name='capacity' 
                                        min='1'
                                        required
                                        value={Hall_Capacity}
                                        onChange={e => setHall_Capacity(e.target.value)}
                                    />
                                </section>
                                <label htmlFor="department">القسم:</label>
                                <section className="input">
                                    <FontAwesomeIcon icon={faTableCellsLarge} />
                                    <select name='department' value={Department_ID} onChange={e => setDepartment_ID(+e.target.value)}>
                                        {
                                            departements &&
                                            departements.map(e => {
                                                return (
                                                <option value={e.Department_ID} key={e.Department_ID}>{e.Department_Name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </section>
                                <label htmlFor="hall_type">نوع القاعة:</label>
                                <section className="input">
                                    <FontAwesomeIcon icon={faFlask} />
                                    <select name='department' value={Hall_Type_ID} onChange={e => setHall_Type_ID(+e.target.value)}>
                                        {
                                            hall_types &&
                                            hall_types.map(e => {
                                                return (
                                                <option value={e.Hall_Type_ID} key={e.Hall_Type_ID}>{e.Type_Name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </section>
                                {
                                    !loadingPost &&
                                    <section className='btnContainer'>
                                        <input className={`btn ${style.btn}`} type='submit' name='submit' value='إضافة قاعة' />
                                    </section>
                                }
                            </form>
                        </article>
                    </section>

                    <section className={`container-section ${style.addHallSection}`} id="updateHallSection">
                        <article className={`center-section`}>
                            <FontAwesomeIcon className={`close-btn ${style.btnClose}`} id='closeUpdateHallSection' icon={faXmark} size='xl' />
                            <header>
                                <h1>تعديل بيانات قاعة</h1>
                            </header>
                            <form className={`addForm`} onSubmit={handelUpdateHall}>
                                <label htmlFor='name'>اسم القاعة: </label>
                                <section className={`input ${style.input}`}>
                                    <FontAwesomeIcon icon={faBuilding} />
                                    <input 
                                        type='text' 
                                        name='name' 
                                        required
                                        value={Hall_Name}
                                        onChange={e => setHall_Name(e.target.value)}
                                    />
                                </section>
                                <label htmlFor='capacity'>سعة القاعة: </label>
                                <section className={`input ${style.input}`}>
                                    <FontAwesomeIcon icon={faChair} />
                                    <input 
                                        type='number' 
                                        name='capacity' 
                                        min='1'
                                        required
                                        value={Hall_Capacity}
                                        onChange={e => setHall_Capacity(e.target.value)}
                                    />
                                </section>
                                <label htmlFor="department">القسم:</label>
                                <section className="input">
                                    <FontAwesomeIcon icon={faTableCellsLarge} />
                                    <select name='department' value={Department_ID} onChange={e => setDepartment_ID(+e.target.value)}>
                                        {
                                            departements &&
                                            departements.map(e => {
                                                return (
                                                <option value={e.Department_ID} key={e.Department_ID}>{e.Department_Name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </section>
                                <label htmlFor="hall_type">نوع القاعة:</label>
                                <section className="input">
                                    <FontAwesomeIcon icon={faFlask} />
                                    <select name='department' value={Hall_Type_ID} onChange={e => setHall_Type_ID(+e.target.value)}>
                                        {
                                            hall_types &&
                                            hall_types.map(e => {
                                                return (
                                                <option value={e.Hall_Type_ID} key={e.Hall_Type_ID}>{e.Type_Name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </section>
                                {
                                    !loadingUpdate &&
                                    <section className='btnContainer'>
                                        <input className={`btn ${style.btn}`} type='submit' name='submit' value='تعديل بيانات القاعة' />
                                    </section>
                                }
                            </form>
                        </article>
                    </section>

                    <Done result={updateResult || postResult} error={updateError || postError} />

                    <Falid error={updateError || postError} />

                    <Delete url={deleteAPI} body={deleteBody} />
                </article>
            }
        </section>
    );
}

export default Building;