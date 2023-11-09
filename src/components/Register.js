import React from "react";
import Header from "./Header.js";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "../auth.js";
import InfoTooltip from "./InfoTooltip.js";

function Register() {
  const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
  });

  const [infoTooltip, setInfoTooltip] = React.useState({
    isOpen: false,
    status: "",
    message: "",
  });

  const navigate = useNavigate();

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  function closeInfoTooltip() {
    setInfoTooltip({ ...infoTooltip, isOpen: false });
    if (infoTooltip.status === "success") {
      navigate("/sign-in");
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    auth
      .register(formValue.email, formValue.password)
      .then((res) => {
        if (res && !res.error) {
          setInfoTooltip({
            isOpen: true,
            status: "success",
            message: "Вы успешно зарегистрировались!",
          });
        } else {
          setInfoTooltip({
            isOpen: true,
            status: "error",
            message: "Что-то пошло не так! Попробуйте еще раз."
          });
          console.log(res.error);
        }
      })
      .catch((err) => {
        setInfoTooltip({
          isOpen: true,
          status: "error",
          message: "Что-то пошло не так! Попробуйте еще раз.",
        });
        console.error(err);
      });
  }

  return (
    <>
      <Header headerButtonContent="Войти" />
      <div className="register">
        <h1 className="register__title">Регистрация</h1>
        <form onSubmit={handleSubmit} className="register__form">
          <input
            onChange={handleChange}
            className="register__input"
            type="email"
            id="email"
            name="email"
            value={formValue.email}
            placeholder="Email"
            required
          ></input>
          <input
            onChange={handleChange}
            className="register__input"
            type="password"
            id="password"
            name="password"
            value={formValue.password}
            placeholder="Пароль"
            required
          ></input>
          <button
            type="submit"
            onSubmit={handleSubmit}
            className="register__submit"
          >
            Зарегистрироваться
          </button>
        </form>
        <Link to="/sign-in" className="register__login-link">
          Уже зарегистрированы? Войти
        </Link>
      </div>
      <InfoTooltip
        isOpen={infoTooltip.isOpen}
        onClose={closeInfoTooltip}
        status={infoTooltip.status}
        message={infoTooltip.message}
      />
    </>
  );
}

export default Register;
