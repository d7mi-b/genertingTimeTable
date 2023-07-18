import { faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useFetchDelete } from "../hooks/useFetchDelete";
import Done from "./Done";
import Faild from "./Faild";
import style from './styles/Done&Faild.module.css';

const Delete = (props) => {
    const { fetchDelete, result, isLoading, error } = useFetchDelete();

    const handelDelete = async () => {
        await fetchDelete(props.url, props.body)
    }

    useEffect(() => {
        const deleteComponent = document.getElementById('deletComponent');
        const btnCloseDeleteComponent = document.getElementById('colseDeleteComponente');

        btnCloseDeleteComponent.addEventListener('click', () => {
            deleteComponent.style.cssText = 'display: none';
        })

        if (result || error) {
            deleteComponent.style.cssText = 'display: none';
        }

        if (props.element && result) {
            document.getElementById(props.element).remove();
        }

    }, [result, error, props.element])

    return (
        <section className={`container-section ${style.container}`} id='deletComponent'>
            <article className={`center-section ${style.centerSection}`}>
                <FontAwesomeIcon className={`close-btn ${style.btnClose}`} id='colseDeleteComponente' icon={faXmark} size='xl' />
                <FontAwesomeIcon className={`${style.icon}`} icon={faTrash} size="xl" />
                <p>هل أنت متأكد من الحذف؟</p>
                <button className={`btn ${style.btnDelete}`} onClick={handelDelete} disabled={isLoading}>حذف</button>
            </article>

            <Done result={result} error={error} />

            <Faild error={error} />

        </section>
    );
}

export default Delete;