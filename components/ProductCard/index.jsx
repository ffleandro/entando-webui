import PropTypes from 'prop-types';
import React from 'react';

import styles from './ProductCard.module.css';

export const ProductCard = ({ category, code, price, title, images = [] }) => (
  <div className={styles.wrapper}>
    <div className={styles.imgWrapper}>
      <div className={styles.category}>{category}</div>
      <img src={images[0]} />
    </div>
    <div className={styles.title}>
      <p>{title}</p>
    </div>
    <div className={styles.price}>
      <span></span>
      <span>{`$ ${price}`}</span>
    </div>
    <div className={styles.button}>
      <button>{'View Product'}</button>
    </div>
  </div>
);

ProductCard.propTypes = {
  image: PropTypes.string,
  price: PropTypes.string,
  title: PropTypes.string,
};

export default ProductCard;
