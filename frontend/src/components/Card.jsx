import React from "react";
import bin from "../images/bin.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isLiked = card.likes.some((like) => like._id === currentUser._id);
  const isOwn = card.owner._id === currentUser._id;
  const handleClick = () => onCardClick(card);
  const handleLikeClick = () => onCardLike(card);
  const handleCardDelete = () => onCardDelete(card);
  return (
    <div className="element">
      {isOwn && (
        <img
          className="element__bin"
          src={bin}
          alt="мусорка"
          onClick={handleCardDelete}
        />
      )}
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="element__text-container">
        <h2 className="element__text">{card.name}</h2>
        <div className="element__like-container">
          <button
            aria-label="like"
            type="button"
            className={`element__like-icon ${
              isLiked && "element__like-icon_active"
            }`}
            onClick={handleLikeClick}
          />
          <span className="element__like-number">{card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
