function PopupWithForm() {
  return (
    <>
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
    </>
  )
}

export default PopupWithForm;