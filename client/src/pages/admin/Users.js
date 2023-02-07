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
import Loading from "../../components/Loading";
import { useFetchPost } from "../../hooks/useFetchPost";
import { useFetchDelete } from "../../hooks/useFetchDelete";

const Users = () => {
  const { fetchPost, result, isLoading, error: errorAddUsers} = useFetchPost();
  const { fetchDelete, result: resultDeleteUser, error: errorDeleteUser } = useFetchDelete();
  const { data: users, isPending: usersLoading, error: errorUsers } = useFetch("http://localhost:5000/users");
  const { data: departements } = useFetch('http://localhost:5000/departements');
  const { data: userTypes } = useFetch('http://localhost:5000/users/getUsersType');
  const [Name, setName] = useState('');
  const [User_Name, setUser_Name] = useState('');
  const [Password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [departement, setDepartement] = useState('');
  const [userType, setUserType] = useState('');
  const [errPassword, setErrPassword] = useState(null);

  const handelSubmitUser = async (e) => {
    e.preventDefault();

    if (Name && User_Name && Password === rePassword && departement && userType) {
      await fetchPost('http://localhost:5000/users/addUsers', {
        Name, User_Name, Password, Department_ID: departement, User_Type_ID: userType
      })
    }
  };

  const copmarePasswords = () => {
    if (Password !== rePassword)
      setErrPassword('كلمات المرور غير متطابقة')
    else if (Password === rePassword)
      setErrPassword(null);
  }

  const handelDeleteUser = async (e) => {
    const User_ID = +e.target.parentElement.parentElement.parentElement.id;

    await fetchDelete('http://localhost:5000/users/deleteUser', {
      User_ID
    });
  }

  useEffect(() => {
    if (!departement && departements)
      setDepartement(departements[0].Department_ID);

    if (!userType && userTypes)
      setUserType(userTypes[0].User_Type_ID);

    const btnAddUsers = document.querySelector(".btnAddUsers");
    const addUsersSection = document.querySelector(".container-section");
    const btnCloseAddUsersSec = document.querySelector(".close-btn");

    btnAddUsers.addEventListener("click", () => {
      addUsersSection.style.cssText = "display: grid";
    });

    btnCloseAddUsersSec.addEventListener("click", () => {
      addUsersSection.style.cssText = "display: none";
    });

    const doneComponent = document.getElementById('doneComponent');
    const btnCloseDoneComponent = document.getElementById('colseDoneComponente');

    if ((result && !errorAddUsers) || (resultDeleteUser && !errorDeleteUser)) {
      doneComponent.style.cssText = 'display: grid';
    }

    btnCloseDoneComponent.addEventListener('click', () => {
      doneComponent.style.cssText = 'display: none';
    })

    const faildComponent = document.getElementById('faildComponent');
    const btnCloseFaildComponent = document.getElementById('colseFaildComponente');

    if (errorAddUsers || errorDeleteUser) {
      faildComponent.style.cssText = 'display: grid';
    }

    btnCloseFaildComponent.addEventListener('click', () => {
      faildComponent.style.cssText = 'display: none';
    })

  }, [departement, departements, userType, userTypes, result, errorAddUsers, resultDeleteUser, errorDeleteUser]);

  return (
    <section className={`containerPage ${style.users}`}>
      <header>
        <h1>المستخدمين</h1>
        <button className={`btn btnAddUsers ${style.btn}`}>
          إضافة مستخدمين
        </button>
      </header>

      {/* Add users Section */}
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
              <input 
                type="text" 
                name="name" 
                required 
                value={Name} 
                onChange={(e) => setName(e.target.value)}
              />
            </section>

            <label htmlFor="User_Name">اسم المستخدم:</label>
            <section className="input">
              <FontAwesomeIcon icon={faUser} />
              <input 
                type="text" 
                name="User_Name" 
                required 
                value={User_Name} 
                onChange={e => setUser_Name(e.target.value)} 
              />
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
                required
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
                required
                value={rePassword} 
                onChange={e => setRePassword(e.target.value)}
                onBlur={copmarePasswords}
              />
            </section>

            {
              errPassword && <p>{errPassword}</p>
            }

            {
              !isLoading &&
              <section className="btnContainer">
                <input
                  className={`btn ${style.btn}`}
                  type="submit"
                  name="submit"
                  value="إضافة مستخدم"
                />
              </section>
            }

          </form>
        </article>
      </section>

      <Done />

      <Faild errorMessage={errorAddUsers || errorDeleteUser} />
      {/* End Add Users Section */}

      { !users && !usersLoading && <p className='emptyElement'>لا يوجد مستخدمين</p> }

      { errorUsers && <p className='emptyElement'>{errorUsers}</p> }

      <section className={`${style.usersContainer}`}>
        { 
          users &&
          users.map((e) => {
            return (
              <article className={`${style.user}`} id={e.User_ID} key={e.User_ID}>
                <p>{e.Name}</p>
                <p>{e.User_Type_Name}</p>
                <p>{e.Department_Name}</p>
                <p>{e.College_Name}</p>
                <p>{e.User_Name}</p>
                <section className={`${style.userIcons}`}>
                  <FontAwesomeIcon icon={faEdit} />
                  <FontAwesomeIcon icon={faTrash} onClick={handelDeleteUser} />
                </section>
              </article>
            );
          })
        }
        {
          usersLoading && <Loading />
        }
      </section>
    </section>
  );
};

export default Users;
