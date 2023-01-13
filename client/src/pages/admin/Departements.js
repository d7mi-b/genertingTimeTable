import { faXmark, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import style from '../styles/admin/departements.module.css';

const departemnts = [
    {
        id: 1,
        name: 'هندسة حاسوب'
    },
    {
        id: 2,
        name: 'هندسة إلكنرونية وإتصالات'
    },
    {
        id: 3,
        name: 'هندسة معمارية'
    },
    {
        id: 4,
        name: 'هندسة مدنية'
    },
    {
        id: 5,
        name: 'هندسة كيميائية'
    },
    {
        id: 6,
        name: 'هندسة بترولية'
    },
]

const Departements = () => {

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
                {
                    departemnts.map(e => {
                        return (
                            <article className={`${style.departemnt}`} key={e.id}>
                                <section className={`${style.img}`}>
                                    <img src='/images/Mask Group 36.png' alt='bulding' />
                                </section>
                                <h1>{e.name}</h1>
                            </article>
                        )
                    })
                }
            </section>
        </section>
    );
}

export default Departements;