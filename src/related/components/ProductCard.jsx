import React from 'react';

const ProductCard = ({ card }) => (
  <div className='product-card'>
    <img src={`${card.styleInfo.photoUrl}`} alt={`'image of ${card.name} ${card.category}'`} className='card-image' />
    <p >{card.category}</p>
    <p>{card.name}<br />{card.styleInfo.styleName}</p>
    <p>{card.defaultPrice}</p>
    <p>{card.starRating}</p>
  </div>
)

export default ProductCard;