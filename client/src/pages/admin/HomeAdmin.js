import style from '../styles/admin/homeAdmin.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faBuildingColumns, faTableCells, faUsers } from '@fortawesome/free-solid-svg-icons';
import useFetch from '../../hooks/useFetch';

const HomeAdmin = () => {
    const { data: users } = useFetch("http://localhost:5000/users");
    const { data: colleges } = useFetch("http://localhost:5000/colleges");
    const { data: building } = useFetch("http://localhost:5000/building");
    const { data: departmrnts } = useFetch("http://localhost:5000/departements");

    return (
        <section className={`containerPage ${style.homeAdmin}`}>
            <header>
                <h1>الصفحة الرئيسية</h1>
            </header>
            <section className={style.containerNumbers}>
                <article className={style.numbers}>
                    <header>
                        <FontAwesomeIcon icon={faUsers} />
                    </header>
                    <p>عدد المستخدمين</p>
                    <p className={style.number}>{users && users.length} مستخدمين</p>
                </article>

                <article className={style.numbers}>
                    <header>
                        <FontAwesomeIcon icon={faBuildingColumns} />
                    </header>
                    <p>عدد الكليات</p>
                    <p className={style.number}>{colleges && colleges.length} كلية</p>
                </article>

                <article className={style.numbers}>
                    <header>
                        <FontAwesomeIcon icon={faTableCells} />
                    </header>
                    <p>عدد الأقسام</p>
                    <p className={style.number}>{departmrnts && departmrnts.length} قسم</p>
                </article>

                <article className={style.numbers}>
                    <header>
                        <FontAwesomeIcon icon={faBuilding} />
                    </header>
                    <p>عدد المباني</p>
                    <p className={style.number}>{building && building.length} مبنى</p>
                </article>
            </section>
        </section>
    );
}

export default HomeAdmin;