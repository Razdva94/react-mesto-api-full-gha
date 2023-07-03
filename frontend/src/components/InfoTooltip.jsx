import React from "react";
import approvedIcon from "../images/ApprovedIcon.svg";
import regectedIcon from "../images/RegectedIcon.svg";

function InfoTooltip({
  onClose,
  approvedPopupIsOpened,
  regectedPopupIsOpened,
  approvedPopupIsOpenedText
}) {
  return (
    <div
      className={`popup  ${
        approvedPopupIsOpened || regectedPopupIsOpened ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <button
          className="popup__close-icon"
          type="button"
          aria-label="close"
          onClick={onClose}
        ></button>
        {approvedPopupIsOpened && (
          <form name="approved" className="popup__form">
            <img
              className="popup__check"
              src={approvedIcon}
              alt="зеленая галочка"
            />
            <h2 className="popup__check-text">
              {approvedPopupIsOpenedText }
            </h2>
          </form>
        )}
        {regectedPopupIsOpened && (
          <form name="regected" className="popup__form">
            <img
              className="popup__check"
              src={regectedIcon}
              alt="красный крестик"
            />
            <h2 className="popup__check-text">
              Что-то пошло не так! Поробуйте еще раз.
            </h2>
          </form>
        )}
      </div>
    </div>
  );
}

export default InfoTooltip;
