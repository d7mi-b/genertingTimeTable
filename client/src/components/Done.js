import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import style from './styles/Done&Faild.module.css';

const Done = (props) => {

    useEffect(() => {
        const doneComponent = document.getElementById('doneComponent');
        const btnCloseDoneComponent = document.getElementById('colseDoneComponente');

        if (props.result && !props.error) {
            doneComponent.style.cssText = 'display: grid';
        }

        btnCloseDoneComponent.addEventListener('click', () => {
            doneComponent.style.cssText = 'display: none';
        })
        
    }, [props.result, props.error])

    return (
        <section id="doneComponent" className={`container-section ${style.container}`}>
            <article className={`center-section ${style.centerSection}`}>
                <FontAwesomeIcon className={`close-btn ${style.btnClose}`} id='colseDoneComponente' icon={faXmark} size='xl' />
                <FontAwesomeIcon className={`${style.icon}`} icon={faCheck} size="xl" />
                <p>تم</p>
            </article>
        </section>
    );
}

export default Done;