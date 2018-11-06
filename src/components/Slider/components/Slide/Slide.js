import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Slide.module.sass';

const Slide = ({ post_title, excerpt, post_date, post_modified, url, featured_image }) => (
  <li className={styles.container} style={{ backgroundImage: `url("http://localhost${featured_image}")` }}>
    <div className={styles.box}>
      <h3>{post_title}</h3>
      <Link to={url}>Czytaj dalej...</Link>
    </div>
  </li>
);

export default Slide;
