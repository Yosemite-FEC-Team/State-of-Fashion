import React, { useState, useEffect } from 'react';
import RelatedProductsList from './RelatedProductsList.jsx';
import OutfitList from './OutfitList.jsx';
import axios from 'axios';

const RelatedProductsComparisonsOutfit = ({ currentId, handleProductCardClick }) => {
  const [currentProductInfo, setCurrentProductInfo] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [outfitProducts, setOutfitProducts] = useState([]);

  useEffect(() => {
    getCurrentProductInfo();
    getRelatedProducts();
    getOutfitProducts();
  }, [currentId]);

  const getCurrentProductInfo = () => {
    return axios.get('/products')
    .then(result => {
      return setCurrentProductInfo(result.data);
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

  const getOutfitProducts = () => {
    return axios.get('/products/outfits')
    .then(result => {
      return setOutfitProducts(result.data);
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

  const handleAddToOutfitButtonClick = () => {
    addProductToOutfit(currentProductInfo.id.toString())
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

  return (
    <div id='related-and-outfit'>
      <RelatedProductsList currentId={currentId} currentProductInfo={currentProductInfo} relatedProducts={relatedProducts} handleProductCardClick={handleProductCardClick} />
      <OutfitList outfitProducts={outfitProducts} handleAddToOutfitButtonClick={handleAddToOutfitButtonClick} handleDeleteFromOutfitButtonClick={handleDeleteFromOutfitButtonClick} handleProductCardClick={handleProductCardClick} />
    </div>
  );
};

export default RelatedProductsComparisonsOutfit;