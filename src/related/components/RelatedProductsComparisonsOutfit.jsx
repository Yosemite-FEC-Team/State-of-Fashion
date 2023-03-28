import React, { useState, useEffect } from 'react';
import RelatedProductsList from './RelatedProductsList.jsx';
import OutfitList from './OutfitList.jsx';
import axios from 'axios';

const RelatedProductsComparisonsOutfit = ({ currentId, handleProductCardClick }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  // const [currentId, setCurrentId] = useState('');
  const [outfitProducts, setOutfitProducts] = useState([]);

  useEffect(() => {
    getRelatedProducts();
    getOutfitProducts();
  }, [currentId]);

  // const handleProductCardClick = (id) => {
  //   console.log('clicked product card', id)
  //   axios.post('/products', {id: id})
  //   .then(result => {
  //     console.log('after new axios post req', typeof result.data);
  //     if (typeof result.data === 'number') {
  //       result.data = result.data.toString();
  //     }
  //     console.log('after conversion', typeof result.data, result.data)
  //     return setCurrentId(result.data);
  //     // return currentId;
  //   })
  //   .then(result => {
  //     console.log('after setId', result)
  //     return result;
  //   })
  //   .catch(err => console.log(err));
  // }

  const getComparisonModalContent = (id) => {
    getCurrentProductInfo()
    .then(result => {
      console.log('current info in modal function', result);
      return result;
    })
  }

  const handleAddToOutfitButtonClick = () => {
    getCurrentProductInfo()
    .then(result => {
      return addProductToOutfit(result.id.toString());
    })
    .then(() => {
      return getOutfitProducts();
    })
    .catch(err => console.log(err));
  };

  const handleDeleteFromOutfitButtonClick = (id) => {
    axios.post('/products/delete-outfit', {id: id})
    .then(() => {
      return getOutfitProducts();
    })
    .catch(err => console.log(err));
  };

  const getCurrentProductInfo = () => {
    return axios.get('/products')
    .then(result => {
      return result.data;
    })
    .catch(err => console.log(err));
  };

  const addProductToOutfit = (id) => {
    return axios.post('/products/outfit', {id: id})
    .then(result => {
      return result.data;
    })
    .catch(err => console.log(err));
  };

  const getOutfitProducts = () => {
    return axios.get('/products/outfits')
    .then(result => {
      return setOutfitProducts(result.data);
    })
    .catch(err => console.log(err));
  };

  const getRelatedProducts = () => {
    axios.get('/products/related')
    .then(result => {
      return setRelatedProducts(result.data);
    })
    .catch(err => console.log(err));
  };

  return (
    <div>
      <RelatedProductsList relatedProducts={relatedProducts} handleProductCardClick={handleProductCardClick} getComparisonModalContent={getComparisonModalContent} />
      <OutfitList outfitProducts={outfitProducts} handleAddToOutfitButtonClick={handleAddToOutfitButtonClick} handleDeleteFromOutfitButtonClick={handleDeleteFromOutfitButtonClick} handleProductCardClick={handleProductCardClick} />
    </div>
  );
};

export default RelatedProductsComparisonsOutfit;