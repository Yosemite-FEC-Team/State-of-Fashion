import React, { useState } from 'react';
import StarRatings from 'react-star-ratings';
import { IoStarOutline, IoStar, IoCloseSharp } from 'react-icons/io5';
import Modal from 'react-modal';

const RelatedProductCard = ({ card, handleProductCardClick, getComparisonModalContent }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  let url = card.styleInfo.photoUrl || './assets/placeholder.png';

  const customStyles = {
    overlay: {
      zIndex: 9999
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

  const openModal = () => {
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }

  return (
  <div className='product-card'>
    <button className='product-card-button' onClick={() => handleProductCardClick(card.id.toString())}>
      <img src={`${url}`} className='card-image-background' />
      <img src={`${url}`} alt='image unavailable' className='card-image' />
    </button>
    <button className='action-button' onClick={() => {
      console.log('clicked!');
      getComparisonModalContent()
      openModal();
    }}>
      <IoStarOutline />
    </button>
    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
      <button className='modal-close-button' onClick={closeModal}>
        <IoCloseSharp />
      </button>
      <h2>COMPARING</h2>
      <h3 className='left-product'>Product Short Name</h3>
      <h3 className='right-product'>{card.name}</h3>
      <p>{card.features[0].feature}</p>
      <p>{card.features[1].feature}</p>
      {/* <p>{card.features[2]}</p> */}
    </Modal>
    <button className='product-card-button' onClick={() => handleProductCardClick(card.id.toString())}>
      <p className='card-category'>{card.category}</p>
      <p className='card-name'>{card.name}</p>
      <p className='card-color'>{card.styleInfo.styleName}</p>
      <p className='card-price'>{card.defaultPrice}</p>
      <div className='card-stars'>
        <StarRatings rating={card.starRating} starDimension='18px' starSpacing='1px' />
      </div>
    </button>

  </div>
  )
}

export default RelatedProductCard;