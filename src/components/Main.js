import Card from './Card.js';

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  userName,
  userDescription,
  userAvatar,
  cards,
  onCardClick
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
        <section className="elements">
        {cards.map((card) => (
          <Card
            name={card.name}
            link={card.link}
            likes={card.likes}
            key={card._id}
            onCardClick={onCardClick}
          />
        ))}
        </section>
      </main>
    </>
  );
}

export default Main;
