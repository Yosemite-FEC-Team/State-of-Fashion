import React from 'react';
import Ratings from './Ratings.jsx'
import Reviews from './Reviews.jsx'

const RatingsReviews = ({ currentId }) => {



  return (
    <div id='reviews' className='ratings-reviews' >

   <Ratings currentId={currentId} />
   <Reviews currentId={currentId} />



    </div>
  )
}

export default RatingsReviews;
