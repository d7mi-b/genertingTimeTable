import { faBuilding, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import useFetch from '../../hooks/useFetch';
import { useFetchPost } from '../../hooks/useFetchPost';
import style from '../styles/admin/bulding.module.css';
import Done from '../../components/Done';
import Faild from '../../components/Faild';
import { Link } from 'react-router-dom';
import Delete from '../../components/Delete';
import { useFetchPut } from '../../hooks/useFetchPut';

const Bulding = () => {
    const { data: buildings, isPending, error } = useFetch('http://localhost:5000/building');
    const { fetchPost, result, isLoading, error: errorAddBuilding } = useFetchPost();
    const { fetchPut, result: resultUpdate, isLoading: loadingUpdate, error: errorUpdate } = useFetchPut();
    
    const [Building_ID, setBuilding_ID] = useState('');
    const [Building_Name, setBuilding_Name] = useState('');

    const handelSubmit = async (e) => {
        e.preventDefault();

        await fetchPost('http://localhost:5000/building/addBuilding', {
            Building_Name
        });

        const buldingsContainer = document.getElementById('buldingsContainer');

        const bulding = document.createElement('a');
        bulding.classList.add(style.bulding);

        bulding.innerHTML = `
            <section class=${style.img}>
                <img src='/images/Mask Group 10.png' alt='bulding' />
            </section>
            <h1>${Building_Name}</h1>
        `;
        
        buldingsContainer.appendChild(bulding);
    }

    const handelUpdate = async e => {
        e.preventDefault();

        await fetchPut('http://localhost:5000/building/updateBuilding', {
            Building_ID, Building_Name
        });
    }

    useEffect(() => {
        if (buildings) {
            const btnAddBulding = document.getElementById('btnAddBuilding');
            const addBuldingSection = document.getElementById('addBuldingSection');
            const btnCloseAddBuldingSec = document.getElementById('btnCloseAddBuldingSec');

            btnAddBulding.addEventListener('click', () => {
                setBuilding_Name('')
                addBuldingSection.style.cssText = 'display: flex';
            });

            btnCloseAddBuldingSec.addEventListener('click', () => {
                addBuldingSection.style.cssText = 'display: none';
                setBuilding_Name('');
            });

            const btnUpdateBulding = document.getElementById('btnUpdateBuilding');
            const updateBuldingSec = document.getElementById('updateBuldingSec');
            const closeUpdateBuldingSec = document.getElementById('closeUpdateBuldingSec');

            btnUpdateBulding.addEventListener('click', () => {
                updateBuldingSec.style.cssText = 'display: grid';
                setBuilding_Name(buildings.filter(b => b.Building_ID === Building_ID)[0].Building_Name);
            })

            closeUpdateBuldingSec.addEventListener('click', () => {
                updateBuldingSec.style.cssText = 'display: none';
            });

            const btnDeleteBulding = document.getElementById('btnDeleteBuilding');
            const deleteBuldingSec = document.getElementById('deleteBuldingSec');
            const closeDeleteBuldingSec = document.getElementById('closeDeleteBuldingSec');

            btnDeleteBulding.addEventListener('click', () => {
                setBuilding_Name(buildings.filter(b => b.Building_ID === Building_ID)[0].Building_Name);
                deleteBuldingSec.style.cssText = 'display: grid';
            })

            closeDeleteBuldingSec.addEventListener('click', () => {
                deleteBuldingSec.style.cssText = 'display: none';
            })

            const openDeleteComponent = document.getElementById('openDeleteComponent')
            const deletComponent = document.querySelector('#deletComponent');

            openDeleteComponent.addEventListener('click', () => {
                deletComponent.style.cssText = 'display: flex';
            })

            if (buildings.length > 0 && !Building_ID)
                setBuilding_ID(buildings[0].Building_ID);
        }

        if (Building_ID) 
            setBuilding_Name(buildings.filter(b => b.Building_ID === Building_ID)[0].Building_Name);

    }, [buildings, Building_ID])

    return (
        <section className={`containerPage ${style.buldingPage}`}>
            <header>
                <h1>المباني</h1>
                <section>
                    <Link to='hallType' className={`btn btnAddUsers ${style.btn}`}>أنواع القاعات</Link>
                </section>
            </header>

            { buildings && buildings.length === 0 && !isPending && <p className='emptyElement'>لا توجد مباني</p> }

            { error && <p className='emptyElement'>{error}</p> }

            {
                buildings && buildings.length > 0 && 
                <section className={`${style.buldingsContainer}`} id='buldingsContainer'>
                    {
                        buildings &&
                        buildings.map(e => {
                            return (
                                <Link to={`${e.Building_ID}`} className={`${style.bulding}`} id={e.Building_ID} key={e.Building_ID}>
                                    <section className={`${style.img}`}>
                                        <img src='/images/Mask Group 10.png' alt='bulding' />
                                    </section>
                                    <h1>{e.Building_Name}</h1>
                                </Link>
                            )
                        })
                    }
                </section>
            }

            {
                isPending && <Loading />
            }

            <section className={style.buttons}>
                <button className={`btn`} id='btnAddBuilding'>إضافة مبنى</button>
                { buildings && buildings.length > 0 && <button className={`btn`} id="btnUpdateBuilding">تعديل بيانات المبنى</button> }
                { buildings && buildings.length > 0 && <button className={`btn`} id='btnDeleteBuilding'>حذف المبنى</button> }
            </section>

            <section className={`container-section ${style.addBuldingSection}`} id='addBuldingSection'>
                <article className={`center-section`}>
                    <FontAwesomeIcon className={`close-btn ${style.btnClose}`} id='btnCloseAddBuldingSec' icon={faXmark} size='xl' />
                    <header>
                        <h1>إضافة مبنى</h1>
                    </header>
                    <form className={`addForm`} onSubmit={handelSubmit}>
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

                        <section className='btnContainer'>
                            <input className={`btn ${style.btn}`} type='submit' name='submit' value='إضافة مبنى' disabled={isLoading} />
                        </section>
                    </form>
                </article>
            </section>

            <section className={`container-section ${style.addBuldingSection}`} id='updateBuldingSec' >
                <article className={`center-section`}>
                    <FontAwesomeIcon className={`close-btn ${style.btnClose}`} id='closeUpdateBuldingSec' icon={faXmark} size='xl' />
                    <header>
                        <h1>تعديل بيانات مبنى</h1>
                    </header>
                    <form className={`addForm`} onSubmit={handelUpdate}>
                        <label htmlFor="departement">المبنى:</label>
                        <section className="input">
                            <FontAwesomeIcon icon={faBuilding} />
                            <select value={Building_ID} onChange={e => setBuilding_ID(+e.target.value)}>
                                {
                                    buildings &&
                                    buildings.map(e => {
                                        return (
                                        <option value={e.Building_ID} key={e.Building_ID}>{e.Building_Name}</option>
                                        )
                                    })
                                }
                            </select>
                        </section>
                        <label htmlFor='name'>إسم المبنى الجديد:</label>
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
                        <section className='btnContainer'>
                            <input className={`btn ${style.btn}`} type='submit' name='submit' value='تعديل بيانات المبنى' disabled={loadingUpdate} />
                        </section>
                    </form>
                </article>
            </section>

            <section className={`container-section ${style.addBuldingSection}`} id='deleteBuldingSec' >
                <article className={`center-section`}>
                    <FontAwesomeIcon className={`close-btn ${style.btnClose}`} id='closeDeleteBuldingSec' icon={faXmark} size='xl' />
                    <header>
                        <h1> حذف مبنى</h1>
                    </header>
                    <form className={`addForm`} onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="departement">المبنى:</label>
                        <section className="input">
                            <FontAwesomeIcon icon={faBuilding} />
                            <select value={Building_ID} onChange={e => setBuilding_ID(+e.target.value)}>
                                {
                                    buildings &&
                                    buildings.map(e => {
                                        return (
                                        <option value={e.Building_ID} key={e.Building_ID}>{e.Building_Name}</option>
                                        )
                                    })
                                }
                            </select>
                        </section>
                        <section className='btnContainer'>
                            <input className={`btn ${style.btn}`} id='openDeleteComponent' type='submit' name='submit' value='حذف المبنى' disabled={loadingUpdate} />
                        </section>
                    </form>
                </article>
            </section>

            <Done result={result || resultUpdate} error={errorAddBuilding || errorUpdate} />

            <Faild error={errorAddBuilding || errorUpdate} />

            <Delete url='http://localhost:5000/building/deleteBuilding' body={{Building_ID}} element={Building_ID} />
        </section>
    );
}

export default Bulding;