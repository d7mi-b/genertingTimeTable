import { faBuildingColumns, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import useFetch from '../../hooks/useFetch';
import { useFetchPost } from '../../hooks/useFetchPost';
import style from '../styles/admin/bulding.module.css';
import Done from '../../components/Done';
import Faild from '../../components/Faild';
import { Link } from 'react-router-dom';
import { useFetchPut } from '../../hooks/useFetchPut';
import Delete from '../../components/Delete';

const Colleges = () => {
    const { data: colleges, isPending, error } = useFetch('http://localhost:5000/colleges');
    const { fetchPost, result, isLoading, error: errorAddCollege } = useFetchPost();
    const { fetchPut, result: resultUpdate, error: errorUpdate, isLoading: loadingUpdate} = useFetchPut();

    const [College_ID, setCollege_ID] = useState('');
    const [College_Name, setCollege_Name] = useState('');

    const handelAdd = async (e) => {
        e.preventDefault();

        await fetchPost('http://localhost:5000/colleges/add', {
            College_Name
        });

        const collegesContainer = document.getElementById('collegesContainer');

        const college = document.createElement('a');
        college.classList.add(style.bulding);

        college.innerHTML = `
            <section class=${style.img}>
                <img src='/images/Mask Group 10.png' alt='college' />
            </section>
            <h1>${College_Name}</h1>
        `;
        
        collegesContainer.appendChild(college);
    }

    const handelUpdate = async e => {
        e.preventDefault();

        await fetchPut('http://localhost:5000/colleges/update', {
            College_ID, College_Name
        })
    }

    useEffect(() => {
        if (colleges) {
            const btnAddCollege = document.getElementById('btnAddCollege');
            const addCollegeSection = document.getElementById('addCollegeSection');
            const btnCloseAddCollegeSec = document.getElementById('btnCloseAddCollegeSec');

            btnAddCollege.addEventListener('click', () => {
                setCollege_Name('')
                addCollegeSection.style.cssText = 'display: flex';
            });

            btnCloseAddCollegeSec.addEventListener('click', () => {
                addCollegeSection.style.cssText = 'display: none';
                setCollege_Name('');
            });

            const btnUpdateCollege = document.getElementById('btnUpdateCollege');
            const updateCollegeSec = document.getElementById('updateCollegeSec');
            const closeUpdateCollegeSec = document.getElementById('closeUpdateCollegeSec');
    
            btnUpdateCollege.addEventListener('click', () => {
                setCollege_Name(colleges.filter(c => c.College_ID === College_ID)[0].College_Name);
                updateCollegeSec.style.cssText = 'display: grid';
            })
    
            closeUpdateCollegeSec.addEventListener('click', () => {
                updateCollegeSec.style.cssText = 'display: none';
            });

            const btnDeleteCollege = document.getElementById('btnDeleteCollege');
            const deleteCollegeSec = document.getElementById('deleteCollegeSec');
            const closeDeleteCollegeSec = document.getElementById('closeDeleteCollegeSec');

            btnDeleteCollege.addEventListener('click', () => {
                setCollege_Name(colleges.filter(c => c.College_ID === College_ID)[0].College_Name);
                deleteCollegeSec.style.cssText = 'display: grid';
            })
    
            closeDeleteCollegeSec.addEventListener('click', () => {
                deleteCollegeSec.style.cssText = 'display: none';
            })

            const openDeleteComponent = document.getElementById('openDeleteComponent')
            const deletComponent = document.querySelector('#deletComponent');
    
            openDeleteComponent.addEventListener('click', () => {
                deletComponent.style.cssText = 'display: flex';
            })

            if (colleges.length > 0 && !College_ID)
                setCollege_ID(colleges[0].College_ID);

            if (College_ID) 
                setCollege_Name(colleges.filter(c => c.College_ID === College_ID)[0].College_Name);
        }

    }, [colleges, College_ID])

    return (
        <section className={`containerPage ${style.buldingPage}`}>
            <header>
                <h1> <FontAwesomeIcon icon={faBuildingColumns} /> الكليات</h1>
            </header>

            {
                colleges && colleges.length > 0 &&
                <section className={`${style.buldingsContainer}`} id='collegesContainer'>
                    {
                        colleges &&
                        colleges.map(e => {
                            return (
                                <Link to={`${e.College_ID}`} className={`${style.bulding}`} id={e.College_ID} key={e.College_ID}>
                                    <section className={`${style.img}`}>
                                        <img src='/images/Mask Group 10.png' alt='bulding' />
                                    </section>
                                    <h1>{e.College_Name}</h1>
                                </Link>
                            )
                        })
                    }
                </section>
            }

            { colleges && colleges.length === 0 && !isPending && <p className='emptyElement'>لا يوجد كليات</p> }

            { error &&  <p className='emptyElement'>{error}</p> }

            {
                isPending && <Loading />
            }

            {
                colleges && colleges.length > 0 &&
                <section className={style.buttons}>
                    <button className={`btn`} id='btnAddCollege'>إضافة كلية</button>
                    <button className={`btn`} id='btnUpdateCollege'>تعديل بيانات كلية</button>
                    <button className={`btn`} id='btnDeleteCollege'>حذف كلية</button>
                </section>
            }

            <section className={`container-section ${style.addBuldingSection}`} id='addCollegeSection'>
                <article className={`center-section`}>
                    <FontAwesomeIcon className={`close-btn ${style.btnClose}`} id='btnCloseAddCollegeSec' icon={faXmark} size='xl' />
                    <header>
                        <h1>إضافة كلية</h1>
                    </header>
                    <form className={`addForm`} onSubmit={handelAdd}>
                        <label htmlFor='name'>إسم الكلية:</label>
                        <section className={`input`}>
                            <FontAwesomeIcon icon={faBuildingColumns} />
                            <input 
                                type='text' 
                                name='name' 
                                required
                                value={College_Name}
                                onChange={e => setCollege_Name(e.target.value)}
                            />
                        </section>
                        <section className='btnContainer'>
                            <input className={`btn ${style.btn}`} type='submit' name='submit' value='إضافة الكلية' disabled={isLoading} />
                        </section>
                    </form>
                </article>
            </section>

            <section className={`container-section ${style.updateDepartementSection}`} id='updateCollegeSec' >
                <article className={`center-section`}>
                    <FontAwesomeIcon className={`close-btn ${style.btnClose}`} id='closeUpdateCollegeSec' icon={faXmark} size='xl' />
                    <header>
                        <h1>تعديل بيانات كلية</h1>
                    </header>
                    <form className={`addForm`} onSubmit={handelUpdate}>
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
                        <label htmlFor='name'>إسم الكلية الجديد:</label>
                        <section className={`input`}>
                            <FontAwesomeIcon icon={faBuildingColumns} />
                            <input 
                                type='text' 
                                name='name'
                                required
                                value={College_Name}
                                onChange={e => setCollege_Name(e.target.value)} 
                            />
                        </section>
                        <section className='btnContainer'>
                            <input className={`btn ${style.btn}`} type='submit' name='submit' value='تعديل بيانات الكلية' disabled={loadingUpdate} />
                        </section>
                    </form>
                </article>
            </section>

            <section className={`container-section ${style.updateDepartementSection}`} id='deleteCollegeSec' >
                <article className={`center-section`}>
                    <FontAwesomeIcon className={`close-btn ${style.btnClose}`} id='closeDeleteCollegeSec' icon={faXmark} size='xl' />
                    <header>
                        <h1> حذف كلية</h1>
                    </header>
                    <form className={`addForm`} onSubmit={(e) => e.preventDefault()}>
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
                        <section className='btnContainer'>
                            <input className={`btn ${style.btn}`} id='openDeleteComponent' type='submit' name='submit' value='حذف الكلية' disabled={loadingUpdate} />
                        </section>
                    </form>
                </article>
            </section>

            <Done result={result || resultUpdate} error={errorAddCollege || errorUpdate} />

            <Faild error={errorAddCollege || errorUpdate} />

            <Delete url='http://localhost:5000/colleges/delete' body={{College_ID}} element={College_ID} />

        </section>
    );
}

export default Colleges;