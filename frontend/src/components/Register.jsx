import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import useForm from "../hooks/useForm";
import authApi from "../utils/authApi";
import InfoTooltip from "./InfoTooltip";
import usePopupClose from "../hooks/usePopupClose";

function Register() {
  const navigate = useNavigate();
  const { values, handleChange } = useForm();
  const [approvedPopup, setApprovedPopup] = React.useState(false);
  const [regectedPopup, setRegectedPopup] = React.useState(false);
  function navigateToSignIn() {
    navigate("/sign-in", { replace: true });
  }
  function handlePopupClose() {
    if (approvedPopup) {
      setApprovedPopup(false);
      navigateToSignIn();
    }
    if (regectedPopup) {
      setRegectedPopup(false);
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    authApi
      .postToSignup(values)
      .then(() => {
        setApprovedPopup(true);
      })
      .catch((err) => {
        console.log(err);
        setRegectedPopup(true);
      });
  }
  usePopupClose(approvedPopup || regectedPopup, handlePopupClose);
  return (
    <>
      <div className="body">
        <div className="page">
          <Header register />
          <form
            name="login"
            className="popup__form popup__form_type_login"
            onSubmit={handleSubmit}
          >
            <h2 className="popup__title popup__title_type_login">
              Регистрация
            </h2>
            <input
              className="popup__input popup__input_type_login"
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
            <input
              className="popup__input popup__input_type_login"
              type="password"
              name="password"
              placeholder="Пароль"
              onChange={handleChange}
            />
            <button
              type="submit"
              className="popup__button popup__button_type_login"
            >
              Зарегистрироваться
            </button>
          </form>
          <p className="popup__text" onClick={navigateToSignIn}>
            Уже зарегистрированы? Войти.
          </p>
        </div>
      </div>
      <InfoTooltip
        onClose={handlePopupClose}
        approvedPopupIsOpened={approvedPopup}
        regectedPopupIsOpened={regectedPopup}
        approvedPopupIsOpenedText="Вы успешно зарегистрировались!"
      />
    </>
  );
}

export default Register;
