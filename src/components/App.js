import React from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import api from "../utils/Api.js";
import ImagePopup from "./ImagePopup.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState("");

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
    api.addNewCard({ name, link })
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
          const updatedCards = cards.filter((c) => c._id !== card._id);
          setCards(updatedCards);
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
        .putLike(card._id, true)
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
  }

  const isOpen =
    isAddPlacePopupOpen ||
    isEditAvatarPopupOpen ||
    isImagePopupOpen ||
    isEditProfilePopupOpen;

  React.useEffect(() => {
    if (!isOpen) return;

    const closeByEscape = (evt) => {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    };

    document.addEventListener("keydown", closeByEscape);

    return () => document.removeEventListener("keydown", closeByEscape);
  }, [isOpen]);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          userName={currentUser.name}
          userDescription={currentUser.about}
          userAvatar={currentUser.avatar}
          cards={cards}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />
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
        <PopupWithForm
          title="Вы уверены?"
          name="confirm"
          onClose={closeAllPopups}
        >
          <button
            type="submit"
            name="submitButton"
            aria-label="Подтвердить удаление карточки"
            className="popup__submit popup__submit_type_confirm"
          >
            Да
          </button>
        </PopupWithForm>
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        ></ImagePopup>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
