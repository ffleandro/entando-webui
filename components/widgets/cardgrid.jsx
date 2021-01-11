import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/Home.module.css';
import CardWidget from './card.jsx';

const CardGridWidget = ({ cards }) => (
  <div className={styles.grid}>
    {cards.map((card) => (
      <CardWidget
        title={card.title}
        description={card.description}
        link={card.link}
      />
    ))}
  </div>
);

CardGridWidget.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ),
};

export default CardGridWidget;
