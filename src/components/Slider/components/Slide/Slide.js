import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Slide.module.sass';

const Slide = ({ post_title, excerpt, post_date, post_modified, url, featured_media }) => (
  <li className={styles.container} style={featured_media['large'] && { backgroundImage: `url("http://localhost${featured_media['large']}")` }}>
    <div className={styles.box}>
      <h3>{post_title}</h3>
      <Link to={url}>Read more...</Link>
    </div>
  </li>
);

export default Slide;
