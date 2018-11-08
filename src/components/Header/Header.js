import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.sass';

class Header extends Component {
  render() {
    return (
      <header className={styles.container}>
        <Link className={styles.logoWrapper} to="/">
          <img className={styles.logo} src={`http://localhost/wp-json/theme/logo`} alt="logo"/>
        </Link>
      </header>
    )
  }
}

export default Header;
