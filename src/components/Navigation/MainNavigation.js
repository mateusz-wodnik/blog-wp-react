import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './MainNavigation.module.sass';

class MainNavigation extends Component {
  state = {
    menu: [],
  };

  componentDidMount() {
    const API = "http://localhost/wp-json/theme/";
    fetch(`${API}menus?slug=main`)
      .then(res => res.json())
      .then(menu => this.setState({ menu }))
      .catch(console.error);
  }

  render() {
    const { menu } = this.state;
    return (
      <nav className={styles.container}>
        {menu.map(item => <Link to={item.url}>{item.title}</Link>)}
      </nav>
    )
  }
}

export default MainNavigation;
