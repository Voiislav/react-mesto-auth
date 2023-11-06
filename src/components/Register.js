import React from "react";
import Header from "./Header.js";
import { Link } from 'react-router-dom';

function Register() {
  return (
    <div className="register">
      <Header headerButtonContent="Войти" />
      <h1 className="register__title">Регистрация</h1>
      <form className="register__form">
        <input type="email" id="email" placeholder="Email" required></input>
        <input
          type="password"
          id="password"
          placeholder="Пароль"
          required
        ></input>
        <button type="submit" className="register__submit">
          Зарегистрироваться
        </button>
      </form>
      <Link to="sign-in" className="register__login-link">Уже зарегистрированы? Войти</Link>
    </div>
  );
}

export default Register;
