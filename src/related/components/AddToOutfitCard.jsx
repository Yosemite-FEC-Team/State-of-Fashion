import React from 'react';
import { IoAddSharp } from 'react-icons/io5';

const AddToOutfitCard = ({ handleAddToOutfitButtonClick }) => (
  <div className='product-card'>
    <div className='add-button-container-background'></div>
      <button className='add-button-container' onClick={handleAddToOutfitButtonClick}>
        <IoAddSharp className='add-button-icon' color='#3C3C3C' />
      </button>
      <p className='add-label'>ADD TO OUTFIT</p>
  </div>
);

export default AddToOutfitCard;