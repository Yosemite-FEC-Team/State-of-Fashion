import React from 'react';
import { IoAddSharp } from 'react-icons/io5'

const AddToOutfitCard = ({ handleAddToOutfitButtonClick }) => (
  <div className='product-card'>
    <div className='add-button-container-background'></div>
      <button className='add-button-container' onClick={() => {
        console.log('add to Outfit clicked!');
        handleAddToOutfitButtonClick();
        }}>
        <IoAddSharp className='add-button-icon' color='#3C3C3C' />
      </button>
      <p className='add-label'>ADD TO OUTFIT</p>
    {/* <p className='card-category'>{card.category}</p>
    <p className='card-name'>{card.name}</p>
    <p className='card-color'>{card.styleInfo.styleName}</p>
    <p className='card-price'>{card.defaultPrice}</p>
    <div className='card-stars'>
      <StarRatings rating={card.starRating} starDimension='18px' starSpacing='1px' />
    </div> */}
  </div>
);

export default AddToOutfitCard;