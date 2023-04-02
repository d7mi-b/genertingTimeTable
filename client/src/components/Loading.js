import style from './styles/loading.module.css';

const Loading = () => {
    return (
        <div className={style.wrapper}>
            <span className={`${style.circle} ${style.circle_1}`}></span>
            <span className={`${style.circle} ${style.circle_2}`}></span>
            <span className={`${style.circle} ${style.circle_3}`}></span>
            <span className={`${style.circle} ${style.circle_4}`}></span>
            <span className={`${style.circle} ${style.circle_5}`}></span>
            <span className={`${style.circle} ${style.circle_6}`}></span>
            <span className={`${style.circle} ${style.circle_7}`}></span>
            <span className={`${style.circle} ${style.circle_8}`}></span>
            <p>انتظر قليلًا...</p>
        </div>
    );
}

export default Loading;