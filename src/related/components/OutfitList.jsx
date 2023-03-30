import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import AddToOutfitCard from './AddToOutfitCard.jsx';
import OutfitProductCard from './OutfitProductCard.jsx';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../../../public/styles.css';

const OutfitList = ({ outfitProducts, handleAddToOutfitButtonClick, handleDeleteFromOutfitButtonClick, handleProductCardClick }) => (
  <div className='related-products-list'>
    <h2>YOUR OUTFIT</h2>
    <div className='related-products-carousel'>
      <Swiper slidesPerView={4} spaceBetween={1} navigation={true} modules={[Navigation]} className='swiper'>
        <SwiperSlide>
          <AddToOutfitCard handleAddToOutfitButtonClick={handleAddToOutfitButtonClick} />
        </SwiperSlide>
        {outfitProducts.map(card =>
          <SwiperSlide>
            <div className='product-card-shadow-container'>
              <OutfitProductCard card={card} handleDeleteFromOutfitButtonClick={handleDeleteFromOutfitButtonClick} handleProductCardClick={handleProductCardClick} />
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  </div>
);

export default OutfitList;