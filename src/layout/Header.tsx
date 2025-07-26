import React from 'react';
import logo from '../assets/logo.svg';
import styles from './Header.module.css';


interface HeaderProps {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ isMenuOpen, onToggleMenu }) => {
  return (

<header className={styles.header}>
        <div className={styles.logo}>
        <img src={logo} alt="Study Mallow logo" />
        </div>


    <div className={styles.headerRight}>
        

        <nav className={styles.mainNav}>
          <button className={styles.navbarToggle} onClick={onToggleMenu}>
            ☰
          </button>
          <ul className={`${styles.navbarLinks} ${isMenuOpen ? styles.open : ''}`}>
            <li>O Study Mallow</li>
            <li>Blog</li>
            <li>Co nowego?</li>
            <li>Strefa VIP</li>
          </ul>
        </nav>

        <div className={styles.userActions}>
          <a href="#">Zaloguj</a>
          <span>/</span>
          <a href="#">Zarejestruj</a>
        </div>
      </div>

      </header>

  )
}
export default Header;