import React, {useState, useEffect} from 'react';
import axios from 'axios';
let token = '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'

const Ratings = () => {

  const [metadata, setMetadata] = useState([]);
  useEffect(() => {
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews/meta', {params: {product_id:'37315'}, headers: {'Authorization': `${token}`} } )
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




    </>
  )
}

export default Ratings;