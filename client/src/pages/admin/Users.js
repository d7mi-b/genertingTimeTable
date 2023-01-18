import {
  faEdit,
  faTrash,
  faUser,
  faLock,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import style from "../styles/admin/users.module.css";

const users = [
  {
    id: 1,
    name: "مكارم بامطرف",
    type: "رئيس قسم هندسة الحاسوب",
    username: "username",
  },
  {
    id: 2,
    name: "خالد بن إسحاق",
    type: "رئيس قسم هندسة الإلكترونية والإتصالات",
    username: "username",
  },
];

const Users = () => {
  const handelSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const btnAddUsers = document.querySelector(".btnAddUsers");
    const addUsersSection = document.querySelector(".container-section");
    const btnCloseAddUsersSec = document.querySelector(".close-btn");

    console.log(addUsersSection);

    btnAddUsers.addEventListener("click", () => {
      addUsersSection.style.cssText = "display: flex";
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
            onSubmit={handelSubmit}
            className={`addForm ${style.addUsersForm}`}
          >
            <label htmlFor="name">الإسم:</label>
            <section className="input">
              <FontAwesomeIcon icon={faUser} />
              <input type="text" name="name" />
            </section>
            <label htmlFor="username">اسم المستخدم:</label>
            <section className="input">
              <FontAwesomeIcon icon={faUser} />
              <input type="text" name="username" />
            </section>
            <label htmlFor="password">كلمة المرور:</label>
            <section className="input">
              <FontAwesomeIcon icon={faLock} />
              <input type="password" name="password" />
            </section>
            <label htmlFor="rePassword">إعادة كلمة المرور:</label>
            <section className="input">
              <FontAwesomeIcon icon={faLock} />
              <input type="password" name="rePassword" />
            </section>
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

      <section className={`${style.usersContainer}`}>
        {users.map((e) => {
          return (
            <article className={`${style.user}`} key={e.id}>
              <p>{e.name}</p>
              <p>{e.type}</p>
              <p>{e.username}</p>
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
