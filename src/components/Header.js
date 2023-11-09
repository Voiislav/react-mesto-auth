import logo from "../images/mesto_logo.svg";
import { Routes, Route, Link } from 'react-router-dom';

function Header({ onLogout }) {
  return (
    <>
      <header className="header">
        <img className="header__logo" src={logo} alt="Логотип Mesto Russia" />
        <Link className="header__link"></Link>
        <Routes>
        <Route path="/main" element={<Link onClick={onLogout} className="header__link" to="/sign-in">Выйти</Link>} />
        <Route path="/sign-in" element={<Link className="header__link" to="/sign-up">Регистрация</Link>} />
        <Route path="/sign-up" element={<Link className="header__link" to="/sign-in">Войти</Link>} />
        </Routes>
      </header>
    </>
  );
}

export default Header;
