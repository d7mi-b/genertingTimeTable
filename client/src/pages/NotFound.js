import { Link } from 'react-router-dom';
import style from './styles/notFound.module.css';
import { useAuthContext } from '../hooks/useAuthContext';

const NotFound = () => {
    const { user } = useAuthContext();

    return (
        <div className={user && user.type === 1 ? 'containerPage' : ''}>
            <section className={`${style.notFound}`}>
                <article className={`${style.content}`}>
                    <header>
                        <h1>للأسف خطأ 404 الصفحة غير موجودة</h1>
                    </header>
                    <p>العودة الى <Link className='link' to='/'>الصفحة الرئيسية</Link></p>
                </article>
                <section className={`${style.img}`}>
                    <img src='/images/404 Error-amico.png' alt='404 error' />
                </section>
            </section>
        </div>
    );
}

export default NotFound;