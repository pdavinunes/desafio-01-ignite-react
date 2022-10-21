import styles from './Header.module.css';

import logo from '../assets/logo.svg';

function Header() {
  return (
    <header className={styles.header}>
      <img src={logo} alt="logotipo do projeto"/>
      <p>
        <span className={styles.title1}>to</span>
        <span className={styles.title2}>do</span>
      </p>
    </header>
  );
}

export default Header