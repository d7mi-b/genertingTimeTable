import { faAngleDoubleLeft, faXmark} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import style from '../styles/HOD/CreateTableHOD.module.css';

const Info ={
    level_one: [
        {
            id:1,
            course:"machine Learning",
            type:"نظري"
        },
        {
            id:2,
            course:"machine Learning",
            type:"عملي"
        },
        {
            id:3,
            course:"Network Security",
            type:"نظري"
        },
        {
            id:4,
            course:"Network Security",
            type:"عملي"
        },
        {
            id:5,
            course:"VHDL",
            type:"نظري"
        },
        {
            id:6,
            course:"VHDL",
            type:"عملي"
        },
        {
            id:7,
            course:"VHDL",
            type:"عملي"
        },
        {
            id:8,
            course:"VHDL",
            type:"عملي"
        },
        {
            id:9,
            course:"VHDL",
            type:"عملي"
        }
    ],
    level_two:[
        {
            id:1,
            course:"machine Learning",
            type:"نظري"
        },
        {
            id:2,
            course:"machine Learning",
            type:"عملي"
        },
        {
            id:3,
            course:"Network Security",
            type:"نظري"
        },
        {
            id:4,
            course:"Network Security",
            type:"عملي"
        },
        {
            id:5,
            course:"VHDL",
            type:"نظري"
        }
    ]
}


const CreateTable = () => {
    const [level, setLevel] = useState(Info.level_one)

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleChange = (e) => {
        const list = document.querySelector(".list").querySelectorAll("li");
        const divLink = document.querySelector(".DivLink")
        const value = e.target.value;
        
        list.forEach(i => {
            i.style.cssText="background-color:transparent"
        })
        e.target.style.cssText="background-color: var(--card-color);"
        
        switch(value){
            case 1 : divLink.style.cssText="top:25px";
            setLevel(Info.level_one)
            break;
            case 2 : divLink.style.cssText="top:100px";
            setLevel(Info.level_two)
            break;
            case 3 : divLink.style.cssText="top:175px";
            break;
            case 4 : divLink.style.cssText="top:250px";
            break;
            case 5 : divLink.style.cssText="top:325px";
        }
    }

    useEffect(() => {
        const list = document.querySelector(".list").querySelector("li");
        list.style.cssText="background-color: var(--card-color);";
        
        const sendRequestSection = document.getElementById("sendRequest")
        const elseOption = document.querySelector("#selectList");
        const else1 = elseOption.querySelector("#else")
        

        else1.addEventListener("select", () => {
            console.log(elseOption)
            sendRequestSection.style.cssText="display:flex";
        })

    },[])

    return(
        <section className="container">
            <header className={style.createTable_header}>
                <div>
                    <h3>رئيس القسم</h3>
                    <FontAwesomeIcon className='arrows' icon={faAngleDoubleLeft} />
                    <h3><NavLink className="link" to="/create_table">إنشاء جدول جديد</NavLink></h3>    
                </div>
                <div>
                    <h3>السنة الدراسية 2022\2023 - الترم الأول</h3>
                </div>
            </header>
            <article className={style.createTable_main}>
                <main>
                    {
                        level.map(i => {
                            return(
                                <div key={i.id} className={style.courseDiv}>
                                    <select  id="selectList">
                                        <option>اختر المدرس : </option>
                                        <option>خالد فوزي اشبير</option>
                                        <option>رشا بن ثعلب</option>
                                        <option id="else">غير ذلك ..</option>
                                    </select>
                                    <hr />
                                    <p>{i.type}</p>
                                    <hr />
                                    <h4>{i.course}</h4>
                                    <section className={`container-section ${style.sendRequest}`} id='sendRequest'>
                                        <article className={`center-section`}>
                                            <FontAwesomeIcon className={`close-btn`} id="colseLogin" icon={faXmark} size="xl" />
                                            <header>
                                                <h1>إرسال طلب مدرس</h1>
                                            </header>
                                            <form onSubmit={handleSubmit} className={`addForm ${style.sendRequestForm}`}>
                                                <label htmlFor="course">المادة : {i.course}</label>                                
                                            <label htmlFor="department">القسم :</label>
                                            <select className="input">
                                                <option  value="choose">اختر القسم</option>
                                                <option  value="electronic_Eng">الهندسة الإلكترونية والاتصالات</option>
                                                <option  value="petrolem_Eng">الهندسة البترولية</option>
                                                <option  value="Architecture_Eng">الهندسة المعمارية</option>
                                                <option  value="chemical_Eng">الهندسة الكيميائية</option>
                                                <option  value="cevil_Eng">الهندسة المدنية</option>
                                            </select>
                                            <section className="btnContainer">
                                                <input className={`btn ${style.btn}`} type="submit" name="submit" value="إرسال" />
                                            </section>
                                            </form>
                                        </article>
                                    </section>
                                </div>
                            )
                        })
                    }
                </main>
                <div className={`${style.link} DivLink`}/>
                <ul className={`list ${style.listDiv}`}>
                    <li value='1' onClick={handleChange}>1</li>
                    <div/>
                    <li value='2' onClick={handleChange}>2</li>
                    <div/>
                    <li value='3' onClick={handleChange}>3</li>
                    <div/>
                    <li value='4' onClick={handleChange}>4</li>
                    <div/>
                    <li value='5' onClick={handleChange}>5</li>
                </ul>
            </article>
            <footer className={style.createTable_footer}>
                <button className={`btn ${style.button}`}>حفظ</button>
            </footer>
        </section>
    )
}

export default CreateTable;