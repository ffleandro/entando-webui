import React from 'react';
import PropTypes from 'prop-types';

import styles from '../../styles/Home.module.css';

const CardWidget = ({ title, description, link }) => (
  <a href={link} className={styles.card}>
    <h3>{title} &rarr;</h3>
    <p>{description}</p>
  </a>
);

CardWidget.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default CardWidget;
