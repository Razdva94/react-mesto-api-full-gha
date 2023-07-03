import React from "react";
import usePopupClose from "../hooks/usePopupClose";

function PopupWithForm({
  name,
  title,
  isOpened,
  children,
  onClose,
  onSubmit,
  onLoadingState,
  buttonText,
  buttonTextOnLoading,
  isFormValid,
}) {
  usePopupClose(isOpened, onClose);
  return (
    <div
      className={`popup popup_type_${name} ${
        isOpened && "popup_opened"}
      }`}
    >
      <div className="popup__container">
        <button
          className="popup__close-icon"
          type="button"
          aria-label="close"
          onClick={onClose}
        />
        <form
          name={name}
          className={`popup__form popup__form_type_${name}`}
          onSubmit={onSubmit}
        >
          <h2 className="popup__title">{title}</h2>
          {children}
          <button
            type="submit"
            className={`popup__button ${
              isOpened && !isFormValid && "popup__button_inactive"
            }`}
            disabled={isOpened && !isFormValid}
          >
            {`${onLoadingState ? buttonTextOnLoading : buttonText}`}
          </button>
        </form>
      </div>
    </div>
  );
}
export default PopupWithForm;
