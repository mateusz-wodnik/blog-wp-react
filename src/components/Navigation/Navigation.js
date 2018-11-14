import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.sass';
import Form from '../Search/components/Form/Form';
import { API_URL } from '../../globals';
import {getNavigationRequest} from './actions';
import {StoreConsumer} from '../../Store';

class Navigation extends Component {
  componentDidMount() {
    // getNavigationRequest(this.props.dispatch);
  }

  render() {
    const { items: menu } = this.props.navigation;
    return (
      <nav id="navigation" className={styles.container}>
        <div className={styles.top}>
          <label className={styles.toggle} htmlFor="toggleCheckbox">toggle</label>
          <Form />
        </div>
        <input id="toggleCheckbox" type="checkbox" className={styles.toggleCheckbox} />
        <ul className={styles.links}>
          {menu.map(item => <Menu key={item.ID} item={item} className={`${styles.flat}`} order={'even'} />)}
        </ul>
      </nav>
    )
  }
}

const Menu = ({ item, className, order }) => (
  <li key={item.ID} className={`${styles.item} ${className} ${item.childrens ? styles.parent : ''}`}>
    <Link className={styles.link} to={item.object === 'category' ? `/category?category_name=${item.url}` : item.url}>{item.title}</Link>
    {!!item.childrens && (
      <ul className={`${styles.nested}`}>
        {item.childrens.map(children => <Menu key={children.ID}  item={children} order={order === 'even' ? 'odd' : 'even'} />)}
      </ul>
    )}
  </li>
);

export default React.forwardRef((props, ref) => (
  <StoreConsumer>
    {context => <Navigation {...props} {...context} ref={ref} />}
  </StoreConsumer>
));
