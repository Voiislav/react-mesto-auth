import logo from "../images/mesto_logo.svg";
import React from 'react';
import { Route, Link } from 'react-router-dom';

function Header({ headerButtonContent, isLogged }) {
  return (
    <>
      <header className="header">
        <img className="header__logo" src={logo} alt="Логотип Mesto Russia" />
        <button className="header__button" type="button" aria-label="Войти или зарегистрироваться">
          {headerButtonContent}
        </button>
      </header>
    </>
  );
}

export default Header;
