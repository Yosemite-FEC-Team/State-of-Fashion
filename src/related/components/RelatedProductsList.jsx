import React from 'react';
import ProductCardRelated from './ProductCardRelated.jsx';

const RelatedProductsList = ({ relatedProducts }) => (

  <div className='related-products-list'>
    <h2>RELATED PRODUCTS</h2>
        <div className='related-products-carousel'>
          {relatedProducts.map(card =>
          <ProductCardRelated card={card} />
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