import { Button } from 'carbon-components-react';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Header.module.css';

export const Header = ({ user, onLogin, onLogout, onCreateAccount }) => (
  <header className={styles.wrapper}>
    <div>
      <img src="/entando.svg" alt="Entando Logo" className={styles.img} />
    </div>
    <div>
      {user ? (
        <Button onClick={onLogout}>{'Log out'}</Button>
      ) : (
        <>
          <Button onClick={onLogin}>{'Log in'}</Button>{' '}
          <Button onClick={onCreateAccount}>{'Sign up'}</Button>
        </>
      )}
    </div>
  </header>
);

Header.propTypes = {
  onCreateAccount: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  user: PropTypes.shape({}),
};

Header.defaultProps = {
  user: null,
};

export default Header;
