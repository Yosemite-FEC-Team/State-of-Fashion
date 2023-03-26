import React from 'react';
import StarRatings from 'react-star-ratings';

const ProductCard = ({ card }) => {
  let url = card.styleInfo.photoUrl || './assets/placeholder.png';
  return (
  <div className='product-card'>
    <img src={`${url}`} className='card-image-background' />
    <img src={`${url}`} alt='image unavailable' className='card-image' />
    <p className='card-category'>{card.category}</p>
    <p className='card-name'>{card.name}</p>
    <p className='card-color'>{card.styleInfo.styleName}</p>
    <p className='card-price'>{card.defaultPrice}</p>
    <div className='card-stars'>
      <StarRatings rating={card.starRating} starDimension='18px' starSpacing='1px' />
    </div>
  </div>
  )
}

export default ProductCard;