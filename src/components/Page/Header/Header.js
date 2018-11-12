import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.sass';
import {API_URL} from '../../../globals';

const Header = ({
  post_title, post_name, post_date, post_modified, url, featured_media, categories,
}) => (
  <header id="header" className={styles.container} style={{ backgroundImage: featured_media['large'] && `url(${API_URL}${featured_media['large']})` }}>
    {console.log(featured_media)}
    <div className={styles.box}>
      <h2 className={styles.title}>{post_title}</h2>
      <time className={styles.date}>{post_date}</time>
      <a className={styles.comments} href="#comments">comments</a>
      {/*<ul className={styles.categories}>*/}
        {/*{categories.map(category => <li><Link className={styles.category} to={category.slug}>{category.name}</Link></li>)}*/}
      {/*</ul>*/}
      <ul className={styles.socials}>
        <li className={styles.social}>socials</li>
      </ul>
    </div>
  </header>
);


Header.defaultProps = {
  post_title: '',
  post_name: '',
  post_date: '',
  post_modified: '',
  url: '',
  featured_media: {},
  categories: [],
};

export default Header;
