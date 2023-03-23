import React, {useState, useEffect} from 'react';
import SizeButtons from './SizeButtons.jsx'
const ReviewForm = ({formIsOpen, handleCloseForm}) => {
//I will need different data here that gives me the product name

//Create State variables for various parts of the form
  const [reviewSummary, setReviewSummary] = useState('');
  const [reviewBody, setReviewBody] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [charsNeeded, setCharsNeeded] = useState(0);
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
//create Submit EventHandler
  return (
  <form>
    <h3>Write Your Review</h3>
    <h5>About the product name</h5>
    <h3>Overall Rating with Stars</h3>
    <h3>Do you recommend this product?*</h3>
    <label>Yes
      <input type="radio" value="Yes" />
    </label>
    <label>No
      <input type="radio" value="No" />
    </label>
    <h3>Characteristics</h3>
    {/*I'm going to need the data from the /reviews/meta endpoint here to see what characteristics are being gathered for a given product*/}
    <SizeButtons />
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