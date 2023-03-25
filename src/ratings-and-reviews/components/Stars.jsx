import React, {useState, useEffect} from 'react';

const Stars = ({data}) => {
  console.log(data, 'HEY THIS SHOULD BE REVIEW METADATA')
  var sum = 0;
  function createAverageRating(metadataObject) {
    //create an array of the values per rating
    var arrayOfTotalRatings = Object.values(metadataObject);
    //sum up the total ratings for divisor
    arrayOfTotalRatings.forEach(rating => {
      let numRating = Number(rating);
      sum +=numRating;
      return sum;
    })
    let dividend = Number(arrayOfTotalRatings[0])*1 + Number(arrayOfTotalRatings[1])*2 + Number(arrayOfTotalRatings[2])*3+Number(arrayOfTotalRatings[3]*4 + Number(arrayOfTotalRatings[4])*5);


    var rawAverage = dividend/sum;
    var finalAverage = rawAverage.toFixed(1);
    return finalAverage;



  }

  var bigRating = createAverageRating(data);

  return (
    <div className='stars-component'>
    <span className='big-rating'>{bigRating}</span>
    <span> stars</span>
    <span className='small-text'>({sum} total reviews)</span>
    <h3>100% of reviews recommend this product</h3>
    <span><small><u>5 stars</u></small></span>
    <h3>4 stars BAR</h3>
    <h3>3 stars BAR</h3>
    <h3>2 stars BAR</h3>
    <h3>1 star BAR</h3>
    </div>
  )
}
export default Stars;