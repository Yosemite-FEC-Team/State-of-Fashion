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

  var arrayOfTotalRatings = Object.values(data);

  var fiveStarPercentage = ((Number(arrayOfTotalRatings[4])/sum)*100).toFixed(0);
  var fourStarPercentage = ((Number(arrayOfTotalRatings[3])/sum)*100).toFixed(0);
  var threeStarPercentage = ((Number(arrayOfTotalRatings[2])/sum)*100).toFixed(0);
  var twoStarPercentage = ((Number(arrayOfTotalRatings[1])/sum)*100).toFixed(0);
  var oneStarPercentage = ((Number(arrayOfTotalRatings[0])/sum)*100).toFixed(0);

  console.log(fiveStarPercentage, 'five star percentage');
  return (
    <div className='stars-component'>
    <span className='big-rating'>{bigRating}</span>
    <span> stars</span>
    <span className='small-text'>({sum} total reviews)</span>
    <h3>100% of reviews recommend this product</h3>
    <div className='stars-and-bar-container'>
      <div className='x-stars'><small><u>5 stars</u></small></div>
      <div className='star-bar-container'>
        <div className='star-bar-fill' style={{width: `${fiveStarPercentage}%`}} />
        <div className="star-bar-unfill" style={{ width: `${100 - fiveStarPercentage}%` }} />
      </div>
    </div>
    <div className='stars-and-bar-container'>
      <div className='x-stars'><small><u>4 stars</u></small></div>
      <div className='star-bar-container'>
        <div className='star-bar-fill' style={{width: `${fourStarPercentage}%`}} />
        <div className="star-bar-unfill" style={{ width: `${100 - fourStarPercentage}%` }} />
      </div>
    </div>
    <div className='stars-and-bar-container'>
      <div className='x-stars'><small><u>3 stars</u></small></div>
      <div className='star-bar-container'>
        <div className='star-bar-fill' style={{width: `${threeStarPercentage}%`}} />
        <div className="star-bar-unfill" style={{ width: `${100 - threeStarPercentage}%` }} />
      </div>
    </div>
    <div className='stars-and-bar-container'>
      <div className='x-stars'><small><u>2 stars</u></small></div>
      <div className='star-bar-container'>
        <div className='star-bar-fill' style={{width: `${twoStarPercentage}%`}} />
        <div className="star-bar-unfill" style={{ width: `${100 - twoStarPercentage}%` }} />
      </div>
    </div>
    <div className='stars-and-bar-container'>
      <div className='x-stars'><small><u>1 stars</u></small></div>
      <div className='star-bar-container'>
        <div className='star-bar-fill' style={{width: `${oneStarPercentage}%`}} />
        <div className="star-bar-unfill" style={{ width: `${100 - oneStarPercentage}%` }} />
      </div>
    </div>
    </div>
  )
}
export default Stars;