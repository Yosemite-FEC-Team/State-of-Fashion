import React, { useState, useEffect } from 'react';
import RelatedProductsList from './RelatedProductsList.jsx';
import OutfitList from './OutfitList.jsx';
import axios from 'axios';

const RelatedAndCompModule = () => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    getRelatedProducts();
  }, [])

  const getRelatedProducts = () => {
    axios.get('/products/related')
    .then(result => {
      console.log('result from axios call in module', result.data)
      setRelatedProducts(result.data);
      return result.data;
    })
    .then(result => {
      console.log('second part after setState', result);
      return result;
    })
    .catch(err => console.log(err));
  }

  return (
    <div>
      <RelatedProductsList relatedProducts={relatedProducts}/>
      {/* <OutfitList /> */}
    </div>
  )
}

export default RelatedAndCompModule;