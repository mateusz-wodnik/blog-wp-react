import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Preview.module.sass';

const Preview = ({
  post_title, excerpt, post_date, post_modified, url, featured_image, categories,
}) => (
  <li className={styles.container}>
    <ul className={styles.categories}>
      {categories.map(category => <li className={styles.category}><Link to={category.slug}>{category.name}</Link></li>)}
    </ul>
    <h5>{post_title}</h5>
    <time>{post_date}</time>
    <img className={styles.image} src={`http://localhost${featured_image}`} alt="posts"/>
    <p>{excerpt}</p>
    <footer className={styles.bottom}>
      socials
      comments
    </footer>
  </li>
);

export default Preview;
