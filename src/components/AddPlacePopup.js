import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const newCardNameRef = React.useRef();
  const newCardLinkRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name: newCardNameRef.current.value,
      link: newCardLinkRef.current.value
    })
  }

  return (
    <PopupWithForm
          title="Новое место"
          name="add"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
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
            ref={newCardNameRef}
          />
          <span id="place-title-error" className="popup__error" />
          <input
            type="url"
            name="link"
            className="popup__text popup__text_type_link"
            id="place-link"
            placeholder="Ссылка на картинку"
            required=""
            ref={newCardLinkRef}
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
  )
}

export default AddPlacePopup;