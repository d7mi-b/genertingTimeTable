import { faXmark, faTableCellsLarge, faBuildingColumns } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useFetchPost } from '../../hooks/useFetchPost';
import Loading from '../../components/Loading';
import useFetch from '../../hooks/useFetch';
import Done from '../../components/Done';
import Faild from '../../components/Faild';
import style from '../styles/admin/departements.module.css';
import { Link } from 'react-router-dom';

const Departements = () => {
    const { data, isPending, error } = useFetch('http://localhost:5000/departements');
    const { data: colleges } = useFetch('http://localhost:5000/colleges');
    const { fetchPost, result, isLoading, error: errorAddDepartment } = useFetchPost();
    const [Department_Name, setDepartment_Name] = useState('');
    const [College_ID, setCollege_ID] = useState('');

    const handelSubmit = async (e) => {
        e.preventDefault();
        
        await fetchPost('http://localhost:5000/departements/addDepartment', {
            Department_Name, College_ID
        });

        const departemntsContainer = document.getElementById('departemntsContainer');

        const departemnt = document.createElement('a');
        departemnt.classList.add(style.departemnt);

        departemnt.innerHTML = `
            <section class=${style.img}>
                <img src='/images/Mask Group 36.png' alt='departemnt' />
            </section>
            <h1>${Department_Name}</h1>
        `;
        
        departemntsContainer.appendChild(departemnt);
    }

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

        if (colleges && !College_ID) {
            setCollege_ID(colleges[0].College_ID)
        }

    }, [data, colleges, College_ID])

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
                    <form className={`addForm`} onSubmit={handelSubmit}>
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
                            !isLoading &&
                            <section className='btnContainer'>
                                <input className={`btn ${style.btn}`} type='submit' name='submit' value='إضافة قسم' />
                            </section>
                        }
                    </form>
                </article>
            </section>

            <Done result={result} />

            <Faild error={errorAddDepartment} />

            { !data && !isPending && <p className='emptyElement'>لا توجد أقسام</p> }

            { error && <p className='emptyElement'>{error}</p> }

            <section className={`${style.departemntsContainer}`} id='departemntsContainer'>
                {   data &&
                    data.map(e => {
                        return (
                            <Link to={`${e.Department_ID}`} className={`${style.departemnt}`} key={e.Department_ID}>
                                <section className={`${style.img}`}>
                                    <img src='/images/Mask Group 36.png' alt='departemnt' />
                                </section>
                                <h1>{e.Department_Name}</h1>
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

export default Departements;