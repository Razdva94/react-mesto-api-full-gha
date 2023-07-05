import React from "react";
import { useNavigate } from "react-router-dom";
import headerLogo from "../images/Vector.svg";
import authApi from "../utils/authApi";

function Header({ isAuthorized, register, login, email }) {
  const navigate = useNavigate();
  function handleClickEnter() {
    navigate("sign-in", { replace: true });
  }
  function handleClickRegister() {
    navigate("/sign-up", { replace: true });
  }
  function handleExit() {
    authApi.getToSignout().then(() => {
      localStorage.clear();
      navigate("sign-in");
    });
  }
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="логотип места" />
      {register && (
        <p className="header__text" onClick={handleClickEnter}>
          Войти
        </p>
      )}
      {login && (
        <p className="header__text" onClick={handleClickRegister}>
          Регистрация
        </p>
      )}
      {isAuthorized && <p className="header__email">{email}</p>}
      {isAuthorized && (
        <p
          className="header__text header__text_type_email"
          onClick={handleExit}
        >
          Выйти
        </p>
      )}
    </header>
  );
}

export default Header;
