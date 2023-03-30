import React, { useState, useEffect } from 'react';
import RelatedProductCard from './RelatedProductCard.jsx';

const RelatedProductsList = ({ currentId, currentProductInfo, relatedProducts, handleProductCardClick }) => (
  <div className='related-products-list'>
    <h2>RELATED PRODUCTS</h2>
    <div className='related-products-carousel'>
      {relatedProducts.map(card =>
      <RelatedProductCard currentId={currentId} currentProductInfo={currentProductInfo} card={card} handleProductCardClick={handleProductCardClick} />
      )}
    </div>
  </div>
);

export default RelatedProductsList;

// <div className='related-products-list'>
// <h2>RELATED PRODUCTS</h2>
// <div className='related-outer-container'>
//   <div className='related-products-container'>
//     <div className='related-products-carousel'>
//       {relatedProducts.map(card =>
//       <ProductCard card={card} />
//       )}
//     </div>
//   </div>
//   <div className='cover'></div>
// </div>

// </div>