import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import style from './styles/Done&Faild.module.css';

const Done = () => {

    useEffect(() => {
        const containerSection = document.querySelector('#containerComponent');
        const btnCloseSection = document.querySelector('#colseComponente');
        
        btnCloseSection.addEventListener('click', () => {
            containerSection.style.cssText = 'display: none';
            window.location.reload();
        });
    }, []);

    return (
        <section id="containerComponent" className={`container-section ${style.container}`}>
            <article className={`center-section ${style.centerSection}`}>
                <FontAwesomeIcon className={`close-btn ${style.btnClose}`} id='colseComponente' icon={faXmark} size='xl' />
                <FontAwesomeIcon className={`${style.icon}`} icon={faCheck} size="xl" />
                <p>تم</p>
            </article>
        </section>
    );
}

export default Done;