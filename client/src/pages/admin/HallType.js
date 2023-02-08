import { faEdit, faFlaskVial, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import Done from '../../components/Done';
import Faild from '../../components/Faild';
import Loading from '../../components/Loading';
import useFetch from '../../hooks/useFetch';
import { useFetchDelete } from '../../hooks/useFetchDelete';
import { useFetchPost } from '../../hooks/useFetchPost';
import { useFetchPut } from '../../hooks/useFetchPut';
import style from '../styles/admin/hallType.module.css';

const HallType = () => {
    const { data: types, isPending: loadingTypes, error: errorTypes } = useFetch('http://localhost:5000/hallTypes');
    const { fetchPost, result, isLoading: loadingAddHallType, error: errorAddHallType} = useFetchPost();
    const { fetchDelete, result: deleteResult, isLoading: loadingDelete, error: errorDelete } = useFetchDelete();
    const { fetchPut, result: updateResult, isLoading: loadingUpdate, error: errorUpdate } = useFetchPut();
    const [Type_Name, setType_Name] = useState('');
    const [Hall_Type_ID, setHall_Type_ID] = useState('');

    const handelSubmit = async (e) => {
        e.preventDefault();

        await fetchPost('http://localhost:5000/hallTypes/addHallType', {
            Type_Name
        });
    }

    const handelDelete = async (e) => {
        const Hall_Type_ID = +e.target.parentElement.parentElement.parentElement.id;

        await fetchDelete('http://localhost:5000/hallTypes/deleteHallType', {
            Hall_Type_ID
        });
    }

    const handelUpdate = async (e) => {
        e.preventDefault();

        await fetchPut('http://localhost:5000/hallTypes/updateHallType', {
            Hall_Type_ID, Type_Name
        });
    }

    useEffect(() => {
        const btnAddHallType = document.querySelector('.btnAddHallType');
        const addHallTypeSection = document.querySelector('.container-section');
        const btnCloseAddHallTypeSec = document.querySelector('.close-btn');

        btnAddHallType.addEventListener('click', () => {
            addHallTypeSection.style.cssText = 'display: flex';
        });

        btnCloseAddHallTypeSec.addEventListener('click', () => {
            addHallTypeSection.style.cssText = 'display: none';
        });

        if (Hall_Type_ID) {
            const editIconHallType = document.querySelector(`#edit-icon-${Hall_Type_ID}`);
            const updateHallTypeSection = document.querySelector('#udateHallTypeSec');
            const btnCloseUpdateHallTypeSec = document.querySelector('#closeUpdateHallTypeSec');

            editIconHallType.addEventListener('click', () => {
                updateHallTypeSection.style.cssText = 'display: flex';
            });

            btnCloseUpdateHallTypeSec.addEventListener('click', () => {
                updateHallTypeSection.style.cssText = 'display: none';
            });
        }

        const doneComponent = document.getElementById('doneComponent');
        const btnCloseDoneComponent = document.getElementById('colseDoneComponente');

        if ((result && !errorAddHallType) || (deleteResult && !errorDelete) || (updateResult && !errorUpdate)) {
            doneComponent.style.cssText = 'display: grid';
        }

        btnCloseDoneComponent.addEventListener('click', () => {
            doneComponent.style.cssText = 'display: none';
        })

        const faildComponent = document.getElementById('faildComponent');
        const btnCloseFaildComponent = document.getElementById('colseFaildComponente');

        if (errorAddHallType || errorDelete || errorUpdate) {
            faildComponent.style.cssText = 'display: grid';
        }

        btnCloseFaildComponent.addEventListener('click', () => {
            faildComponent.style.cssText = 'display: none';
        });

        console.log('result: ', result, 'deleteRes:', deleteResult, 'updateRes: ', updateResult)
    }, [result, errorAddHallType, deleteResult, errorDelete, updateResult, errorUpdate, Hall_Type_ID])

    return (
        <section className={`containerPage ${style.hallTypesPage}`}>
            <header>
                <h1>أنواع القاعات</h1>
                <button className={`btn btnAddHallType ${style.btn}`}>إضافة نوع قاعة</button>
            </header>

            { loadingTypes && <Loading />}

            { errorTypes && <p className='emptyElement'>{errorTypes}</p>}

            { types && types.length === 0 && <p className='emptyElement'>لا يوجد انواع للقاعات</p>}

            <section className={`${style.typesContainer}`}>
                {
                    types &&
                    types.map(e => {
                        return (
                            <article className={style.type} id={e.Hall_Type_ID} key={e.Hall_Type_ID} onMouseOver={() => setHall_Type_ID(e.Hall_Type_ID)}>
                                <header>
                                    <FontAwesomeIcon icon={faFlaskVial} />
                                    <h3>{e.Type_Name}</h3>
                                </header>
                                <section className={style.icon}>
                                    <FontAwesomeIcon icon={faEdit} id={`edit-icon-${e.Hall_Type_ID}`} />
                                    {
                                        !loadingDelete && <FontAwesomeIcon icon={faTrash} onClick={handelDelete} />
                                    }
                                </section>
                            </article>
                        )
                    })
                }
            </section>

            <section className={`container-section ${style.addHallTypeSection}`}>
                <article className={`center-section`}>
                    <FontAwesomeIcon className={`close-btn ${style.btnClose}`} id='colseLogin' icon={faXmark} size='xl' />
                    <header>
                        <h1>إضافة نوع قاعة</h1>
                    </header>
                    <form className={`addForm`} onSubmit={handelSubmit}>
                        <label htmlFor='name'>نوع القاعة: </label>
                        <section className={`input ${style.input}`}>
                            <FontAwesomeIcon icon={faFlaskVial} />
                            <input 
                                type='text' 
                                name='name' 
                                required
                                value={Type_Name}
                                onChange={e => setType_Name(e.target.value)}
                            />
                        </section>
                        {
                            !loadingAddHallType &&
                            <section className='btnContainer'>
                                <input className={`btn ${style.btn}`} type='submit' name='submit' value='إضافة نوع قاعة' />
                            </section>
                        }
                    </form>
                </article>
            </section>

            <section className={`container-section ${style.addHallTypeSection}`} id='udateHallTypeSec'>
                <article className={`center-section`}>
                    <FontAwesomeIcon className={`close-btn ${style.btnClose}`} id='closeUpdateHallTypeSec' icon={faXmark} size='xl' />
                    <header>
                        <h1>تعديل نوع قاعة</h1>
                    </header>
                    <form className={`addForm`} onSubmit={handelUpdate}>
                        <label htmlFor='name'>نوع القاعة: </label>
                        <section className={`input ${style.input}`}>
                            <FontAwesomeIcon icon={faFlaskVial} />
                            <input 
                                type='text' 
                                name='name' 
                                required
                                value={Type_Name}
                                onChange={e => setType_Name(e.target.value)}
                            />
                        </section>
                        {
                            !loadingUpdate &&
                            <section className='btnContainer'>
                                <input className={`btn ${style.btn}`} type='submit' name='submit' value='تعديل نوع قاعة' />
                            </section>
                        }
                    </form>
                </article>
            </section>

            <Done />

            <Faild errorMessage={errorAddHallType || errorDelete || errorUpdate} />

        </section>
    )
}

export default HallType;