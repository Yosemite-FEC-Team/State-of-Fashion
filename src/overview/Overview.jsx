import React from 'react';
import Gallery from './Gallery.jsx';
import Styles from './Styles.jsx';

import StarRatings from 'react-star-ratings';
import { AiOutlineStar } from 'react-icons/Ai';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faPinterestP } from '@fortawesome/free-brands-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FacebookShareButton, TwitterShareButton, PinterestShareButton } from 'react-share';
const axios = require('axios');

const StyleContext = React.createContext(0);
// localStorage.setItem('products', 0);


const Overview = () => {

  const [productDetails, setProductDetails] = React.useState({});

  // Can pass this context down
  // currentStyle is the index of the current style
  const [currentStyle, setCurrentStyle] = React.useState(0);
  const [average, setAverage] = React.useState(0);
  const [total, setTotal] = React.useState(0);

  // for checkout
  const [checkout, setCheckout] = React.useState(false);

  React.useEffect(() => {
    getProductDetails();
    getReviews();
  }, []);

  let getProductDetails = () => {
    axios.get('/products')
      .then(data => {
      console.log(data.data, 'product data');
      setProductDetails(data.data);
      // this has all the styles and the photos for those styles
      })
      .catch(err => {
      console.log(err, 'Error getting products from server');
      });
  }

  let getReviews = () => {
    axios.get('/products/reviews')
    .then(data => {
      console.log(data.data, 'REVIEWS');
      let reviewData = data.data;
      let total = 0;
      let reviews = 0;
      // Calculate total reviews and number of reviews to find average
      for (let key in reviewData) {
        total += (reviewData[key] * key);
        reviews += Number(reviewData[key]);
      }
      // round to the nearest quarter
      let averageReview = Number((Math.round(total/reviews * 4) / 4).toFixed(2));
      setTotal(reviews);
      setAverage(averageReview);
      console.log(averageReview, 'total');
    })
    .catch(err => {
      console.log(err, 'error getting reviews');
    })
  }

  const handleCheckoutClick = (event) => {
    event.preventDefault();
    setCheckout(!checkout);
  }


  // likely going to use an <a href=#reviews> for the All reviews

  return (
    <>
      <h1 className='flex items-end justify-between flex-wrap bg-white' >
        <p id='title' className='ml-10'>@Fetch</p>
          <p className='ml-3 mb-3'>Womens </p>
          <p className='ml-3 mb-3'>Mens </p>
          <p className='ml-3 mb-3'>Childrens </p>
          <p className='ml-3 mb-3'>Activewear </p>
          <p className='ml-3 mb-3'>Assessories </p>
          <p className='ml-3 mb-3'>Sale</p>
        <div className='flex ml-48 items-center'>
          <p className='mt-2 mr-5'><FontAwesomeIcon onClick={handleCheckoutClick} icon={faCartShopping} size="lg" style={{color: "#5d8452",}} /></p>
          <input placeholder='Search...' className="input input-bordered input-success h-10 m-2"></input>
        </div>
      </h1>
      <div className='text-center'>
        <p>LIMITED TIME OFFER! <span className='text-red-400'>HUGE SALE!</span> 30% OFF STOREWIDE!! USE CODE <span className='text-red-400'>ILOVEREACT</span> FOR FREE SHIPPING!</p>
      </div>
      <div>
        <div className='flex flex-row w-4/5 mt-2 items-center '>
          <StyleContext.Provider value={currentStyle}>
            <Gallery />
          </StyleContext.Provider>
          <div className='flex flex-col ml-10 mt-5'>
            <div>
              <StarRatings rating={average} starDimension='20px' starSpacing='2px' starRatedColor='#639d80'/>
            <a className='underline ml-2'>See all {total} reviews </a>
            </div>
            <p className='category mt-10'>{productDetails.category}</p>
            <h4 className="mt-0 mb-2 text-3xl font-bold leading-tight text-primary">{productDetails.name}</h4>
            {/* The index from styles can go to gallery for the onClick change */}
            <StyleContext.Provider value={{currentStyle, setCurrentStyle}}>
              <Styles productDetails={productDetails} checkout={checkout} setCheckout={setCheckout}/>
            </StyleContext.Provider>
        </div>
      </div>
      <div className='flex w-full items-center mt-5'>
        <div>
          <h2 className='text-teal-700 text-2xl font-bold ml-5 pb-5'>{productDetails.slogan && productDetails.slogan}</h2>
          <p className='mr-14 ml-5'>{productDetails.description && productDetails.description}</p>
        </div>
        <div className='w-full'>
          {productDetails.features && productDetails.features.map(feature => {
            return (
            <>
              <p className=''>{feature.feature} : {feature.value}</p>
            </>)
          })}
        </div>
      </div>
      <div className='mt-2 pt-2 ml-5'>
        <FacebookShareButton url={'window.location.href'} quote='Check out this cool product I found on Fetch!'>
          <button className='gap-2 text-white bg-[#3b5998] hover:bg-[#3b5998]/90 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-4 mb-2' href='https://www.facebook.com/'><FontAwesomeIcon icon={faFacebookF} size="lg" style={{color: "#ffffff",}} /></button>
        </FacebookShareButton>
        <TwitterShareButton url={'window.location.href'} hashtags={['#fetch']}>
          <button className='gap-2 text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-4 mb-2'><FontAwesomeIcon icon={faTwitter} size="lg" style={{color: "#ffffff",}} /></button>
        </TwitterShareButton>
        <PinterestShareButton url={'window.location.href'} media={'window.location.href'} description={'Check out this cool product I found on Fetch!'}>
          <button className='gap-2 text-white bg-[#E02222] hover:bg-[#E02222]/90 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-4 mb-2'><FontAwesomeIcon icon={faPinterestP} size="lg" style={{color: "#ffffff",}} /></button>
        </PinterestShareButton>
        </div>
        </div>
    </>
  )
}

export {Overview , StyleContext};