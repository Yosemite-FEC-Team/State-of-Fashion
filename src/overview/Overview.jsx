import React from 'react';
import Gallery from './Gallery.jsx';
import Styles from './Styles.jsx';
import {AiOutlineStar} from 'react-icons/Ai';
const axios = require('axios');

const StyleContext = React.createContext(0);

const Overview = () => {

  const [productDetails, setProductDetails] = React.useState({});

  // Can pass this context down
  const [currentStyle, setCurrentStyle] = React.useState(0);
  const [average, setAverage] = React.useState(0);
  const [total, setTotal] = React.useState(0);

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
      //console.log(data.data);
      let total = (data.data[1] * 1) + (data.data[2] * 2) + (data.data[3] * 3) + (data.data[4] * 4) + (data.data[5] * 5);
      let reviews = Number(data.data[1])  + Number(data.data[2]) + Number(data.data[3]) + Number(data.data[4]) + Number(data.data[5]);
      let averageReview = total/reviews;
      setTotal(reviews);
      setAverage(averageReview);
      //console.log(averageReview, 'total');
    })
    .catch(err => {
      console.log(err, 'error getting reviews');
    })
  }

  // likely going to use an <a href=#reviews> for the All reviews

  return (
    <>
      <h1 className='flex items-center justify-between flex-wrap bg-white' >
        <p id='title' className='ml-10'>@Fetch</p>
        <input placeholder='Search...' className="input input-bordered input-success h-10 m-2"></input>
      </h1>
        <div className='flex flex-row w-4/5 mt-5'>
          <StyleContext.Provider value={currentStyle}>
            <Gallery />
          </StyleContext.Provider>
          <div className='flex flex-col ml-10 mt-5'>
            <div>
            <span className="fa fa-star"></span>
            <span className="fa fa-star"></span>
            <span className="fa fa-star"></span>
            <span className="fa fa-star-o"></span>
            <span className="fa fa-star-o"></span>
            <p className='underline'>See all {total} reviews </p>
            </div>
            <p className='category mt-10'>{productDetails.category}</p>
            <h4 className="mt-0 mb-2 text-3xl font-medium leading-tight text-primary">{productDetails.name}</h4>
            {/* The index from styles can go to gallery for the onClick change */}
            <StyleContext.Provider value={{currentStyle, setCurrentStyle}}>
              <Styles />
            </StyleContext.Provider>
          <button className='btn w-52'>Add to Bag</button>
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
    </>
  )
}

export {Overview , StyleContext};