import React, {useState, useEffect} from 'react';
const axios = require('axios');
import Stars from './Stars.jsx'
import Characteristics from './Characteristics.jsx'

const Ratings = () => {

  const [metadata, setMetadata] = useState([]);
  useEffect(() => {
  axios.get('/products/reviews')
  .then(data => {
    console.log('data.data inside Ratings component', data.data)
    setMetadata(data.data);
  })
  .catch(err => {
    console.log(err, 'Error getting data from API')
  })
  }, [])

  return (
    <>
    <h1>Ratings & Reviews</h1>
    <Stars />
    <Characteristics />




    </>
  )
}

export default Ratings;