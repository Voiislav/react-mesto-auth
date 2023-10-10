import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';

function App() {
  return (
    <div className="page">
      <Header />
      <Main />
      <Footer />
      <PopupWithForm />
      <section className="popup popup_type_edit">
    <div className="popup__container">
      <button
        type="button"
        className="popup__close"
        aria-label="Закрыть окно редактирования профиля"
      />
      <h2 className="popup__title">Редактировать профиль</h2>
      <form
        className="popup__form popup__form_type_edit"
        name="submitFormEdit"
        noValidate=""
      >
        <input
          type="text"
          name="name"
          className="popup__text popup__text_type_name"
          id="user-name"
          defaultValue=" "
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
          defaultValue=" "
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
      </form>
    </div>
  </section>
  <section className="popup popup_type_add">
    <div className="popup__container">
      <button
        type="button"
        className="popup__close"
        aria-label="Закрыть окно добавления карточки"
      />
      <h2 className="popup__title">Новое место</h2>
      <form
        className="popup__form popup__form_type_add"
        name="submitFormAdd"
        noValidate=""
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
          disabled=""
        >
          Создать
        </button>
      </form>
    </div>
  </section>
  <section className="popup popup_type_image">
    <div className="popup__container popup__container_type_image">
      <img className="popup__image" />
      <h2 className="popup__title popup__title_type_image" />
      <button
        type="button"
        className="popup__close"
        aria-label="Закрыть окно c картинкой"
      />
    </div>
  </section>
  <section className="popup popup_type_confirm">
    <div className="popup__container">
      <button
        type="button"
        className="popup__close"
        aria-label="Закрыть окно подтверждения удаления карточки"
      />
      <h2 className="popup__title">Вы уверены?</h2>
      <form className="popup__form">
        <button
          type="submit"
          name="submitButton"
          aria-label="Подтвердить удаление карточки"
          className="popup__submit popup__submit_type_confirm"
        >
          Да
        </button>
      </form>
    </div>
  </section>
  <section className="popup popup_type_change-avatar">
    <div className="popup__container popup__container_type_change-avatar">
      <button
        type="button"
        className="popup__close"
        aria-label="Закрыть окно изменения аватара"
      />
      <h3 className="popup__title">Обновить аватар</h3>
      <form className="popup__form" name="popupFormAvatar" noValidate="">
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
      </form>
    </div>
  </section>
    </div>
  );
}

export default App;
