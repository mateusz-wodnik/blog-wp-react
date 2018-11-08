import React from 'react';
import styles from './Title.module.sass';

const Title = ({ children }) => (
  <header className={styles.container}>
    <h2 className={styles.title}>{children}</h2>
    <hr className={styles.break} />
  </header>
);

export default Title;
