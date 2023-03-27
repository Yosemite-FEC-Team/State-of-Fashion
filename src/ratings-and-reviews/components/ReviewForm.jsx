import React, {useState, useEffect} from 'react';
import SizeButtons from './SizeButtons.jsx'
import WidthButtons from './WidthButtons.jsx'
import ComfortButtons from './ComfortButtons.jsx'
import QualityButtons from './QualityButtons.jsx'
import LengthButtons from './LengthButtons.jsx'
import FitButtons from './FitButtons.jsx'

const ReviewForm = ({formIsOpen, handleCloseForm}) => {
//I will need different data here that gives me the product name

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
    <h5>About this product</h5>
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
       <SizeButtons />
       <WidthButtons />
       <ComfortButtons />
       <QualityButtons />
       <LengthButtons />
       <FitButtons />
    <label>Review summary</label>
      <input
      type="text"
      placeholder="Example: Best purchase ever!"
      maxLength ="60"
      onChange={reviewSummaryChange}
      />

    <br/>
    <label>Review Body*</label>
      <input
      type="text"
      placeholder="Do you like the product or not?"
      minLength="50"
      value={reviewBody}
      onChange={reviewBodyChange}
      required
      />{ charsNeeded >= 0 ? (
         <p>Minimum required characters left: {charsNeeded}</p>
      ) : (<p>Minimum Reached</p>)

      }

     <br/>
    {/*Upload Your Photos goes here*/}
    <label>What is your nickname?*
      <input
      type="text"
      placeholder="Example: jackson11!"
      maxLength="60"
      onChange={nicknameChange}
      required
      />
      </label>
      <small>For privacy reasons, do not use your full name or e-mail address</small>
      <br/>
      <label>Your e-mail*
      <input
      type="text"
      placeholder="Example: jackson11@email.com"
      maxLength="60"
      onChange={emailChange}
      required
      />
      <small>For authentication reasons, you will not be emailed</small>
      </label>
      <input type="submit" value="SubmitReview" />
  </form>
  )
}

export default ReviewForm;