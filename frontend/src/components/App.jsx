import "../pages/index.css";
import React from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import api from "../utils/api";
import Register from "./Register";
import Login from "./Login";
import ProtectedRouteElement from "./ProtectedRoute";
import authApi from "../utils/authApi";

function App() {
  const navigate = useNavigate();
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState(null);
  function getProfileAndCardsInfo() {
    Promise.all([api.getInitialProfile(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCardFromServer(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });

  const closeAllPopups = React.useCallback(() => {
    if (isEditProfilePopupOpen) {
      setIsEditProfilePopupOpen(false);
    }
    if (isAddPlacePopupOpen) setIsAddPlacePopupOpen(false);
    if (isEditAvatarPopupOpen) setIsEditAvatarPopupOpen(false);
    setSelectedCard({ name: "", link: "" });
  }, [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen]);

  function handleCardClick(card) {
    setSelectedCard(card);
  }
  const [isLoading, setIsLoading] = React.useState(false);

  function handleUpdateUser({ name, about }) {
    setIsLoading(true);
    api
      .changeProfileInfo({ name, about })
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }
  function handleUpdateAvatar(avatarUrl) {
    setIsLoading(true);
    api
      .changeAvatarImage(avatarUrl)
      .then((avatar) => {
        setCurrentUser(avatar);
      })
      .then(() => closeAllPopups())
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }
  function handleAddPlaceSubmit({ cardName, cardLink }) {
    setIsLoading(true);
    api
      .postCardToServer(cardName, cardLink)
      .then((newCard) => setCards([newCard, ...cards]))
      .then(() => closeAllPopups())
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }
  const [loggedIn, setLoggedIn] = React.useState(false);
  function handleLoggedIn(value) {
    setLoggedIn(value);
  }
  const [email, setEmail] = React.useState("");
  React.useEffect(() => {
    authApi
      .getValidation()
      .then((res) => {
        setEmail(res.data.email);
        setLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate]);

  React.useEffect(() => {
    if (loggedIn) getProfileAndCardsInfo();
  }, [loggedIn]);

  return (
    <Routes>
      <Route path="/sign-up" element={<Register />} />
      <Route
        path="/sign-in"
        element={<Login handleLoggedIn={handleLoggedIn} />}
      />
      <Route
        path="/"
        element={(
          <ProtectedRouteElement
            component={(
              <CurrentUserContext.Provider value={currentUser}>
                <div className="body">
                  <div className="page">
                    <Header email={email} isAuthorized />
                    <Main
                      onEditProfile={handleEditProfileClick}
                      onEditAvatar={handleEditAvatarClick}
                      onAddPlace={handleAddPlaceClick}
                      onCardClick={handleCardClick}
                      onCardLike={handleCardLike}
                      onCardDelete={handleCardDelete}
                      cards={cards}
                    />
                    <Footer />
                    <EditProfilePopup
                      isOpened={isEditProfilePopupOpen}
                      onClose={closeAllPopups}
                      onUpdateUser={handleUpdateUser}
                      onLoadingState={isLoading}
                    />
                    <EditAvatarPopup
                      isOpened={isEditAvatarPopupOpen}
                      onClose={closeAllPopups}
                      onUpdateAvatar={handleUpdateAvatar}
                      onLoadingState={isLoading}
                    />
                    <AddPlacePopup
                      isOpened={isAddPlacePopupOpen}
                      onClose={closeAllPopups}
                      onAddPlace={handleAddPlaceSubmit}
                      onLoadingState={isLoading}
                    />
                    <PopupWithForm name="delete" title="Вы уверены?" />
                    <ImagePopup onClose={closeAllPopups} card={selectedCard} />
                  </div>
                </div>
              </CurrentUserContext.Provider>
            )}
            loggedIn={loggedIn}
          />
        )}
      />
      <Route path="/*" element={<Navigate to="/sign-in" replace />} />
    </Routes>
  );
}

export default App;
