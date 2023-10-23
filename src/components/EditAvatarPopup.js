import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    })
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="change-avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        name="link"
        className="popup__text popup__text_type_avatar-link"
        id="avatar-link"
        placeholder="Ссылка на новый аватар"
        required=""
        ref={avatarRef}
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
  );
}

export default EditAvatarPopup;
