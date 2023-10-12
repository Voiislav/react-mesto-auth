import React from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import api from "../utils/Api.js";
import ImagePopup from "./ImagePopup.js";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [userName, setUserName] = React.useState();
  const [userDescription, setUserDescription] = React.useState();
  const [userAvatar, setUserAvatar] = React.useState();
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
    .then(([userData, cardsData]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        setCards(cardsData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function handleEditAvatarClick() {
    setEditProfilePopupOpen(true);
    document.addEventListener('keydown', closeOnEscapeButton);
  }

  function handleEditProfileClick() {
    setEditAvatarPopupOpen(true);
    document.addEventListener('keydown', closeOnEscapeButton);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
    document.addEventListener('keydown', closeOnEscapeButton);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    document.removeEventListener('keydown', closeOnEscapeButton);
  }

  function closeOnEscapeButton(evt) {
    if (evt.key === 'Escape') {
      closeAllPopups();
    }
  }

  return (
    <div className="page">
      <Header />
      <Main 
      onEditAvatar={handleEditAvatarClick}
      onEditProfile={handleEditProfileClick}
      onAddPlace={handleAddPlaceClick}
      userName={userName}
      userDescription={userDescription}
      userAvatar={userAvatar}
      cards={cards}
      />
      <Footer />
      <PopupWithForm />
      <PopupWithForm 
      title="Редактировать профиль" 
      name="edit"
      isOpen={isEditProfilePopupOpen}
      onClose={closeAllPopups}
      >
        <input
          type="text"
          name="name"
          className="popup__text popup__text_type_name"
          id="user-name"
          placeholder="Введите имя"
          required=""
          minLength={2}
          maxLength={40}
        />
        <span id="user-name-error" className="popup__error" />
        <input
          type="text"
          name="job"
          className="popup__text popup__text_type_job"
          id="user-job"
          placeholder="Введите род занятий"
          required=""
          minLength={2}
          maxLength={200}
        />
        <span id="user-job-error" className="popup__error" />
        <button
          type="submit"
          name="submitButton"
          aria-label="Сохранить изменения"
          className="popup__submit popup__submit_type_edit"
        >
          Сохранить
        </button>
      </PopupWithForm>
      <PopupWithForm 
      title="Новое место" 
      name="add"
      isOpen={isAddPlacePopupOpen}
      onClose={closeAllPopups}
      >
        <input
          type="text"
          name="title"
          className="popup__text popup__text_type_title"
          id="place-title"
          placeholder="Название"
          required=""
          minLength={2}
          maxLength={30}
        />
        <span id="place-title-error" className="popup__error" />
        <input
          type="url"
          name="link"
          className="popup__text popup__text_type_link"
          id="place-link"
          placeholder="Ссылка на картинку"
          required=""
        />
        <span id="place-link-error" className="popup__error" />
        <button
          type="submit"
          name="submitButton"
          aria-label="Сохранить изменения"
          className="popup__submit popup__submit_type_add"
        >
          Создать
        </button>
      </PopupWithForm>
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
      <PopupWithForm 
      title="Обновить аватар" 
      name="change-avatar"
      isOpen={isEditAvatarPopupOpen}
      onClose={closeAllPopups}
      >
        <input
          type="url"
          name="link"
          className="popup__text popup__text_type_avatar-link"
          id="avatar-link"
          placeholder="Ссылка на новый аватар"
          required=""
        />
        <span id="avatar-link-error" className="popup__error" />
        <button
          type="submit"
          name="submitButton"
          aria-label="Сохранить изменения"
          className="popup__submit popup__submit_type_change-avatar"
          disabled=""
        >
          Сохранить
        </button>
      </PopupWithForm>      
    </div>
  );
}

export default App;
