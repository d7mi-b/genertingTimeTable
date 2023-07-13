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
import Delete from '../../components/Delete';
import style from "../styles/admin/users.module.css";
import Loading from "../../components/Loading";
import { useFetchPost } from "../../hooks/useFetchPost";
import { useFetchPut } from "../../hooks/useFetchPut";

const Users = () => {
  const { fetchPost, result, isLoading, error: errorAddUsers} = useFetchPost();
  const { fetchPut, result: updateResult, isLoading: loadingUpdate, error: errorUpdate} = useFetchPut();

  const { data: users, isPending: usersLoading, error: errorUsers } = useFetch("http://localhost:5000/users");
  const { data: departements } = useFetch('http://localhost:5000/departements');
  const { data: userTypes } = useFetch('http://localhost:5000/users/getUsersType');


  const [User_ID, setUser_ID] = useState('');
  const [Name, setName] = useState('');
  const [User_Name, setUser_Name] = useState('');
  const [Password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [departement, setDepartement] = useState(() => departements ? departements[0].Department_ID : '');
  const [userType, setUserType] = useState(() => userTypes ? userTypes[0].User_Type_ID : '');
  const [errPassword, setErrPassword] = useState('');

  const handelSubmitUser = async (e) => {
    e.preventDefault();

    if (Name && User_Name && Password === rePassword && departement && userType) {
      await fetchPost('http://localhost:5000/users/addUsers', {
        Name, User_Name, Password, Department_ID: departement, User_Type_ID: userType
      })

      const usersContainer = document.getElementById('userContainer');

      const user = document.createElement('article');
      user.classList.add('users_user__vV4fl');

      user.innerHTML = `
      <p>${Name}</p>
      <p>${userTypes.filter(type => userType === type.User_Type_ID).map(type => type.User_Type_Name)}</p>
      <p>${departements.filter(d => departement === d.Department_ID).map(d => d.Department_Name)}</p>
      <p>${User_Name}</p>
      <section class=\`${style.userIcons}\`>
        <FontAwesomeIcon
          id='user-edit-icon-00000'
          icon=faEdit
        />
        <FontAwesomeIcon 
          icon=faTrash
        />
      </section>
      `;
      
      usersContainer.appendChild(user);
    }
  };

  const copmarePasswords = () => {
    if (Password !== rePassword)
      setErrPassword('كلمات المرور غير متطابقة')
    else if (Password === rePassword)
      setErrPassword(null);
  }

  const failUpdateData = e => {
    setName(e.Name);
    setUser_Name(e.User_Name);
    setDepartement(e.Department_ID);
    setUserType(e.User_Type_ID);
  }

  const handelUpdateUser = async (e) => {
    e.preventDefault();

    await fetchPut('http://localhost:5000/users/updateUser', {
      User_ID, Name, User_Name, Department_ID: departement, User_Type_ID: userType
    });
  }

  useEffect(() => {

    const btnAddUsers = document.querySelector("#btnAddUsersSection");
    const addUsersSection = document.querySelector("#addUserSection");
    const btnCloseAddUsersSec = document.querySelector("#closeAddUserSection");

    btnAddUsers.addEventListener("click", () => {
      addUsersSection.style.cssText = "display: grid";
    });

    btnCloseAddUsersSec.addEventListener("click", () => {
      addUsersSection.style.cssText = "display: none";
    });

    if (User_ID) {
      const deleteIconUser = document.getElementById(`user-delete-icon-${User_ID}`);
      const deletComponent = document.querySelector('#deletComponent');

      deleteIconUser.addEventListener('click', () => {
        deletComponent.style.cssText = 'display: flex';
      })

      const editIconUser = document.getElementById(`user-edit-icon-${User_ID}`);
      const updateUserSection = document.querySelector('#updateUserSection');
      const btnCloseUpdateUserSec = document.querySelector('#colseUpdateUserSec');

      editIconUser.addEventListener('click', () => {
        updateUserSection.style.cssText = 'display: flex';
      })

      btnCloseUpdateUserSec.addEventListener('click', () => {
          updateUserSection.style.cssText = 'display: none';
          setUser_ID('')
          setName('');
          setUser_Name('');
          setDepartement('');
          setUserType('');
          setPassword('');
          setRePassword('');
      });
  }

  }, [departement, departements, userType, userTypes, User_ID]);

  return (
    <section className={`containerPage ${style.users}`}>
      <header>
        <h1>المستخدمون</h1>
        <button className={`btn ${style.btn}`} id='btnAddUsersSection'>
          إضافة مستخدم
        </button>
      </header>

      { users && users.length === 0 && !usersLoading && <p className='emptyElement'>لا يوجد مستخدمين</p> }

      { errorUsers && <p className='emptyElement'>{errorUsers}</p> }

      <section className={`${style.usersContainer}`} id='userContainer'>
        { 
          users &&
          users.map((e) => {
            return (
              <article className={`${style.user}`} id={`user-${e.User_ID}`} key={e.User_ID}>
                <p>{e.Name}</p>
                <p>{e.User_Type_Name}</p>
                <p>{e.Department_Name}</p>
                <p>{e.College_Name}</p>
                <p>{e.User_Name}</p>
                <section className={`${style.userIcons}`}>
                  <FontAwesomeIcon
                    id={`user-edit-icon-${e.User_ID}`}
                    icon={faEdit} 
                    onMouseOver={() => setUser_ID(e.User_ID)} 
                    onClick={() => failUpdateData(e)} 
                  />
                  <FontAwesomeIcon 
                    icon={faTrash} 
                    id={`user-delete-icon-${e.User_ID}`}
                    onMouseOver={() => setUser_ID(e.User_ID)}
                  />
                </section>
              </article>
            );
          })
        }

        {
          usersLoading && <Loading />
        }

      </section>

      {/* Add users Section */}
      <section className={`container-section ${style.addUsersSection}`} id="addUserSection">
        <article className={`center-section`}>
          <FontAwesomeIcon
            className={`close-btn ${style.btnClose}`}
            id="closeAddUserSection"
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
                value={Name || ""} 
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
                value={User_Name || ""} 
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
                value={Password || ""} 
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
                value={rePassword || ""} 
                onChange={e => setRePassword(e.target.value)}
                onBlur={copmarePasswords}
              />
            </section>

            {
              errPassword && <p className="errorMessage">{errPassword}</p>
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
      {/* End Add Users Section */}

      {/* update users Section */}
      <section className={`container-section ${style.addUsersSection}`} id='updateUserSection'>
        <article className={`center-section`}>
          <FontAwesomeIcon
            className={`close-btn ${style.btnClose}`}
            id="colseUpdateUserSec"
            icon={faXmark}
            size="xl"
          />
          <header>
            <h1>تعديل بيانات مستخدم</h1>
          </header>
          <form
            onSubmit={handelUpdateUser}
            className={`addForm ${style.addUsersForm}`}
          >

            <label htmlFor="name">الإسم:</label>
            <section className="input">
              <FontAwesomeIcon icon={faUser} />
              <input 
                type="text" 
                name="name" 
                required 
                value={Name || ""} 
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
                value={User_Name || ""} 
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

            {
              !loadingUpdate &&
              <section className="btnContainer">
                <input
                  className={`btn ${style.btn}`}
                  type="submit"
                  name="submit"
                  value="تعديل بيانات المستخدم"
                />
              </section>
            }

          </form>
        </article>
      </section>

      <Done result={result || updateResult} />

      <Faild error={errorAddUsers || errorUpdate} />

      <Delete url='http://localhost:5000/users/deleteUser' body={{ User_ID }} element={`user-${User_ID}`} />

    </section>
  );
};

export default Users;
