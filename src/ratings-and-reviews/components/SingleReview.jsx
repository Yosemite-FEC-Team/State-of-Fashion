import React, {useState, useEffect} from 'react';
import ReviewPhoto from './ReviewPhoto.jsx';

const SingleReview = ({result}) => {
  console.log('results  inside singlereview', result)
  console.log('result.rating  inside singlereview', result.rating)
  //create a function to format in the desired format
  function formatDate(newDate) {
    const date = new Date(newDate);
    const options = { month: "long", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }
  //for photos, if result.photos.length > 0, map that array to a photo component
  return (
   <div className='single-review'>
   <div className="rating-user-date">
     <p>{result.rating}</p>
     <p id="user-date">{`${result.reviewer_name},`} {formatDate(result.date)}</p>
   </div>

    <p id="review-summary">{result.summary}</p>
   <p>{result.body}</p>
   <div className='review-photos'>
     { result.photos.length === 0 ? null : result.photos.map((photo, id) => <ReviewPhoto key={id} photo={photo} />)}
   </div>
   <p className='recommend'>{result.recommend ? '✔️ I recommend this product' : null }</p>
   <p>{result.response}</p>
   <div className='review-bottom'>
   <p>Helpful? <u>Yes</u> {result.helpfulness} </p>
   <p><u>  | Report</u></p>
   </div>

   </div>
  )
}

export default SingleReview;


