import { Link, useRouteError } from "react-router-dom";
import style from '../pages/styles/notFound.module.css';

const ErrorElement = () => {
    const error = useRouteError();

    return (
        <div className={`containerPage`}>
            <section className={`${style.notFound}`}>
                <article className={`${style.content}`}>
                    <header>
                        <h1>{error.message}</h1>
                    </header>
                    <p>العودة الى <Link className='link' to='/'>الصفحة الرئيسية</Link></p>
                </article>
                <section className={`${style.img}`}>
                    <img src='/images/No data-amico.png' alt='no result found' />
                </section>
            </section>
        </div>
    )
}

export default ErrorElement;