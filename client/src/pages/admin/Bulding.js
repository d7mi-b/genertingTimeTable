import { faBuilding, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import style from '../styles/admin/bulding.module.css';

const buldings = [
    {
        id: 1,
        name: 'A'
    },
    {
        id: 2,
        name: 'B'
    },
    {
        id: 3,
        name: 'C'
    },
    {
        id: 4,
        name: 'D'
    }
]

const Bulding = () => {

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
    }, [])

    return (
        <section className={`containerPage ${style.buldingPage}`}>
            <header>
                <h1>المباني</h1>
                <section>
                    <button className={`btn btnAddUsers ${style.btn}`}>أنواع القاعات</button>
                    <button className={`btn btnAddBulding ${style.btn}`}>إضافة مبنى</button>
                </section>
            </header>

            <section className={`container-section ${style.addBuldingSection}`}>
                <article className={`center-section`}>
                    <FontAwesomeIcon className={`close-btn ${style.btnClose}`} id='colseLogin' icon={faXmark} size='xl' />
                    <header>
                        <h1>إضافة مبنى</h1>
                    </header>
                    <form className={`addForm`}>
                        <label htmlFor='name'>إسم المبنى:</label>
                        <section className={`input`}>
                            <FontAwesomeIcon icon={faBuilding} />
                            <input type='text' name='name' />
                        </section>
                        <section className='btnContainer'>
                            <input className={`btn ${style.btn}`} type='submit' name='submit' value='إضافة مبنى' />
                        </section>
                    </form>
                </article>
            </section>

            <section className={`${style.buldingsContainer}`}>
                {
                    buldings.map(e => {
                        return (
                            <article className={`${style.bulding}`} key={e.id}>
                                <section className={`${style.img}`}>
                                    <img src='/images/Mask Group 10.png' alt='bulding' />
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

export default Bulding;