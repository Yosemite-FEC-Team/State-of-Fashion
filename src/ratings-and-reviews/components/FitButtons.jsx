import React, { useState } from 'react';

function FitButtons() {
  const [selectedFit, setSelectedFit] = useState('');

  const handleFitChange = (event) => {
    setSelected(event.target.value);
  }

  const options =['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly loose', 'Runs loose'];
  return (
    <>
    <h5>Fit</h5>
    <div>
      {options.map((option) => (
        <>
        <label key={option}>
          <input
          type='radio'
          value={option}
          checked={selectedFit === option}
          onChange={handleFitChange}
          />
        </label>
        <span>{option}</span>
        </>
      ))}
    </div>
    </>
  )
}

export default FitButtons;