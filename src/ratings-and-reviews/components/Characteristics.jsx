import React, {useEffect, useState} from 'react';

const Characteristics = () => {

  const trianglePercentage = 45;
  return (
    <div className='characteristics-bars'>
    <h5>Size</h5>
    <div className="triangle-container">
      <div className="rectangle" />
      <div className="rectangle" />
      <div className="right-rectangle" />
      <div className="triangle" style={{ left: `${trianglePercentage}%` }} />
    </div>
    <h5>Width</h5>
    <h5>Width Bar</h5>
    <h5>Comfort</h5>
    <h5>Comfort Bar</h5>
    <h5>Quality</h5>
    <h5>Quality Bar</h5>
    <h5>Length</h5>
    <h5>Length Bar</h5>
    <h5>Fit</h5>
    <h5>Fit Bar</h5>
    </div>
  )
}

export default Characteristics;