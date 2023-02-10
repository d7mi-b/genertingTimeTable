import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import style from './styles/Done&Faild.module.css';

const Faild = (props) => {

    useEffect(() => {
        const faildComponent = document.getElementById('faildComponent');
        const btnCloseFaildComponent = document.getElementById('colseFaildComponente');

        if (props.error) {
            faildComponent.style.cssText = 'display: grid';
        }

        btnCloseFaildComponent.addEventListener('click', () => {
            faildComponent.style.cssText = 'display: none';
        });

    }, [props.error])

    return (
        <section id="faildComponent" className={`container-section ${style.container}`}>
            <article className={`center-section ${style.centerSection}`}>
                <FontAwesomeIcon className={`close-btn ${style.btnClose}`} id='colseFaildComponente' icon={faXmark} size='xl' />
                <FontAwesomeIcon className={`${style.icon}`} icon={faXmark} size="xl" />
                <p>{props.error}</p>
            </article>
        </section>
    );
}

export default Faild;