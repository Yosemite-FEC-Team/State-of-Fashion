import React from 'react';
import Gallery from './Gallery.jsx';
import Styles from './Styles.jsx';
const axios = require('axios');

// Huzzah for jsx!
const Overview = () => {

  const [productDetails, setProductDetails] = React.useState({});

  React.useEffect(() => {
    getProductDetails();
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


  return (
    <>
      <h1 className='flex items-center justify-between flex-wrap bg-white' >
        <p id='title' className='ml-10'>@Fetch</p>
        <input placeholder='Search...' className="input input-bordered input-success h-10 m-2"></input>
      </h1>
        <div className='flex flex-row w-4/5 mt-5'>
          <Gallery />
          <div className='flex flex-col ml-10 mt-5'>
            <div>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star"></span>
            <span className="fa fa-star"></span>
            <p>All reviews </p>
            </div>
            <p className='category mt-10'>{productDetails.category}</p>
            <h4 className="mt-0 mb-2 text-3xl font-medium leading-tight text-primary">{productDetails.name}</h4>
            <p>${productDetails.default_price}</p>
            <p className='category mt-10'>Style >></p>
            {/* The index from styles can go to gallery for the onClick change */}
            <Styles />
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

export default Overview;