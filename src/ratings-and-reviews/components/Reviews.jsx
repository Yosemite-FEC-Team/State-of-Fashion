import React, {useState, useEffect} from 'react';
const axios = require('axios');
import SingleReview from './SingleReview.jsx'
import Modal from 'react-modal';
import ReviewForm from './ReviewForm.jsx';



const Reviews = () => {

  const [results, setResults] = useState([]);
  //this state variable will show whether the review form is open or not
  const [formIsOpen, setFormIsOpen] = useState(false);
  //these functions will  deal with toggling the state above
  const handleOpenForm = () => {
    setFormIsOpen(true);
  };

  const handleCloseForm = () => {
    setFormIsOpen(false);
  }
  useEffect(() => {
    axios.get('/products/review')
    .then(data => {
      console.log('data from axios call in reviews', data);
      setResults(data.data);
    })
    .catch(err => {
      console.log(err, 'Error getting reviews from the API')
    })
  }, []);
  //this state variable will dictate the reviews that are shown and be used in conjunction
  //make an array that is just 2 objects
  //make an array that is the next 2 ones.
  //CURRENTLY THIS IS ONLY SET UP WITH ONE PAGE OF REVIEWS, could I use useEffect to trigger additional axios calls when we run out??
  //Create state where we set the number of visible reviews
  const [numberOfReviews, setNumberOfReviews] = useState(2);

  return (
    <>
    <h1>Reviews</h1>

    <h3>{results.length} reviews, Reviews sorted by</h3><select>
      <option>Relevance</option>
      <option>Helpful</option>
      <option>Newest</option>
      </select>
       {/* we will have to map over each SingleReview component */}
    {results.slice(0, numberOfReviews).map((object, i) => {
      return <SingleReview key={i} result={object}/>
    })}
    <button onClick={()=> setNumberOfReviews(numberOfReviews + 2)}>MORE REVIEWS</button>
    <button onClick={handleOpenForm}>ADD REVIEW</button>
    <Modal isOpen={formIsOpen} onRequestClose={handleCloseForm}>
      <ReviewForm />
    </Modal>





    </>
  )
}

export default Reviews;