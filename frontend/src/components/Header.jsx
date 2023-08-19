import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import headerLogo from "../images/Vector.svg";
import authApi from "../utils/authApi";
import stripes from "../images/stripes.svg";
import cross from "../images/cross.svg";

function Header({ isAuthorized, register, login, email }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileNavigation, setMobileNavigation] = useState(false);
  const onOpenNavigation = () => {
    setMobileNavigation(true);
  };

  const onCloseNavigation = () => {
    setMobileNavigation(false);
  };
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
      {mobileNavigation && (
        <div className="header__mobile-container">
          <p className="header__mobile-email">{email}</p>
          <p className="header__mobile-text" onClick={handleExit}>
            Выйти
          </p>
        </div>
      )}
      <div className="header__container">
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
        {((location.pathname === "/" && !mobileNavigation) && (
          <img
            className="header__stripes"
            src={stripes}
            alt="линии"
            onClick={onOpenNavigation}
          />
        ))}
        {((location.pathname === "/" && mobileNavigation) && (
          <img
            className="header__cross"
            src={cross}
            alt="крест"
            onClick={onCloseNavigation}
          />
        ))}
      </div>
    </header>
  );
}

export default Header;
