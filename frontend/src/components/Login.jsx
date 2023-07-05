import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import useForm from "../hooks/useForm";
import authApi from "../utils/authApi";
import InfoTooltip from "./InfoTooltip";
import usePopupClose from "../hooks/usePopupClose";

function Login({ handleLoggedIn, getProfileAndCardsInfo }) {
  const navigate = useNavigate();
  const { values, handleChange } = useForm();
  const [approvedPopup, setApprovedPopup] = React.useState(false);
  const [regectedPopup, setRegectedPopup] = React.useState(false);

  function handlePopupClose() {
    if (approvedPopup) {
      setApprovedPopup(false);
      handleLoggedIn(true);
      getProfileAndCardsInfo();
      navigate("/");
    }
    if (regectedPopup) {
      setRegectedPopup(false);
    }
  }

  usePopupClose(approvedPopup || regectedPopup, handlePopupClose);

  function handleSubmit(e) {
    e.preventDefault();
    authApi
      .postToSignin(values)
      .then(() => {
        localStorage.setItem("validated", true);
        setApprovedPopup(true);
      })
      .catch((err) => {
        console.log(err);
        setRegectedPopup(true);
      });
  }
  return (
    <>
      <div className="body">
        <div className="page">
          <Header login />
          <form
            name="login"
            className="popup__form popup__form_type_login"
            onSubmit={handleSubmit}
          >
            <h2 className="popup__title popup__title_type_login">Вход</h2>
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
              Войти
            </button>
          </form>
        </div>
      </div>
      <InfoTooltip
        onClose={handlePopupClose}
        approvedPopupIsOpened={approvedPopup}
        regectedPopupIsOpened={regectedPopup}
        approvedPopupIsOpenedText="Добро пожаловать!"
      />
    </>
  );
}

export default Login;
