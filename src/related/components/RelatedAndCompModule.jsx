import React, { useState, useEffect } from 'react';
import RelatedProductsList from './RelatedProductsList.jsx';
import OutfitList from './OutfitList.jsx';
import axios from 'axios';

const RelatedAndCompModule = () => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [currentId, setCurrentId] = useState(0);
  const [addButtonClicked, setAddButtonClicked] = useState(false);
  const [outfitProducts, setOutfitProducts] = useState([]);

  useEffect(() => {
    getRelatedProducts();
    getOutfitProducts()
    .then(result => {
      return setOutfitProducts(result);
    })
  }, []);

  const handleAddToOutfitButtonClick = () => {
    getCurrentProductInfo()
    .then(result => {
      return addOutfitToList(result.id.toString());
    })
    .then(result => {
      return getOutfitProducts();
    })
    .then(result => {
      return setOutfitProducts(result);
    })
  };

  const handleDeleteButtonClick = (id) => {
    axios.post('/products/delete-outfit', {id: id})
    .then(result => {
      return result.data;
    })
    .then(result => {
      return getOutfitProducts();
    })
    .then(result => {
      return setOutfitProducts(result);
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

  const addOutfitToList = (id) => {
    return axios.post('/products/outfit', {id: id})
    .then(result => {
      return result.data;
    })
    .catch(err => console.log(err));
  };

  const getOutfitProducts = () => {
    return axios.get('/products/outfits')
    .then(result => {
      return result.data;
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
      <OutfitList currentId={currentId} outfitProducts={outfitProducts} handleDeleteButtonClick={handleDeleteButtonClick} />
      <button onClick={() => handleAddToOutfitButtonClick()}>testButton</button>
    </div>
  );
};

export default RelatedAndCompModule;