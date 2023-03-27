import React, {useState, useEffect} from 'react';
const axios = require('axios');
import Stars from './Stars.jsx'
import Characteristics from './Characteristics.jsx'

const Ratings = () => {

  const [metadata, setMetadata] = useState([]);
  useEffect(() => {
  axios.get('/products/reviews')
  .then(data => {
    console.log('data inside Ratings component', data)
    setMetadata(data.data);
  })
  .catch(err => {
    console.log(err, 'Error getting data from API')
  })
  }, [])

  return (
    <div className='ratings-component'>
    <p id='ratings-reviews-title'>RATINGS & REVIEWS</p>
    <Stars data={metadata}/>
    <Characteristics />




    </div>
  )
}

export default Ratings;