import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.sass';
import {API_URL} from '../../globals';

class Header extends Component {
  render() {
    return (
      <header className={styles.container}>
        <Link className={styles.logoWrapper} to="/">
          <img className={styles.logo} src={`${API_URL}/wp-json/theme/logo`} alt="logo"/>
        </Link>
      </header>
    )
  }
}

export default Header;
