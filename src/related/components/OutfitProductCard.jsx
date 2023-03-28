import React from 'react';
import StarRatings from 'react-star-ratings';
import { IoCloseSharp } from 'react-icons/io5';

const OutfitProductCard = ({ card, handleDeleteFromOutfitButtonClick, handleProductCardClick }) => {
  // console.log('card inside productcardoutfit', card);
  let url = card.styleInfo.photoUrl || './assets/placeholder.png';

  return (
    <div className='product-card'>
      <button className='product-card-button' onClick={() => handleProductCardClick(card.id.toString())}>
        <img src={`${url}`} className='card-image-background' />
        <img src={`${url}`} alt='image unavailable' className='card-image' />
      </button>
      <button className='action-button' onClick={() => {
        if (typeof card.id === 'number') {
          card.id = card.id.toString();
        }
        console.log('clicked!');
        handleDeleteFromOutfitButtonClick(card.id);
        }}>
        <IoCloseSharp />
      </button>
      <button className='product-card-button' onClick={() => handleProductCardClick(card.id.toString())}>
        <p className='card-category'>{card.category}</p>
        <p className='card-name'>{card.name}</p>
        <p className='card-color'>{card.styleInfo.styleName}</p>
        <p className='card-price'>{card.defaultPrice}</p>
        <div className='card-stars'>
          <StarRatings rating={card.starRating} starDimension='18px' starSpacing='1px' />
        </div>
      </button>
    </div>
  )
}

export default OutfitProductCard;