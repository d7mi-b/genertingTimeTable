import { faXmark, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import style from '../styles/admin/departements.module.css';

const Departements = () => {
    const { data, isPending, error } = useFetch('http://localhost:5000/departements');

    useEffect(() => {
        const btnAddBulding = document.querySelector('.btnAddBulding');
        const addBuldingSection = document.querySelector('.container-section');
        const btnCloseAddBuldingsSec = document.querySelector('.close-btn');

        btnAddBulding.addEventListener('click', () => {
            addBuldingSection.style.cssText = 'display: flex';
        });

        btnCloseAddBuldingsSec.addEventListener('click', () => {
            addBuldingSection.style.cssText = 'display: none';
        });
    }, [])

    return (
        <section className={`containerPage ${style.departemntsPage}`}>
            <header>
                <h1>الأقسام</h1>
                <section>
                    <button className={`btn btnAddBulding ${style.btn}`}>إضافة قسم</button>
                </section>
            </header>

            <section className={`container-section ${style.addDepartementSection}`}>
                <article className={`center-section`}>
                    <FontAwesomeIcon className={`close-btn ${style.btnClose}`} id='colseLogin' icon={faXmark} size='xl' />
                    <header>
                        <h1>إضافة قسم</h1>
                    </header>
                    <form className={`addForm`}>
                        <label htmlFor='name'>إسم القسم:</label>
                        <section className={`input`}>
                            <FontAwesomeIcon icon={faBuilding} />
                            <input type='text' name='name' />
                        </section>
                        <section className='btnContainer'>
                            <input className={`btn ${style.btn}`} type='submit' name='submit' value='إضافة قسم' />
                        </section>
                    </form>
                </article>
            </section>

            <section className={`${style.departemntsContainer}`}>
                {   data &&
                    data.map(e => {
                        return (
                            <article className={`${style.departemnt}`} key={e.Department_ID}>
                                <section className={`${style.img}`}>
                                    <img src='/images/Mask Group 36.png' alt='bulding' />
                                </section>
                                <h1>{e.Department_Name}</h1>
                            </article>
                        )
                    })
                }
            </section>
        </section>
    );
}

export default Departements;