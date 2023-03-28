import React from 'react';
import RelatedProductCard from './RelatedProductCard.jsx';

const RelatedProductsList = ({ relatedProducts, handleProductCardClick, getComparisonModalContent }) => (

  <div className='related-products-list'>
    <h2>RELATED PRODUCTS</h2>
        <div className='related-products-carousel'>
          {relatedProducts.map(card =>
          <RelatedProductCard card={card} handleProductCardClick={handleProductCardClick} getComparisonModalContent={getComparisonModalContent} />
          )}
        </div>
  </div>
)

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