import React, {useState, useEffect} from 'react';

const SingleReview = ({result}) => {
  console.log('results  inside singlereview', result)
  console.log('result.rating  inside singlereview', result.rating)

  return (
   <>
   <h3>{result.rating}</h3>
   <h3>{result.reviewer_name}</h3>
   <h3>{result.date}</h3>
   <h3>{result.summary}</h3>
   <h3>{result.body}</h3>
   <h3>{result.recommend}</h3>
   <h3>{result.response}</h3>
   <h3>Helpful? {result.helpfulness}</h3>
   <h3>Report Button</h3>
   </>
  )
}

export default SingleReview;


