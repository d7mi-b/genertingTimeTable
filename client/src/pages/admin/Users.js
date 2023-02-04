import {
  faEdit,
  faTrash,
  faUser,
  faLock,
  faXmark,
  faTableCellsLarge,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Done from '../../components/Done';
import Faild from '../../components/Faild';
import style from "../styles/admin/users.module.css";

const users = [
  {
    id: 1,
    name: "مكارم بامطرف",
    type: "رئيس قسم هندسة الحاسوب",
    User_Name: "User_Name",
  },
  {
    id: 2,
    name: "خالد بن إسحاق",
    type: "رئيس قسم هندسة الإلكترونية والإتصالات",
    User_Name: "User_Name",
  },
];

const Users = () => {
  const { data: departements, isPending, error} = useFetch('http://localhost:5000/departements');
  const { data: userTypes, isPending: isPendingUserType, error: errorUserType } = useFetch('http://localhost:5000/users/getUsersType');
  const [Name, setName] = useState('');
  const [User_Name, setUser_Name] = useState('');
  const [Password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [departement, setDepartement] = useState('');
  const [userType, setUserType] = useState('');
  const [errPassword, setErrPassword] = useState(null);
  const [done, setDone] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handelSubmitUser = (e) => {
    e.preventDefault();

    if (!departement)
      setDepartement(departements[0].departement_id);

    if (!userType)
      setUserType(userTypes[0].type_id);

    if (Name && User_Name && Password === rePassword && departement && userType)
    fetch('http://localhost:5000/users/addUsers', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Name, User_Name, Password, Department_ID: departement, User_Type_ID: userType
      })
    })
    .then(result => {
      if (result.status === 200)
        setDone(true);
    })
    .catch(err => console.log(err));
    
  };

  const copmarePasswords = () => {
    if (Password !== rePassword)
      setErrPassword('كلمات المرور غير متطابقة')
    else if (Password === rePassword)
      setErrPassword(null);
  }

  useEffect(() => {
    const btnAddUsers = document.querySelector(".btnAddUsers");
    const addUsersSection = document.querySelector(".container-section");
    const btnCloseAddUsersSec = document.querySelector(".close-btn");

    btnAddUsers.addEventListener("click", () => {
      addUsersSection.style.cssText = "display: grid";
    });

    btnCloseAddUsersSec.addEventListener("click", () => {
      addUsersSection.style.cssText = "display: none";
    });

  }, []);

  return (
    <section className={`containerPage ${style.users}`}>
      <header>
        <h1>المستخدمين</h1>
        <button className={`btn btnAddUsers ${style.btn}`}>
          إضافة مستخدمين
        </button>
      </header>

      <section className={`container-section ${style.addUsersSection}`}>
        <article className={`center-section`}>
          <FontAwesomeIcon
            className={`close-btn ${style.btnClose}`}
            id="colseLogin"
            icon={faXmark}
            size="xl"
          />
          <header>
            <h1>إضافة مستخدم</h1>
          </header>
          <form
            onSubmit={handelSubmitUser}
            className={`addForm ${style.addUsersForm}`}
          >

            <label htmlFor="name">الإسم:</label>
            <section className="input">
              <FontAwesomeIcon icon={faUser} />
              <input type="text" name="name" value={Name} onChange={(e) => setName(e.target.value)}/>
            </section>

            <label htmlFor="User_Name">اسم المستخدم:</label>
            <section className="input">
              <FontAwesomeIcon icon={faUser} />
              <input type="text" name="User_Name" value={User_Name} onChange={e => setUser_Name(e.target.value)} />
            </section>

            <label htmlFor="departement">القسم:</label>
            <section className="input">
              <FontAwesomeIcon icon={faTableCellsLarge} />
              <select value={departement} onChange={e => setDepartement(+e.target.value)}>
                {
                  departements &&
                  departements.map(e => {
                    return (
                      <option value={e.Department_ID} key={e.Department_ID}>{e.Department_Name}</option>
                    )
                  })
                }
              </select>
            </section>

            <label htmlFor="userType">نوع المستخدم: </label>
            <section className="input">
              <FontAwesomeIcon icon={faUser} />
              <select name="userType" value={userType} onChange={e => setUserType(+e.target.value)}>
                {
                  userTypes &&
                  userTypes.map(e => {
                    return (
                      <option value={e.User_Type_ID} key={e.User_Type_ID}>{e.User_Type_Name}</option>
                    )
                  })
                }
              </select>
            </section>

            <label htmlFor="Password">كلمة المرور:</label>
            <section className="input">
              <FontAwesomeIcon icon={faLock} />
              <input 
                type="password" 
                name="Password" 
                value={Password} 
                onChange={e => setPassword(e.target.value)} 
              />
            </section>

            <label htmlFor="rePassword">إعادة كلمة المرور:</label>
            <section className="input">
              <FontAwesomeIcon icon={faLock} />
              <input 
                type="password" 
                name="rePassword" 
                value={rePassword} 
                onChange={e => setRePassword(e.target.value)}
                onBlur={copmarePasswords}
              />
            </section>

            {
              errPassword && <p>{errPassword}</p>
            }

            <section className="btnContainer">
              <input
                className={`btn ${style.btn}`}
                type="submit"
                name="submit"
                value="إضافة مستخدم"
              />
            </section>

          </form>
        </article>
      </section>

      { done && <Done />}

      { errorMessage && <Faild errorMessage={errorMessage} />}

      <section className={`${style.usersContainer}`}>
        {users.map((e) => {
          return (
            <article className={`${style.user}`} key={e.id}>
              <p>{e.name}</p>
              <p>{e.type}</p>
              <p>{e.User_Name}</p>
              <section className={`${style.userIcons}`}>
                <FontAwesomeIcon icon={faEdit} />
                <FontAwesomeIcon icon={faTrash} />
              </section>
            </article>
          );
        })}
      </section>
    </section>
  );
};

export default Users;
