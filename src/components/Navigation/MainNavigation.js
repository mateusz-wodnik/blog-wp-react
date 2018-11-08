import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './MainNavigation.module.sass';
import Search from '../../widgets/Search/Search';

class MainNavigation extends Component {
  state = {
    menu: [],
    width: window.innerWidth,
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
        <div className={styles.top}>
          <label className={styles.toggle} htmlFor="toggleCheckbox">toggle</label>
          <Search />
        </div>
        <input id="toggleCheckbox" type="checkbox" className={styles.toggleCheckbox} />
        <ul className={styles.links}>
          {menu.map(item => <li><Link className={styles.link} to={item.url}>{item.title}</Link></li>)}
        </ul>
      </nav>
    )
  }
}

export default MainNavigation;
