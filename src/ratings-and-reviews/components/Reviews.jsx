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
      console.log('data from axios call in reviews', data.data);
      setResults(data.data);
    })
    .catch(err => {
      console.log(err, 'Error getting reviews from the API')
    })
  }, [selectedSort]);
  //this state variable will dictate the reviews that are shown and be used in conjunction
  //Create state where we set the number of visible reviews
  const [numberOfReviews, setNumberOfReviews] = useState(2);
  const [selectedSort, setSelectedSort] = useState('helpful');

  const handleSelectChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedSort(selectedOption);

    console.log(selectedSort, 'selected Sort AFTER CHANGE')

    if (selectedOption === 'newest') {
      newestResults = results.sort((a, b) => new Date(b.date) - new Date(a.date));
      setResults(newestResults);
    }
    if (selectedOption === 'helpful') {
      helpfulResults = results.sort((a, b) => b.helpfulness - a.helpfulness);
      setResults(helpfulResults);
    }
    if (selectedOption === 'relevance') {
      relevantResults = results.sort((a, b) => b.helpfulness - a.helpfulness);
      setResults(relevantResults);
    }

    console.log('Selected sort', event.target.value)
  }

  return (
    <div className='reviews-component'>
    <div className='review-sort'>
    <p>{results.length} reviews,sorted by</p><select value={selectedSort} onChange={handleSelectChange}>
      <option value='relevance'>relevance</option>
      <option value='helpful'>helpful</option>
      <option value='newest'>newest</option>
      </select>
    </div>

       {/* we will have to map over each SingleReview component */}
    {results.slice(0, numberOfReviews).map((object, i) => {
      return <SingleReview key={i} result={object}/>
    })}
    <div className='button-container'>
    <button className ='review-btn' onClick={()=> setNumberOfReviews(numberOfReviews + 2)}> MORE REVIEWS </button>
    <button className ='review-btn' onClick={handleOpenForm}> ADD REVIEW  + </button>
    <Modal isOpen={formIsOpen} onRequestClose={handleCloseForm}>
      <ReviewForm />
    </Modal>
    </div>




    </div>
  )
}

export default Reviews;