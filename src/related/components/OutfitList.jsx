import React from 'react';
import AddToOutfitCard from './AddToOutfitCard.jsx';
import OutfitProductCard from './OutfitProductCard.jsx';

const OutfitList = ({ outfitProducts, handleAddToOutfitButtonClick, handleDeleteFromOutfitButtonClick }) => (
  <div className='related-products-list'>
    <h2>YOUR OUTFIT</h2>
    <div className='related-products-carousel'>
      <AddToOutfitCard handleAddToOutfitButtonClick={handleAddToOutfitButtonClick} />
      {outfitProducts.map(card =>
        <OutfitProductCard card={card} handleDeleteFromOutfitButtonClick={handleDeleteFromOutfitButtonClick} />
      )}
    </div>
  </div>
)

export default OutfitList;