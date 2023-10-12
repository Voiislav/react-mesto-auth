import basketIcon from "../images/basket_icon.svg";

function Card({ name, link, likes, onCardClick }) {

  function handleClick() {
    onCardClick({ name, link });
  }

  return (
    <>
      <figure className="element">
        <button
          type="button"
          className="element__zoom"
          aria-label="Увеличить фото"
          onClick={handleClick}
        ></button>
        <button
          type="button"
          className="element__trash"
          aria-label="Удалить карточку"
        >
          <img 
          src={basketIcon} 
          alt="Иконка мусорной корзины" />
        </button>
        <img className="element__photo" src={link} />
        <figcaption className="element__caption">
          <h2 className="element__title">{name}</h2>
          <div className="element__like-area">
            <button
              type="button"
              className="element__like"
              aria-label="Поставить лайк"
            ></button>
            <p className="element__likes-number">{likes.length}</p>
          </div>
        </figcaption>
      </figure>
    </>
  );
}

export default Card;
