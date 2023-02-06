import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from './styles/Done&Faild.module.css';

const Done = () => {
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