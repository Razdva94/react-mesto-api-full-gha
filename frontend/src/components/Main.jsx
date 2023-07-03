import React from "react";
import editButton from "../images/Vector(1).svg";
import profileAddButton from "../images/Vector(2).svg";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const cardsRender = cards.map((element) => {
    return (
      <Card
        key={element._id}
        card={element}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
        onCardDelete={onCardDelete}
      />
    );
  });
  return (
    <main className="main">
      <section className="profile">
        <button
          type="button"
          className="profile__avatar-hover"
          onClick={onEditAvatar}
        >
          {" "}
        </button>
        <img
          className="profile__avatar"
          src={currentUser?.avatar}
          alt="Аватар"
        />
        <div className="profile__profile-info">
          <h1 className="profile__title">{currentUser?.name}</h1>
          <button
            type="button"
            className="profile__button-container"
            onClick={onEditProfile}
          >
            <img
              className="profile__edit-button"
              src={editButton}
              alt="кнопка"
            />
          </button>
          <p className="profile__text">{currentUser?.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        >
          <img className="profile__cross" src={profileAddButton} alt="крест" />
        </button>
      </section>
      <section className="elements">{cardsRender}</section>
    </main>
  );
}

export default Main;
