import React, {useState, useEffect} from 'react';
import ReviewPhoto from './ReviewPhoto.jsx';

const SingleReview = ({result}) => {
  console.log('results  inside singlereview', result)
  console.log('result.rating  inside singlereview', result.rating)

  //for photos, if result.photos.length > 0, map that array to a photo component
  return (
   <>
   <h3>{result.rating}</h3>
   <h3>{result.reviewer_name}</h3>
   <h3>{result.date}</h3>
   <h3>{result.summary}</h3>
   <h3>{result.body}</h3>
   { result.photos.length === 0 ? null : result.photos.map((photo, id) => <ReviewPhoto key={id} photo={photo} />)}
   <h3>{result.recommend}</h3>
   <h3>{result.response}</h3>
   <h3>Helpful? {result.helpfulness}</h3>
   <h3>Report Button</h3>
   </>
  )
}

export default SingleReview;


