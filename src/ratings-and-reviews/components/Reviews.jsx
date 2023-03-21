import React, {useState, useEffect} from 'react';
import axios from 'axios';
// require('dotenv').config();
// const dotenv = require('dotenv');
// console.log(process.env.REACT_APP_API_TOKEN);
let token = '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'
import SingleReview from './SingleReview.jsx'
import Modal from 'react-modal';
import ReviewForm from './ReviewForm.jsx';



const Reviews = () => {

  const [results, setResults] = useState([]);
  //this state variable will show whether the review form is open or not
  const [formIsOpen, setFormIsOpen] = useState(false);
  useEffect(() => {
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews/', {params: {product_id: '37315'}, headers: {'Authorization': `${token}`}})
    .then(data => {
      console.log('data from axios call in reviews', data);
      setResults(data.data.results);
    })
    .catch(err => {
      console.log(err, 'Error getting reviews from the API')
    })
  }, []);
  //clickHandlerFunction for when the Add Review button is clicked
  const handleClick = () => {
    setFormIsOpen(true);
  }
  console.log('results array inside reviews', results);
  return (
    <>
    <h1>Reviews</h1>

    <h3>248 reviews; Reviews sorted by relavance drop down menu</h3>
       {/* we will have to map over each SingleReview component */}
    {results.map((object, i) => {
      return <SingleReview key={i} result={object}/>
    })}
    <button>MORE REVIEWS</button>
    <button onClick={handleClick}>ADD REVIEW</button>





    </>
  )
}

export default Reviews;