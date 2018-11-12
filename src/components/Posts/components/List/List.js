import React from 'react';
import styles from '../../Posts.module.sass';
import Title from '../../../../modules/Title/Title';
import Preview from '../Preview/Preview';

const List = ({ posts, title }) => (
  <section className={styles.container}>
    <Title>{title}</Title>
    <ul className={styles.list}>
      {posts.map(item => <Preview {...item} />)}
    </ul>
  </section>
);

export default List;