import React from 'react';

import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.wrapper}>
      {'Powered by '}
      <a href="https://entando.com/" target="_blank" rel="noopener noreferrer">
        <img src="/entando-dark-logo.svg" alt="Entando" width="80" />
      </a>
      <br />
      <small className="text-muted">
        Repo:&nbsp;
        <a href="https://github.com/entando/entando-webui">
          https://github.com/entando/entando-webui
        </a>
      </small>
    </footer>
  );
}

export default Footer;
