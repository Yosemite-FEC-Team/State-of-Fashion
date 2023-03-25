import React from 'react';
import ProductCard from './ProductCard.jsx';

const RelatedProductsList = ({ relatedProducts }) => (

  <div className='related-products-list'>
    <h2>RELATED PRODUCTS</h2>
    <div className='related-products-carousel'>
      {relatedProducts.map(card =>
      <ProductCard card={card} />
      )}
    </div>
  </div>
)

export default RelatedProductsList;