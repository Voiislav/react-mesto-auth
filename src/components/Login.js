import React from "react";
import Header from "./Header.js";

function Login() {
  return (
    <>
    <Header headerButtonContent="Регистрация" />
    <div className="login">
      <h1 className="login__title">Вход</h1>
      <form className="login__form">
        <input
          className="login__input"
          type="email"
          id="email"
          placeholder="Email"
          required
        ></input>
        <input
          className="login__input"
          type="password"
          id="password"
          placeholder="Пароль"
          required
        ></input>
        <button type="submit" className="login__submit">
          Войти
        </button>
      </form>
    </div>
    </>
  );
}

export default Login;
