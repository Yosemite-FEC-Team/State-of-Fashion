import React, { useState, useEffect } from 'react';
import RelatedProductsList from './RelatedProductsList.jsx';
import OutfitList from './OutfitList.jsx';
import axios from 'axios';

const RelatedProductsComparisonsOutfit = () => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  // const [currentId, setCurrentId] = useState(0);
  const [outfitProducts, setOutfitProducts] = useState([]);

  useEffect(() => {
    getRelatedProducts();
    getOutfitProducts();
  }, []);

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
      <RelatedProductsList relatedProducts={relatedProducts} />
      <OutfitList
      // currentId={currentId}
      outfitProducts={outfitProducts} handleAddToOutfitButtonClick={handleAddToOutfitButtonClick} handleDeleteFromOutfitButtonClick={handleDeleteFromOutfitButtonClick} />
      {/* <button onClick={() => handleAddToOutfitButtonClick()}>testButton</button> */}
    </div>
  );
};

export default RelatedProductsComparisonsOutfit;