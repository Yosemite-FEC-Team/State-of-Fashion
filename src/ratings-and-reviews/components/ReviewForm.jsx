import React, {useState, useEffect} from 'react';
import SizeButtons from './SizeButtons.jsx'
import WidthButtons from './WidthButtons.jsx'
import ComfortButtons from './ComfortButtons.jsx'
import QualityButtons from './QualityButtons.jsx'
import LengthButtons from './LengthButtons.jsx'
import FitButtons from './FitButtons.jsx'
import PhotoUploader from './PhotoUploader.jsx'
const axios = require('axios');


const ReviewForm = ({formIsOpen, handleCloseForm}) => {
//I will need different data here that gives me the product name

const [objectOfChars, setObjectOfChars] = useState({});
const [productName, setProductName] = useState('');
useEffect(() => {
  axios.get('/products/reviews/meta')
  .then(data => {

    setObjectOfChars(data.data.characteristics);

    })
    .catch(err => {
    console.log(err, 'Error getting review metadata from the server');
    });

}, [])


useEffect(() => {
  axios.get('/products')
  .then(data => {
    setProductName(data.data.name);

    })
    .catch(err => {
    console.log(err, 'Error getting product data from the server, try again you goon');
    });

}, [])



//get data to tell me what characteristics this product uses.
//Create State variables for various parts of the form
  const [reviewSummary, setReviewSummary] = useState('');
  const [reviewBody, setReviewBody] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [charsNeeded, setCharsNeeded] = useState(50);
  const [rating, setRating] = useState(0);
  const [meaning, setMeaning] = useState('');
  //create eventHandlers for various parts of the form
  const reviewSummaryChange = (event) => {
    setReviewSummary(event.target.value);
  }

  const minLengthForReview = 50;
  const reviewBodyChange = (event) => {
    const { value } = event.target;
    setReviewBody(value);

    const charsRemaining = minLengthForReview - value.length;
    setCharsNeeded(charsRemaining);
  }

  const nicknameChange = (event) => {
    setNickname(event.target.value);
  }

  const emailChange = (event) => {
    setNickname(event.target.value);
  }

  const handleClick = (newRating) => {
    setRating(newRating);
    switch (newRating) {
      case 1:
        setMeaning('Poor');
        break;
      case 2:
        setMeaning('Fair');
        break;
      case 3:
        setMeaning('Average');
        break;
      case 4:
        setMeaning('Good');
        break;
      case 5:
        setMeaning('Great');
        break;
      default:
        setMeaning('');
        break;
    }
  };
//create Submit EventHandler
//bring in product data so we can actually see the product name
  return (
  <form className='inside-review-form'>
    <h3 className='big-title'>Write Your Review</h3>
    <h5>About {productName}</h5>
    <h5 className='bold-titles'>Overall Rating*</h5>
    <div>
      <div>
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            onClick={() => handleClick(value)}
            style={{
              fontSize: '2em',
              cursor: 'pointer',
              color: value <= rating ? 'gold' : 'grey',
            }}
          >
            ★
          </span>
        ))}
      </div>
      <div className='center-rating'>{meaning}</div>
    </div>
    <h3 className='bold-titles'>Do you recommend this product?*</h3>
    <div>
      <div className='form-yes-no'>
        <input type="radio" id="yes" name="answer" value="yes" className="radio-btn" className='form-yes-no'/>
        <label htmlFor="yes" className="radio-label" className='form-yes-no'>Yes</label>
        <input type="radio" id="no" name="answer" value="no" className="radio-btn" className='form-yes-no'/>
        <label htmlFor="no" className="radio-label"className='form-yes-no'>No</label>
      </div>
    </div>
    <h3 className='bold-titles'>Characteristics*</h3>
    {/*I'm going to need the data from the /reviews/meta endpoint here to see what characteristics are being gathered for a given product*/}
    {objectOfChars.Size && (<SizeButtons />)}
    {objectOfChars.Width && (<WidthButtons />)}
    {objectOfChars.Comfort && (<ComfortButtons />)}
    {objectOfChars.Quality && (<QualityButtons />)}
    {objectOfChars.Length && (<LengthButtons />)}
    {objectOfChars.Fit && (<FitButtons />)}

    <label className='bold-titles'>Review summary</label>
      <input
      className='review-summary-box'
      type="text"
      placeholder="Example: Best purchase ever!"
      maxLength ="60"
      onChange={reviewSummaryChange}
      />

    <br/>
    <label className='bold-titles'>Review Body*</label>
      <input
      className='review-body-box'
      type="text"
      placeholder="Do you like the product or not?"
      minLength="50"
      value={reviewBody}
      onChange={reviewBodyChange}
      required
      />{ charsNeeded >= 0 ? (
         <p className='baby-text'>Minimum required characters left: {charsNeeded}</p>
      ) : (<p className='baby-text'>Minimum Reached</p>)

      }

     <br/>
    <PhotoUploader />
    <label className='bold-titles'>What is your nickname?*</label>
      <input
      className='form-boxes'
      type="text"
      placeholder="Example: jackson11!"
      maxLength="60"
      onChange={nicknameChange}
      required
      />

     <p className='baby-text'>For privacy reasons, do not use your full name or e-mail address</p>
      <br/>
      <label className='bold-titles'>Your e-mail*</label>
      <input
      type="text"
      className='form-boxes'
      placeholder="Example: jackson11@email.com"
      maxLength="60"
      onChange={emailChange}
      required
      />
      <p className='baby-text'>For authentication reasons, you will not be emailed</p>

      <input type="submit" value="Submit Review" className ='review-btn'/>
  </form>
  )
}

export default ReviewForm;