import React from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import api from "../utils/Api.js";
import ImagePopup from "./ImagePopup.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ConfirmDeletePopup from "./ConfirmDeletePopup.js";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Register from "./Register.js";
import Login from "./Login.js";
import ProtectedRouteElement from "./ProtectedRoute.js";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [isConfirmDeletePopupOpen, setConfirmDeletePopupOpen] =
    React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  function handleDeleteCardClick(card) {
    setSelectedCard(card);
    setConfirmDeletePopupOpen(true);
  }

  function handleUpdateUser({ name, about }) {
    api
      .setNewUserData({ name, about })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .changeAvatar({ link: avatar })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .addNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleCardDelete(card) {
    const isOwn = card.owner._id === currentUser._id;

    if (isOwn) {
      api
        .removeCard(card._id)
        .then(() => {
          setCards((initialCards) =>
            initialCards.filter((c) => c._id !== card._id)
          );
          closeAllPopups();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (isLiked) {
      api
        .deleteLike(card._id)
        .then((dislikedCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? dislikedCard : c))
          );
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      api
        .putLike(card._id)
        .then((likedCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? likedCard : c))
          );
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    setConfirmDeletePopupOpen(false);
  }

  const isSomePopupOpen =
    isAddPlacePopupOpen ||
    isEditAvatarPopupOpen ||
    isImagePopupOpen ||
    isEditProfilePopupOpen ||
    isConfirmDeletePopupOpen;

  React.useEffect(() => {
    if (!isSomePopupOpen) return;

    const closeByOverlayClick = (evt) => {
      if (evt.target.classList.contains("popup")) {
        closeAllPopups();
      }
    };

    const closeByEscape = (evt) => {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    };

    document.addEventListener("keydown", closeByEscape);
    document.addEventListener("click", closeByOverlayClick);

    return () => {
      document.removeEventListener("keydown", closeByEscape);
      document.removeEventListener("click", closeByOverlayClick);
    };
  }, [isSomePopupOpen]);

  return (
    <BrowserRouter>
      <main className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>
            <Route
              path="/main"
              loggedIn={loggedIn}
              element={
                <ProtectedRouteElement loggedIn={loggedIn}>
                  <Header />
                  <Main
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    cards={cards}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleDeleteCardClick}
                  />
                  <Footer />
                </ProtectedRouteElement>
              }
            />
            <Route path="/sign-up" element={<Register />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/" element={<Navigate to={loggedIn ? "/main" : "/sign-in"} replace />} />
          </Routes>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <ImagePopup
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
          />
          <ConfirmDeletePopup
            isOpen={isConfirmDeletePopupOpen}
            onClose={closeAllPopups}
            onConfirm={() => handleCardDelete(selectedCard)}
          />
        </CurrentUserContext.Provider>
      </main>
    </BrowserRouter>
  );
}

export default App;
