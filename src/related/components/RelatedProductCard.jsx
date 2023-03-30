import React, { useState, useEffect } from 'react';
import StarRatings from 'react-star-ratings';
import { IoStarOutline, IoStar, IoCloseSharp, IoCheckmarkSharp } from 'react-icons/io5';
import Modal from 'react-modal';

const RelatedProductCard = ({ currentId, currentProductInfo, card, handleProductCardClick }) => {
  const [combinedFeaturesWithValues, setCombinedFeaturesWithValues] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const currentFeaturesAndValues = currentProductInfo.features;
  const cardFeaturesAndValues = card.features;
  const leftFeaturesWithValues = {};
  const rightFeaturesWithValues = {};
  let url = card.styleInfo.photoUrl || './assets/placeholder.png';

  useEffect(() => {
    getFeaturesWithValuesForOneSide(currentFeaturesAndValues, 'leftValue', leftFeaturesWithValues);
    getFeaturesWithValuesForOneSide(cardFeaturesAndValues, 'rightValue', rightFeaturesWithValues);
    combineLeftAndRight(leftFeaturesWithValues, rightFeaturesWithValues);
  }, [currentProductInfo, card]);

  const getFeaturesWithValuesForOneSide = (side, sideValue, targetObject) => {
    for (let i = 0; i < side.length; i++) {
      if (side[i].value === null) {
        side[i].value = true;
      }
      targetObject[side[i].feature] = {};
      targetObject[side[i].feature][sideValue] = side[i].value;
    }
    return targetObject;
  };

  const combineLeftAndRight = (leftObject, rightObject) => {
    const combined = {};
    for (let key in leftObject) {
      if (!rightObject.hasOwnProperty(key)) {
        combined[key] = {
          leftValue: leftObject[key].leftValue,
          rightValue: null
        };
      } else {
        combined[key] = {
          leftValue: leftObject[key].leftValue,
          rightValue: rightObject[key].rightValue,
        };
      }
    }
    for (let key in rightObject) {
      if (!leftObject.hasOwnProperty(key)) {
        combined[key] = {
          leftValue: null,
          rightValue: rightObject[key].rightValue,
        };
      }
    }
    return setCombinedFeaturesWithValues(Object.entries(combined));
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const customStyles = {
    overlay: {
      zIndex: 10
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      position: 'absolute',
      color: 'black'
    }
  };

  return (
  <div className='product-card'>
    <button className='product-card-button' onClick={() => handleProductCardClick(card.id.toString())}>
      <img src={`${url}`} className='card-image-background' />
      <img src={`${url}`} alt='image unavailable' className='card-image' />
    </button>
    <button className='action-button' onClick={openModal}>
      <IoStarOutline />
    </button>
    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
      <button className='modal-close-button' onClick={closeModal}>
        <IoCloseSharp />
      </button>
      <h2 className='comparison-modal-title'>COMPARING</h2>
      <div className='modal-names-container'>
        <h3 className='left-product-name'>{currentProductInfo.name}</h3>
        <h3 className='right-product-name'>{card.name}</h3>
      </div>
      {combinedFeaturesWithValues.map((featureWithValues) =>
        <div className='feature-values-item'>
          <div className='left-value'>
            {featureWithValues[1].leftValue === true ? <IoCheckmarkSharp font-size='22px' color='#100F0F'/> : featureWithValues[1].leftValue}
          </div>
          <div className='feature'>
            {featureWithValues[0]}
          </div>
          <div className='right-value'>
            {featureWithValues[1].rightValue === true ? <IoCheckmarkSharp font-size='22px' color='#100F0F'/> : featureWithValues[1].rightValue}
          </div>
        </div>
      )}
    </Modal>
    <button className='product-card-button' onClick={() => handleProductCardClick(card.id.toString())}>
      <p className='card-category'>{card.category}</p>
      <p className='card-name'>{card.name}</p>
      <p className='card-color'>{card.styleInfo.styleName}</p>
      <p className='card-price'>{card.defaultPrice}</p>
      {typeof card.starRating !== 'string' ?
      <div className='card-stars'>
        <StarRatings rating={card.starRating} starDimension='18px' starSpacing='1px' />
      </div> :
      <div className='card-stars'></div>}
    </button>
  </div>
  );
};

export default RelatedProductCard;