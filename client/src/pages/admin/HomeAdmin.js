import style from '../styles/admin/homeAdmin.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faBuildingColumns, faCalendarDay, faTableCells, faUsers } from '@fortawesome/free-solid-svg-icons';
import useFetch from '../../hooks/useFetch';

const HomeAdmin = () => {
    const { data: users } = useFetch("http://localhost:5000/users");
    const { data: colleges } = useFetch("http://localhost:5000/colleges");
    const { data: building } = useFetch("http://localhost:5000/building");
    const { data: departmrnts } = useFetch("http://localhost:5000/departements");
    const { data: lecturersNumber } = useFetch("http://localhost:5000/lecturers/checkLecturersNumber");
    const { data: hallsNumber } = useFetch("http://localhost:5000/halls/checkHallsNumber");

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
                    <p>عدد المستخدمون</p>
                    <p className={style.number}>{users && users.length} مستخدمون</p>
                </article>

                <article className={style.numbers}>
                    <header>
                        <FontAwesomeIcon icon={faBuildingColumns} />
                    </header>
                    <p>عدد الكليات</p>
                    <p className={style.number}>{colleges && colleges.length} كليات</p>
                </article>

                <article className={style.numbers}>
                    <header>
                        <FontAwesomeIcon icon={faTableCells} />
                    </header>
                    <p>عدد الأقسام</p>
                    <p className={style.number}>{departmrnts && departmrnts.length} أقسام</p>
                </article>

                <article className={style.numbers}>
                    <header>
                        <FontAwesomeIcon icon={faBuilding} />
                    </header>
                    <p>عدد المباني</p>
                    <p className={style.number}>{building && building.length} مباني</p>
                </article>
            </section>

            <article>
                <header>
                    <h1>إحصائيات الجداول</h1>
                </header>

                <section className={style.containerNumbers}>
                    <article className={style.numbers}>
                        <header>
                            <FontAwesomeIcon icon={faCalendarDay} />
                        </header>
                        <p>عدد الجداول في النظام</p>
                        <p className={style.numberTable}>{users && users.length} جدول</p>
                    </article>

                    <article className={style.numbers}>
                        <header>
                            <FontAwesomeIcon icon={faUsers} />
                        </header>
                        <p> اعضاء هيئة التدريس</p>
                        <p className={style.numberTable}>{lecturersNumber && lecturersNumber.lecturer} محاضرون</p>
                        <p className={style.numberTable}>{lecturersNumber && lecturersNumber.lecturerNull} متفرغون</p>
                    </article>

                    <article className={style.numbers}>
                        <header>
                            <FontAwesomeIcon icon={faBuilding} />
                        </header>
                        <p>القاعات</p>
                        <p className={style.numberTable}>{hallsNumber && hallsNumber.Hall} قاعة مستخدمة</p>
                        <p className={style.numberTable}>{hallsNumber && hallsNumber.EmptyHall} قاعة غير مستخدمة</p>
                    </article>
                </section>
            </article>

            
        </section>
    );
}

export default HomeAdmin;