import PropTypes from 'prop-types';
import React from 'react';

import styles from './Menu.module.css';

export const Menu = ({ categories }) => (
  <nav className={styles.wrapper}>
    <ul className={styles.menu}>
      {categories.map(({ title }) => (
        <li key={title}>
          <a href="">{title}</a>
        </li>
      ))}
    </ul>
  </nav>
);

Menu.propTypes = {
  categories: PropTypes.array.isRequired,
};

Menu.defaultProps = {
  categories: [],
};

export default Menu;
