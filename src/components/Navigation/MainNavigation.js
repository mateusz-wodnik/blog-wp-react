import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './MainNavigation.module.sass';
import Form from '../Search/components/Form/Form';

class MainNavigation extends Component {
  state = {
    menu: [],
  };

  componentDidMount() {
    const API = "http://localhost/wp-json/theme/";
    fetch(`${API}menus/main`)
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
          <Form />
        </div>
        <input id="toggleCheckbox" type="checkbox" className={styles.toggleCheckbox} />
        <ul className={styles.links}>
          {menu.map((item, idx) => <Menu item={item} className={`${styles.flat}`} order={'even'} />)}
        </ul>
      </nav>
    )
  }
}

const Menu = ({ item, className, order }) => (
  <li className={`${styles.item} ${className} ${item.childrens ? styles.parent : ''}`}>
    <Link className={styles.link} to={item.url}>{item.title}</Link>
    {!!item.childrens && (
      <ul className={`${styles.nested}`}>
        {item.childrens.map(children => <Menu item={children} order={order === 'even' ? 'odd' : 'even'} />)}
      </ul>
    )}
  </li>
);

export default MainNavigation;
