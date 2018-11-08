import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Preview.module.sass';

const Preview = ({
  post_title, post_name, excerpt, post_date, post_modified, url, featured_media, categories,
}) => (
  <li id={post_name} className={styles.container}>
    <ul className={styles.categories}>
      {categories.map(category => <li><Link className={styles.category} to={category.slug}>{category.name}</Link></li>)}
    </ul>
    <h2 className={styles.title}>{post_title}</h2>
    <time className={styles.date}>{post_date}</time>
    <img className={styles.image} src={`http://localhost${featured_media['large']}`} alt="posts"/>
    {/*<p className={styles.excerpt}>{excerpt}</p>*/}
    <footer className={styles.bottom}>
      <ul className={styles.socials}>
        <li className={styles.social}>socials</li>
      </ul>
      <Link to={`${url}#comments`}>comments</Link>
    </footer>
  </li>
);

export default Preview;
