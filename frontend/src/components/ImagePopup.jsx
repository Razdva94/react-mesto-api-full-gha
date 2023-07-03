import React from "react";
import usePopupClose from "../hooks/usePopupClose";

function ImagePopup({ card, onClose }) {
  usePopupClose(card.link, onClose);
  return (
    <div
      className={`popup popup_type_picture-background ${
        card.link ? "popup_opened" : ""
      }`}
    >
      <div className="popup__picture-container">
        <button
          type="button"
          className="popup__close-icon"
          onClick={onClose}
          aria-label="close"
        />
        <img
          src={card.link}
          alt={card.name}
          className="popup__picture"
        />
        <h3 className="popup__place-name">{card.name}</h3>
      </div>
    </div>
  );
}

export default ImagePopup;
