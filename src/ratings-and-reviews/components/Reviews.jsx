import React, {useState, useEffect} from 'react';
import axios from 'axios';
const TOKEN = process.env.REACT_APP_API_TOKEN
console.log(process.env);



const Reviews = () => {

  const [results, setResults] = useState([]);
  useEffect(() => {
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews/', {params: {product_id: '37315'}, headers: {'Authorization': `${TOKEN}`}})
    .then(data => {
      console.log('data from axios call in reviews', data);
      setResults(data.data.results);
    })
    .catch(err => {
      console.log(err, 'Error getting reviews from the API')
    })
  }, []);

  console.log('results array inside reviews', results);
  return (
    <>
    <h1>Reviews</h1>




    </>
  )
}

export default Reviews;