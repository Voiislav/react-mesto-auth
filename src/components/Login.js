import React from "react";
import * as auth from "../auth.js";
import { useNavigate } from "react-router-dom";

function Login({ handleLogin }) {
  const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    }
    auth
      .authorize(formValue.email, formValue.password)
      .then((data) => {
        if (data.token) {
          setFormValue({ email: "", password: "" });
        }
        handleLogin();
        navigate("/main", { replace: true });
      })
      .catch((err) => {
        if (err.status === 400) {
          console.log("400 - не передано одно из полей");
        }
        if (err.status === 401) {
          console.log("401 - пользователь с email не найден");
        }
      });
  }

  return (
    <main className="login">
      <h1 className="login__title">Вход</h1>
      <form onSubmit={handleSubmit} className="login__form">
        <input
          onChange={handleChange}
          className="login__input"
          type="email"
          id="email"
          name="email"
          value={formValue.email}
          placeholder="Email"
          required
        ></input>
        <input
          onChange={handleChange}
          className="login__input"
          type="password"
          id="password"
          name="password"
          value={formValue.password}
          placeholder="Пароль"
          required
        ></input>
        <button onSubmit={handleSubmit} type="submit" className="login__submit">
          Войти
        </button>
      </form>
    </main>
  );
}

export default Login;
