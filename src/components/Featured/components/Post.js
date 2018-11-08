import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Post.module.sass';

const Post = ({ post_title, excerpt, post_date, featured_media, url }) => (
  <li className={styles.container}>
    <Link to={url}><img className={styles.image} src={`http://localhost${featured_media['thumbnail']}`} alt="featured"/></Link>
    <h5 className={styles.title}><Link to={url}>{post_title}</Link></h5>
    {/*<p className={styles.excerpt}>{excerpt}</p>*/}
    <time className={styles.date}>{post_date}</time>
  </li>
);

export default Post;
