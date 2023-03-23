import React, { useState } from 'react';

function WidthButtons() {
  const [selectedWidth, setSelectedWidth] = useState('');

  const handleWidthChange = (event) => {
    setSelectedWidth(event.target.value);
  }

  const options =['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly Wide', 'Too wide'];
  return (
    <>
    <h5>Width</h5>
    <div>
      {options.map((option) => (
        <>
        <label key={option}>
          <input
          type='radio'
          value={option}
          checked={selectedWidth === option}
          onChange={handleWidthChange}
          />
        </label>
        <span>{option}</span>
        </>
      ))}
    </div>
    </>
  )
}

export default WidthButtons;