import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.sass';
import Socials from '../../widgets/Socials/Socials';

const Footer = () => (
  <footer className={styles.container}>
    <p className={styles.rights}>2018 © malg0czi. All Rights Reserved | <Link className={styles.privacy} to="/polityka-prywatnosci">Polityka prywatności</Link></p>
    <div className={styles.socials}>
      <Socials />
    </div>
  </footer>
);

export default Footer;
