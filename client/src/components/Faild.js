import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import style from './styles/Done&Faild.module.css';

const Faild = () => {

    useEffect(() =>{
        const containerSection = document.querySelector('.container-section');
        const btnCloseSection = document.querySelector('.close-btn');

        btnCloseSection.addEventListener('click', () => {
            containerSection.style.cssText = 'display: none';
        });
    }, [])

    return (
        <section className={`container-section ${style.container}`}>
            <article className={`center-section ${style.centerSection}`}>
                <FontAwesomeIcon className={`close-btn ${style.btnClose}`} id='colseLogin' icon={faXmark} size='xl' />
                <FontAwesomeIcon className={`${style.icon}`} icon={faXmark} size="xl" />
                <p>فشل</p>
            </article>
        </section>
    );
}

export default Faild;