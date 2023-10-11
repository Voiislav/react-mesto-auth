import basketIcon from "../images/basket_icon.svg";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  userName,
  userDescription,
  userAvatar
}) {
  return (
    <>
      <main className="main">
        <section className="profile">
          <div className="profile__info">
            <div className="profile__avatar-area">
              <button
                type="button"
                className="profile__change-avatar"
                onClick={onEditAvatar}
                aria-label="Изменить аватар"
              />
              <img
                className="profile__avatar"
                src={userAvatar}
                alt="На фото - Жак-Ив Кусто"
              />
            </div>
            <div className="profile__edit-area">
              <div className="profile__top-line">
                <h1 className="profile__title">{userName}</h1>
                <button
                  type="button"
                  className="profile__button profile__button_type_edit"
                  onClick={onEditProfile}
                  aria-label="Изменить"
                />
              </div>
              <p className="profile__subtitle">{userDescription}</p>
            </div>
          </div>
          <button
            type="button"
            className="profile__button profile__button_type_add"
            onClick={onAddPlace}
            aria-label="Добавить контент"
          />
        </section>
        <section className="elements"></section>
        <template
          className="elements-template"
          aria-label="Карточки с фотографиями"
        >
          <figure className="element">
            <button
              type="button"
              className="element__zoom"
              aria-label="Увеличить фото"
            ></button>
            <button
              type="button"
              className="element__trash"
              aria-label="Удалить карточку"
            >
              <img src={basketIcon} alt="Иконка мусорной корзины" />
            </button>
            <img className="element__photo" />
            <figcaption className="element__caption">
              <h2 className="element__title"></h2>
              <div className="element__like-area">
                <button
                  type="button"
                  className="element__like"
                  aria-label="Поставить лайк"
                ></button>
                <p className="element__likes-number"></p>
              </div>
            </figcaption>
          </figure>
        </template>
      </main>
    </>
  );
}

export default Main;
