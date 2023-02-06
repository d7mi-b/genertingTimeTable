import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from './styles/Done&Faild.module.css';

const Faild = (props) => {
    return (
        <section id="faildComponent" className={`container-section ${style.container}`}>
            <article className={`center-section ${style.centerSection}`}>
                <FontAwesomeIcon className={`close-btn ${style.btnClose}`} id='colseFaildComponente' icon={faXmark} size='xl' />
                <FontAwesomeIcon className={`${style.icon}`} icon={faXmark} size="xl" />
                <p>{props.errorMessage}</p>
            </article>
        </section>
    );
}

export default Faild;