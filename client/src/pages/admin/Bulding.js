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

const Bulding = () => {
    const { data: buildings, isPending, error } = useFetch('http://localhost:5000/building');
    const { fetchPost, result, isLoading, error: errorAddBuilding } = useFetchPost();
    const [Building_Name, setBuilding_Name] = useState('');

    const handelSubmit = async (e) => {
        e.preventDefault();

        await fetchPost('http://localhost:5000/building/addBuilding', {
            Building_Name
        });
    }

    useEffect(() => {
        const btnAddBulding = document.querySelector('.btnAddBulding');
        const addBuldingSection = document.querySelector('.container-section');
        const btnCloseAddBuldingSec = document.querySelector('.close-btn');

        btnAddBulding.addEventListener('click', () => {
            addBuldingSection.style.cssText = 'display: flex';
        });

        btnCloseAddBuldingSec.addEventListener('click', () => {
            addBuldingSection.style.cssText = 'display: none';
        });

        const doneComponent = document.getElementById('doneComponent');
        const btnCloseDoneComponent = document.getElementById('colseDoneComponente');

        if (result && !errorAddBuilding) {
            doneComponent.style.cssText = 'display: grid';
        }

        btnCloseDoneComponent.addEventListener('click', () => {
            doneComponent.style.cssText = 'display: none';
        })

        const faildComponent = document.getElementById('faildComponent');
        const btnCloseFaildComponent = document.getElementById('colseFaildComponente');

        if (errorAddBuilding) {
            faildComponent.style.cssText = 'display: grid';
        }

        btnCloseFaildComponent.addEventListener('click', () => {
            faildComponent.style.cssText = 'display: none';
        })
    }, [result, errorAddBuilding])

    return (
        <section className={`containerPage ${style.buldingPage}`}>
            <header>
                <h1>المباني</h1>
                <section>
                    <Link to='hallType' className={`btn btnAddUsers ${style.btn}`}>أنواع القاعات</Link>
                    <button className={`btn btnAddBulding ${style.btn}`}>إضافة مبنى</button>
                </section>
            </header>

            <section className={`container-section ${style.addBuldingSection}`}>
                <article className={`center-section`}>
                    <FontAwesomeIcon className={`close-btn ${style.btnClose}`} id='colseLogin' icon={faXmark} size='xl' />
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
                        {
                            !isLoading &&
                            <section className='btnContainer'>
                                <input className={`btn ${style.btn}`} type='submit' name='submit' value='إضافة مبنى' />
                            </section>
                        }
                    </form>
                </article>
            </section>

            <Done />

            <Faild errorMessage={errorAddBuilding} />

            { !buildings && !isPending && <p className='emptyElement'>لا توجد مباني</p> }

            { error && <p className='emptyElement'>{error}</p> }

            <section className={`${style.buldingsContainer}`}>
                {
                    buildings &&
                    buildings.map(e => {
                        return (
                            <Link className={`${style.bulding}`} id={e.Building_ID} key={e.Building_ID}>
                                <section className={`${style.img}`}>
                                    <img src='/images/Mask Group 10.png' alt='bulding' />
                                </section>
                                <h1>{e.Building_Name}</h1>
                            </Link>
                        )
                    })
                }
                {
                    isPending && <Loading />
                }
            </section>
        </section>
    );
}

export default Bulding;