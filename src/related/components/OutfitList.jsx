import React from 'react';
import ProductCardOutfit from './ProductCardOutfit.jsx';

const OutfitList = ({ currentId, outfitProducts, handleDeleteButtonClick }) => (
  <div className='related-products-list'>
    <h2>YOUR OUTFIT</h2>
    <div className='related-products-carousel'>
      {outfitProducts.length ?
      outfitProducts.map(card => (
      <ProductCardOutfit card={card} handleDeleteButtonClick={handleDeleteButtonClick} />
      )) : <div>no outfits yet</div>}
    </div>
  </div>
)

export default OutfitList;