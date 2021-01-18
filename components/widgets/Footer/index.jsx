import React from 'react';

import styles from './Footer.module.css';

export const Footer = () => (
  <footer className={styles.wrapper}>
    {'Powered by '}
    <a href="https://entando.com/" target="_blank" rel="noopener noreferrer">
      <img src="/entando-dark-logo.svg" alt="Entando" width="80" />
    </a>
  </footer>
);

export default Footer;
