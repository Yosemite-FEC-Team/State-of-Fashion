import React, { useState } from 'react';

function QualityButtons() {
  const [selectedQuality, setSelectedQuality] = useState('');

  const handleQualityChange = (event) => {
    setSelected(event.target.value);
  }

  const options =['Poor', 'Below Average', 'What I expected', 'Pretty great', 'Perfect'];
  return (
    <>
    <h5>Quality</h5>
    <div>
      {options.map((option) => (
        <>
        <label key={option}>
          <input
          type='radio'
          value={option}
          checked={selectedQuality === option}
          onChange={handleQualityChange}
          />
        </label>
        <span>{option}</span>
        </>
      ))}
    </div>
    </>
  )
}

export default QualityButtons;