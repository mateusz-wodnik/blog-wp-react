import React from 'react';
import styles from './Content.module.sass';

const Content = ({ content }) => (
  <article className={styles.container} dangerouslySetInnerHTML={{__html: content}} />
);

export default Content;
