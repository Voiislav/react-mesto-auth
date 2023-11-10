import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "../auth.js";
import InfoTooltip from "./InfoTooltip.js";
import AuthForm from "./AuthForm.js";

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
        }
      })
      .catch((err) => {
        setInfoTooltip({
          isOpen: true,
          status: "error",
          message: "Что-то пошло не так! Попробуйте еще раз.",
        });
        if (err.status === 400) {
          console.log("400 - некорректно заполнено одно из полей");
        }
      });
  }

  return (
    <main className="register">
      <h1 className="register__title">Регистрация</h1>
      <AuthForm handleSubmit={handleSubmit} handleChange={handleChange} submitButtonText="Зарегистрироваться" formValue={formValue}/>
      <Link to="/sign-in" className="register__login-link">
        Уже зарегистрированы? Войти
      </Link>
      <InfoTooltip
        isOpen={infoTooltip.isOpen}
        onClose={closeInfoTooltip}
        status={infoTooltip.status}
        message={infoTooltip.message}
      />
    </main>
  );
}

export default Register;
