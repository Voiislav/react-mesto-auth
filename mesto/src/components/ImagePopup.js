function ImagePopup({ card, onClose, isOpen }) {
  return (
    <section className={`popup popup_type_image ${isOpen ? 'popup_opened' : ''}`}>
    <div className="popup__container popup__container_type_image">
      <img className="popup__image" src={card.link} />
      <h2 className="popup__title">{card.name}</h2>
      <button
        type="button"
        className="popup__close"
        aria-label="Закрыть окно c картинкой"
        onClick={onClose}
      />
    </div>
  </section>
  )
}

export default ImagePopup;