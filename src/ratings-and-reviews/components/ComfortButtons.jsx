import React, { useState } from 'react';

function ComfortButtons() {
  const [selectedComfort, setSelectedComfort] = useState('');

  const handleComfortChange = (event) => {
    setSelected(event.target.value);
  }

  const options =['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'];
  return (
    <>
    <h5>Comfort</h5>
    <div>
      {options.map((option) => (
        <>
        <label key={option}>
          <input
          type='radio'
          value={option}
          checked={selectedComfort === option}
          onChange={handleComfortChange}
          />
        </label>
        <span>{option}</span>
        </>
      ))}
    </div>
    </>
  )
}

export default ComfortButtons;