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

        if (result)
            setTimeout(() => {
                window.location.reload();
            }, 2000)

    }, [result, error])

    return (
        <section className={`container-section ${style.container}`} id='deletComponent'>
            <article className={`center-section ${style.centerSection}`}>
                <FontAwesomeIcon className={`close-btn ${style.btnClose}`} id='colseDeleteComponente' icon={faXmark} size='xl' />
                <FontAwesomeIcon className={`${style.icon}`} icon={faTrash} size="xl" />
                <p>هل أنت متأكد من الحذف؟</p>
                {
                    !isLoading && 
                    <button className={`btn ${style.btnDelete}`} onClick={handelDelete}>حذف</button>
                }
            </article>

            <Done result={result} error={error} />

            <Faild error={error} />

        </section>
    );
}

export default Delete;